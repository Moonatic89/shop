<template>
  <div class="flex flex-col h-screen max-h-screen overflow-auto bg-gray-200 p-6 gap-y-8 overflow-x-auto  ">

    <Nav :currentSelection="currentSelection" @update:currentSelection="Toggle" class=" flex-grow-0" />

    <transition :name="transitionName" mode="out-in" class="flex flex-col max-h-full overflow-y-auto  hide-scrollbar">
      <component :is="currentComponent" :key="currentComponent.name" @update:currentSelection="Toggle" class=""></component>
    </transition>

  </div>
</template>


<script setup>
  import { ref, shallowRef } from 'vue'
  import data from './assets/data.json' // Placeholder, it will be removed after the layout is complete
  import { usePaminaStore } from './stores/pamina.js'


  import NewEvent from './components/Events/NewEvent.vue'
  import EventList from './components/Events/EventList.vue'

  import NewProduct from './components/Products/NewProduct.vue'
  import ProductList from './components/Products/ProductList.vue'

  import Shop from './components/Shop/Shop.vue'
  import SellList from './components/Shop/SellList.vue'


  import Nav from './components/Nav/Navbar.vue'

  // Importa altri componenti se necessario

  const mainStore = usePaminaStore()
  mainStore.importEvents(data.events);
  mainStore.importProducts(data.products);
  mainStore.importSales(data.sales);


  // const events = ref(pamina.events)

  const componentsMap = {
    NewEvent,
    EventList,
    NewProduct,
    ProductList,
    Shop,
    SellList
    // Aggiungi altri componenti qui
  }

  // const currentComponent = ref(NewEvent)
  const currentComponent = shallowRef(NewEvent);
  const currentSelection = ref('NewEvent')


  const transitionName = ref('slide-left') // Valore di default


  const Direction = (oldValue, newValue) => {
    if (oldValue == 'NewEvent' && newValue == 'NewProduct') { return 'slide-left' }
    if (oldValue == 'NewEvent' && newValue == 'Shop') { return 'slide-left' }
    if (oldValue == 'NewEvent' && newValue == 'EventList') { return 'slide-up' }

    if (oldValue == 'NewProduct' && newValue == 'Shop') { return 'slide-left' }
    if (oldValue == 'NewProduct' && newValue == 'NewEvent') { return 'slide-right' }
    if (oldValue == 'NewProduct' && newValue == 'ProductList') { return 'slide-up' }

    if (oldValue == 'Shop' && newValue == 'NewEvent') { return 'slide-right' }
    if (oldValue == 'Shop' && newValue == 'NewProduct') { return 'slide-right' }
    if (oldValue == 'Shop' && newValue == 'SellList') { return 'slide-up' }


    if (oldValue == 'EventList' && newValue == 'NewEvent') { return 'slide-down' }
    if (oldValue == 'EventList' && newValue == 'NewProduct') { return 'slide-left' }
    if (oldValue == 'EventList' && newValue == 'Shop') { return 'slide-left' }

    if (oldValue == 'ProductList' && newValue == 'NewEvent') { return 'slide-right' }
    if (oldValue == 'ProductList' && newValue == 'NewProduct') { return 'slide-down' }
    if (oldValue == 'ProductList' && newValue == 'Shop') { return 'slide-left' }

    if (oldValue == 'SellList' && newValue == 'Shop') { return 'slide-down' }

  };

  const Toggle = (value) => {
    const component = componentsMap[value]
    if (component) {
      // Logica per determinare la direzione della transizione
      // Ad esempio, se il nuovo componente è "NewEvent", usa "slide-left", altrimenti "slide-right"
      transitionName.value = Direction(currentSelection.value, value);
      // transitionName.value = (value === 'NewEvent') ? 'slide-left' : 'slide-right'
      currentComponent.value = component
      currentSelection.value = value
    } else {
      console.warn(`Componente "${value}" non trovato nella mappa dei componenti.`)
    }
  }
</script>


<style>
  button {
    margin-right: 10px;
    padding: 10px 20px;
    cursor: pointer;
  }

  /* Definizione delle classi di transizione per lo scorrimento a sinistra */
  .slide-left-enter-active,
  .slide-left-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .slide-left-enter-from {
    transform: translateX(100%);
    opacity: 0;
  }

  .slide-left-enter-to {
    transform: translateX(0);
    opacity: 1;
  }

  .slide-left-leave-from {
    transform: translateX(0);
    opacity: 1;
  }

  .slide-left-leave-to {
    transform: translateX(-100%);
    opacity: 0;
  }

  /* Definizione delle classi di transizione per lo scorrimento a destra */
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .slide-right-enter-from {
    transform: translateX(-100%);
    opacity: 0;
  }

  .slide-right-enter-to {
    transform: translateX(0);
    opacity: 1;
  }

  .slide-right-leave-from {
    transform: translateX(0);
    opacity: 1;
  }

  .slide-right-leave-to {
    transform: translateX(100%);
    opacity: 0;
  }

  /* Definizione delle classi di transizione per lo scorrimento verso l'alto */
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }

  .slide-up-enter-from {
    transform: translateY(100%);
    opacity: 0;
  }

  .slide-up-enter-to {
    transform: translateY(0);
    opacity: 1;
  }

  .slide-up-leave-from {
    transform: translateY(0);
    opacity: 1;
  }

  .slide-up-leave-to {
    transform: translateY(-100%);
    opacity: 0;
  }

  /* Definizione delle classi di transizione per lo scorrimento verso il basso */
  .slide-down-enter-active,
  .slide-down-leave-active {
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }

  .slide-down-enter-from {
    transform: translateY(-100%);
    opacity: 0;
  }

  .slide-down-enter-to {
    transform: translateY(0);
    opacity: 1;
  }

  .slide-down-leave-from {
    transform: translateY(0);
    opacity: 1;
  }

  .slide-down-leave-to {
    transform: translateY(100%);
    opacity: 0;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .hide-scrollbar {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
  }
</style>
