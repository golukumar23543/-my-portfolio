import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // AI Chatbot endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY environment variable is missing." });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      // Formatting context for the bot
      const systemInstruction = `You are Shri, Golu's AI Assistant. You represent Golu (Mr. Golu), a Full-Stack Developer, Designer, and Tech Mentor.
Your role is to assist visitors, answer their queries logically and professionally, and sound as human and helpful as possible.
Give slightly styled, well-formatted, and concise responses.

IMPORTANT: If a user explicitly asks to speak with the admin, contact Golu, or requests a phone number to talk to a human, you MUST provide this number: +91-8709107808 (or wa.me/918709107808).

Answer their questions confidently based on typical portfolio data.`;

      // Use a conversational model
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
           { role: 'user', parts: [{ text: systemInstruction }] },
           { role: 'model', parts: [{ text: 'Understood. I am ready to assist.' }] },
           ...messages
        ],
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error("Chat API error:", error);
      res.status(500).json({ error: "Failed to generate a response." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
