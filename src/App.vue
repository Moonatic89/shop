<template>
  <div class="flex flex-col h-screen max-h-screen overflow-auto bg-gray-200 p-6 gap-y-8 overflow-x-auto">
    <Nav :currentSelection="currentSelection" @update:currentSelection="Toggle" class="flex-grow-0" />

    <div class="w-full flex justify-center">
      <Save :data="data" @update:data="handleDataUpdate" @fileSelected="fileHandle = $event" />
      <button v-if="Object.keys(data).length > 0" @click="saveData">Salva</button>
    </div>

    <transition :name="transitionName" mode="out-in" class="flex mx-auto flex-col max-h-full overflow-y-auto hide-scrollbar">
      <component :is="currentComponent" :key="currentComponent.name" @update:currentSelection="Toggle"></component>
    </transition>
  </div>
</template>

<script setup>
import { ref, shallowRef, watchEffect } from "vue";
import { useFileSaver } from "./composables/useFileSaver.js";
import { usePaminaStore } from "./stores/pamina.js";

// Importa i componenti necessari
import Save from "./components/DataManaging/Save.vue";
import EventList from "./components/Events/EventList.vue";
import NewEvent from "./components/Events/NewEvent.vue";
import Nav from "./components/Nav/Navbar.vue";
import NewProduct from "./components/Products/NewProduct.vue";
import ProductList from "./components/Products/ProductList.vue";
import SellList from "./components/Shop/SellList.vue";
import Shop from "./components/Shop/Shop.vue";

// Store e dati
const mainStore = usePaminaStore();
const data = ref({});
const fileHandle = ref(null);
const { saveToFile } = useFileSaver();

// Salvataggio su file
  async function saveData() {
  console.log("Sto salvando")
  await saveToFile(fileHandle.value, data.value);
}

// Funzione per aggiornare `data` quando viene caricato dal file
function handleDataUpdate(newData) {
  data.value = newData;
}

// **Watch per importare i dati nello store appena vengono caricati**
watchEffect(() => {
  if (data.value?.events) mainStore.importEvents(data.value.events);
  if (data.value?.products) mainStore.importProducts(data.value.products);
  if (data.value?.sales) mainStore.importSales(data.value.sales);
});

// **Gestione dei componenti e transizioni**
const componentsMap = { NewEvent, EventList, NewProduct, ProductList, Shop, SellList };
const currentComponent = shallowRef(NewEvent);
const currentSelection = ref("NewEvent");
const transitionName = ref("slide-left");

const Direction = (oldValue, newValue) => {
  const directions = {
    "NewEvent-NewProduct": "slide-left",
    "NewEvent-Shop": "slide-left",
    "NewEvent-EventList": "slide-up",
    "NewProduct-Shop": "slide-left",
    "NewProduct-NewEvent": "slide-right",
    "NewProduct-ProductList": "slide-up",
    "Shop-NewEvent": "slide-right",
    "Shop-NewProduct": "slide-right",
    "Shop-SellList": "slide-up",
    "EventList-NewEvent": "slide-down",
    "EventList-NewProduct": "slide-left",
    "EventList-Shop": "slide-left",
    "ProductList-NewEvent": "slide-right",
    "ProductList-NewProduct": "slide-down",
    "ProductList-Shop": "slide-left",
    "SellList-Shop": "slide-down"
  };
  return directions[`${oldValue}-${newValue}`] || "slide-left";
};

const Toggle = (value) => {
  const component = componentsMap[value];
  if (component) {
    transitionName.value = Direction(currentSelection.value, value);
    currentComponent.value = component;
    currentSelection.value = value;
  } else {
    console.warn(`Componente "${value}" non trovato nella mappa.`);
  }
};
</script>
