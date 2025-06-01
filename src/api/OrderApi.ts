import { AxiosInstance } from 'axios';
import type { Order, OrderStatus, Page } from './types.ts';

export class OrderApi {
  constructor(private axios: AxiosInstance) {}

  async getOrderById(id: number) {
    return this.axios.get<Order>(`/orders/${id}`);
  }

  async searchUserOrders(params: {
    status?: OrderStatus;
    search?: string;
    page?: number;
    size?: number;
  }) {
    return this.axios.get<Page<Order>>('/orders', { params });
  }

  async createOrder(productId: number) {
    return this.axios.post<Order>('/orders/create', { productId });
  }
}