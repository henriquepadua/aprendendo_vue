<template>

  <head>
    <title>Detalhe do livro</title>
  </head>

  <main id="form">
    <h1 id="Form">Detalhe do livro</h1>
    <div id="teste">
      <label for="Title">Titulo:</label>
      <p>{{ dados.title }}</p>
    </div>
    <div id="teste">
      <label for="Summary">Sumario:</label>
      <p>{{ dados.summary }}</p>
    </div>
    <div id="teste">
      <label for="Isbn">Isbn:</label>
      <p>{{ dados.isbn }}</p>
    </div>
    <div id="teste">
      <label for="Author">Autor:</label>
      <p>{{ authors.first_name }}, {{ authors.last_name }}</p>
    </div>
    <div id="teste">
      <label for="Genre">Gênero:</label>
      {{ genres }}
    </div>
    <div id="copies" style="margin-left:20px;margin-top:20px">
      <router-link to="/createInstance" class="btn btn-primary" id="createInstance">
        <strong> Criar Intancias</strong>
      </router-link>
      <h4 style="padding:10px;">Copias</h4>
      <div v-for="bookinstance in booksinstances" :key="bookinstance.id">
        <strong> imprimir: </strong> {{ bookinstance.imprint }}, <strong> devido de volta:
        </strong>{{ bookinstance.due_back }}, <div v-if="bookinstance.status.length > 0"><strong> status: </strong>{{
          bookinstance.status }} ,</div>
        <div v-if="user.length > 0 && user"> <strong> mutuario: </strong>{{ user }}</div>
        <h1 style="padding: 20px;"></h1>
        <table class="table card-table table-vcenter">
          <tr>
            <td class="text-nowrap">
              <router-link :to="{ name: 'UpdateBookDetail', params: { id: bookinstance.id } }" class="btn btn-primary">
                <strong>Atualizar BookInstance</strong>
              </router-link>
            </td>
            <td class="text-nowrap">
              <form @submit.prevent="deleteBookInstance(bookinstance.id)">
                <button type="submit" class="btn btn-danger">
                  Excluir livro
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
  genre: "",
  bookinstance_set: []
});

const genres = ref([]);
const authors = ref([]);
const resposta = ref('');
const route = useRoute();
const bookId = route.params.id;
const booksinstances = ref([]);
const accessToken = localStorage.getItem('access_token');
const user = ref([]);
onMounted(() => {
  const accessToken = localStorage.getItem('access_token');
  const selectAuthor = ref(0);

  axios.get(`http://127.0.0.1:8000/api/v1/books/${bookId}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      const book = response.data;
      dados.value.id = book.id;
      localStorage.setItem('bookID', book.id);
      booksinstances.value = book.bookinstance_set;
      booksinstances.value.forEach(instance => {
        if (instance.borrower) {
          // Faz uma cópia do borrower para evitar possíveis problemas com referência
          const borrowerId = instance.borrower;
          console.log("id",borrowerId)
          axios.get(`http://127.0.0.1:8000/api/v1/user/${borrowerId}`, {
            headers: {
              'Authorization': `Bearer ${accessToken}`,  // Adiciona o token no cabeçalho
              'Content-Type': 'application/json'   // Certifica-se que o tipo de conteúdo é JSON
            }
          })
            .then(response => {
              // Atualiza o campo 'user' apenas para a instância específica
              user.value = response.data.username
              console.log(`Borrower ID: ${borrowerId}, User: ${instance.user}`);
            })
            .catch(error => {
              console.error(`Erro ao buscar usuário para borrower ${borrowerId}:`, error.message);
            });
        } else {
          console.log(`A instância ${instance.id} não possui um borrower definido.`);
        }
      });

      // booksinstances.value.forEach(instance => {
      //   if (instance.borrower) {
      //     axios.get(`http://127.0.0.1:8000/api/v1/user/${instance.borrower}`, {
      //       headers: {
      //         'Authorization': `Bearer ${accessToken}`,  // Adiciona o token no cabeçalho
      //         'Content-Type': 'application/json'   // Certifica-se que o tipo de conteúdo é JSON
      //       }
      //     })
      //       .then(response => {
      //         user.value = response.data.username;  // Salva o nome de usuário na instância específica
      //         console.log(instance.user);
      //       })
      //       .catch(error => {
      //         console.error(`Erro ao buscar usuário para borrower ${instance.borrower}:`, error.message);
      //       });
      //   } else {
      //     console.log(`A instância ${instance.id} não possui um borrower definido.`);
      //   }
      // });
      // if(booksinstances.value.length > 0 ){
      //   if(booksinstances.value[0].borrower != null){
      //   axios.get(`http://127.0.0.1:8000/api/v1/user/${booksinstances.value[0].borrower}`, {
      //     headers: {
      //       'Authorization': `Bearer ${accessToken}`,  // Adiciona o token no cabeçalho
      //       'Content-Type': 'application/json'   // Certifica-se que o tipo de conteúdo é JSON
      //     }
      //   })
      //     .then(response => {
      //       user.value = response.data.username;
      //       console.log(user.value)
      //     })
      //     .catch(error => {
      //       console.error(error.message);
      //     });
      //   }
      // }    
      dados.value.title = book.title;
      dados.value.summary = book.summary;
      dados.value.isbn = book.isbn;
      selectAuthor.value = book.author;
      dados.value.genre = book.genre;
      console.log(book.genre)
      axios.get(`http://127.0.0.1:8000/api/v1/author/${selectAuthor.value}`, {
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
            genres.value = responses.map(response => response.data.name).join(', ');
          })
          .catch(error => {
            console.error('Erro ao buscar os gêneros:', error.message);
          });
      } else {
        // Caso haja apenas um gênero, faz apenas uma requisição
        axios.get(`http://127.0.0.1:8000/api/v1/genre/${book.genre}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        })
          .then(response => {
            genres.value = response.data.name;
          })
          .catch(error => {
            console.error('Erro ao buscar o gênero:', error.message);
          });
      }
    })
    .catch(error => {
      console.error('Erro ao carregar o livro:', error.message);
    });
});

const deleteBookInstance = (bookinstanceID) => {
  const accessToken = localStorage.getItem('access_token');
  console.log("Deleting bookinstance with ID:", bookinstanceID); // Verifique se o ID está correto
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

#createinstance {
  margin-left: 140px;
}
</style>