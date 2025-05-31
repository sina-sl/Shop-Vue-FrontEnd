// @ts-ignore
// eslint-disable-next-line
import axios, { AxiosInstance } from 'axios';
import { App, inject } from 'vue';
import { AuthApi } from '@/api/AuthApi';
import { UserApi } from '@/api/UserApi';
import { CardApi } from '@/api/CardApi';
import { OrderApi } from '@/api/OrderApi';
import { PaymentApi } from '@/api/PaymentApi';
import {AdminApi} from "@/api/AdminApi.ts";


const apiKey = Symbol('ApiClient'); // Injection key

export class ApiClient {
  public auth!: AuthApi;
  public user!: UserApi;
  public card!: CardApi;
  public admin!: AdminApi;
  public order!: OrderApi;
  public payment!: PaymentApi;
  private axios!: AxiosInstance;

  private static instance: ApiClient; // Singleton instance

  constructor() {
    if (ApiClient.instance) {
      return ApiClient.instance; // Return existing instance if available
    }

    this.axios = axios.create({
      withCredentials: true,
      baseURL: import.meta.env.VITE_API_BASE_URL,
    });

    this.auth = new AuthApi(this.axios);
    this.user = new UserApi(this.axios);
    this.card = new CardApi(this.axios);
    this.order = new OrderApi(this.axios);
    this.admin = new AdminApi(this.axios);
    this.payment = new PaymentApi(this.axios);

    ApiClient.instance = this; // Set the singleton instance
  }

  // Vue plugin install method
  static install(app: App) {
    const client = new ApiClient();
    app.provide(apiKey, client); // Provide the instance
    // Optional: Make it globally available via globalProperties as well
    // app.config.globalProperties.$api = client;
  }
}

// Composable to use the ApiClient
export function useApiClient(): ApiClient {
  const client = inject<ApiClient>(apiKey);
  if (!client) {
    throw new Error('ApiClient not provided. Did you install the plugin?');
  }
  return client;
} 