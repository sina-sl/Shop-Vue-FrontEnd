<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {useApiClient} from '@/api/ApiClient';
import {CardCreationData, CardWithStockCountDto, DeliveryType, Page, PricingType} from "@/api/types.ts";

const api = useApiClient();

const cards = ref<Page<CardWithStockCountDto> | null>(null);
const newCard = ref<CardCreationData>({
  code: '',
  title: '',
  price: 0,
  imageUrl: '',
  isActive: false,
  description: '',
  pricingType: PricingType.LOCAL,
  deliveryType: DeliveryType.READY_TO_SHIP
});


const editingCard = ref<CardCreationData | null>(null);
const error = ref<string | null>(null);
const success = ref<string | null>(null);
const showStockFormFor = ref<number|null>(null);
const stockCount = ref<number>(0);

const fetchAllCards = async () => {
  error.value = null;
  success.value = null;
  try {
    const res = await api.admin.searchCards({});
    cards.value = res.data;
  } catch (err: any) {
    error.value = err.response?.data || 'Failed to fetch cards';
  }
};

const addNewCard = async () => {
  error.value = null;
  success.value = null;
  try {
    await api.admin.addCard(newCard.value);
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
  stockCount.value = 0;
};

const cancelStockForm = () => {
  showStockFormFor.value = null;
  stockCount.value = 0;
};

const addStockItems = async (cardId: number) => {
  error.value = null;
  success.value = null;
  try {
    // Split codes by comma, newline, or space, and filter out empty strings
    if (!stockCount.value > 0) {
      error.value = 'Count must be greater than 0';
      return;
    }
    await api.admin.addStockItems({ cardId, count: stockCount.value });
    success.value = `Added ${stockCount.value} stock item(s) to card.`;
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
      <input v-model="newCard.isActive" placeholder="Active" type="checkbox" />
      <button type="submit">Add Card</button>
    </form>

    <h4 style="margin-top: 2rem;">Existing Cards</h4>
    <ul>
      <li v-for="card in cards?.content" :key="card.id" style="margin-bottom: 1rem;">
        {{ card.title }} (ID: {{ card.id }})
        <button @click="startEditing(card)">Edit</button>
        <template v-if="card?.deliveryType === DeliveryType.READY_TO_SHIP">
          <button @click="openStockForm(card.id)">Add Stock Items</button>
        </template>
        <!-- <button @click="deleteCard(card.id)">Delete</button> -->
        <div v-if="showStockFormFor === card.id" style="margin-top: 1rem; border: 1px solid #aaa; padding: 1rem;">
          <h5>Add Stock Items to {{ card.title }}</h5>
          <input v-model="stockCount" type="number" placeholder="Count" required></input>
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
        <input v-model="editingCard.isActive" type="checkbox" placeholder="Active" required />
        <!-- <button @click="updateCard">Save Changes</button> -->
        <button type="button" @click="cancelEditing">Cancel</button>
      </form>
    </div>

    <div v-if="error" style="color: red; margin-top: 1rem;">{{ error }}</div>
    <div v-if="success" style="color: green; margin-top: 1rem;">{{ success }}</div>
  </div>
</template> 