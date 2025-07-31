import { readData, writeData } from './firebase';

export async function login(username, password) {
    const u = await readData(`users/${username}`);
    if (!u) throw new Error('Utente non trovato');
    if (u.password !== password) throw new Error('Password errata');
    return u;
}

export async function register(username, password) {
    const exists = await readData(`users/${username}`);
    if (exists) throw new Error('Username già in uso');
    await writeData(`users/${username}`, {
        password,
        createdAt: Date.now()
    });
    return true;
}

export async function fetchAllUsers() {
    return await readData('users') || {};
}
