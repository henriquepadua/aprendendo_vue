<script setup>

</script>

<template>
  <main id="main">
    <p style="text-align: center;" class="Title">A biblioteca tem as seguintes contagens de registros:</p>
    <div class="table-responsive">
      <div class="col-6" id="Home">
        <div class="row row-cards">
          <div class="col-sm-6 col-lg-3">
            <div class="card card-sm">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-auto">
                    <span class="bg-primary text-white avatar">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-book">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                        <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                        <path d="M3 6l0 13" />
                        <path d="M12 6l0 13" />
                        <path d="M21 6l0 13" />
                      </svg>
                    </span>
                  </div>
                  <div class="col">
                    <div class="font-weight-medium">
                      Livros:
                    </div>
                    <div class="text-secondary">
                      {{ book.length }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-6 col-lg-3">
            <div class="card card-sm">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-auto">
                    <span class="bg-primary text-white avatar">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-book">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                        <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                        <path d="M3 6l0 13" />
                        <path d="M12 6l0 13" />
                        <path d="M21 6l0 13" />
                      </svg>
                    </span>
                  </div>
                  <div class="col">
                    <div class="font-weight-medium">
                      Autores:
                    </div>
                    <div class="text-secondary">
                      {{ author.length }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="col-sm-6 col-lg-3">
            <div class="card card-sm">
              <div class="card-body">
                <div class="row align-items-center">
                  <div class="col-auto">
                    <span class="bg-primary text-white avatar">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-book">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                        <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                        <path d="M3 6l0 13" />
                        <path d="M12 6l0 13" />
                        <path d="M21 6l0 13" />
                      </svg>
                    </span>
                  </div>
                  <div class="col">
                    <div class="font-weight-medium">
                      Cópias emprestadas:
                    </div>
                    <div class="text-secondary" >
                      {{ bookinstance.filter(instance => instance.status === 'o').length}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
#Home {
  margin-left: 500px;
}

#main {
  padding: 50px;
}
</style>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const book = ref([])
const author = ref([])
const bookinstance = ref([])
const accessToken = localStorage.getItem('access_token');

axios.get('http://127.0.0.1:8000/api/v1/books', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,  // Adiciona o token no cabeçalho
            'Content-Type': 'application/json'   // Certifica-se que o tipo de conteúdo é JSON
        }
    })
    .then(response => {
        book.value = response.data;
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
        author.value = response.data;
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
      console.log(response.data)
      bookinstance.value = response.data;
      bookinstance.value = bookinstances.value.filter(instance => instance.status === 'o').length;
    })
    .catch(error => {
        console.error(error.message);
    });
</script>