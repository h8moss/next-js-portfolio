import { app } from "./firebase";
import { initializeFirestore, getFirestore } from "firebase/firestore";

// TODO: Figure out firebase db type
// let db: Firestore // <-- this doesnt work (import { Firestore } from "@google-cloud/firestore";)

let db;

try {
  db = getFirestore();
} catch {
  db = initializeFirestore(app, {});
}

export { db };
