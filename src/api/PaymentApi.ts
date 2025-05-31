import { AxiosInstance } from 'axios';
import {PaymentMethod, PaymentVerifyResponse} from "@/api/types.ts";

export class PaymentApi {
    constructor(private axios: AxiosInstance) {}

    async verifyPayment(params: {
        orderId: number
        authority: string
        status: string
    }) {
        return this.axios.get<PaymentVerifyResponse>('/payment/verify', { params });
    }

    async createPayment(params: {
        orderId: number
        paymentMethod: PaymentMethod
    }) {
        return this.axios.post<string>('/payment/create', null, { params });
    }
}