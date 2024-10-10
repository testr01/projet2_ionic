<template>
  <ion-page>
    <!-- Menu Coulissant -->
    <ion-menu content-id="content" side="start">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-list>
          <ion-item button @click="goToPage('/location')">
            <ion-label>Location</ion-label>
          </ion-item>
          <ion-item button @click="goToPage('/profile')">
            <ion-label>Profile</ion-label>
          </ion-item>
          <ion-item button @click="logout">
            <ion-label>Logout</ion-label>
          </ion-item>
        </ion-list>

        <div class="app-version">
          <p>Version 1.0.0</p>
        </div>
      </ion-content>
    </ion-menu>

    <!-- En-tête principal avec le bouton pour ouvrir le menu -->
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button> 
        </ion-buttons>
        <ion-title>Localisation</ion-title>
      </ion-toolbar>
    </ion-header>

    <!-- Contenu principal -->
    <ion-content id="content">
      <!-- Section fixe pour les boutons de contrôle -->
      <div class="control-buttons">
        <ion-button expand="full" @click="startTracking" :disabled="isTracking">Démarrer le suivi</ion-button>
        <ion-button expand="full" @click="stopTrackingAndPrompt" :disabled="!isTracking">Terminer le suivi</ion-button>
        <ion-button expand="full" @click="savePositions" :disabled="positions.length === 0">Sauvegarder</ion-button>
      </div>

      <!-- Carte pour afficher la localisation actuelle -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>Ma Localisation Actuelle</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-list>
            <ion-item>
              <ion-label>Latitude</ion-label>
              <ion-text>{{ currentPosition.latitude }}</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Longitude</ion-label>
              <ion-text>{{ currentPosition.longitude }}</ion-text>
            </ion-item>
            <ion-item>
              <ion-label>Adresse</ion-label>
              <ion-text>{{ currentPosition.address }}</ion-text>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <!-- Section pour afficher la liste des positions capturées avec défilement -->
      <ion-card v-if="positions.length > 0" class="scrollable-list">
        <ion-card-header>
          <ion-card-title>Liste des positions capturées</ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-list>
            <ion-item v-for="(position, index) in positions" :key="index">
              <ion-label>
                <h3>Position {{ index + 1 }}</h3>
                <p>Latitude: {{ position.latitude }}</p>
                <p>Longitude: {{ position.longitude }}</p>
                <p>Timestamp: {{ new Date(position.timestamp).toLocaleString() }}</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <!-- Popup pour entrer le nom du trajet -->
      <ion-alert
  v-if="showAlert"
  :is-open="showAlert"
  header="Nom du trajet"
  :inputs="[
    {
      name: 'tripName',
      type: 'textarea',
      placeholder: 'Entrez le nom du trajet'
    }
  ]"
  :buttons="[
    {
      text: 'Annuler',
      role: 'cancel',
      handler: () => { showAlert = false; }
    },
    {
      text: 'Sauvegarder',
      handler: (data:any) => {
        savePositions(data.tripName);
        showAlert = false; // Fermer l'alerte après la sauvegarde
      }
    }
  ]"
></ion-alert>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { reverseGeocode, saveTrip } from '@/services/api'; 
import { getCurrentUser, logoutUser } from '@/services/user'; 
import { useRouter } from 'vue-router'; 

export default defineComponent({
  setup() {
    const router = useRouter();
    const currentPosition = ref({ latitude: 0, longitude: 0, address: "Adresse inconnue" });
    const positions = ref<{ latitude: number; longitude: number; timestamp: number }[]>([]);
    const isTracking = ref(false);
    const showAlert = ref(false); 
    let watchId: number | null = null;

    const startTracking = () => {
      if (isTracking.value) return;

      isTracking.value = true;
      watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const timestamp = position.timestamp;

          currentPosition.value.latitude = latitude;
          currentPosition.value.longitude = longitude;

          try {
            currentPosition.value.address = await reverseGeocode(latitude, longitude);
          } catch (error) {
            console.error("Erreur lors de la récupération de l'adresse : ", error);
            currentPosition.value.address = "Impossible de récupérer l'adresse";
          }

          positions.value.push({ latitude, longitude, timestamp });
        },
        (error) => {
          console.error("Erreur de géolocalisation :", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    };

    const stopTrackingAndPrompt = () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
        isTracking.value = false;
        showAlert.value = true; 
      }
    };

    const savePositions = async (tripName: string) => {
      if (!tripName || !positions.value.length) {
        console.error("Le nom du trajet est requis ou aucune position n'a été capturée");
        return;
      }

      const user = getCurrentUser(); 
      if (!user) {
        console.error("Utilisateur non connecté");
        return;
      }

      try {
        const response = await saveTrip(user.userId, tripName, positions.value);
        console.log("Trajet sauvegardé avec succès :", response.data);
        positions.value = [];
        showAlert.value = false; 
      } catch (error) {
        console.error("Erreur lors de la sauvegarde des positions :", error);
      }
    };

    const goToPage = (path: string) => {
      router.push(path); 
    };

    const logout = () => {
      logoutUser(); 
      window.location.href = '/login'; 
    };

    return {
      currentPosition,
      positions,
      isTracking,
      showAlert,
      startTracking,
      stopTrackingAndPrompt,
      savePositions,
      goToPage, 
      logout,
    };
  },
});
</script>

<style scoped>
/* Section fixe pour les boutons */
.control-buttons {
  display: flex;
  justify-content: center;
  gap: 1px;
  position: sticky;
  top: 0;
  background-color: #0313f7; /* Couleur de fond pour séparer visuellement */
  padding: 10px;
  z-index: 100;
}

/* Limiter la hauteur de la liste des positions et permettre le défilement */
.scrollable-list {
  max-height: 300px;
  overflow-y: auto;
}

/* Espacement entre les cartes */
ion-card {
  margin-bottom: 20px;
}

/* Version de l'application en bas du menu coulissant */
.app-version {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: gray;
}
</style>
