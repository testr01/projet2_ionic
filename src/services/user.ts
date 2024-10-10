import { changePassword } from './api'; // On importe la fonction qui communique avec l'API

var currentUser: any = null;

export const getCurrentUser = (): any => {
  return currentUser;
};

export const setCurrentUser = (user: any) => {
  currentUser = user;
};

export const updatePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  if (!currentUser) {
    throw new Error("Utilisateur non connecté.");
  }

  const { userId } = currentUser; // On utilise l'ID de l'utilisateur actuel
  const response = await changePassword(userId, oldPassword, newPassword); // Appel à l'API
  if (response.status === 200) {
    console.log("Mot de passe mis à jour avec succès");
  } else {
    throw new Error("Erreur lors de la mise à jour du mot de passe");
  }
};

export const logoutUser = () => {
  currentUser = null;
};
