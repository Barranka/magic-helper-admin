interface AuthForm {
  email: string;
  password: string;
  device_id?: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
}

interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

interface RootState {}
