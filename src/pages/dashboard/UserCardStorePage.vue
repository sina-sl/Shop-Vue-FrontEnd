<template>
  <div>
    <h3>Card Store</h3>
    <div v-if="isLoading">Loading cards...</div>
    <div v-else-if="error" style="color: red;">{{ error }}</div>
    <ul v-else>
      <li v-for="card in cards" :key="card.id">
        {{ card.title }} - ${{ card.price }}
        <span v-if="card.isAvailable" style="color: green; margin-left: 0.5em;">Available</span>
        <span v-else style="color: gray; margin-left: 0.5em;">Unavailable</span>
        <button :disabled="!card.isAvailable || ordering === card.id" @click="orderCard(card)">Buy</button>
        <div v-if="ordering === card.id">Ordering...</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useApiClient } from '@/api/ApiClient';
import type { CardResponse } from '@/api/CardApi';
import { useRouter } from 'vue-router';

const api = useApiClient();
const router = useRouter();

const cards = ref<CardResponse[]>([]);
const isLoading = ref(true);
const ordering = ref<Number | null>(null);
const error = ref<string | null>(null);

const orderCard = async (card: CardResponse) => {
  ordering.value = card.id;
  try {
    const res = await api.order.placeOrder({
      cardId: card.id,
    });
    const orderId = res.data.id;
    if (orderId) {
      router.push({
        name: 'OrderDetails',
        params: { orderId },
      });
    } else {
      router.push({ name: 'UserOrders' });
    }
    ordering.value = null;
  } catch (e) {
    console.log(e)
  }
}

const fetchCards = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const res = await api.card.listCards();
    cards.value = res.data;
  } catch (err: any) {
    error.value = err.response?.data || 'Failed to fetch cards';
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchCards);
</script>

<style scoped>
/* Component-specific styles */
</style> 