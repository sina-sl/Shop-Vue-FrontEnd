<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useApiClient } from '@/api/ApiClient';
import type {Order, Page} from "@/api/types.ts";

const api = useApiClient();

const allOrders = ref<Page<Order>| null>(null);
const selectedOrder = ref<Order|null>(null);
const updateStatus = ref('');
const error = ref<string | null>(null);
const success = ref<string | null>(null);

const fetchAllOrders = async () => {
  error.value = null;
  success.value = null;
  try {
    const res = await api.admin.searchOrders({});
    allOrders.value = res.data;
  } catch (err: any) {
    error.value = err.response?.data || 'Failed to fetch all orders';
  }
};

const fetchOrderById = async (id: number) => {
  error.value = null;
  success.value = null;
  try {
    const res = await api.order.getOrderById(id);
    selectedOrder.value = res.data;
  } catch (err: any) {
    error.value = err.response?.data || 'Failed to fetch order by id';
  }
};

const updateOrderStatusFn = async () => {
  error.value = null;
  success.value = null;
  if (!selectedOrder.value || !updateStatus.value) return;

  try {
    await api.order.updateOrderStatus(selectedOrder.value.id, updateStatus.value);
    success.value = `Order ${selectedOrder.value.id} status updated to ${updateStatus.value}!`;
    fetchOrderById(selectedOrder.value.id); // Refresh the selected order details
  } catch (err: any) {
    error.value = err.response?.data || 'Failed to update order status';
  }
};

onMounted(fetchAllOrders);

</script>

<template>
  <div>
    <h3>Admin Order Management</h3>
    <h4>All Orders</h4>
    <button @click="fetchAllOrders">Refresh Orders</button>
    <ul style="list-style: none; padding: 0;">
      <li v-for="order in allOrders?.content" :key="order.id" style="margin-bottom: 0.5rem;">
        <a href="#" @click.prevent="fetchOrderById(order.id)">Order ID: {{ order.id }}</a> (Status: {{ order.status }})
      </li>
    </ul>

    <div v-if="selectedOrder" style="margin-top: 1.5rem; border: 1px solid #ccc; padding: 1rem;">
      <h4>Order Details (ID: {{ selectedOrder.id }})</h4>
      <pre>{{ selectedOrder }}</pre>
      <div>
        Update Status:
        <input v-model="updateStatus" placeholder="New Status" />
        <button @click="updateOrderStatusFn" style="margin-left: 0.5rem;">Save</button>
      </div>
    </div>

    <div v-if="error" style="color: red; margin-top: 1rem;">{{ error }}</div>
    <div v-if="success" style="color: green; margin-top: 1rem;">{{ success }}</div>

  </div>
</template> 