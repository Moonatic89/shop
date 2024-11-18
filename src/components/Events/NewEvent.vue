<template>
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div class="flex items-end gap-x-4">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Aggiungi Fiera</h2>
            <h3 @click="Select('EventList')" class="text-lg font-semibold text-gray-800 mb-4 cursor-pointer">Lista Fiere</h3>
        </div>
        <form @submit.prevent="handleSubmit">

            <!-- Event Name -->
            <Input v-model="event.name" label="Nome" required />
            <!-- Product Type -->
            <Input v-model="event.location" label="Location" required />
            <!-- Product Size -->

            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="startDate">Data Inizio</label>
                <input type="date" id="startDate" v-model="event.dates.start" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>

            <!-- End Date -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="endDate">Data Fine</label>
                <input type="date" id="endDate" v-model="event.dates.end" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>

            <!-- Submit Button -->
            <div class="flex items-center justify-between">
                <button @click="SaveEvent(event)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Salva Fiera</button>
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
    const events = usePaminaStore().events;
    // #endregion

    // #region New Event
    const event = ref({
        name: '',
        location: '',
        dates: {
            start: "",
            end: "",
        }
    })

    const SaveEvent = (event) => {
        events.push(event)
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