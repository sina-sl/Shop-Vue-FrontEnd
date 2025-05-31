import { AxiosInstance } from 'axios';
import type { Card, CardWithStockCountDto, Page } from './types.ts';

export class CardApi {
  constructor(private axios: AxiosInstance) {}

  async searchActiveCards(params: {
    search?: string;
    page?: number;
    size?: number;
  }) {
    return this.axios.get<Page<CardWithStockCountDto>>('/cards', { params });
  }

  async getActiveCard(id: number) {
    return this.axios.get<CardWithStockCountDto>(`/cards/${id}`);
  }
}