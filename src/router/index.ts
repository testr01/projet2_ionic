import { createRouter, createWebHistory } from '@ionic/vue-router'; 
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
    redirect: '/location', 
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), 
  routes,
});

export default router;
