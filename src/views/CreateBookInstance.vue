<template>

    <head>
      <title>Create BookInstance</title>
    </head>
  
    <main id="form">
      <h1 id="Form">Create New BookInstance</h1>
      <form @submit.prevent="createBookInstance">
        <!-- <div id="teste">
          <label for="imprint">Imprint:</label>
          <input v-model="dados.imprint" id="imprint" required>
        </div> -->
        <div>
          <label for="due_back">Due Back:</label>
          <input v-model="dados.due_back" type="date" id="due_back" required>
        </div>
        <div>
          <label for="status">Status:</label>
          <select v-model="dados.status" id="status" required>
            <option disabled value="">Select status</option>
            <option value="Maintenance">Maintenance</option>
            <option value="On Loan">On Loan</option>
            <option value="Available">Available</option>
            <option value="Reserved">Reserved</option>
          </select>
        </div>
        <div>
          <label for="borrower">Borrower:</label>
          <input v-model="dados.borrower" id="borrower">
        </div>
        <button type="submit">Create BookInstance</button>
      </form>
  
      <div v-if="resposta">
        <p>API Response: {{ resposta }}</p>
      </div>
    </main>
  
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'; 
  
  const dados = ref({
    imprint: '',
    due_back: '',
    status: '',
    borrower: ''
  });
  
  const resposta = ref('');
  const router = useRouter();
  
  const createBookInstance = () => {
    const accessToken = localStorage.getItem('access_token');
    
    axios.post('http://127.0.0.1:8000/api/v1/bookinstance', dados.value, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        resposta.value = 'BookInstance created successfully!';
        router.push('/bookinstances');
      })
      .catch(error => {
        resposta.value = 'Error creating BookInstance: ' + error.response?.data || error.message;
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
    background-color: #f9f9f9;
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