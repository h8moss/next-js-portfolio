import { app } from './firebase'
import { initializeFirestore, getFirestore } from "firebase/firestore";

let db;
try {
    db = getFirestore();
} catch {
    db = initializeFirestore(app);
}

export { db };
