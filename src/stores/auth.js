// stores/auth.js

import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore('auth', {
    state: () => ({
      username: '',
      tokens: {
        access: '',
        refresh: '',
      },
      isAuthenticated: false, // Estado de autenticação
      error: null,
    }),
    actions: {
      async login(username, password) {
        try {
          const response = await fetch('http://localhost:8000/api/v1/login/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
          });
  
          if (!response.ok) {
            throw new Error('Erro ao fazer login');
          }
  
          const data = await response.json();
          this.tokens.access = data.access;
          this.tokens.refresh = data.refresh;
          this.username = username;
  
          // Armazena os tokens no localStorage
          localStorage.setItem('access_token', data.access);
          localStorage.setItem('refresh_token', data.refresh);
  
          // Atualiza o estado de autenticação
          this.isAuthenticated = true;
          console.log("Login successful, isAuthenticated:", this.isAuthenticated);
  
        } catch (error) {
          this.error = 'Credenciais inválidas ou erro de servidor';
          console.error('Erro:', error);
        }
      },
  
      async logout() {
        // Remove os tokens do localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        
        // Limpa o estado de autenticação
        this.username = '';
        this.tokens = { access: '', refresh: '' };
        this.isAuthenticated = false;
        console.log("Logout successful, isAuthenticated:", this.isAuthenticated);
      },
    },
  });
  