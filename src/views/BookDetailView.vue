<template>

  <head>
    <title>Book Detail</title>
  </head>

  <main id="form">
    <h1 id="Form">Book Detail</h1>
    <div id="teste">
      <label for="Title">Title:</label>
      <p>{{ dados.title }}</p>
    </div>
    <div id="teste">
      <label for="Summary">Summary:</label>
      <p>{{ dados.summary }}</p>
    </div>
    <div id="teste">
      <label for="Isbn">Isbn:</label>
      <p>{{ dados.isbn }}</p>
    </div id="teste">
    <div id="teste">
      <label for="Author">Autor:</label>
      <p>{{ authors.first_name }}, {{ authors.last_name }}</p>
    </div>
    <div id="teste" v-for="genre in genres" :key="genre.id" :value="genre.id">
      <label for="Genre">Gênero:</label>
      {{ genre.name }}
    </div>
    <div id="teste" v-if="resposta">
      <p>Resposta da API: {{ resposta }}</p>
    </div>

    <div id="copies" style="margin-left:20px;margin-top:20px">
      <router-link to="/createInstance" class="btn btn-primary" id="createInstance">
                <strong> Create_BookInstance</strong>
              </router-link>
      <h4 style="padding:10px;">Copies</h4>
      <div v-for="bookinstance in booksinstances" :key="bookinstance.id">
        <strong> imprint: </strong> {{ bookinstance.imprint }}, <strong> due_back:
        </strong>{{ bookinstance.due_back }}, <strong> status: </strong>{{ bookinstance.status }} ,
        <strong> borrower: </strong>{{ bookinstance.borrower }}
        <h1 style="padding: 20px;"></h1>
        <table class="table card-table table-vcenter">
          <tr>
            <td class="text-nowrap">
              <router-link :to="{ name: 'UpdateBookDetail', params: { id: bookinstance.id } }" class="btn btn-primary">
                <strong> Update_BookInstance</strong>
              </router-link>
            </td>
            <td class="text-nowrap">
              <form @submit.prevent="deleteBookInstance(bookinstance.id)">
                <button type="submit" class="btn btn-danger">
                  Delete Book
                </button>
              </form>
            </td>
          </tr>
        </table>
        <h1 style="  padding: 20px;"></h1>
      </div>
    </div>
  </main>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';


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
const route = useRoute();
const bookId = route.params.id;
const booksinstances = ref([]);

// Pegando o ID do livro da URL
//console.log(ref(route.params.id))

onMounted(() => {
  const accessToken = localStorage.getItem('access_token');
  const selectAuthor = ref(0);

  axios.get(`http://127.0.0.1:8000/api/v1/books/${bookId}`)
    .then(response => {
      const book = response.data;
      dados.value.title = book.title;
      dados.value.summary = book.summary;
      dados.value.isbn = book.isbn;
      selectAuthor.value = book.author;
      axios.get(`http://127.0.0.1:8000/api/v1/author/${selectAuthor.value}`)
        .then(response => {
          authors.value = response.data;
        })
        .catch(error => {
          console.error(error.message);
        });
    })
    .catch(error => {
      console.error('Erro ao carregar o livro:', error.message);
    });

  axios.get('http://127.0.0.1:8000/api/v1/genre')
    .then(response => {
      genres.value = response.data;
    })
    .catch(error => {
      console.error(error.message);
    });

  axios.get('http://127.0.0.1:8000/api/v1/bookinstance', {
    headers: {
      'Authorization': `Bearer ${accessToken}`,  // Adiciona o token no cabeçalho
      'Content-Type': 'application/json'   // Certifica-se que o tipo de conteúdo é JSON
    }
  })
    .then(response => {
      booksinstances.value = response.data

    })
    .catch(error => {
      console.error('Erro ao carregar o livro:', error.message);
    });
});

const deleteBookInstance = (bookinstanceID) => {
  const accessToken = localStorage.getItem('access_token');
  console.log("Deleting author with ID:", bookinstanceID); // Verifique se o ID está correto
  axios.delete(`http://127.0.0.1:8000/api/v1/bookinstance/${bookinstanceID}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,  // Adiciona o token no cabeçalho
      'Content-Type': 'application/json'   // Certifica-se que o tipo de conteúdo é JSON
    }
  })
    .then(response => {
      console.log('Autor deletado com sucesso!', response.data);
      booksinstances.value = booksinstances.value.filter(bookinstance => bookinstance.id !== bookinstanceID);

      // Atualiza a lista de autores após deletar
      fetchAuthors();
    })
    .catch(error => {
      console.error('Erro ao deletar o autor:', error.response?.data || error.message);
    });
};
</script>

<style scoped>
#copies {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

#form {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Estilos para o título */
#Form {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

/* Estilos para os labels e parágrafos */
label {
  font-weight: bold;
  color: #555;
  display: block;
  margin-bottom: 5px;
}

p {
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
  padding-left: 10px;
}

/* Estilos para a resposta da API */
div#teste p,
div.v-if p {
  font-size: 18px;
  color: #007BFF;
  /* Cor azul */
}

#teste {
  background-color: #e9ecef;
  padding: 10px;
  border-radius: 5px;
}

/* Estilos para gêneros */
div[v-for="genre in genres"] {
  background-color: #f0f0f0;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 4px;
}

/* Adiciona um efeito hover para as labels */
label:hover {
  color: #007BFF;
}

/* Estilos de responsividade */
@media (max-width: 600px) {
  #form {
    padding: 10px;
  }

  h1 {
    font-size: 24px;
  }

  p {
    font-size: 14px;
  }
}
#createinstance{
  margin-left:140px;
}
</style>