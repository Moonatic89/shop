<!-- Input.vue -->
<template>
    <div class="mb-4">
        <label :for="id" class="block text-gray-700 text-sm font-bold mb-2">
            {{ label }}
        </label>
        <input :type="type" :id="id || label + '_ID'" :name="name" :value="modelValue" @input="updateValue($event.target.value)" :placeholder="placeholder" :required="required" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
    </div>
</template>

<script setup>
    import { defineProps, defineEmits } from 'vue';

    const props = defineProps({
        label: { type: String, required: true },
        id: { type: String, default: '' },
        name: { type: String, default: '' },
        type: { type: String, default: 'text' },
        modelValue: { type: [String, Number], default: '' },
        placeholder: { type: String, default: '' },
        required: { type: Boolean, default: false },
    });

    const emits = defineEmits(['update:modelValue']);

    function updateValue(value) {
        emits('update:modelValue', value);
    }
</script>
