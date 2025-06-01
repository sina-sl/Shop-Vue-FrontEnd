<template>
  <div>
    <h1>My Purchased Products</h1>
    <div v-if="loading">Loading purchased products...</div>
    <div v-if="error">Error loading purchased products: {{ error.message }}</div>
    <div v-if="purchasedProducts" class="purchased-products-list">
      <div v-for="item in purchasedProducts" :key="item.id" class="purchased-product-item">
        <h2>{{ item.productTitle }}</h2>
        <p>Unique Code: {{ item.uniqueCode }}</p>
        <p>Purchase Date: {{ item.purchaseDate }}</p>
        <!-- Display other relevant purchased product details -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { Order } from '@/api/types.ts';

const purchasedProducts = ref<Order[] | null>(null);
const loading = ref(false);
const error = ref<any>(null);

const fetchPurchasedProducts = async () => {
  loading.value = true;
  error.value = null;
  try {
    // Replace with actual API call for purchased products
    // const res = await api.product.getPurchasedProducts();
    // purchasedProducts.value = res.data;
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchPurchasedProducts);
</script>

<style scoped>
.purchased-products-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.purchased-product-item {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  width: 200px;
}
</style> 