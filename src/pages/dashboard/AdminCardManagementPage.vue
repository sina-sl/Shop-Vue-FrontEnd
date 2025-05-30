<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useApiClient } from '@/api/ApiClient';
import type { CardRequest, CardResponse } from '@/api/CardApi';

const api = useApiClient();

const cards = ref<CardResponse[]>([]);
const newCard = ref<CardRequest>({ title: '', description: '', price: 0, code: '', imageUrl: '' });
const editingCard = ref<CardResponse | null>(null);
const error = ref<string | null>(null);
const success = ref<string | null>(null);
const showStockFormFor = ref<number|null>(null);
const stockCodes = ref<string>('');

const fetchAllCards = async () => {
  error.value = null;
  success.value = null;
  try {
    const res = await api.card.listCards();
    cards.value = res.data;
  } catch (err: any) {
    error.value = err.response?.data || 'Failed to fetch cards';
  }
};

const addNewCard = async () => {
  error.value = null;
  success.value = null;
  try {
    await api.card.addCard(newCard.value);
    success.value = 'Card added successfully!';
    newCard.value = { title: '', description: '', price: 0, code: '', imageUrl: '' };
    fetchAllCards(); // Refresh list
  } catch (err: any) {
    error.value = err.response?.data || 'Failed to add card';
  }
};

const startEditing = (card: CardResponse) => {
  editingCard.value = { ...card }; // Create a copy for editing
};

const cancelEditing = () => {
  editingCard.value = null;
};

const openStockForm = (cardId: number) => {
  showStockFormFor.value = cardId;
  stockCodes.value = '';
};

const cancelStockForm = () => {
  showStockFormFor.value = null;
  stockCodes.value = '';
};

const addStockItems = async (cardId: number) => {
  error.value = null;
  success.value = null;
  try {
    // Split codes by comma, newline, or space, and filter out empty strings
    const codes = stockCodes.value.split(/[,\n\r\s]+/).map(c => c.trim()).filter(Boolean);
    if (!codes.length) {
      error.value = 'Please enter at least one code.';
      return;
    }
    await api.card.addStockItems({ cardId, codes });
    success.value = `Added ${codes.length} stock item(s) to card.`;
    cancelStockForm();
    fetchAllCards();
  } catch (err: any) {
    error.value = err.response?.data || 'Failed to add stock items';
  }
};

// You would need backend endpoints for updating/deleting cards
// const updateCard = async () => { /* ... */ };
// const deleteCard = async (id: number) => { /* ... */ };

onMounted(fetchAllCards);

</script>

<template>
  <div>
    <h3>Admin Card Management</h3>
    <h4>Add New Card</h4>
    <form @submit.prevent="addNewCard" style="display: flex; flex-direction: column; gap: 0.5rem;">
      <input v-model="newCard.title" placeholder="Title" required />
      <textarea v-model="newCard.description" placeholder="Description" required></textarea>
      <input v-model="newCard.price" type="number" placeholder="Price" required />
      <input v-model="newCard.code" placeholder="Code" required />
      <input v-model="newCard.imageUrl" placeholder="Image URL" required />
      <button type="submit">Add Card</button>
    </form>

    <h4 style="margin-top: 2rem;">Existing Cards</h4>
    <ul>
      <li v-for="card in cards" :key="card.id" style="margin-bottom: 1rem;">
        {{ card.title }} (ID: {{ card.id }})
        <button @click="startEditing(card)">Edit</button>
        <button @click="openStockForm(card.id)">Add Stock Items</button>
        <!-- <button @click="deleteCard(card.id)">Delete</button> -->
        <div v-if="showStockFormFor === card.id" style="margin-top: 1rem; border: 1px solid #aaa; padding: 1rem;">
          <h5>Add Stock Items to {{ card.title }}</h5>
          <textarea v-model="stockCodes" placeholder="Enter codes, separated by comma, space, or newline" rows="4"></textarea>
          <div style="margin-top: 0.5rem;">
            <button @click="addStockItems(card.id)">Submit</button>
            <button @click="cancelStockForm" style="margin-left: 0.5rem;">Cancel</button>
          </div>
        </div>
      </li>
    </ul>

    <div v-if="editingCard" style="margin-top: 2rem; border: 1px solid #ccc; padding: 1rem;">
      <h4>Edit Card (ID: {{ editingCard.id }})</h4>
      <form style="display: flex; flex-direction: column; gap: 0.5rem;">
        <input v-model="editingCard.title" placeholder="Title" required />
        <textarea v-model="editingCard.description" placeholder="Description" required></textarea>
        <input v-model="editingCard.price" type="number" placeholder="Price" required />
        <input v-model="editingCard.code" placeholder="Code" required />
        <input v-model="editingCard.imageUrl" placeholder="Image URL" required />
        <!-- <button @click="updateCard">Save Changes</button> -->
        <button type="button" @click="cancelEditing">Cancel</button>
      </form>
    </div>

    <div v-if="error" style="color: red; margin-top: 1rem;">{{ error }}</div>
    <div v-if="success" style="color: green; margin-top: 1rem;">{{ success }}</div>
  </div>
</template> 