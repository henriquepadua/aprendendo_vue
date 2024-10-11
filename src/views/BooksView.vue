<template>
    <span class="d-none d-sm-inline">
        <h1 style="text-align: center;">Lista de Livros</h1> &nbsp; &nbsp;
        <router-link to="/createBook" class="btn btn-primary d-none d-sm-inline-block" id="criar">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="24" height="24" viewBox="0 0 24 24"
                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 5l0 14" />
                <path d="M5 12l14 0" />
            </svg>
            Criar Livro
        </router-link>
    </span>

    <div v-if="books.length === 0">
        <p style="text-align:center">Carregando...</p>
    </div>

    <div v-else class="card" v-for="book in books" :key="book.id" style="width: 68rem;">
        <div class="card-header">
            <router-link :to="{ name: 'BookDetail', params: { id: book.id } }" class="card-title"><strong>Descrição do
                    Livro</strong></router-link>
        </div>
        <div class="table-responsive">
            <table class="table card-table table-vcenter">
                <tbody>
                    <tr>
                        <td class="w-100">
                            <p class="text-reset"><strong>Titulo: </strong> {{ book.title }}</p>
                        </td>
                        <td class="text-nowrap text-secondary">
                            <strong> Primeiro nome Author: </strong> {{ book.authorDetails?.first_name ||
                            'Carregando...' }},
                            <strong> Sobrenome Author: </strong> {{ book.authorDetails?.last_name || 'Carregando...'
                            }},
                            <strong> Genero: </strong> {{ book.genre }}
                            <strong> Sumario: </strong> {{ book.summary }},
                            <strong> Isbn: </strong> {{ book.isbn }}
                        </td>
                        <td class="text-nowrap">
                            <router-link :to="{ name: 'updateBook', params: { id: book.id } }" class="btn btn-primary">
                                Atualizar Livro
                            </router-link>
                        </td>
                        <td class="text-nowrap">
                            <form @submit.prevent="deleteBook(book.id)">
                                <button type="submit" class="btn btn-danger">
                                    Deletar Livro
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
import Swal from 'sweetalert2'

const books = ref([])
const accessToken = localStorage.getItem('access_token');
const genres = ref([])// Primeiro, busque os livros

const fetchAuthors = () => {
    axios.get('http://127.0.0.1:8000/api/v1/books', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            books.value = response.data;

            // Agora, crie uma lista de promessas para buscar os autores de cada livro
            const authorPromises = books.value.map(book => {
                return axios.get(`http://127.0.0.1:8000/api/v1/author/${book.author}`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                })
                    .then(authorResponse => {
                        // Atribuir o nome do autor ao livro correto
                        if (book.genre.length > 1) {
                        // Cria um array de promessas para todas as requisições
                            const genreRequests = book.genre.map(genreId => {
                                return axios.get(`http://127.0.0.1:8000/api/v1/genre/${genreId}`, {
                                headers: {
                                    'Authorization': `Bearer ${accessToken}`,
                                    'Content-Type': 'application/json',
                                }
                                });
                            });

                        // Usa Promise.all para resolver todas as promessas de uma vez
                            Promise.all(genreRequests)
                                .then(responses => {
                                // Combina os nomes de todos os gêneros recebidos
                                book.genre = responses.map(response => response.data.name).join(', ');
                                })
                                .catch(error => {
                                console.error('Erro ao buscar os gêneros:', error.message);
                                });
                        }
                        else{
                            axios.get(`http://127.0.0.1:8000/api/v1/genre/${book.genre}`, {
                                headers: {
                                    'Authorization': `Bearer ${accessToken}`,  // Adiciona o token no cabeçalho
                                    'Content-Type': 'application/json'   // Certifica-se que o tipo de conteúdo é JSON
                                }
                            })
                            .then(response => {
                                book.genre = response.data.name;
                            })
                            .catch(error => {
                                console.error('Erro ao carregar o livro:', error.message);
                            });
                        }
                        
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
            console.log("Deleting book with ID:", bookId); // Verifique se o ID está correto

            // Chama a API apenas após a confirmação do usuário
            axios.delete(`http://127.0.0.1:8000/api/v1/books/${bookId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log('Book deletado com sucesso!', response.data);
                // Atualiza a lista de livros após deletar
                books.value = books.value.filter(book => book.id !== bookId);
                
                Swal.fire(
                    'Deletado!',
                    'O livro foi deletado com sucesso.',
                    'success'
                );
            })
            .catch(error => {
                console.error('Erro ao deletar o livro:', error.response?.data || error.message);
                Swal.fire(
                    'Erro!',
                    'Não é possível deletar um livro que possui Instância.',
                    'error'
                );
            });
        }
    });
};

// const deleteBook = (bookId) => {
//     Swal.fire({
//         title: 'Tem certeza?',
//         text: "Você não poderá reverter isso!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Sim, deletar!',
//         cancelButtonText: 'Cancelar'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             console.log("Deleting author with ID:", bookId); // Verifique se o ID está correto
//             // const confirmed = confirm("Are you sure you want to delete this author?");
//             // if (confirmed) {
//             axios.delete(`http://127.0.0.1:8000/api/v1/books/${bookId}`, {
//                 headers: {
//                     'Authorization': `Bearer ${accessToken}`,
//                     'Content-Type': 'application/json'
//                 }
//             })
//                 .then(response => {
//                     console.log('Book deletado com sucesso!', response.data);
//                     // Atualiza a lista de autores após deletar
//                     books.value = books.value.filter(book => book.id !== bookId);
//                     fetchAuthors();
                    
//                     Swal.fire(
//                     'Deletado!',
//                     'O autor foi deletado com sucesso.',
//                     'success'
//                 );
//             })
//             .catch(error => {
//                 console.error('Erro ao deletar o autor:', error.response?.data || error.message);
//                 Swal.fire(
//                     'Erro!',
//                     'Não é possível deletar Livro que está possui Instância',
//                     'error'
//                 );
//             });
//                 // })
//                 // .catch(error => {
//                 //     console.error('Erro ao deletar o autor:', error.response?.data || error.message);
//                 // });
//         }
//     })

//     console.log("Deleting author with ID:", bookId); // Verifique se o ID está correto
//     // const confirmed = confirm("Are you sure you want to delete this author?");
//     // if (confirmed) {
//     axios.delete(`http://127.0.0.1:8000/api/v1/books/${bookId}`, {
//         headers: {
//             'Authorization': `Bearer ${accessToken}`,
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(response => {
//             console.log('Book deletado com sucesso!', response.data);
//             // Atualiza a lista de autores após deletar
//             books.value = books.value.filter(book => book.id !== bookId);
//             fetchAuthors();
//         })
//         .catch(error => {
//             console.error('Erro ao deletar o autor:', error.response?.data || error.message);
//         });
//     // }
// };

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

<style scoped>
.card {
    max-width: 10000px;
    margin-left: 300px;
    margin-top: 30px;
}

#criar {
    margin-left: 680px;
}
</style>