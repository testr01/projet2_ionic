<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/login"></ion-back-button>
        </ion-buttons>
        <ion-title>Sign Up</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div id="container">
        <ion-label class="label">Créer un compte</ion-label>
        <ion-input
          label="Prénom"
          label-placement="floating"
          fill="outline"
          placeholder="Prénom"
          v-model="data.firstName"
        ></ion-input>
        <ion-input
          label="Nom"
          label-placement="floating"
          fill="outline"
          placeholder="Nom"
          v-model="data.lastName"
        ></ion-input>
        <ion-input
          label="Email"
          label-placement="floating"
          fill="outline"
          placeholder="Email address"
          v-model="data.email"
          type="email"
        ></ion-input>
        <ion-input
          label="Mot de passe"
          label-placement="floating"
          fill="outline"
          placeholder="Mot de passe"
          v-model="data.password"
          type="password"
        ></ion-input>
        <ion-button style="width: 100%" expand="full" @click="handleSignup()"
          >Sign Up</ion-button
        >
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.label {
  font-size: xx-large;
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
  IonBackButton,
  IonButtons,
  IonButton,
  IonLabel,
  IonInput,
  alertController,
  loadingController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { signupAction } from "../services/api";

export default defineComponent({
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonButton,
    IonLabel,
    IonInput,
  },
  setup() {
    const router = useRouter();

    return {
      router,
    };
  },
  methods: {
    async handleSignup() {
      console.log(this.data);
      signupAction(this.data)
        .then(async () => {
          const loading = await loadingController.create({
            message: "Compte crée avec succès...",
          });
          await loading.present();
          this.router.replace("/login");
          loading.dismiss();
        })
        .catch(async (error) => {
          const alert = await alertController.create({
            header: "Erreur lors de l'enregistrement",
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
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
  },
});
</script>
