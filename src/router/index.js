import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/teste',
      name: 'teste',
      component: () => import('@/views/TesteView.vue')
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
      path: '/updateAuthor/:id',
      name: 'updateAuthor',
      component: () => import('@/views/UpdateAuthorView.vue')
    },
    {
      path: '/tokens',   // Adiciona uma nova rota para os tokens
      name: 'tokens',
      component: () => import('@/views/TokenView.vue')  // Componente que exibirá os tokens
    }
  ]
})

export default router