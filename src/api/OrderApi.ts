import { AxiosInstance } from 'axios';
import { CardResponse } from './CardApi';

export interface PlaceOrderRequest { cardId: number; }
export interface PlaceOrderResponse { orderId: number; paymentUrl: string; }
export interface Order {
  id: number;
  user: {
    id: number;
    email: string;
    role: string;
    createdAt: string;
    provider: string;
  };
  card: CardResponse
  cardStockItems: Array<{
    id: number;
    code: string;
    sold: boolean;
    createdAt: string;
  }>;
  quantity: number;
  status: string;
  authority?: string;
  createdAt: string;
}

export interface PayOrderRequest { orderId: number; }
export interface PayOrderResponse { paymentLink: string; }

export class OrderApi {
  constructor(private axios: AxiosInstance) {}

  placeOrder(data: PlaceOrderRequest) {
    return this.axios.post<Order>('/orders', data);
  }
  verifyPayment(authority: string, status: string) {
    return this.axios.get('/orders/verify-payment', { params: { Authority: authority, Status: status } });
  }
  getMyOrders() {
    return this.axios.get<Order[]>('/orders/my-orders');
  }
  getAllOrders() {
    return this.axios.get<Order[]>('/orders/admin/orders');
  }
  getOrderById(id: number) {
    return this.axios.get<Order>(`/orders/admin/${id}`);
  }
  updateOrderStatus(id: number, status: string) {
    return this.axios.patch<Order>(`/orders/admin/${id}`, { status });
  }
  payOrder(data: PayOrderRequest) {
    return this.axios.post<PayOrderResponse>('/orders/pay', data);
  }
} 