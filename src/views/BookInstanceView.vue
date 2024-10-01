<template>
    <span class="d-none d-sm-inline" id="books">
        <h1 style="text-align: center;">Authors List</h1> &nbsp; &nbsp;
        <router-link to="/createAuthor" class="btn btn-primary d-none d-sm-inline-block" id="criar">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 5l0 14" />
                <path d="M5 12l14 0" />
            </svg>
            Create Author
        </router-link>
    </span>

    <div class="card" v-for="bookinstance in booksinstances" :key="bookinstance.id" style="width: 58rem;">
        <div class="card-header">
            <router-link class="card-title"><strong>Description_bookinstance</strong></router-link>
        </div>
        <div class="table-responsive">
            <table class="table card-table table-vcenter">
                <tbody>
                    <tr>
                        <td class="w-100">
                            <p href="#" class="text-reset"><strong>Title: </strong> {{ bookinstance.book.title }}
                            </p>
                        </td>
                        <td class="text-nowrap">
                            <p href="#" class="text-secondary">
                                <strong> Author: </strong> {{bookinstance.imprint}}, <strong> Genre: </strong>{{bookinstance.due_back}}, <strong> Summary: </strong>{{bookinstance.status}} , <strong> Isbn: </strong>{{bookinstance.borrower}}
                            </p>
                        </td>
                        <td class="text-nowrap">
                            <router-link :to="`/updateAuthor/${bookinstance.book.id}`" class="btn btn-primary">
                                Update Author
                            </router-link>
                        </td>
                        <td class="text-nowrap">
                            <form>
                                <button type="submit" class="btn btn-danger">
                                    Delete Author
                                </button>
                            </form>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const booksinstances = ref([])
const accessToken = localStorage.getItem('access_token');
console.log(accessToken)
const router = useRouter();
const route = useRoute();

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
        console.error(error.message)
    })

const dados = ref({
    id: 0,
    title: "",
    summary: "",
    isbn: "",
    author: 0,
    genre: []
});

console.log(booksinstances.book.id)
axios.get(`http://127.0.0.1:8000/api/v1/books/${booksinstances.book.id}`)
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


</script>

<style>
h1 {
    margin-left: 500px;
}

#author {
    margin-left: 500px;
}

#criar {
    margin-left: 680px;
    margin-top: 10px;
}

#books {
    margin-left: 680px;
}

.card {
    max-width: 10000px;
    margin-left: 300px;
    margin-top: 30px;
}
</style>