<template>
    <nav class="w-full drop-shadow-xl p-2 px-6 bg-gray-100 rounded-xl flex items-center justify-around z-10">
        <div class="text-xl cursor-pointer" @click="Select('NewEvent')">
            <i :class="isBold(['NewEvent', 'EventList'])" class="transition-all duration-150 fa-solid fa-calendar-days"></i>
        </div>

        <div class="text-xl cursor-pointer" @click="Select('NewProduct')">
            <i :class="isBold(['NewProduct', 'ProductList'])" class="transition-all duration-150 fa-solid fa-ribbon"></i>
        </div>

        <div class="text-xl cursor-pointer" @click="Select('Shop')">
            <i :class="isBold(['Shop', 'SellList'])" class="transition-all duration-150 fa-solid fa-cart-arrow-down"></i>
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

    const Select = (selection) => {
        if (selection !== props.currentSelection) {
            emit('update:currentSelection', selection);
        }
    }

    const isBold = (selection) => {
        return selection.includes(props.currentSelection) ? 'text-3xl' : '';
    }

</script>

<style scoped></style>
