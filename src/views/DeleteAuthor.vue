<template>

    <head>
      <title>Delete Book</title>
    </head>
  
    <main id="form">
      <h1 id="Form">Create New Book</h1>
        <form @submit.prevent="createAuthor" >
          <div id="teste">
            <label for="first_name">First Name:</label>
            <input v-model="dados.first_name" id="first_name" required>
          </div>
          <div>
            <label for="last_name">Last Name:</label>
            <input v-model="dados.last_name" id="last_name" required>
          </div>
          <div>
            <label for="date_of_birth">Date_of_birth:</label>
            <input v-model="dados.date_of_birth" id="date_of_birth" required>
          </div>
          <div>
            <label for="Date_Of_Death">Date_Of_Death:</label>
            <input v-model="dados.date_of_death" id="Date_Of_Death" required>
          </div>
          <button type="submit">Criar</button>
        </form>
  
        <div v-if="resposta">
          <p>Resposta da API: {{ resposta }}</p>
        </div>
  
    </main>
  
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'; // Importar o Vue Router
  
  const dados = ref({
    id: '0',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    date_of_death: ''
  });
  
  const router = useRouter(); // Usar o roteador
  
  // Função para criar um autor
  const createAuthor = () => {
    axios.post('http://127.0.0.1:8000/api/v1/author', dados.value, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,  // Adiciona o token no cabeçalho
      'Content-Type': 'application/json'   // Certifica-se que o tipo de conteúdo é JSON
    }
  })
      .then(response => {
        console.log('Autor criado com sucesso!', response.data);
        // Redirecionar para a página de lista de autores
        router.push('/authors'); // Substitua '/authors' pelo caminho correto da sua rota
      })
      .catch(error => {
        console.error('Erro ao criar o autor:', error);
      });
  };
  </script>
  
  <style>
  #form {
    margin-left: 530px;
  }
  
  </style> 