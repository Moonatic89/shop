<template>
    <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div class="flex items-end gap-x-4">
            <h2 class="text-2xl font-semibold text-gray-800 mb-4">Lista Fiere</h2>
            <h3 @click="Select('NewEvent')" class="text-lg font-semibold text-gray-800 mb-4 cursor-pointer">Aggiungi Fiera</h3>
        </div>

        <div class="" v-for="el in mainStore">
            <div class="my-2 p-2 border-2 rounded-lg drop-shadow-lg">
                <div name="Name">
                    <span class="font-bold">Nome: </span>
                    <span>{{ el.name }}</span>
                </div>
                <div name="Location">
                    <span class="font-bold">Location: </span>
                    <span>{{ el.location }}</span>
                </div>

                <div name="Dates" class="flex gap-x-1">
                    <span class="font-bold">Inizio:</span>
                    <span>{{ formatData(el.dates.start) }}</span>
                    <span class="font-bold">Fine:</span>
                    <span>{{ formatData(el.dates.end) }}</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup>
    import { usePaminaStore } from '../../stores/pamina.js'
    import { formatData } from '../../composables/time.js'
    const mainStore = usePaminaStore().events


    // #region Props
    const props = defineProps({

    })
    // #endregion
    const emit = defineEmits(['update:currentSelection']);

    const Select = (selection) => {
        console.log(selection)
        if (selection !== props.currentSelection) {
            emit('update:currentSelection', selection);
        }
    }

</script>

<style scoped></style>