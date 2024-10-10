<template>
    <head>
        <title>Atualizar Livro</title>
    </head>

    <main id="form">
        <h1 id="Form">Atualizar Livro</h1>
        <form @submit.prevent="updateBook">
            <div id="teste">
                <label for="Title">Titulo:</label>
                <input v-model="dados.title" id="title" required>
            </div>
            <div>
                <label for="Summary">Sumario:</label>
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
            </div>
            <div>
                <label for="Genre">Gênero:</label>
                <select v-model="selectedGenres" multiple>
                    <option disabled value="">Selecione gêneros</option>
                    <option v-for="genre in genres" :key="genre.id" :value="genre.id">
                        {{ genre.name }}
                    </option>
                </select>
            </div>
            <button type="submit">Atualizar</button>
        </form>
        <div v-if="resposta">
            <p>Resposta da API: {{ resposta }}</p>
        </div>
    </main>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const selectedGenres = ref([]);
const selectAuthor = ref(0);

const dados = ref({
    id: 0,
    title: "",
    summary: "",
    isbn: "",
    author: 0,
    genre: []
});

const genres = ref([]);
const authors = ref([]);
const resposta = ref('');
const router = useRouter();
const route = useRoute();
const bookId = route.params.id;  

// Pegando o ID do livro da URL
console.log(ref(route.params.id))
const accessToken = localStorage.getItem('access_token');

// Função para carregar os dados do livro ao carregar a página
onMounted(() => {
    axios.get(`http://127.0.0.1:8000/api/v1/books/${bookId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,  // Adiciona o token no cabeçalho
      'Content-Type': 'application/json'   // Certifica-se que o tipo de conteúdo é JSON
    }
  })
        .then(response => {
            const book = response.data;
            dados.value.title = book.title;
            dados.value.summary = book.summary;
            dados.value.isbn = book.isbn;
            selectAuthor.value = book.author;
            selectedGenres.value = book.genre;
        })
        .catch(error => {
            console.error('Erro ao carregar o livro:', error.message);
        });

    axios.get('http://127.0.0.1:8000/api/v1/author', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,  // Adiciona o token no cabeçalho
      'Content-Type': 'application/json'   // Certifica-se que o tipo de conteúdo é JSON
    }
  })
        .then(response => {
            authors.value = response.data;
        })
        .catch(error => {
            console.error(error.message);
        });

    axios.get('http://127.0.0.1:8000/api/v1/genre', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,  // Adiciona o token no cabeçalho
      'Content-Type': 'application/json'   // Certifica-se que o tipo de conteúdo é JSON
    }
  })
        .then(response => {
            genres.value = response.data;
        })
        .catch(error => {
            console.error(error.message);
        });
});

// Função para atualizar o livro
const updateBook = () => {
    dados.value.author = selectAuthor.value;
    dados.value.genre = selectedGenres.value;

    axios.put(`http://127.0.0.1:8000/api/v1/books/${bookId}`, dados.value, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,  // Adiciona o token no cabeçalho
      'Content-Type': 'application/json'   // Certifica-se que o tipo de conteúdo é JSON
    }
  })
        .then(response => {
            console.log('Book updated successfully!', response.data);
            router.push('/books');  // Redirecionar para a página de lista de livros
        })
        .catch(error => {
            resposta.value = 'Error updating book: ' + error.message;
            console.error('Erro ao atualizar o livro:', error.message);
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
input, select {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>
