<template>
  <div>
    <h2>Cards Plugin</h2>
    <button @click="fetchCards">List Cards</button>
    <ul>
      <li v-for="card in cards" :key="card.id">
        <span @click="fetchCard(card.id)">{{ card.title }}</span>
      </li>
    </ul>
    <div v-if="selectedCard">
      <h3>Card Details</h3>
      <pre>{{ selectedCard }}</pre>
    </div>
    <h3>Add Card (Admin)</h3>
    <input v-model="newCard.title" placeholder="Title" />
    <input v-model="newCard.description" placeholder="Description" />
    <input v-model="newCard.price" type="number" placeholder="Price" />
    <input v-model="newCard.code" placeholder="Code" />
    <input v-model="newCard.imageUrl" placeholder="Image URL" />
    <button @click="addNewCard">Add Card</button>
    <div v-if="error" style="color:red">{{ error }}</div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useApiClient } from '@/api/ApiClient';
import type { CardRequest, CardResponse } from '@/api/CardApi';

const api = useApiClient();

const cards = ref<CardResponse[]>([]);
const selectedCard = ref<CardResponse|null>(null);
const error = ref('');
const newCard = ref<CardRequest>({ title: '', description: '', price: 0, code: '', imageUrl: '' });

const fetchCards = async () => {
  error.value = '';
  try {
    const res = await api.card.listCards();
    cards.value = res.data;
  } catch (e: any) {
    error.value = 'Failed to fetch cards';
  }
};

const fetchCard = async (id: number) => {
  error.value = '';
  try {
    const res = await api.card.getCard(id);
    selectedCard.value = res.data;
  } catch (e: any) {
    error.value = 'Failed to fetch card';
  }
};

const addNewCard = async () => {
  error.value = '';
  try {
    await api.card.addCard(newCard.value);
    fetchCards();
  } catch (e: any) {
    error.value = 'Failed to add card';
  }
};
</script> 