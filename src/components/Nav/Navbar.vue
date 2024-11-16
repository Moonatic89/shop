<template>
    <nav class="w-full drop-shadow-xl p-2 px-6 bg-gray-100 rounded-xl flex justify-around">
        <div class="text-xl cursor-pointer" @click="Select('NewEvent')">
            <i class="fa-solid fa-calendar-days"></i>
        </div>

        <div class="text-xl cursor-pointer" @click="Select('NewProduct')">
            <i class="fa-solid fa-ribbon"></i>
        </div>

        <div class="text-xl cursor-pointer" @click="Select('Shop')">
            <i class="fa-solid fa-cart-arrow-down"></i>
        </div>
    </nav>
</template>

<script setup>

    const emit = defineEmits(['update:currentSelection']);

    const props = defineProps({
        currentSelection: {
            type: String,
            required: true,
            default: 'NewEvent' // Valore predefinito opzionale
        }
    });

    function Select(selection) {
        if (selection !== props.currentSelection) {
            emit('update:currentSelection', selection);
        }
    }

</script>

<style scoped></style>
