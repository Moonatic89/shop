<template>
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">

        <div class="flex items-end gap-x-4">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Aggiungi Merch</h2>
            <h3 @click="Select('ProductList')" class="text-lg font-semibold text-gray-800 mb-4 cursor-pointer">Lista Merch</h3>
        </div>

        <form @submit.prevent="handleSubmit">

            <!-- Product Name -->
            <Input v-model="product.subject" label="Soggetto" required />
            <!-- Product Type -->
            <Input v-model="product.type" label="Tipo" required />
            <!-- Product Size -->
            <Input v-model="product.dimension" label="Dimensione" required />
            <!-- Product Price -->
            <Input v-model="product.price" label="Prezzo" required />

            <!-- Submit Button -->
            <div class="flex items-center justify-between">
                <button @click="SaveProduct(product)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save Event</button>
            </div>
        </form>
    </div>
</template>

<script setup>
    // #region Imports
    import { ref } from 'vue';
    import Input from '../Generic/Input.vue';
    // #endregion

    // #region Pinia
    import { usePaminaStore } from '../../stores/pamina.js'
    const products = usePaminaStore().products;
    // #endregion

    // #region New Product
    const product = ref({
        dimension: '',
        subject: '',
        type: '',
        price: '',
    })

    const SaveProduct = (product) => {
        products.push(product)
    };
    // #endregion

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

<style scoped></style>