<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
            <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button> 
        </ion-buttons>
          <ion-title>Profil</ion-title>
        </ion-toolbar>
      </ion-header>
  
      <ion-content id="content">
      
        <div class="profile-card">
          <ion-card>
            <ion-card-header>
              <ion-card-title>Informations du compte</ion-card-title>
            </ion-card-header>
  
            <ion-card-content>
              <ion-list>
                <ion-item>
                  <ion-label>Nom</ion-label>
                  <ion-text>{{ user.firstName }}</ion-text>
                </ion-item>
                <ion-item>
                  <ion-label>Prénom</ion-label>
                  <ion-text>{{ user.lastName }}</ion-text>
                </ion-item>
                <ion-item>
                  <ion-label>Email</ion-label>
                  <ion-text>{{ user.email }}</ion-text>
                </ion-item>
                <ion-item>
                  <ion-label>Mot de passe</ion-label>
                  <ion-text>••••••••</ion-text>
                  <ion-button slot="end" @click="openPasswordModal">Modifier</ion-button>
                </ion-item>
              </ion-list>
            </ion-card-content>
          </ion-card>
        </div>
  
        
        <ion-modal v-if="showModal" is-open="true" @didDismiss="closePasswordModal">
          <ion-header>
            <ion-toolbar>
              <ion-title>Modifier le mot de passe</ion-title>
              <ion-buttons slot="end">
                <ion-button @click="closePasswordModal">Fermer</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
          <ion-content>
            <ion-item>
              <ion-label position="floating">Ancien mot de passe</ion-label>
              <ion-input type="password" v-model="oldPassword"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Nouveau mot de passe</ion-label>
              <ion-input type="password" v-model="newPassword"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Confirmer le nouveau mot de passe</ion-label>
              <ion-input type="password" v-model="confirmNewPassword"></ion-input>
            </ion-item>
            <ion-button expand="full" @click="updatePassword">Mise à jour</ion-button>
          </ion-content>
        </ion-modal>
  
    
        <ion-toast v-if="showSuccessToast" message="Mot de passe modifié !" duration="1500"></ion-toast>
      </ion-content>
    </ion-page>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { getCurrentUser, updatePassword as updateUserPassword } from '@/services/user';
  
  export default defineComponent({
    setup() {
      const user = ref(getCurrentUser());
      const showModal = ref(false);
      const showSuccessToast = ref(false);
      
      
      const oldPassword = ref('');
      const newPassword = ref('');
      const confirmNewPassword = ref('');
  
     
      const openPasswordModal = () => {
        showModal.value = true;
      };
  
      
      const closePasswordModal = () => {
        showModal.value = false;
        oldPassword.value = '';
        newPassword.value = '';
        confirmNewPassword.value = '';
      };
  
      
      const updatePassword = () => {
        if (newPassword.value === confirmNewPassword.value) {
          updateUserPassword(oldPassword.value, newPassword.value)
            .then(() => {
              closePasswordModal();
              showSuccessToast.value = true;
            })
            .catch((error: any) => {
              console.error("Erreur lors de la mise à jour du mot de passe", error);
            });
        } else {
          console.error("Les nouveaux mots de passe ne correspondent pas");
        }
      };
  
      return {
        user,
        showModal,
        showSuccessToast,
        oldPassword,
        newPassword,
        confirmNewPassword,
        openPasswordModal,
        closePasswordModal,
        updatePassword
      };
    }
  });
  </script>
  
  <style scoped>
  .profile-card {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  ion-card {
    width: 90%;
    max-width: 500px;
  }
  </style>
  