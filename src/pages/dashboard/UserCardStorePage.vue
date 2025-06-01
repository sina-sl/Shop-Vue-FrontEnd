<template>
  <h3>Product Store</h3>
  <div v-if="isLoading">Loading products...</div>
  <ul>
    <li v-for="product in products?.content" :key="product.id">
      {{ product.title }} - ${{ product.price }}
      <span v-if="product.availableStockCount" style="color: green; margin-left: 0.5em; margin-right: .5em">Available</span>
      <button :disabled="!product.availableStockCount || ordering === product.id" @click="orderProduct(product)">Buy</button>
      <div v-if="ordering === product.id">Ordering...</div>
    </li>
  </ul>
  <div v-if="error">{{ error }}</div>
</template>

<script lang="ts" setup>
import {ProductWithStockCountDto, Page} from "@/api/types.ts";
import {ref, onMounted} from 'vue';
import {useApiClient} from '@/api/ApiClient';

const api = useApiClient();
const products = ref<Page<ProductWithStockCountDto> | null>(null);
const isLoading = ref(false);
const error = ref<string | null>(null);
const ordering = ref<number | null>(null);

const fetchProducts = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const res = await api.product.searchActiveProducts({});
    products.value = res.data;
  } catch (err: any) {
    error.value = err.response?.data || 'Failed to fetch products';
  } finally {
    isLoading.value = false;
  }
};

const orderProduct = async (product: ProductWithStockCountDto) => {
  ordering.value = product.id;
  try {
    await api.order.createOrder(product.id);
    // handle success
  } catch (err: any) {
    error.value = err.response?.data || 'Failed to order product';
  } finally {
    ordering.value = null;
  }
};

onMounted(fetchProducts);
</script>

<style scoped>
/* Component-specific styles */
</style> 