<template>
    <h1>Books: {{ booksinstance }}</h1>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

const booksinstance = ref([])

axios.get('http://127.0.0.1:8000/api/v1/bookinstance')
    .then(response => {

        booksinstance.value = response.data

    })
    .catch(error => {
        console.error(error.message)
    })

</script>