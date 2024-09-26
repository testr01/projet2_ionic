<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title size="large">Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div id="container">
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
          <ion-button expand="full" @click="login()">
            Se connecter<ion-icon name="log-in-outline"></ion-icon
          ></ion-button>
          <ion-button expand="full" color="light" router-link="/signup"
            >Créer un compte</ion-button
          >
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
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
</style>

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
import { alertController, loadingController } from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { loginAction } from "../services/api";
import { setCurrentUser } from "@/services/user";

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
    return { router };
  },
  methods: {
    async login() {
      var loginSuccess = false;
      loginAction(this.data)
        .then(async (response) => {
          const loading = await loadingController.create({
            message: "Connexion reussie...",
          });
          await loading.present();
          this.router.replace("/localisation");
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
