import { AxiosInstance } from 'axios';

export interface SignupRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export class AuthApi {
  constructor(private axios: AxiosInstance) {}

  async signup(req: SignupRequest) {
    return this.axios.post<AuthResponse>('/auth/signup', req);
  }

  async login(req: LoginRequest) {
    return this.axios.post<AuthResponse>('/auth/login', req);
  }

  async refresh() {
    return this.axios.post<AuthResponse>('/auth/refresh');
  }

  async logout() {
    return this.axios.post<void>('/auth/logout');
  }
}