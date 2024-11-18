<template>
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div class="flex items-end gap-x-4">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Lista Prodotti</h2>
            <h3 @click="Select('NewProduct')" class="text-lg font-semibold text-gray-800 mb-4 cursor-pointer">Aggiungi Merch</h3>
        </div>

        <div class="" v-for="el in mainStore">
            <div class="my-2 p-2 border-2 rounded-lg drop-shadow-lg">
                <div name="Name">
                    <span class="font-bold">Soggetto: </span>
                    <span>{{ el.subject }}</span>
                </div>
                <div name="Type">
                    <span class="font-bold">Tipo: </span>
                    <span>{{ el.type }}</span>
                </div>
                <div name="Size">
                    <span class="font-bold">Dimensione: </span>
                    <span>{{ el.size }}</span>
                </div>
                <div name="Price">
                    <span class="font-bold">Prezzo: </span>
                    <span>{{ el.price }} €</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
    import { usePaminaStore } from '../../stores/pamina.js'
    import { formatData } from '../../composables/time.js'
    const mainStore = usePaminaStore().products



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