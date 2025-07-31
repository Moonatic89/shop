<template>
  <main class="p-4 max-w-screen-md mx-auto font-sans bg-gray-100">
    <h1 class="text-2xl font-bold mb-4">Blog</h1>

    <section class="flex flex-col space-y-6 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3">
      <article
        v-for="(post, index) in posts"
        :key="index"
        class="bg-white shadow-md rounded-lg overflow-hidden hover:-translate-y-1 transition-transform"
      >
        <img
          :src="post.immagine"
          :alt="post.titolo"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h2 class="text-lg font-semibold mb-2">{{ post.titolo }}</h2>
          <p class="text-sm text-gray-700">{{ post.testo }}</p>
        </div>
      </article>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const randomImage = (id) => `https://picsum.photos/seed/${id}/400/300`

const posts = ref([
  {
    titolo: 'Primo Post',
    testo: 'Questo è un breve testo introduttivo per il primo post del blog.',
    immagine: randomImage(Math.random())
  },
  {
    titolo: 'Secondo Post',
    testo: 'Un altro testo di esempio per mostrare un post successivo nella lista.',
    immagine: randomImage(Math.random())
  },
  {
    titolo: 'Terzo Post',
    testo: 'Un testo più lungo per il terzo post, giusto per riempire un po’ di spazio e testare la resa grafica.',
    immagine: randomImage(Math.random())
  }
])
</script>
