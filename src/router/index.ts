import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import LoginPage from "@/views/LoginPage.vue";
import LocationPage from "@/views/locationPage.vue";
import SignupPage from "@/views/signupPage.vue";
import ProfilePage from "@/views/profilePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignupPage,
  },
  {
    path: "/localisation",
    name: "GéoLocalisation",
    component: LocationPage,
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfilePage,
  },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;


