<template>
  <div>
    <h1>My Purchased Cards</h1>
    <div v-if="loading">Loading purchased cards...</div>
    <div v-if="error">Error loading purchased cards: {{ error.message }}</div>
    <div v-if="purchasedCards" class="purchased-cards-list">
      <div v-for="item in purchasedCards" :key="item.id" class="purchased-card-item">
        <h2>{{ item.cardTitle }}</h2>
        <p>Unique Code: {{ item.uniqueCode }}</p>
        <p>Purchase Date: {{ item.purchaseDate }}</p>
        <!-- Display other relevant purchased card details -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApiClient } from '@/api/ApiClient';
import type { Order } from '@/api/ApiClient';

const api = useApiClient();

const purchasedCards = ref<Order[] | null>(null);
const loading = ref(true);
const error = ref<Error | null>(null);

const fetchPurchasedCards = async () => {
  try {
    const res = await api.order.getMyOrders();
    purchasedCards.value = res.data;
  } catch (err) {
    error.value = err as Error;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchPurchasedCards);

</script>

<style scoped>
.purchased-cards-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.purchased-card-item {
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  max-width: 250px;
}
</style> 