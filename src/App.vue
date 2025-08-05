<template>
  <div class="relative">
    <Nav />
    <router-view />
  </div>
</template>

<script setup>
import Nav from "@/Components/Layout/Navbar/Nav.vue";
import { useLangStore } from "@/stores/Language/useLangStore";
import { ref, watchEffect } from "vue";
const langStore = useLangStore();
const text = ref(null);

watchEffect(async () => {
  text.value = await langStore.get("Site/Home");
});

const currentState = ref("right");
// #endregion
</script>

<style>
/* Scrollbar stile "mobile-like" */
::-webkit-scrollbar {
  width: 6px; /* sottilissima */
  height: 6px; /* anche per scroll orizzontale */
}

::-webkit-scrollbar-track {
  background: transparent; /* niente sfondo visibile */
}

::-webkit-scrollbar-thumb {
  background-color: rgba(244, 63, 94, 0.6); /* colore thumb semi-trasparente */
  border-radius: 9999px; /* super arrotondata */
  margin: 2px; /* margine per accorciare visivamente */
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(244, 63, 94, 0.9);
}

/* Nascondi frecce su WebKit */
::-webkit-scrollbar-button {
  display: none;
}

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(244, 63, 94, 0.6) transparent;
}
</style>
