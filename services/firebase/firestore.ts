import { getFirestore,initializeFirestore } from "firebase/firestore";

import { app } from "./firebase";

// TODO: Figure out firebase db type
// let db: Firestore // <-- this doesnt work (import { Firestore } from "@google-cloud/firestore";)

let db;

try {
  db = getFirestore();
} catch {
  db = initializeFirestore(app, {});
}

export { db };
