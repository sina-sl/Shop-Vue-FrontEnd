import { AxiosInstance } from 'axios';
import type { SignupRequest, LoginRequest, AuthResponse } from './types.ts';

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