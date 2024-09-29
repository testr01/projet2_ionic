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
        <ion-item v-for="position in positions">
          <ion-label>
            <h3>
              Lat: {{ position.latitude }}, Lon:
              {{ position.longitude }}
            </h3>
            <p>
              {{ position.address }}
            </p>
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
import { reverseGeocode } from "@/services/api";
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
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      reverseGeocode(this.latitude, this.longitude).then((result) => {
        this.positions.push({
          latitude: this.latitude,
          longitude: this.longitude,
          address: result,
        });
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
