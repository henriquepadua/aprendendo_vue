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

        <div v-if="tokens.access" id="token">
            <h2>Tokens JWT</h2>
            <p><strong>Access Token:</strong> {{ tokens.access }}</p>
            <p><strong>Refresh Token:</strong> {{ tokens.refresh }}</p>
        </div>
    </div>
</template>

<script>
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
        getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    // Verifica se este cookie começa com o nome que queremos
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        },
        async login() {
            try {
                const csrfToken = this.getCookie('csrftoken');  // Função para obter o cookie CSRF
                console.log(csrfToken);
                // Faz uma requisição POST para sua API de autenticação
                const response = await fetch('http://127.0.0.1:8000/api-auth/login/?next=/api/v1/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken,
                    },
                    body: JSON.stringify({
                        username: 'usuario',
                        password: '123',
                    })
                });
                console.log(response);

                // Verifica se a resposta é bem-sucedida
                if (!response.ok) {
                    throw new Error('Erro ao fazer login');
                }

                const data = await response.json();

                await fetch('http://127.0.0.1:8000/api-auth/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${data.access}`
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    })
                });

                // Armazena os tokens recebidos
                tokens.access = data.access;
                this.tokens.refresh = data.refresh;
                // Armazene os tokens no localStorage (ou sessionStorage)
                localStorage.setItem('access_token', data.access);
                localStorage.setItem('refresh_token', data.refresh);
            } catch (error) {
                this.error = 'Credenciais inválidas ou erro de servidor';
                console.error('Erro:', error);
            }
        },
    }
};
</script>

<style>
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