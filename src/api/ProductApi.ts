import { AxiosInstance } from 'axios';
import type { Product, ProductWithStockCountDto, Page } from './types.ts';

export class ProductApi {
  constructor(private axios: AxiosInstance) {}

  async searchActiveProducts(params: {
    search?: string;
    page?: number;
    size?: number;
  }) {
    return this.axios.get<Page<ProductWithStockCountDto>>('/products', { params });
  }

  async getActiveProduct(id: number) {
    return this.axios.get<ProductWithStockCountDto>(`/products/${id}`);
  }
}