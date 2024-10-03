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
    <div class="card" style="width: 58rem;" > <!--</div>v-for="author in authors" :key="author.id" >-->
        <div class="card-header">
            <!-- <router-link class="card-title"><strong>Description_Author</strong></router-link> -->
        </div>
        <div class="table-responsive">
            <table class="table card-table table-vcenter">
                <tbody>
                    <tr>
                        <td class="w-100">
                            <p href="#" class="text-reset"><strong>First_Name: </strong> 
                                <strong>First_Name: </strong>                             </p>
                        </td>
                        <td class="text-nowrap">
                            <p href="#" class="text-secondary">
                                <strong>Date_of_Birth: </strong>  <strong>Date_Of_Death:
                                </strong>  
                            </p>
                        </td>
                        <td class="text-nowrap">
                            <router-link :to="`/updateAuthor/`" class="btn btn-primary">
                                Update Author
                            </router-link>
                        </td>
                        <td class="text-nowrap">
                            <!-- <form @submit.prevent="deleteAuthor(author.id)"> -->
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