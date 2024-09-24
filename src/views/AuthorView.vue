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
    <div class="card" v-for="author in authors" :key="author.id" style="width: 58rem;">
        <div class="card-header">
            <router-link class="card-title"><strong>Description_Book</strong></router-link>
        </div>
        <div class="table-responsive">
            <table class="table card-table table-vcenter">
                <tbody>
                    <tr>
                        <td class="w-100">
                            <p href="#" class="text-reset"><strong>First_Name: </strong> {{ author.first_name }}
                                <strong>First_Name: </strong> {{ author.last_name }}</p>
                        </td>
                        <td class="text-nowrap">
                            <p href="#" class="text-secondary">
                                <strong>Date_of_Birth: </strong> {{ author.date_of_birth }} <strong>Date_Of_Death:
                                </strong> {{ author.date_of_death }}
                            </p>
                        </td>
                        <td class="text-nowrap">
                            <p href="#" class="text-secondary">
                                <strong>Update_Author </strong>
                            </p>
                        </td>
                        <td class="text-nowrap">
                            <p href="#" class="text-secondary">
                                <strong>Delete_Author </strong>
                            </p>
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

const authors = ref([])

axios.get('http://127.0.0.1:8000/api/v1/author')
    .then(response => {

        authors.value = response.data

    })
    .catch(error => {
        console.error(error.message)
    })

</script>

<style>
#author {
    margin-left: 500px;
}

#criar{
    margin-left: 680px;
    margin-top: 10px;
}

#books{
    margin-left: 680px;
}

.card {
    max-width: 10000px;
    margin-left: 300px;
    margin-top: 30px;
}
</style>