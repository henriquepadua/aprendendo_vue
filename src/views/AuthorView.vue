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
            Criar autor </router-link>
    </span>
    <div class="card" v-for="author in authors" :key="author.id" style="width: 58rem;">
        <div class="card-header">
            <p href="#" class="text-reset"><strong>Primeiro nome: </strong> {{ author.first_name }}
                <strong>Sobrenome: </strong> {{ author.last_name }}
            </p>
        </div>
        <div class="table-responsive">
            <table class="table card-table table-vcenter">
                <tbody>
                    <tr>
                        <td class="text-nowrap">
                            <p href="#" class="text-secondary">
                                <strong>Data de Nascimento: </strong> {{ author.date_of_birth }} <strong>Data da Morte:
                                </strong> {{ author.date_of_death }}
                            </p>
                        </td>
                        <td class="text-nowrap">
                            <router-link :to="`/updateAuthor/${author.id}`" class="btn btn-primary">
                                Atualizar Author
                            </router-link>
                        </td>
                        <td class="text-nowrap">
                            <form @submit.prevent="deleteAuthor(author.id)">
                                <button type="submit" class="btn btn-danger">
                                    Deletar Author
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
import router from '@/router';
import axios from 'axios';
import { ref } from 'vue';
import Swal from 'sweetalert2'

const authors = ref([])
const accessToken = localStorage.getItem('access_token');

const fetchAuthors = () => {
    axios.get('http://127.0.0.1:8000/api/v1/author', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {

            authors.value = response.data

        })
        .catch(error => {
            console.error(error.message)
        });
};
// Carregar autores quando o componente for criado
fetchAuthors();

// Função para deletar o autor
const deleteAuthor = (authorId) => {
    // Exibe um alerta de confirmação antes de deletar
    Swal.fire({
        title: 'Tem certeza?',
        text: "Você não poderá reverter isso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, deletar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Se o usuário confirmar, execute a deleção
            console.log("Deleting author with ID:", authorId); // Verifique se o ID está correto
            axios.delete(`http://127.0.0.1:8000/api/v1/author/${authorId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log('Autor deletado com sucesso!', response.data);
                // Remove o autor da lista
                authors.value = authors.value.filter(author => author.id !== authorId);

                // Atualiza a lista de autores após deletar
                fetchAuthors();
                
                // Exibe um alerta de sucesso
                Swal.fire(
                    'Deletado!',
                    'O autor foi deletado com sucesso.',
                    'success'
                );
            })
            .catch(error => {
                console.error('Erro ao deletar o autor:', error.response?.data || error.message);
                Swal.fire(
                    'Erro!',
                    'Não é possível deletar Author que está cadastrado em algum Livro',
                    'error'
                );
            });
        }
    });
};


// const deleteAuthor = (authorId) => {
    
//     console.log("Deleting author with ID:", authorId); // Verifique se o ID está correto
//     axios.delete(`http://127.0.0.1:8000/api/v1/author/${authorId}`, {
//         headers: {
//             'Authorization': `Bearer ${accessToken}`,
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(response => {
//             console.log('Autor deletado com sucesso!', response.data);
//             authors.value = authors.value.filter(author => author.id !== authorId);

//             // Atualiza a lista de autores após deletar
//             fetchAuthors();
//         })
//         .catch(error => {
//             console.error('Erro ao deletar o autor:', error.response?.data || error.message);
//         });
// };

</script>

<style scoped>
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