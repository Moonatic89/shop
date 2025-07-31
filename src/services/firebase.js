// Importa Firebase SDK
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, push, update, remove } from "firebase/database";

// Configurazioni prese da Firebase console
const firebaseConfig = {
    apiKey: "AIzaSyCi_bCQ9kvD-OjDmQn33km3vto5XDAlFMY",
    authDomain: "naminiel-72609.firebaseapp.com",
    projectId: "naminiel-72609",
    databaseURL: "https://naminiel-72609-default-rtdb.europe-west1.firebasedatabase.app", // URL del DB
    storageBucket: "naminiel-72609.firebasestorage.app",
    messagingSenderId: "838628999786",
    appId: "1:838628999786:web:01398add8ed681c343c013"
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
