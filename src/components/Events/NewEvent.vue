<template>
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div class="flex items-end gap-x-4">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Aggiungi Fiera</h2>
            <h3 @click="Select('NewEvent')" class="text-lg font-semibold text-gray-800 mb-4">Lista Fiere</h3>
        </div>
        <form @submit.prevent="handleSubmit">
            <!-- Event Name -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="eventName">Nome</label>
                <input type="text" id="eventName" v-model="event.name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>

            <!-- Location -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="location">Location</label>
                <input type="text" id="location" v-model="event.location" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>

            <!-- Start Date -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="startDate">Data Inizio</label>
                <input type="date" id="startDate" v-model="event.startDate" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>

            <!-- End Date -->
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="endDate">Data Fine</label>
                <input type="date" id="endDate" v-model="event.endDate" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>

            <!-- Submit Button -->
            <div class="flex items-center justify-between">
                <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save Event</button>
            </div>
        </form>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    // #region Props
    const props = defineProps({
        events: Array
    })
    // #endregion

    const event = ref({
        name: '',
        location: '',
        startDate: '',
        endDate: '',
    })


    const emit = defineEmits(['update:currentSelection']);

    function Select(selection) {
        if (selection !== props.currentSelection) {
            emit('update:currentSelection', selection);
        }
    }

</script>

<style scoped></style>