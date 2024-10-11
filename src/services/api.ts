import axios, { AxiosResponse } from "axios";
import { ApiResponse, LoginRequest, SignupRequest } from "./models";

const API_URL = "https://server-1-t93s.onrender.com/api/tp";


export const loginAction = async ({
  email,
  password,
}: LoginRequest): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response;
};


export const signupAction = async ({
  firstName,
  lastName,
  email,
  password,
}: SignupRequest): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.post(`${API_URL}/signup`, {
    firstName,
    lastName,
    email,
    password,
  });
  return response;
};


export const reverseGeocode = async (
  lat: number,
  lon: number
): Promise<string> => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.display_name || "Adresse inconnue";
  } catch (error) {
    console.error("Erreur lors du géocodage inversé :", error);
    return "Impossible de récupérer l'adresse";
  }
};


export const changePassword = async (
  userId: string,
  oldPassword: string,
  newPassword: string
): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.post(`${API_URL}/change-password`, {
    userId,
    oldPassword,
    newPassword,
  });
  return response;
};


export const getTripsByUserId = async (
  userId: string
): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.get(`${API_URL}/get-trips/${userId}`);
  return response;
};


export const addLocations = async (
  pathName: string,
  userId: string,
  trips: any[]
): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.post(`${API_URL}/add-trip`, {
    pathName,
    userId,
    trips,
  });
  return response;
};


export const shareTrip = async (
  tripId: string,
  email: string
): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.post(`${API_URL}/share-trip`, {
    tripId,
    email,
  });
  return response;
};


export const deleteTrip = async (
  userId: string,
  tripId: string
): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.delete(`${API_URL}/delete-trip`, {
    data: { userId, tripId },
  });
  return response;
};

// Service pour ajouter un trajet
export const saveTrip = async (
  userId: string,
  pathName: string,
  positions: { latitude: number; longitude: number; timestamp: number }[]
): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.post(`${API_URL}/add-trip`, {
    userId,
    pathName,
    trips: positions,
  });
  return response;
};
