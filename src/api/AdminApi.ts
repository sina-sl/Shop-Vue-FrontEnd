import { AxiosInstance } from 'axios';
import type {
    Product,
    ProductCreationData,
    ProductWithStockCountDto,
    Order,
    OrderStatus,
    Page,
    StockItemsCreationData
} from './types.ts'

export class AdminApi {

    constructor(private axios: AxiosInstance) {}

    async addProduct(product: ProductCreationData) {
        return this.axios.post<Product>('/admin/products/add', product)
    }

    async getProductById(id: number) {
        return this.axios.post<Product>(`/admin/products/${id}`)
    }

    async updateProduct(id: number, data: Partial<ProductCreationData>) {
        return this.axios.patch<Product>(`/admin/products/${id}`, data);
    }

    async searchProducts(params: {
        search?: string
        isActive?: boolean
        page?: number
        size?: number
    }) {
        return this.axios.get<Page<ProductWithStockCountDto>>('/admin/products', { params })
    }

    async addStockItems(req: StockItemsCreationData) {
        return this.axios.post('/admin/stocks/add', req)
    }

    async searchOrders(params: {
        userId?: number
        search?: string
        status?: OrderStatus
        page?: number
        size?: number
    }) {
        return this.axios.get<Page<Order>>('/admin/orders', { params })
    }

    async getOrderById(id: number) {
        return this.axios.get<Order>(`/admin/orders/${id}`)
    }
}