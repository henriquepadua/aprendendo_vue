<template>
    <div class="card" style="width: 60rem;">
        <div class="card-header">
            <h1>Atualizar Instância do Livro</h1>
        </div>

        <form @submit.prevent="updateBookInstance()">
            <div>
                <label for="Imprint">Imprimir:</label>
                <input v-model="bookInstance.imprint" id="imprint" required>
            </div>
            <div>
                <label for="Due_back">Prazo de volta:</label>
                <input type="date" v-model="bookInstance.due_back" id="due_back" required>
            </div>
            <div>
                <label for="Status">Status:</label>
                <select v-model="bookInstance.status" id="status" required>
                    <option disabled value="">Selecionar status</option>
                    <option value="a">Disponível</option>
                    <option value="o">Emprestado</option>
                    <option value="m">Manutenção</option>
                    <option value="r">Reservado</option>
                </select>
            </div>
            <div v-if="bookInstance.status === 'o' || bookInstance.status === 'r'">
                <label for="borrower">Receberá o empréstimo:</label>
                <select v-model="bookInstance.borrower" id="borrower" required>
                    <option disabled value="">Select Users for Borrower</option>
                    <!-- Aqui estamos usando v-for para iterar sobre a lista de usuários -->
                    <option v-for="user in users" :key="user.id" :value="user.id">
                        {{ user.username }}
                    </option>
                </select>
            </div>
            <!-- <div>
                <label for="Borrower">Borrower:</label>
                <input v-model="bookInstance.borrower" id="borrower">
            </div> -->

            <button type="submit">Atualizar Instância do Livro</button>
        </form>


        <div v-if="responseMessage">
            <p>Resposta: {{ responseMessage }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { onMounted } from 'vue';

const bookInstance = ref({
    book: '',
    imprint: '',
    due_back: '',
    status: '',
    borrower: ''
});

const responseMessage = ref('');
const accessToken = localStorage.getItem('access_token');
const route = useRoute();
const router = useRouter();
const bookInstanceId = route.params.id;
const users = ref([]);

onMounted(() => {
    axios.get('http://localhost:8000/api/v1/usersborrowed', {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {

        users.value = response.data

    })
    .catch(error => {
        console.error(error.message)
    });

    axios.get(`http://127.0.0.1:8000/api/v1/bookinstance/${bookInstanceId}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            bookInstance.value = response.data;
        })
        .catch(error => {
            console.error("Error fetching BookInstance: ", error.message);
        });
});

console.log("Book:" + bookInstance.book)
const updateBookInstance = (bookId) => {
    const bookdetaliId = localStorage.getItem('bookID');

    axios.put(`http://127.0.0.1:8000/api/v1/bookinstance/${bookInstanceId}`, bookInstance.value, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            console.log(response.data)
            responseMessage.value = "BookInstance updated successfully!";
            console.log(bookInstance.book)
            router.push({ name: 'BookDetail', params: { id: bookdetaliId } });  // Redireciona após atualização
        })
        .catch(error => {
            responseMessage.value = "Failed to update BookInstance: " + error.message;
        });
};
</script>

<style scoped>
#form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
}

button {
    margin-top: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

div {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input,
select {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.card {
    max-width: 10000px;
    margin-left: 300px;
    margin-top: 30px;
}

/* 
h1 {
    margin-left: 20px;
}
form {
    margin: 20px;
}
button {
    margin-top: 10px;
} */
</style>