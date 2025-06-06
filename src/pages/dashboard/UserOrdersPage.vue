<template>
  <div>
    <h3>My Orders</h3>
    <div v-if="isLoading">Loading your orders...</div>
    <div v-else-if="error" style="color: red;">{{ error }}</div>
    <ul v-else>
      <li v-for="order in orders.content" :key="order.id">
        <router-link :to="{ name: 'OrderDetails', params: { orderId: order.id } }">
          Order #{{ order.id }} - {{ order.status }} - {{ order.createdAt }}
        </router-link>
        <div>
          <span v-if="order.cardStockItems && order.cardStockItems.length > 0">
            Card: {{ order.cardStockItems[0].card.title }}
          </span>
          <span v-else>No card info</span>
        </div>
        <button
          v-if="order.status === OrderStatus.JUST_CREATED"
          :disabled="payingOrderId === order.id"
          @click="payForOrder(order.id)"
        >
          <span v-if="payingOrderId === order.id">Processing...</span>
          <span v-else>Pay for Order</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {useApiClient} from '@/api/ApiClient';
import {OrderStatus, PaymentMethod} from "@/api/types.ts";

const api = useApiClient();
const orders = ref<Page<Order> | null>(null);

const isLoading = ref(true);
const error = ref<string | null>(null);
const payingOrderId = ref<number | null>(null);

const fetchOrders = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const res = await api.order.searchUserOrders({
      // search:"ss"
    });
    orders.value = res.data;
  } catch (e: any) {
    error.value = e.response?.data || 'Failed to fetch orders';
  } finally {
    isLoading.value = false;
  }
};

const payForOrder = async (orderId: number) => {
  payingOrderId.value = orderId;
  try {
    const res = await api.payment.createPayment({
      orderId: orderId,
      paymentMethod: PaymentMethod.ZARINPAL
    });
    if (res.data) {
      window.open(res.data, '_blank');
    } else {
      alert('No payment link returned.');
    }
  } catch (e: any) {
    alert(e.response?.data || 'Failed to initiate payment.');
  } finally {
    payingOrderId.value = null;
  }
};

onMounted(fetchOrders);
</script>