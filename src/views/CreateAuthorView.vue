<template>

  <head>
    <title>Criar livro</title>
  </head>

  <main id="form">
    <h1 id="Form">Criar novo livro</h1>
    <form @submit.prevent="createAuthor">
      <div id="teste">
        <label for="first_name">Primeiro nome:</label>
        <input v-model="dados.first_name" id="first_name" >
        <span v-if="errors.first_name" class="error">{{ errors.first_name }}</span>
      </div>
      <div>
        <label for="last_name">Sobrenome:</label>
        <input v-model="dados.last_name" id="last_name" >
        <span v-if="errors.last_name" class="error">{{ errors.last_name }}</span>
      </div>
      <div>
        <label for="date_of_birth" type="date">Data_de_nascimento:</label>
        <input v-model="dados.date_of_birth" id="date_of_birth" type="date" >
        <span v-if="errors.date_of_birth" class="error">{{ errors.date_of_birth }}</span>
      </div>
      <div>
        <label for="Date_Of_Death">Data_de_morte:</label>
        <input v-model="dados.date_of_death" id="Date_Of_Death" type="date" >
        <span v-if="errors.date_of_death" class="error">{{ errors.date_of_death }}</span>
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

const errors = ref({ // Adicionando objeto para mensagens de erro
  first_name: '',
  last_name: '',
  date_of_birth: '',
  date_of_death: ''
});

const validateForm = () => {
  // Limpar erros antes da validação
  errors.value = {
    first_name: '',
    last_name: '',
    date_of_birth: '',
    date_of_death: ''
  };

  let valid = true;

  // Verificando se os campos estão vazios
  if (!dados.value.first_name) {
    errors.value.first_name = 'O nome é requerido.';
    valid = false;
  }
  if (!dados.value.last_name) {
    errors.value.last_name = 'O sobrenome é requerido.';
    valid = false;
  }
  if (!dados.value.date_of_birth) {
    errors.value.date_of_birth = 'A data de nascimento é requerida.';
    valid = false;
  }
  if (!dados.value.date_of_death) {
    errors.value.date_of_death = 'A data de morte é requerida.';
    valid = false;
  }

  return valid; // Retorna se o formulário é válido
};

const router = useRouter(); // Usar o roteador
const accessToken = localStorage.getItem('access_token');

// Função para criar um autor
const createAuthor = () => {
  if (validateForm()) {
    axios.post('http://127.0.0.1:8000/api/v1/author', dados.value, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log('Autor criado com sucesso!', response.data);
        // Redirecionar para a página de lista de autores
        router.push('/authors'); // Substitua '/authors' pelo caminho correto da sua rota
      })
      .catch(error => {
        if (error.response && error.response.data) {
          const responseErrors = error.response.data;
          // Mapear os erros do backend para o frontend
          if (responseErrors.first_name) {
            errors.value.first_name = responseErrors.first_name[0]; // Exibe o erro do backend
          }
          if (responseErrors.last_name) {
            errors.value.last_name = responseErrors.last_name[0];
          }
          if (responseErrors.date_of_birth) {
            errors.value.date_of_birth = responseErrors.date_of_birth[0];
          }
          if (responseErrors.date_of_death) {
            errors.value.date_of_death = responseErrors.date_of_death[0];
          }
        } else {
          console.error('Erro ao criar o autor:', error);
        }
        console.error('Erro ao criar o autor:', error);
      });
  }
};
</script>

<style>
.error {
  color: red;
}

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
<!-- <script setup>

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
#form {
  margin-left: 530px;
}

</style> -->