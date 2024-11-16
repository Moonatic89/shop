<template>
    <div>QUESTO E' UN NUOVO PRODOTTO</div>
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

</script>

<style scoped></style>