import { AxiosInstance } from 'axios';
import { Order } from './OrderApi';

export interface CardRequest { title: string; description: string; price: number; code: string; imageUrl: string; }
export interface CardStockItem {
  id: number;
  code: string;
  sold: boolean;
  createdAt: string;
  card: CardResponse;
  order?: any;
}
export interface CardResponse {
  id: number;
  title: string;
  description: string;
  price: number;
  code: string;
  imageUrl: string;
  createdAt: string;
  isAvailable: boolean;
}

export interface PurchasedCard {
  id: number;
  user: any;
  cardStockItems: any[];
  purchaseDate: string;
  order?: Order;
}

export class CardApi {
  constructor(private axios: AxiosInstance) {}

  listCards() {
    return this.axios.get<CardResponse[]>('/cards');
  }
  getCard(id: number) {
    return this.axios.get<CardResponse>(`/cards/${id}`);
  }
  addCard(data: CardRequest) {
    return this.axios.post<CardResponse>('cards/admin', data);
  }
  addStockItems(data: { cardId: number; codes: string[] }) {
    return this.axios.post('/cards/admin/stock', data);
  }
  getUserCards() {
    return this.axios.get<PurchasedCard[]>('/me/cards');
  }
} 