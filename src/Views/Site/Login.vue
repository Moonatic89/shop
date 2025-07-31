<script setup>
import { ref } from "vue";
import { readData, writeData } from "@/services/firebase.js";
import { useUserStore } from "@/stores/User/User";

const userStore = useUserStore();

const username = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

async function login() {
  error.value = "";
  loading.value = true;

  try {
    const snapshot = await readData(`users/${username.value}`);

    if (!snapshot.exists()) {
      error.value = "Utente non trovato";
      loading.value = false;
      return;
    }

    const userData = snapshot.val();

    if (userData.password !== password.value) {
      error.value = "Password errata";
    } else {
      // Salva l'utente nello store
      userStore.setUser({
        username: username.value,
        ...userData,
      });

      alert("Login riuscito!");
    }
  } catch (err) {
    error.value = "Errore di connessione";
  }

  loading.value = false;
}
</script>

<template>
  <main class="flex flex-col justify-center min-h-screen px-6 bg-gray-50">
    <div class="max-w-sm w-full mx-auto">
      <h1 class="text-3xl font-bold text-center mb-8 text-gray-900">Accedi</h1>

      <input v-model="username" type="text" placeholder="Username" class="w-full px-4 py-3 mb-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

      <input v-model="password" type="password" placeholder="Password" class="w-full px-4 py-3 mb-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />

      <p v-if="error" class="text-red-500 text-sm text-center mb-4">{{ error }}</p>

      <button @click="login" :disabled="loading" class="w-full py-3 mb-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50">
        {{ loading ? "Caricamento..." : "Login" }}
      </button>
    </div>
  </main>
</template>
