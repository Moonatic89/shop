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
