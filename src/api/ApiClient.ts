// @ts-ignore
// eslint-disable-next-line
import axios, { AxiosInstance } from 'axios';
import { App, inject } from 'vue';
import { AuthApi } from '@/api/AuthApi';
import { UserApi } from '@/api/UserApi';
import { CardApi } from '@/api/CardApi';
import { OrderApi } from '@/api/OrderApi';

export interface SignupRequest { email: string; password: string; }
export interface LoginRequest { email: string; password: string; }
export interface AuthResponse { token: string; }
export interface CardRequest { title: string; description: string; price: number; code: string; imageUrl: string; }
export interface CardResponse { id: number; title: string; description: string; price: number; code: string; imageUrl: string; createdAt: string; }
export interface PlaceOrderRequest { userId: number; cardId: number; quantity: number; totalPrice: number; description: string; }
export interface PlaceOrderResponse { orderId: number; paymentUrl?: string; }
export interface Order { id: number; userId: number; cardId: number; quantity: number; totalPrice: number; status: string; authority?: string; }

export class ApiClient {
  public auth!: AuthApi;
  public user!: UserApi;
  public card!: CardApi;
  public order!: OrderApi;
  private axios!: AxiosInstance;

  private static instance: ApiClient; // Singleton instance
  public static readonly apiKey = Symbol('ApiClient'); // Injection key

  constructor(baseURL: string) {
    if (ApiClient.instance) {
      return ApiClient.instance; // Return existing instance if available
    }

    this.axios = axios.create({
      baseURL,
      withCredentials: true,
    });
    this.auth = new AuthApi(this.axios);
    this.user = new UserApi(this.axios);
    this.card = new CardApi(this.axios);
    this.order = new OrderApi(this.axios);

    ApiClient.instance = this; // Set the singleton instance
  }

  // Vue plugin install method
  static install(app: App, options: { baseURL: string }) {
    const client = new ApiClient(options.baseURL);
    app.provide(ApiClient.apiKey, client); // Provide the instance
    // Optional: Make it globally available via globalProperties as well
    // app.config.globalProperties.$api = client;
  }
}

// Composable to use the ApiClient
export function useApiClient(): ApiClient {
  const client = inject<ApiClient>(ApiClient.apiKey);
  if (!client) {
    throw new Error('ApiClient not provided. Did you install the plugin?');
  }
  return client;
} 