<template>
  <ion-page>
    <ion-header :translucent="true" >
      <ion-toolbar class= "blue-toolbar">
        <ion-buttons slot="end">
          <ion-button class="logout-button" @click="logout()">Logout</ion-button>
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
        <ion-item v-for="(position, index) in positions" :key="index">
          <ion-label>
            Lat: {{ position.latitude }}, Lon: {{ position.longitude }}<br />
            <span v-if="position.address">Adresse: {{ position.address }}</span>
            <span v-else>Chargement de l'adresse...</span>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>

    <ion-footer>
      <ion-button expand="full" class="addLocation" @click="getCurrentPosition()"
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
import axios from "axios"; 

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
      const latitude = coordinates.coords.latitude;
      const longitude = coordinates.coords.longitude;

      
      const address = await this.getAddressFromCoordinates(latitude, longitude);

      
      this.positions.push({
        latitude: latitude,
        longitude: longitude,
        address: address || "Adresse introuvable", 
      });
    },

    async getAddressFromCoordinates(lat: number, lon: number) {
      try {
        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
        const response = await axios.get(url);

        if (response.data && response.data.display_name) {
          return response.data.display_name;
        } else {
          return null;
        }
      } catch (error) {
        console.error("Erreur lors du géocodage:", error);
        return null;
      }
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

<style scoped>





.addLocation::part(native) {
  border-radius: 50px; 
  background-color: #FFFFFF; 
  color: #0000ff; 
  font-weight: bold; 
}



.logout-button {
  --background: transparent; 
  --color: white; 
}

.logout-button:hover {
  --background: white; 
  --color: #0000ff;
}

</style>
