import { db } from './firebase';
import { collection, doc, getDoc, getDocs, setDoc, addDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';

export async function getSettings() {
  const docRef = doc(db, 'portfolio', 'settings');
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return snap.data();
  }
  return {};
}

export async function saveSettings(settings: any) {
  const docRef = doc(db, 'portfolio', 'settings');
  await setDoc(docRef, settings, { merge: true });
  return { success: true };
}

export async function getFeedbacks() {
  const q = query(collection(db, 'feedbacks'), orderBy('created_at', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addFeedback(data: any) {
  await addDoc(collection(db, 'feedbacks'), {
    ...data,
    created_at: Date.now()
  });
  return { success: true };
}

export async function getSessions() {
  const q = query(collection(db, 'sessions'), orderBy('timestamp', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function addSession(data: any) {
  await addDoc(collection(db, 'sessions'), {
    ...data,
    timestamp: Date.now()
  });
  return { success: true };
}
