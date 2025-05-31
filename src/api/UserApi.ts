import { AxiosInstance } from 'axios';
import type { User } from './types.ts';

export class UserApi {
  constructor(private axios: AxiosInstance) {}

  async getProfile() {
    return this.axios.get<User>('/me');
  }

  // اگر خواستی متد getUserCards هم فعال بشه، می‌تونه اینجوری باشه:
  // async getUserCards() {
  //   return this.axios.get<PurchasedCard[]>('/me/cards');
  // }
}