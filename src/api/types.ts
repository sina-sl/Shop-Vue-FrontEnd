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

export enum PrepStatus {
    READY_TO_SHIP = 'READY_TO_SHIP',
    PREPARATION_REQUIRED = 'PREPARATION_REQUIRED',
}

export enum ProductType {
    PHYSICAL = 'PHYSICAL',
    DIGITAL = 'DIGITAL',
}

export interface Product {
    id: number;
    price: number;
    slug: string;
    title: string;
    imageUrl: string;
    isActive: boolean;
    description: string;
    prepStatus: PrepStatus;
    pricingType: PricingType;
    productType: ProductType;
    createdAt?: string;
    updatedAt?: string;
}

export interface ProductWithStockCountDto extends Product {
    availableStockCount: number;
}

export interface ProductCreationData {
    title: string;
    price: number;
    code: string;
    imageUrl: string;
    isActive: boolean;
    description: string;
    pricingType: PricingType;
    prepStatus: PrepStatus;
    productType: ProductType;
}

export interface ProductStockItem {
    id: number;
    productId: number;
    orderId?: number | null;
    sold: boolean;
    createdAt: string;
}

export interface StockItemsCreationData {
    count: number;
    productId: number;
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
    product: Product;
    productStockItems?: ProductStockItem[];
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
    orderId: number;
    refId?: string | null;
    authority: string;
    status: PaymentStatus;
    paymentMethod: PaymentMethod;
    rawResponse?: string | null;
    paidAt?: string | null;
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

export interface SignupRequest {
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
}

