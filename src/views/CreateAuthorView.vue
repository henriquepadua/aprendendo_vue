<template>

  <head>
    <title>Create Book</title>
  </head>

  <main >
    <div id="Form">
    <h1 id="Form">Create New Book</h1>
    <div id="teste">
      <form @submit.prevent="createAuthor">
        <div>
          <label for="first_name">First Name:</label>
          <input v-model="dados.first_name" id="first_name" required>
        </div>
        <div>
          <label for="last_name">Last Name:</label>
          <input v-model="dados.last_name" id="last_name" required>
        </div>
        <div>
          <label for="date_of_birth">First Name:</label>
          <input v-model="dados.date_of_birth" id="first_name" required>
        </div>
        <div>
          <label for="Date_Of_Death">Last Name:</label>
          <input v-model="dados.date_of_death" id="last_name" required>
        </div>
        <button type="submit">Criar</button>
      </form>

      <div v-if="resposta">
        <p>Resposta da API: {{ resposta }}</p>
      </div>
    </div>
  </div>

  </main>

</template>

<script setup>

import axios from 'axios';
import { ref } from 'vue';

const dados = ref({
  id: '0',
  first_name: '',
  email: '',
  date_of_birth: '',
  date_of_death: ''
});

// Função para criar um autor
const createAuthor = () => {
  axios.post('http://127.0.0.1:8000/api/v1/author', dados.value)
    .then(response => {
      console.log('Autor criado com sucesso!', response.data);
      // Redirecionar ou limpar o formulário, se necessário
    })
    .catch(error => {
      console.error('Erro ao criar o autor:', error);
    });
};
</script>

<style>
#Form{
  margin-left: 33opx;
}
</style>