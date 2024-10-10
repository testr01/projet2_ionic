import { createRouter, createWebHistory } from '@ionic/vue-router'; // Utilisation d'Ionic Vue Router
import LocationPage from '@/views/locationPage.vue';
import ProfilePage from '@/views/profilePage.vue';
import LoginPage from '@/views/LoginPage.vue';

const routes = [
  {
    path: '/location',
    name: 'LocationPage',
    component: LocationPage,
  },
  {
    path: '/profile',
    name: 'ProfilePage',
    component: ProfilePage,
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
  },
  {
    path: '/',
    redirect: '/location', // Redirection par défaut vers LocationPage
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Utilisation de Vite pour la base URL
  routes,
});

export default router;
