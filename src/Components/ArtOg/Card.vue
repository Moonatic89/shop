<template>
  <motion.div
    class="relative group overflow-hidden rounded-xl shadow-lg"
    initial="hidden"
    while-in-view="visible"
    :variants="cardVariants"
    in-view-options="{ amount: 0.2 }"
  >
    <!-- Immagine -->
    <img
      :src="art.image"
      :alt="art.title"
      class="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
    />

    <!-- Overlay con titolo e categoria -->
    <div
      class="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
    >
      <h2 class="text-white text-lg font-semibold">{{ art.title }}</h2>
      <span
        class="text-sm text-gray-200 cursor-pointer hover:underline"
        @click="artStore.setCategory(art.category)"
      >
        {{ art.category }}
      </span>
    </div>
  </motion.div>
</template>

<script setup>
import { useArtOg } from "../../stores/Art/ArtOg";

const props = defineProps({
  art: Object,
});

const artStore = useArtOg();

// Varianti animate specifiche per showcase
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};
</script>
