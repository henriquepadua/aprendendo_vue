import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const isAuthenticated = () => {
  const token = localStorage.getItem('access_token');
  return !!token;  // Retorna verdadeiro se o token existir, falso caso contrário
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/authors',
      name: 'author',
      component: () => import('@/views/AuthorView.vue')
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('@/views/BooksView.vue')
    },
    {
      path: '/bookinstance',
      name: 'booksinstance',
      component: () => import('@/views/BookInstanceView.vue')
    },
    {
      path: '/createAuthor',
      name: 'createAuthor',
      component: () => import('@/views/CreateAuthorView.vue')
    },
    {
      path: '/updateAuthor',
      name: 'updateAuthor',
      component: () => import('@/views/UpdateAuthorView.vue')
    },
    {
      path: '/createBook',
      name: 'createBook',
      component: () => import('@/views/CreateBookView.vue')
    },
    {
      path: '/updateBook/:id',
      name: 'updateBook',
      component: () => import('@/views/UpdateBookView.vue')
    },
    {
      path: '/updateAuthor/:id',
      name: 'updateAuthor',
      component: () => import('@/views/UpdateAuthorView.vue')
    },
    {
      path: '/login',   // Adiciona uma nova rota para os tokens
      name: 'tokens',
      component: () => import('@/views/TokenView.vue'),  // Componente que exibirá os tokens
    },
    {
      path: '/BookDetail/:id',
      name: 'BookDetail',
      component: () => import('@/views/BookDetailView.vue')
    },
    {
      path: '/UpdateBookDetail/:id',
      name: 'UpdateBookDetail',
      component: () => import('@/views/UpdateBookInstanceView.vue')
    },
    {
      path: '/createInstance',
      name: 'createInstance',
      component: () => import('@/views/CreateBookInstance.vue')
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('access_token');

  // Verifica se o token existe e se a rota não é de login
  if (!token && to.name !== 'tokens') {
    return next({ name: 'tokens' });  // Redireciona para a página de login
  }

  // Permite continuar com a navegação
  next();
})

export default router