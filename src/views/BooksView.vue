<template>

    <span class="d-none d-sm-inline">
        <h1 style="text-align: center;">Books List</h1> &nbsp; &nbsp;
        <a href="" class="btn btn-primary d-none d-sm-inline-block" id="criar">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 5l0 14" />
                <path d="M5 12l14 0" />
            </svg>
            Create Book
        </a>
    </span>

    <div class="card" v-for="book in books" :key="book.id" style="width: 68rem;">
        <div class="card-header">
            <router-link class="card-title"><strong>Description_Book</strong></router-link>
        </div>
        <div class="table-responsive">
            <table class="table card-table table-vcenter">
                <tbody>
                    <tr>
                        <td class="w-100">
                            <p href="#" class="text-reset"><strong>First_Name: </strong> {{ book.title }}</p>
                        </td>
                        <td class="text-nowrap text-secondary">
                            <strong> Author First_Name: </strong> {{ book.authorDetails['first_name'] }}, <strong> Author Last_Name: </strong> {{ book.authorDetails['last_name'] }},<strong> Genre: </strong>{{book.genre}}, <strong> Summary: </strong> {{ book.summary }},
                            <strong> Isbn: </strong>{{ book.isbn }}
                        </td>
                        <td class="text-nowrap">
                            <a href="" class="text-secondary">
                                <strong> Update_Book </strong>
                            </a>
                        </td>
                        <td class="text-nowrap">
                            <a href="" class="text-secondary">
                                <strong>Delete_Book </strong> </a>
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

const books = ref([])

// Primeiro, busque os livros
axios.get('http://127.0.0.1:8000/api/v1/books')
    .then(response => {
        books.value = response.data;

        // Agora, crie uma lista de promessas para buscar os autores de cada livro
        const authorPromises = books.value.map(book => {
            return axios.get(`http://127.0.0.1:8000/api/v1/author/${book.author}`)
                .then(authorResponse => {
                    // Atribuir o nome do autor ao livro correto
                    book.authorDetails = {
                        first_name: authorResponse.data.first_name,
                        last_name: authorResponse.data.last_name
                    };
                });
        });

        // Aguarde todas as requisições de autores serem concluídas
        return Promise.all(authorPromises);
    })
    .then(() => {
        // Após todas as promessas resolvidas, os dados estão completos
        console.log(books.value);
    })
    .catch(error => {
        console.error(error.message);
    });
</script>

<style>
.card {
    max-width: 10000px;
    margin-left: 300px;
    margin-top: 30px;
}

#criar{
    margin-left: 680px;
}
</style>