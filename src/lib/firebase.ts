import { initializeApp } from "firebase/app";
import { initializeFirestore, setLogLevel } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";

const app = initializeApp(firebaseConfig);

// Silence internal Firestore connection logs which clutter the console in strict environments
setLogLevel('silent');

// Use auto-detect for best compatibility
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true
}, firebaseConfig.firestoreDatabaseId);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
