<template>
  <div class="max-w-xl mx-auto py-10 px-4">
    <h1 class="text-2xl font-bold mb-6">Nuova Opera</h1>

    <form @submit.prevent="submitArt" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Titolo</label>
        <input
          v-model="title"
          type="text"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Categoria</label>
        <input
          v-model="category"
          type="text"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Immagine</label>
        <input type="file" @change="onFileChange" accept="image/*" required />
      </div>

      <button
        type="submit"
        class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
      >
        Salva Opera
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useArtFa } from "../../stores/Art/ArtFa";

const artStore = useArtFa();
const title = ref("");
const category = ref("");
const imageFile = ref(null);

const onFileChange = (e) => {
  imageFile.value = e.target.files[0];
};

const submitArt = async () => {
  if (!imageFile.value) {
    alert("Seleziona un'immagine");
    return;
  }

  try {
    await artStore.addArt({
      title: title.value,
      category: category.value,
      imageFile: imageFile.value,
    });

    title.value = "";
    category.value = "";
    imageFile.value = null;
    alert("Opera salvata con successo!");
  } catch (err) {
    alert("Errore nel salvataggio: " + err.message);
  }
};
</script>
