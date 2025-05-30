<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useApiClient } from '@/api/ApiClient';
import type { PurchasedCard } from '@/api/CardApi';

const api = useApiClient();

const purchasedCard = ref<PurchasedCard[]>([]);
const error = ref('');

const fetchCards = async () => {
  error.value = '';
  try {
    const res = await api.card.getUserCards();
    purchasedCard.value = res.data;
  } catch (e: any) {
    error.value = 'Failed to fetch cards';
  }
};

// const fetchCard = async (id: number) => {
//   error.value = '';
//   try {
//     const res = await api.card.getCard(id);
//     selectedCard.value = res.data;
//   } catch (e: any) {
//     error.value = 'Failed to fetch card';
//   }
// };

onMounted(fetchCards);
</script>
<template>
  <div>
    <h3>My Cards</h3>
    <div v-if="error" style="color: red;">{{ error }}</div>
    <ul v-else>
      <li v-for="card in purchasedCard" :key="card.id" style="margin-bottom: 1rem;">
        <div style="display: flex; align-items: center; gap: 1rem;">
          <img v-if="card.imageUrl" :src="card.imageUrl" alt="Card image" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;" />
          <div style="flex: 1;">
            <strong>{{ card.title }}</strong> - ${{ card.price }}
            <div>{{ card.description }}</div>
            <span v-if="card.isAvailable" style="color: green;">Available</span>
            <span v-else style="color: gray;">Unavailable</span>
          </div>
          <button @click="fetchCard(card.id)">Details</button>
        </div>
      </li>
    </ul>
    <div v-if="selectedCard" style="margin-top: 2rem; border: 1px solid #ccc; padding: 1rem; border-radius: 8px;">
      <h4>Card Details</h4>
      <img v-if="selectedCard.imageUrl" :src="selectedCard.imageUrl" alt="Card image" style="width: 120px; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;" />
      <div><strong>Title:</strong> {{ selectedCard.title }}</div>
      <div><strong>Description:</strong> {{ selectedCard.description }}</div>
      <div><strong>Price:</strong> ${{ selectedCard.price }}</div>
      <div><strong>Code:</strong> {{ selectedCard.code }}</div>
      <div><strong>Created At:</strong> {{ selectedCard.createdAt }}</div>
      <div><strong>Availability:</strong> <span v-if="selectedCard.isAvailable" style="color: green;">Available</span><span v-else style="color: gray;">Unavailable</span></div>
      <button @click="selectedCard = null" style="margin-top: 1rem;">Close</button>
    </div>
  </div>
</template> 