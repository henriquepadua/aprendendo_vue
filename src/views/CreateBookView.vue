<template>

    <head>
        <title>Create Book</title>
    </head>

    <main id="form">
        <h1 id="Form">Create New Book</h1>
        <form @submit.prevent="createBook">
            <div id="teste">
                <label for="Title">Title:</label>
                <input v-model="dados.title" id="title" required>
            </div>
            <div>
                <label for="Summary">Summary:</label>
                <input v-model="dados.summary" id="Summary" required>
            </div>
            <div>
                <label for="Isbn">Isbn:</label>
                <input v-model="dados.isbn" id="Isbn" required>
            </div>
            <div>
                <label for="Author">Autor:</label>
                <select class="form-select" v-model="selectAuthor">
                    <option disabled value="">Selecione um autor</option>
                    <option v-for="author in authors" :key="author.id" :value="author.id">
                        {{ author.first_name }}, {{ author.last_name }}
                    </option>
                </select>
                <span></span>
            </div>
            <div>
                <label for="Genre">Gênero:</label>
                <select v-model="selectedGenres" multiple>
                    <option disabled value="">Selecione gêneros</option>
                    <option v-for="genre in genres" :key="genre.id" :value="genre.id">
                        {{ genre.name }}
                    </option>
                </select>
                <span></span>
            </div>
            <button type="submit">Create</button>
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

const selectedGenres = ref(0)
const selectAuthor = ref(0)

const dados = ref({
    //id: "0",
    bookinstance_set: [],
    title: "",
    summary: "",
    isbn: "",
    author: 0,
    genre: 0
});

const router = useRouter(); // Usar o roteador

const genres = ref([])

const authors = ref([])

axios.get('http://127.0.0.1:8000/api/v1/author')
    .then(response => {

        authors.value = response.data

    })
    .catch(error => {
        console.error(error.message)
    });

axios.get('http://127.0.0.1:8000/api/v1/genre')
    .then(response => {

        genres.value = response.data

    })
    .catch(error => {
        console.error(error.message)
    });

// Função para criar um autor
const createBook = () => {
    dados.value.author = selectAuthor.value
    console.log(selectedGenres.value)
    dados.value.genre = selectedGenres.value
    axios.post('http://127.0.0.1:8000/api/v1/books', dados.value)
        .then(response => {

            console.log('Book create sucessfull!', response.data);
            // Redirecionar para a página de lista de autores
            router.push('/books'); // Substitua '/authors' pelo caminho correto da sua rota
        })
        .catch(error => {
            responseMessage.value = 'Error updating author: ' + error.message;
            console.error('Erro ao atualizar o autor:', error.message);
        });
};
</script>

<style>
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
  const createBook = () => {
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