<template>
    <div id="tokens">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <div>
                <label for="username">Username</label>
                <input type="text" v-model="username" id="username" required>
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" v-model="password" id="password" required>
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script >
import { useRouter, useRoute } from 'vue-router';
export default {
    data() {
        return {
            username: '',
            password: '',
            tokens: {
                access: '',
                refresh: '',
            },
            error: null
        };
    },
    methods: {
        
        async login() {
            const router = useRouter(); // Usar o roteador
            console.log("rota" + router)
            try {
                const route = useRoute();
                const response = await fetch('http://localhost:8000/api/v1/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    })
                });

                if (!response.ok) {
                    throw new Error('Erro ao fazer login');
                }

                const data = await response.json();

                console.log(data);
                this.tokens.access = data.access;
                this.tokens.refresh = data.refresh;

                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);

                this.$router.push('/');
            } catch (error) {
                this.error = 'Credenciais inválidas ou erro de servidor';
                console.error('Erro:', error);
            }
        }
    }
};
</script>

<style scoped>
#token {
    margin-left: 300px;
}

form {
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

input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>