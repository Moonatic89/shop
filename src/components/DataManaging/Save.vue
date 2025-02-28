<script setup>
import { defineEmits, defineProps, ref } from "vue";

const props = defineProps({
  data: Object, // Riceve i dati dal genitore
});

const emit = defineEmits(["update:data", "fileSelected"]);

const fileHandle = ref(null);

async function handleFileChange(event) {
  const file = event.target.files[0];
  if (!file) return;

  try {
    const text = await file.text();
    const jsonData = JSON.parse(text);
    emit("update:data", jsonData); // Aggiorna i dati nel genitore

    // Ottieni il file handle corretto solo se il browser lo supporta
    if (window.showOpenFilePicker) {
      try {
        const [handle] = await window.showOpenFilePicker({
          types: [{ description: "File di testo", accept: { "text/plain": [".txt"] } }],
        });
        fileHandle.value = handle; // Salva il vero FileHandle
      } catch (error) {
        console.warn("L'utente ha annullato la selezione del file.", error);
      }
    } else {
      console.warn("File System API non supportato, impossibile salvare il file esistente.");
    }

    emit("fileSelected", fileHandle.value);
  } catch (error) {
    console.error("Errore nel caricamento del file:", error);
  }
}


// **Funzione per ottenere un fileHandle scrivibile**
async function getFileHandle() {
  if (!window.showSaveFilePicker) {
    console.warn("File System API non supportato, verrà generato un nuovo file.");
    return null;
  }

  return await window.showSaveFilePicker({
    suggestedName: "dati.txt",
    types: [{ description: "File di testo", accept: { "text/plain": [".txt"] } }],
  });
}
</script>

<template>
  <div>
    <input
      v-if="!props.data || Object.keys(props.data).length === 0"
      type="file"
      accept=".txt"
      @change="handleFileChange"
    />
  </div>
</template>
