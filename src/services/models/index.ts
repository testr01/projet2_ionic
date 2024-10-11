export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ApiResponse {
  trips: []
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
}
