import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../../firebase-applet-config.json";

// We need to inject the databaseURL or simply use the projectId
const app = initializeApp({
  ...firebaseConfig,
  databaseURL: `(default)`
});

export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
