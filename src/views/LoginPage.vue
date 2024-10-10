<template>
  <ion-page>
    <ion-header :translucent="true" >
      <ion-toolbar class="blue-toolbar" >
        <ion-title size="large">Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content id="content">
      <img src="@/assets/logo.webp" alt="Logo" class="logo">
     
      <div id="container">
        <div id="typed-output">
          <span ref="typedElement"></span>
        </div>

        <ion-label class="label">Se connecter</ion-label>
        <ion-input
          label="Email"
          label-placement="floating"
          placeholder="Email address"
          v-model="data.email"
          fill="outline"
        ></ion-input>
        <ion-input
          label="Mot de passe"
          label-placement="floating"
          fill="outline"
          placeholder="Mot de passe"
          type="password"
          v-model="data.password"
        ></ion-input>

        <div id="buttons">
          <ion-button expand="full" @click="login()" class="login-button">
            <div class="login-text">Se connecter</div>
            <ion-icon name="log-in-outline"></ion-icon>
          </ion-button>
          <ion-button expand="full" class="signup-button" router-link="/signup">
            <div class="signup-text">Créer un compte</div>
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonBackButton,
  IonButtons,
  IonButton,
  IonLabel,
  IonItem,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonIcon,
} from "@ionic/vue";
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { loginAction } from "../services/api";
import { setCurrentUser } from "@/services/user";
import Typed from "typed.js";
import { alertController, loadingController } from "@ionic/vue";

export default defineComponent({
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonFooter,
    IonBackButton,
    IonButtons,
    IonButton,
    IonLabel,
    IonItem,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonIcon,
  },
  setup() {
    const router = useRouter();
    const typedElement = ref(null);

    onMounted(() => {
      const options = {
        strings: ["Bienvenue sur la plateforme"],
        typeSpeed: 90,
        backSpeed: 70,
        loop: true,
      };

      new Typed(typedElement.value, options);
    });

    return { router, typedElement };
  },
  methods: {
    async login() {
      loginAction(this.data)
        .then(async (response) => {
          const loading = await loadingController.create({
            message: "Connexion réussie...",
          });
          await loading.present();
          this.router.replace("/location");
          setCurrentUser(response.data);
          loading.dismiss();
        })
        .catch(async (error: any) => {
          const alert = await alertController.create({
            header: "Connexion échouée",
            message: error.response.data.error,
            buttons: ["OK"],
          });
          await alert.present();
        });
    },
  },
  data() {
    return {
      data: {
        email: "",
        password: "",
      },
    };
  },
});
</script>

<style scoped>
.logo {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 70px; 
  height: auto; 
}

.label {
  font-size: xx-large;
}

#buttons {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
}


#container {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 5%;
  margin-right: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
}

#typed-output {
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  margin-bottom: 50px;
}

.login-button::part(native) {
  border-radius: 50px; 
  background-color: white; 
  color: #0000ff; 
  font-weight: bold; 
}

.signup-button::part(native) {
  border-radius: 50px; 
  background-color: black !important; 
  color: white; 
  font-weight: bold; 
}

.signup-button:hover {
  --background: #1f1f78; 
}
</style>
