import express from "express";
import path from "path";
import cors from "cors";
import Database from "better-sqlite3";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Initialize SQLite database
const db = new Database('portfolio.db');

// Create table if not exists
db.exec(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );
  
  CREATE TABLE IF NOT EXISTS feedbacks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    feedback TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS user_sessions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    action TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Insert default value if not exists
const insertDefault = db.prepare('INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)');
insertDefault.run('profile_image', '/golu.jpg');

// API Routes
app.get("/api/settings", (req, res) => {
  try {
    const rows = db.prepare('SELECT key, value FROM settings').all() as {key: string, value: string}[];
    const settings = rows.reduce((acc, row) => {
      acc[row.key] = row.value;
      return acc;
    }, {} as Record<string, string>);
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

app.post("/api/session", (req, res) => {
  const { username, action } = req.body;
  try {
    db.prepare('INSERT INTO user_sessions (username, action) VALUES (?, ?)').run(username, action || 'LOGIN');
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record session' });
  }
});

app.get("/api/sessions", (req, res) => {
  try {
    const sessions = db.prepare('SELECT * FROM user_sessions ORDER BY timestamp DESC').all();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

app.post("/api/feedback", (req, res) => {
  const { name, email, feedback } = req.body;
  if (!name || !feedback) {
    return res.status(400).json({ error: 'Name and feedback are required' });
  }
  try {
    const insertStmt = db.prepare('INSERT INTO feedbacks (name, email, feedback) VALUES (?, ?, ?)');
    insertStmt.run(name, email || '', feedback);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

app.get("/api/feedbacks", (req, res) => {
  try {
    const feedbacks = db.prepare('SELECT * FROM feedbacks ORDER BY created_at DESC').all();
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feedbacks' });
  }
});

app.post("/api/settings", (req, res) => {
  const { password, settings } = req.body;
  
  if (password !== 'Virus@93') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const updateStmt = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');
    
    // Use transaction for multiple updates
    const updateMany = db.transaction((settingsObj) => {
      for (const [key, value] of Object.entries(settingsObj)) {
        updateStmt.run(key, String(value));
      }
    });

    updateMany(settings);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save settings' });
  }
});


async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
