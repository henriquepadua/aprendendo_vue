<template>
  <div id="form">
    <h1>Update Author</h1>

    <!-- Formulário para atualizar autor -->
    <form @submit.prevent="updateAuthor(author.id)">
      <div>
        <label for="first_name">First Name:</label>
        <input v-model="author.first_name" id="first_name" required>
      </div>
      <div>
        <label for="last_name">Last Name:</label>
        <input v-model="author.last_name" id="last_name" required>
      </div>
      <div>
        <label for="date_of_birth">Date of Birth:</label>
        <input v-model="author.date_of_birth" id="date_of_birth" required type="date">
      </div>
      <div>
        <label for="date_of_death">Date of Death:</label>
        <input v-model="author.date_of_death" id="date_of_death" required type="date">
      </div>
      <button type="submit">Update Author</button>
    </form>

    <div v-if="responseMessage">
      <p>{{ responseMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router'; // Importar o Vue Router


const route = useRoute(); // Capturar os parâmetros da rota
// Author ID que deseja atualizar (pode vir de um parâmetro de rota ou outra forma)
const authorId = route.params.id;; // Substitua pelo ID que você quer atualizar

// Dados do autor que serão atualizados
const author = ref({
  id: 0,
  first_name: '',
  last_name: '',
  date_of_birth: '',
  date_of_death: ''
});

// Mensagem de resposta após o envio
const responseMessage = ref('');

// Função para buscar o autor existente ao carregar a página
const fetchAuthor = () => {
  axios.get(`http://127.0.0.1:8000/api/v1/author/${authorId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
      // Preenche o formulário com os dados do autor existente
      author.value = response.data;
    })
    .catch(error => {
      console.error('Erro ao buscar o autor:', error.message);
    });
};

// Carregar dados do autor quando o componente já tivesse criado
onMounted(fetchAuthor);

const router = useRouter(); // Usar o roteador

const accessToken = localStorage.getItem('access_token');
console.log(accessToken)
// Função para atualizar o autor
const updateAuthor = () => {
  axios.put(`http://127.0.0.1:8000/api/v1/author/${authorId}`, author.value, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,  // Adiciona o token no cabeçalho
      'Content-Type': 'application/json'   // Certifica-se que o tipo de conteúdo é JSON
    }
  })
  .then(response => {
    responseMessage.value = 'Author updated successfully!';
    router.push('/authors'); 
  })
  .catch(error => {
    responseMessage.value = 'Error updating author: ' + error.message;
    console.error('Erro ao atualizar o autor:', error.message);
  });
};
</script>

<style scoped>
#form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

div {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>