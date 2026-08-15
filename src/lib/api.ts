import { db } from './firebase';
import { collection, doc, getDoc, getDocs, setDoc, addDoc, query, orderBy, serverTimestamp, where, increment, deleteDoc } from 'firebase/firestore';

export async function getSettings() {
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
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
  const q = query(collection(db, 'sessions'), where('timestamp', '>=', oneDayAgo), orderBy('timestamp', 'desc'));
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

export async function trackPageView() {
  try {
    const today = new Date().toISOString().split('T')[0];
    const docRef = doc(db, 'page_views', today);
    await setDoc(docRef, { count: increment(1) }, { merge: true });
  } catch (error) {
    console.error('Failed to track page view', error);
  }
}

export async function getPageViews() {
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
}

export async function registerUser(data: any) {
  return upsertUser(data);
}

export async function deleteUser(uid: string) {
  try {
    const docRef = doc(db, 'users', uid);
    await deleteDoc(docRef);
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false };
  }
}

export async function getUserProfile(email: string | null | undefined, uid: string) {
  let q;
  if (email && email.trim() !== '') {
    q = query(collection(db, 'users'), where('email', '==', email));
  } else if (uid) {
    q = query(collection(db, 'users'), where('uid', '==', uid));
  } else {
    return null;
  }
  
  const snap = await getDocs(q);
  if (!snap.empty) {
    return { id: snap.docs[0].id, ...(snap.docs[0].data() as any) };
  }
  return null;
}

export async function deleteFeedback(id: string) {
  try {
    const docRef = doc(db, 'feedbacks', id);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error('Failed to delete feedback:', error);
    return { success: false };
  }
}

export async function upsertUser(data: any) {

  const q = query(collection(db, 'users'), where('email', '==', data.email));
  const snap = await getDocs(q);
  if (snap.empty) {
    await addDoc(collection(db, 'users'), {
      ...data,
      created_at: Date.now()
    });
  } else {
    const docRef = doc(db, 'users', snap.docs[0].id);
    await setDoc(docRef, data, { merge: true });
  }
  return { success: true };
}

export async function getUsers() {
  const q = query(collection(db, 'users'), orderBy('created_at', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

