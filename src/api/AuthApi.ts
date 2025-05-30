import { AxiosInstance } from 'axios';

export interface SignupRequest { email: string; password: string; }
export interface LoginRequest { email: string; password: string; }
export interface AuthResponse { token: string; }

export class AuthApi {
  constructor(private axios: AxiosInstance) {}

  signup(data: SignupRequest) {
    return this.axios.post<AuthResponse>('/auth/signup', data);
  }
  login(data: LoginRequest) {
    return this.axios.post<AuthResponse>('/auth/login', data);
  }
  refresh() {
    return this.axios.post<AuthResponse>('/auth/refresh');
  }
  logout() {
    return this.axios.post('/auth/logout');
  }
} 