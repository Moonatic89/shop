// Importa Firebase SDK
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, push, update, remove } from "firebase/database";

// Configurazioni prese da Firebase console
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inizializza Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Helper functions
export function writeData(path, data) {
    return set(ref(db, path), data);
}

export function pushData(path, data) {
    const newRef = push(ref(db, path));
    return set(newRef, data);
}

export function readData(path) {
    return get(child(ref(db), path));
}

export function updateData(path, data) {
    return update(ref(db, path), data);
}

export function deleteData(path) {
    return remove(ref(db, path));
}

export default db;
