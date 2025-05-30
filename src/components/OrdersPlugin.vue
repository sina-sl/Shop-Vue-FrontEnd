<template>
  <div>
    <h2>Orders Plugin</h2>
    <h3>Place Order</h3>
    <input v-model="order.userId" placeholder="User ID" />
    <input v-model="order.cardId" placeholder="Card ID" />
    <input v-model="order.quantity" type="number" placeholder="Quantity" />
    <input v-model="order.totalPrice" type="number" placeholder="Total Price" />
    <input v-model="order.description" placeholder="Description" />
    <button @click="placeNewOrder">Place Order</button>
    <div v-if="orderResponse">
      <pre>{{ orderResponse }}</pre>
    </div>
    <h3>Verify Payment</h3>
    <input v-model="authority" placeholder="Authority" />
    <input v-model="status" placeholder="Status" />
    <button @click="verifyOrderPayment">Verify Payment</button>
    <div v-if="verifyResponse">
      <pre>{{ verifyResponse }}</pre>
    </div>
    <h3>My Orders</h3>
    <button @click="fetchMyOrders">Get My Orders</button>
    <ul>
      <li v-for="order in myOrders" :key="order.id">Order ID: {{ order.id }}</li>
    </ul>
    <h3>Admin Orders</h3>
    <button @click="fetchAllOrders">Get All Orders</button>
    <ul>
      <li v-for="order in allOrders" :key="order.id">
        <span @click="fetchOrderById(order.id)">Order ID: {{ order.id }}</span>
      </li>
    </ul>
    <div v-if="selectedOrder">
      <h4>Order Details</h4>
      <pre>{{ selectedOrder }}</pre>
      <input v-model="updateStatus" placeholder="New Status" />
      <button @click="updateOrderStatusFn">Update Status</button>
    </div>
    <div v-if="error" style="color:red">{{ error }}</div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useApiClient } from '@/api/ApiClient';
import type { PlaceOrderRequest, PlaceOrderResponse, Order } from '@/api/OrderApi';

const api = useApiClient();

const order = ref<PlaceOrderRequest>({ userId: 0, cardId: 0, quantity: 1, totalPrice: 0, description: '' });
const orderResponse = ref<PlaceOrderResponse|null>(null);
const authority = ref('');
const status = ref('');
const verifyResponse = ref<any>(null);
const myOrders = ref<Order[]>([]);
const allOrders = ref<Order[]>([]);
const selectedOrder = ref<Order|null>(null);
const updateStatus = ref('');
const error = ref('');

const placeNewOrder = async () => {
  error.value = '';
  try {
    const res = await api.order.placeOrder(order.value);
    orderResponse.value = res.data;
  } catch (e: any) {
    error.value = 'Failed to place order';
  }
};

const verifyOrderPayment = async () => {
  error.value = '';
  try {
    const res = await api.order.verifyPayment(authority.value, status.value);
    verifyResponse.value = res.data;
  } catch (e: any) {
    error.value = 'Failed to verify payment';
  }
};

const fetchMyOrders = async () => {
  error.value = '';
  try {
    const res = await api.order.getMyOrders();
    myOrders.value = res.data;
  } catch (e: any) {
    error.value = 'Failed to fetch my orders';
  }
};

const fetchAllOrders = async () => {
  error.value = '';
  try {
    const res = await api.order.getAllOrders();
    allOrders.value = res.data;
  } catch (e: any) {
    error.value = 'Failed to fetch all orders';
  }
};

const fetchOrderById = async (id: number) => {
  error.value = '';
  try {
    const res = await api.order.getOrderById(id);
    selectedOrder.value = res.data;
  } catch (e: any) {
    error.value = 'Failed to fetch order by id';
  }
};

const updateOrderStatusFn = async () => {
  error.value = '';
  try {
    if (!selectedOrder.value) return;
    await api.order.updateOrderStatus(selectedOrder.value.id, updateStatus.value);
    fetchOrderById(selectedOrder.value.id);
  } catch (e: any) {
    error.value = 'Failed to update order status';
  }
};
</script> 