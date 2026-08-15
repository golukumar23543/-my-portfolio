import fs from 'fs';

let content = fs.readFileSync('src/lib/api.ts', 'utf8');

// Patch getSettings
content = content.replace(
  `export async function getSettings() {
  const docRef = doc(db, 'portfolio', 'settings');
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return snap.data();
  }
  return {};
}`,
  `export async function getSettings() {
  try {
    const docRef = doc(db, 'portfolio', 'settings');
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data();
    }
  } catch (error) {
    console.warn("Firestore unavailable, using default settings.");
  }
  return {};
}`
);

// Patch getPageViews
content = content.replace(
  `export async function getPageViews() {
  const q = query(collection(db, 'page_views'));
  const snap = await getDocs(q);
  const views = snap.docs.map(doc => ({ date: doc.id, count: doc.data().count }));
  const total = views.reduce((sum, v) => sum + v.count, 0);
  return { views: views.sort((a,b) => b.date.localeCompare(a.date)), total };
}`,
  `export async function getPageViews() {
  try {
    const q = query(collection(db, 'page_views'));
    const snap = await getDocs(q);
    const views = snap.docs.map(doc => ({ date: doc.id, count: doc.data().count }));
    const total = views.reduce((sum, v) => sum + v.count, 0);
    return { views: views.sort((a,b) => b.date.localeCompare(a.date)), total };
  } catch (error) {
    console.warn("Firestore unavailable for page views.");
    return { views: [], total: 0 };
  }
}`
);

fs.writeFileSync('src/lib/api.ts', content);
