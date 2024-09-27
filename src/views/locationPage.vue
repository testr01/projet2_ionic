<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="end">
          <ion-button @click="logout()">Logout</ion-button>
          <ion-button
            :disabled="positions.length <= 0"
            @click="removeAllPositions()"
            >Remove all</ion-button
          >
        </ion-buttons>
        <ion-title>GéoLocalisation</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content id="content" :fullscreen="true">
      <ion-list>
        <ion-item v-for="position in positions">
          <ion-label
            >Lat: {{ position.latitude }}, Lon:
            {{ position.longitude }}</ion-label
          >
        </ion-item>
      </ion-list>
    </ion-content>

    <ion-footer>
      <ion-button expand="full" @click="getCurrentPosition()"
        >Add Location</ion-button
      >
    </ion-footer>
  </ion-page>
</template>

<script lang="ts">
import router from "@/router";
import { getCurrentUser, logoutUser } from "@/services/user";
import { Geolocation } from "@capacitor/geolocation";
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
  IonList,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";

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
    IonList,
  },
  ionViewDidEnter() {
    if (getCurrentUser() == null) {
      router.replace("/login");
    }
  },
  setup() {
    const positions = ref([] as any[]);

    return { positions };
  },
  methods: {
    async getCurrentPosition() {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      this.positions.push({
        latitude: this.latitude,
        longitude: this.longitude,
      });
    },
    removeAllPositions() {
      this.positions.splice(0);
    },
    logout() {
      logoutUser();
      router.replace("/login");
    },
  },
  data() {
    return {
      latitude: 0,
      longitude: 0,
    };
  },
});
</script>
