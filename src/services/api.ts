import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiResponse, LoginRequest, SignupRequest } from "./models";

const API_URL = "https://server-1-t93s.onrender.com/api/tp";

export const loginAction = async ({
  email,
  password,
}: LoginRequest): Promise<AxiosResponse<ApiResponse>> => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

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
  lat: Number,
  lon: Number
): Promise<string> => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.display_name || "Unknown address";
  } catch (error) {
    console.error("Error with reverse geocoding:", error);
    return "Unable to retrieve address";
  }
};
