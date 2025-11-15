import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/legal',
      name: 'legal',
      component: () => import('../views/legal/LegalView.vue'),
    },
    {
      path: '/cookies',
      name: 'cookies',
      component: () => import('../views/legal/CookiesView.vue'),
    },
    {
      path: '/privacidad',
      name: 'privacidad',
      component: () => import('../views/legal/PrivacidadView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/create-edit',
      name: 'create-edit',
      component: () => import('../views/CreateEditView.vue'),
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/ListView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/recipe-detail',
      name: 'recipe-detail',
      component: () => import('../views/RecipeDetailView.vue'),
    },
  ],
})

export default router
