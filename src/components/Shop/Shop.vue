<template>
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div class="flex items-end gap-x-4">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Vendita</h2>
            <h3 @click="Select('SellList')" class="text-lg font-semibold text-gray-800 mb-4 cursor-pointer">Lista Vendite</h3>
        </div>
        <form @submit.prevent="handleSubmit">


            <div class="mb-4">
                <label for="subject" class="block text-gray-700 text-sm font-bold mb-2">Fiera</label>
                <select id="event" v-model="eventSelected" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="" disabled>Seleziona una fiera</option>
                    <option v-for="event in events" :key="event" :value="event.id">
                        {{ event.name }}
                    </option>
                </select>
            </div>

            <!-- Subject Search -->
            <div class="mb-4">
                <label for="search" class="block text-gray-700 text-sm font-bold mb-2">Cerca Soggetto</label>
                <input type="text" id="search" v-model="searchQuery" placeholder="Digita per cercare un soggetto" @input="filterSubjects" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>

            <!-- Subject Dropdown -->
            <div class="mb-4">
                <label for="subject" class="block text-gray-700 text-sm font-bold mb-2">Soggetto</label>
                <select id="subject" v-model="selectedSubject" @change="updateFilters" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="" disabled>Seleziona un soggetto</option>
                    <option v-for="subject in filteredSubjects" :key="subject" :value="subject">
                        {{ subject }}
                    </option>
                </select>
            </div>

            <!-- Type Dropdown -->
            <div class="mb-4" v-if="filteredTypes.length">
                <label for="type" class="block text-gray-700 text-sm font-bold mb-2">Tipo</label>
                <select id="type" v-model="selectedType" @change="updateFilters" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="" disabled>Seleziona un tipo</option>
                    <option v-for="type in filteredTypes" :key="type" :value="type">
                        {{ type }}
                    </option>
                </select>
            </div>

            <!-- Size Dropdown -->
            <div class="mb-4" v-if="filteredSizes.length">
                <label for="size" class="block text-gray-700 text-sm font-bold mb-2">Dimensione</label>
                <select id="size" v-model="selectedSize" @change="updateFilters" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option value="" disabled>Seleziona una dimensione</option>
                    <option v-for="size in filteredSizes" :key="size" :value="size">
                        {{ size }}
                    </option>
                </select>
            </div>

            <!-- Price Display -->
            <div class="flex flex-gap-x">

                <div class="mb-4 w-1/2">
                    <label class="block text-gray-700 text-sm font-bold mb-2">Prezzo</label>
                    <p class="text-gray-800 text-lg">{{ selectedPrice || 'N/A' }} €</p>
                </div>
                <div class="mb-4  w-1/2">
                    <label for="newPrice" class="block text-gray-700 text-sm font-bold mb-2">Nuovo Prezzo</label>
                    <input type="text" id="newPrice" v-model="newPrice" placeholder="Nuovo prezzo" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
            </div>

            <!-- Submit Button -->
            <div class="flex items-center justify-between">
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Vendita
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';

    // #region Pinia
    import { usePaminaStore } from '../../stores/pamina.js'
    const products = usePaminaStore().products;
    const events = usePaminaStore().events;
    // #endregion

    // #region Event Selected
    const eventSelected = ref("");
    // #endregion



    // Stato selezionato
    const searchQuery = ref('');
    const selectedSubject = ref('');
    const selectedType = ref('');
    const selectedSize = ref('');
    const selectedPrice = ref(null);
    const newPrice = ref(null)

    // Computed properties per estrarre valori unici
    const uniqueSubjects = computed(() =>
        Array.from(new Set(products.map((product) => product.subject)))
    );

    const filteredSubjects = computed(() => {
        if (!searchQuery.value) return uniqueSubjects.value;
        return uniqueSubjects.value.filter((subject) =>
            subject.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    });

    const filteredTypes = computed(() => {
        if (!selectedSubject.value) return [];
        return Array.from(
            new Set(
                products
                    .filter((product) => product.subject === selectedSubject.value)
                    .map((product) => product.type)
            )
        );
    });

    const filteredSizes = computed(() => {
        if (!selectedSubject.value || !selectedType.value) return [];
        return Array.from(
            new Set(
                products
                    .filter(
                        (product) =>
                            product.subject === selectedSubject.value &&
                            product.type === selectedType.value
                    )
                    .map((product) => product.size)
            )
        );
    });

    // Aggiornamento dei filtri
    function updateFilters() {
        if (selectedSubject.value && selectedType.value && selectedSize.value) {
            const product = products.find(
                (p) =>
                    p.subject === selectedSubject.value &&
                    p.type === selectedType.value &&
                    p.size === selectedSize.value
            );
            selectedPrice.value = product ? product.price : null;
        } else {
            selectedPrice.value = null;
        }
    }

    function filterSubjects() {
        selectedSubject.value = '';
        selectedType.value = '';
        selectedSize.value = '';
        selectedPrice.value = null;
    }

    // Gestione del submit
    function handleSubmit() {
        console.log('Soggetto:', selectedSubject.value);
        console.log('Tipo:', selectedType.value);
        console.log('Dimensione:', selectedSize.value);
        console.log('Prezzo:', selectedPrice.value);
    }

    // #region Navigation
    const emit = defineEmits(['update:currentSelection']);
    const props = defineProps({})

    const Select = (selection) => {
        if (selection !== props.currentSelection) {
            emit('update:currentSelection', selection);
        }
    }
    // #endregion
</script>

<style scoped>
    /* Puoi aggiungere stili personalizzati qui */
</style>
