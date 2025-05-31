export enum UserRole {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export interface User {
    id: number;
    email: string;
    role: UserRole;
    createdAt: string;
    provider: string;
}

export enum PricingType {
    LOCAL = 'LOCAL',
    CURRENCY_BASED = 'CURRENCY_BASED',
}

export enum DeliveryType {
    READY_TO_SHIP = 'READY_TO_SHIP',
    PREPARATION_REQUIRED = 'PREPARATION_REQUIRED',
}

export interface Card {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    description: string;
    isActive: boolean;
    createdAt: string; // ISO format
    pricingType: PricingType;
    deliveryType: DeliveryType;
}

export interface CardWithStockCountDto {
    id: number;
    title: string;
    price: number;
    imageUrl: string;
    description: string;
    pricingType: PricingType;
    deliveryType: DeliveryType;
    availableStockCount: number;
}

export interface CardCreationData {
    title: string
    description: string
    price: number
    code: string
    imageUrl: string
    isActive: boolean
    pricingType: PricingType
    deliveryType: DeliveryType
}


export interface CardStockItem {
    id: number
    cardId: number
    orderId?: number | null
    sold: boolean
    createdAt: string
}

export interface  StockItemsCreationData{
    count: number
    cardId: number
}

export enum OrderStatus {
    JUST_CREATED = 'JUST_CREATED',
    PROGRESSING = 'PROGRESSING',
    COMPLETED = 'COMPLETED',
    EXPIRED = 'EXPIRED',
    CANCELED = 'CANCELED',
    FAILED = 'FAILED',
}

export interface Order {
    id: number;
    quantity: number;
    status: OrderStatus;
    createdAt: string;
    preparationNote?: string;
    deliveryDate?: string;
    purchaseDate?: string;
    payments: Payment[];
    card: Card;
}



export enum PaymentStatus {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    CANCELED = 'CANCELED',
}

export enum PaymentMethod {
    ZARINPAL = 'ZARINPAL',
}

export interface Payment {
    id: number;
    orderId: number; // چون @JsonIgnore داره خود order حذف می‌شه
    refId?: string | null;
    authority: string;
    status: PaymentStatus;
    paymentMethod: PaymentMethod;
    rawResponse?: string | null;
    paidAt?: string | null; // ISO date string
    createdAt: string;
}

export interface PaymentVerifyResponse {
    isSuccess: boolean;
    referenceId: string;
    message: string;
}




export interface Page<T> {
    content: T[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
            sorted: boolean;
            empty: boolean;
            unsorted: boolean;
        };
        offset: number;
        paged: boolean;
        unpaged: boolean;
    };
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: {
        sorted: boolean;
        empty: boolean;
        unsorted: boolean;
    };
    numberOfElements: number;
    empty: boolean;
}

