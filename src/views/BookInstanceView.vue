<template>
    <span class="d-none d-sm-inline" id="books">
        <h1 style="text-align: center;">Borrower List</h1> &nbsp; &nbsp;
        <router-link to="" class="btn btn-primary d-none d-sm-inline-block" id="criar">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 5l0 14" />
                <path d="M5 12l14 0" />
            </svg>
            Borrower
        </router-link>
    </span>

    <div class="card" v-for="bookinstance in booksinstances" :key="bookinstance.id" style="width: 60rem;">
        <div class="card-header">
            <router-link class="card-title"><strong>Description_bookinstance</strong></router-link>
        </div>
        <div class="table-responsive">
            <table class="table card-table table-vcenter">
                <tbody>
                    <tr>
                        <td class="w-100">
                            <p href="#" class="text-reset"><strong>Name: </strong>
                                {{ bookinstance.book }}
                            </p>
                        </td>
                        <td class="text-nowrap">
                            <p href="#" class="text-secondary">
                                <strong> imprint: </strong> {{ bookinstance.imprint }}, <strong> due_back:
                                </strong>{{ bookinstance.due_back }}, <strong> status: </strong>{{ bookinstance.status }} ,
                                <strong> borrower: </strong>{{ bookinstance.borrower }}
                            </p>
                        </td>
                        <td class="text-nowrap">
                            <form @submit.prevent="updateAuthor(bookinstance.book)">
                                <button type="submit" class="btn btn-primary">
                                    Update Borrowed_Book
                                </button>
                            </form>
                            <!-- <router-link :to="`/updateAuthor/${bookinstance.book.id}`" class="btn btn-primary">
                                Update Author
                            </router-link> -->
                        </td>
                        <td class="text-nowrap">
                            <form @submit.prevent="updateAuthor(bookinstance.book)">
                                <button type="submit" class="btn btn-danger">
                                    Delete Borrowed_Book
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
        console.log(booksinstances.value)
        console.log(booksinstances.book)
    })
    .catch(error => {
        console.error(error.message)
    })

const dados = ref([]);

console.log(booksinstances.value)

const updateAuthor = (bookId) => {
    console.log(bookId)
    axios.get(`http://127.0.0.1:8000/api/v1/books/${bookId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,  // Adiciona o token no cabeçalho
            'Content-Type': 'application/json'   // Certifica-se que o tipo de conteúdo é JSON
        }
    })
        .then(response => {
            console.log(response.data)
            dados.value = response.data;
            console.log(dados)

        })
        .catch(error => {
            console.error('Erro ao carregar o livro:', error.message);
        });
}

</script>

<style>
#BookDetail{
    margin-left: 500px;
}

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