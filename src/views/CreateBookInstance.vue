<template>
  <div id="card">

    <head>
      <title>Create BookInstance</title>
    </head>

    <main id="form">
      <h1 id="Form">Create New BookInstance</h1>
      <form @submit.prevent="createBookInstance">
        <div>
          <label for="due_back">Due Back:</label>
          <input v-model="dados.due_back" type="date" id="due_back" required>
        </div>
        <div>
          <label for="status">Status:</label>
          <select v-model="dados.status" id="status" required>
            <option disabled value="">Select status</option>
            <option value="m">Maintenance</option>
            <option value="o">On Loan</option>
            <option value="a">Available</option>
            <option value="r">Reserved</option>
          </select>
        </div>
        <div>
          <label for="borrower">Borrower:</label>
          <select v-model="dados.borrower" id="borrower" required>
            <option disabled value="">Select Users for Borrower</option>
            <!-- Aqui estamos usando v-for para iterar sobre a lista de usuários -->
            <option v-for="user in users" :key="user.id" :value="user.id">
              {{ user.username }}
            </option>
          </select>

        </div>
        <div>
          <label for="imprint">Imprint:</label>
          <input v-model="dados.imprint" id="imprint">
        </div>
        <button type="submit">Create BookInstance</button>
      </form>

      <div v-if="resposta">
        <p>API Response: {{ resposta }}</p>
      </div>
    </main>
  </div>

</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const dados = ref({
  imprint: '',
  due_back: '',
  status: '',
  borrower: ''
});
const route = useRoute();
const resposta = ref('');
const router = useRouter();

const users = ref([]);
const accessToken = localStorage.getItem('access_token');

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

const createBookInstance = () => {
  const bookId = localStorage.getItem('bookID');

  axios.post('http://127.0.0.1:8000/api/v1/bookinstance', dados.value, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      resposta.value = 'BookInstance created successfully!';
      //{ name: 'BookDetail', params: { id: bookIds} }
      router.push({ name: 'BookDetail', params: { id: bookId } });
    })
    .catch(error => {
      resposta.value = 'Error creating BookInstance: ' + error.response?.data || error.message;
    });
};
</script>

<style scoped>
#card {
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