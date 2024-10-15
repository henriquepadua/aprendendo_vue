<template >
  <div id="card">
  <head>
    <title>Criar instâncias de livros</title>
  </head>

  <main id="form">
    <h1 id="Form">Criar nova instância de livro</h1>
    <form @submit.prevent="createBookInstance">
      <div>
        <label for="due_back">Prazo de entrega:</label>
        <input v-model="dados.due_back" type="date" id="due_back" required>
      </div>
      <div>
        <label for="imprint">Imprimir:</label>
        <input v-model="dados.imprint" id="imprint" required>
      </div>
      <button type="submit">Criar BookInstance</button>
    </form>
    <div v-if="resposta">
      <p>API Resposta: {{ resposta }}</p>
    </div>
  </main>
  </div>

</template>

<script setup>
import axios from 'axios';
import { ref,onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const bookdetaliId = localStorage.getItem('bookID');

const dados = ref({
  imprint: '',
  due_back: '',
  status: 'a', // Definindo o status como 'Available'
  borrower: '',
  book: bookdetaliId
});

const resposta = ref('');
const router = useRouter();

const users = ref([]);
const accessToken = localStorage.getItem('access_token');

onMounted(() => {    
axios.get('http://localhost:8000/api/v1/user', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
  .then(response => {
    users.value = response.data
  })
  .catch(error => {
    console.error(error.message)
  });
})
const createBookInstance = () => {
  const bookdetaliId = localStorage.getItem('bookID');
  
  axios.post('http://127.0.0.1:8000/api/v1/bookinstance', dados.value, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      resposta.value = 'BookInstance created successfully!';
      router.push({ name: 'BookDetail', params: { id: bookdetaliId } });  // Redireciona após atualização
    })
    .catch(error => {
      resposta.value = 'Error creating BookInstance: ' + error.response?.data || error.message;
    });
};
</script>

<style scoped>
#card{
  padding: 30px;
}
#form {
    max-width: 600px;
    margin: 0 auto;
    padding: 30px;
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