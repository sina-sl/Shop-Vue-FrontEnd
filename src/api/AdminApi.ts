import { AxiosInstance } from 'axios';
import type {
    Card,
    CardCreationData,
    CardWithStockCountDto,
    Order,
    OrderStatus,
    Page,
    StockItemsCreationData
} from './types.ts'

export class AdminApi {

    constructor(private axios: AxiosInstance) {}

    async addCard(card: CardCreationData) {
        return this.axios.post<Card>('/admin/cards/add', card)
    }

    async getCardById(id: number) {
        return this.axios.post<Card>(`/admin/cards/${id}`)
    }

    async searchCards(params: {
        search?: string
        isActive?: boolean
        page?: number
        size?: number
    }) {
        return this.axios.get<Page<CardWithStockCountDto>>('/admin/cards', { params })
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