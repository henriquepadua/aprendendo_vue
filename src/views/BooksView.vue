<template>
    <span class="d-none d-sm-inline">
        <h1 style="text-align: center;">Books List</h1> &nbsp; &nbsp;
        <router-link to="/createBook" class="btn btn-primary d-none d-sm-inline-block" id="criar">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 5l0 14" />
                <path d="M5 12l14 0" />
            </svg>
            Create Book
        </router-link>
    </span>

    <div v-if="books.length === 0">
        <p style="text-align:center">Loading...</p>
    </div>

    <div v-else class="card" v-for="book in books" :key="book.id" style="width: 68rem;">
        <div class="card-header">
            <router-link class="card-title"><strong>Description_Book</strong></router-link>
        </div>
        <div class="table-responsive">
            <table class="table card-table table-vcenter">
                <tbody>
                    <tr>
                        <td class="w-100">
                            <p class="text-reset"><strong>Title: </strong> {{ book.title }}</p>
                        </td>
                        <td class="text-nowrap text-secondary">
                            <strong> Author First Name: </strong> {{ book.authorDetails?.first_name || 'Loading...' }},
                            <strong> Author Last Name: </strong> {{ book.authorDetails?.last_name || 'Loading...' }},
                            <strong> Genre: </strong> {{ book.genre }},
                            <strong> Summary: </strong> {{ book.summary }},
                            <strong> Isbn: </strong> {{ book.isbn }}
                        </td>
                        <td class="text-nowrap">
                            <router-link :to="{ name: 'updateBook', params: { id: book.id } }" class="btn btn-primary">
                                Update Book
                            </router-link>
                        </td>
                        <td class="text-nowrap">
                            <form @submit.prevent="deleteBook(book.id)">
                                <button type="submit" class="btn btn-danger">
                                    Delete Book
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

const books = ref([])

// Primeiro, busque os livros
const fetchAuthors = () => {
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
};

fetchAuthors();

const deleteBook = (bookId) => {
    console.log("Deleting author with ID:", bookId); // Verifique se o ID está correto
    // const confirmed = confirm("Are you sure you want to delete this author?");
    // if (confirmed) {
    axios.delete(`http://127.0.0.1:8000/api/v1/books/${bookId}`)
        .then(response => {
            console.log('Book deletado com sucesso!', response.data);
            // Atualiza a lista de autores após deletar
            books.value = books.value.filter(book => book.id !== bookId);
            fetchAuthors();
        })
        .catch(error => {
            console.error('Erro ao deletar o autor:', error.response?.data || error.message);
        });
    // }
};

/*
const deleteAuthor = (authorId) => {
    console.log("Deleting author with ID:", authorId); // Verifique se o ID está correto
    const confirmed = confirm("Are you sure you want to delete this author?");
    if (confirmed) {
        axios.delete(`http://127.0.0.1:8000/api/v1/author/${authorId}`)
            .then(response => {
                console.log('Autor deletado com sucesso!', response.data);
                // Atualiza a lista de autores após deletar
                fetchAuthors();
            })
            .catch(error => {
                console.error('Erro ao deletar o autor:', error.response?.data || error.message);
            });
    }
};
*/

</script>

<style>
.card {
    max-width: 10000px;
    margin-left: 300px;
    margin-top: 30px;
}

#criar {
    margin-left: 680px;
}
</style>