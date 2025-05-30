import { AxiosInstance } from 'axios';

export interface UserProfileResponse {
  id: number;
  email: string;
  role: string;
  createdAt: string;
  provider: string;
}

export class UserApi {
  constructor(private axios: AxiosInstance) {}

  getProfile() {
    return this.axios.get<UserProfileResponse>('/me');
  }
} 