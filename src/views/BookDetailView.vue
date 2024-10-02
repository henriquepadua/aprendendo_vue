<!-- <h1>Title: {{ book.title }}</h1>

  <p><strong>Author:</strong> <a href="{% url 'author_detail' pk=book.author.id %}">{{ book.author }}</a></p> 
  <p><strong>Summary:</strong> {{ book.summary }}</p>
  <p><strong>ISBN:</strong> {{ book.isbn }}</p>
  <p><strong>Language:</strong> {{ book.language }}</p>
  <p><strong>Genre:</strong> {% for genre in book.genre.all %} {{ genre }}{% if not forloop.last %}, {% endif %}{% endfor %}</p>

  <div style="margin-left:20px;margin-top:20px">
    <h4>Copies</h4>
    <a href="{% url 'bookinstance_create' %}" class="btn btn-primary d-none d-sm-inline-block" >CREATE_BOOK_INSTANCE<a/>

    {% for copy in book.bookinstance_set.all %}
      <hr>
      <p class="{% if copy.status == 'a' %}text-success{% elif copy.status == 'm' %}text-danger{% else %}text-warning{% endif %}">{{ copy.get_status_display }}</p>
      {% if copy.status != 'a' %}
        <p><strong>Due to be returned:</strong> {{copy.due_back}}</p>
      {% endif %}
      <p><strong>Imprint:</strong> {{copy.imprint}}</p>
      <p class="text-muted"><strong>Id:</strong> {{copy.id}}</p>
      <table class="table card-table table-vcenter">
        <tr>
            <td class="text-nowrap">
              <a href="{% url 'bookinstance_update' pk=copy.id %}" class="text-secondary">
                <strong> Update_BookInstance</strong>
              </a>
            </td>
            <td class="text-nowrap">
              <a href="{% url 'bookinstance_delete' pk=copy.id %}" class="text-secondary">
                <strong>Delete_BookInstance</strong> </a>
            </td>
          </tr>
      </table>
    {% endfor %}
  </div>
  <a href="{% url 'books' %}">Back to Books List</a> -->


<template>

  <head>
    <title>Book Detail</title>
  </head>

  <main id="form">
    <h1 id="Form">Book Detail</h1>
    <div id="teste">
      <p >{{dados.title}}</p>
    </div>
    <div>
      <label for="Summary">Summary:</label>
      <p >{{dados.title}}</p>
    </div>
    <div>
      <label for="Isbn">Isbn:</label>
      <p >{{dados.title}}</p>
    </div>
    <div>
      <label for="Author">Autor:</label>
      <p >{{dados.title}}</p>
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
    <div v-if="resposta">
      <p>Resposta da API: {{ resposta }}</p>
    </div>
  </main>
</template>


<style scoped>
#form{
  margin-left: 600px;
}
</style>

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

onMounted(() => {
  axios.get(`http://127.0.0.1:8000/api/v1/books/${bookId}`)
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

  axios.get('http://127.0.0.1:8000/api/v1/author')
    .then(response => {
      authors.value = response.data;
    })
    .catch(error => {
      console.error(error.message);
    });

  axios.get('http://127.0.0.1:8000/api/v1/genre')
    .then(response => {
      genres.value = response.data;
    })
    .catch(error => {
      console.error(error.message);
    });
});

</script>