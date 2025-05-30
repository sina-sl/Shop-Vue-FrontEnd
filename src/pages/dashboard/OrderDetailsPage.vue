<template>
  <div>
    <h3>Order Details</h3>
    <div v-if="isLoading">Loading order details...</div>
    <div v-else-if="error" style="color: red;">{{ error }}</div>
    <div v-else-if="order">
      <pre>{{ order }}</pre>
    </div>
    <div v-else>
      No order found.
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useApiClient } from '@/api/ApiClient';
import type { Order } from '@/api/OrderApi';
import { useRoute } from 'vue-router';

// defineProps<{ orderId: string | number }>();

const props = defineProps<{ orderId: string | number }>();
const api = useApiClient();
const order = ref<Order | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

const fetchOrder = async (id: string | number) => {
  isLoading.value = true;
  error.value = null;
  order.value = null;
  try {
    const res = await api.order.getOrderById(Number(id));
    order.value = res.data;
  } catch (e: any) {
    error.value = e.response?.data || 'Failed to fetch order details';
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => fetchOrder(props.orderId));
watch(() => props.orderId, (newId) => {
  if (newId) fetchOrder(newId);
});
</script> 