<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import {useApiClient} from '@/api/ApiClient';
import {ProductCreationData, ProductWithStockCountDto, Page, PricingType, PrepStatus, ProductType} from "@/api/types.ts";

const api = useApiClient();

const products = ref<Page<ProductWithStockCountDto> | null>(null);
const newProduct = ref<ProductCreationData>({
  code: '',
  title: '',
  price: 0,
  imageUrl: '',
  isActive: false,
  description: '',
  pricingType: PricingType.LOCAL,
  prepStatus: PrepStatus.READY_TO_SHIP,
  productType: ProductType.DIGITAL
});


const editingProduct = ref<(Partial<ProductCreationData> & {id: number}) | null>(null);
const error = ref<string | null>(null);
const success = ref<string | null>(null);
const showStockFormFor = ref<number|null>(null);
const stockCount = ref<number>(0);

const fetchAllProducts = async () => {
  error.value = null;
  success.value = null;
  try {
    const res = await api.admin.searchProducts({});
    products.value = res.data;
  } catch (err: any) {
    error.value = err.response?.data || 'Failed to fetch products';
  }
};

const addNewProduct = async () => {
  error.value = null;
  success.value = null;
  try {
    await api.admin.addProduct(newProduct.value);
    success.value = 'Product added successfully!';
    newProduct.value = { 
      title: '', 
      description: '', 
      price: 0, 
      code: '', 
      imageUrl: '', 
      isActive: false, 
      pricingType: PricingType.LOCAL,
      prepStatus: PrepStatus.READY_TO_SHIP,
      productType: ProductType.DIGITAL
    };
    fetchAllProducts(); // Refresh list
  } catch (err: any) {
    error.value = err.response?.data || 'Failed to add product';
  }
};

const startEditing = (product: ProductWithStockCountDto) => {
  editingProduct.value = { ...product }; // Create a copy for editing
};

const cancelEditing = () => {
  editingProduct.value = null;
};

const openStockForm = (productId: number) => {
  showStockFormFor.value = productId;
  stockCount.value = 0;
};

const cancelStockForm = () => {
  showStockFormFor.value = null;
  stockCount.value = 0;
};

const addStockItems = async (productId: number) => {
  error.value = null;
  success.value = null;
  try {
    // Split codes by comma, newline, or space, and filter out empty strings
    if (stockCount.value <= 0) {
      error.value = 'Count must be greater than 0';
      return;
    }
    await api.admin.addStockItems({ productId, count: stockCount.value });
    success.value = `Added ${stockCount.value} stock item(s) to product.`;
    cancelStockForm();
    fetchAllProducts();
  } catch (err: any) {
    error.value = err.response?.data || 'Failed to add stock items';
  }
};

// You would need backend endpoints for updating/deleting products
// const updateProduct = async () => { /* ... */ };
// const deleteProduct = async (id: number) => { /* ... */ };

onMounted(fetchAllProducts);

</script>

<template>
  <div>
    <h3>Admin Product Management</h3>
    <h4>Add New Product</h4>
    <form @submit.prevent="addNewProduct" style="display: flex; flex-direction: column; gap: 0.5rem;">
      <input v-model="newProduct.title" placeholder="Title" required />
      <textarea v-model="newProduct.description" placeholder="Description" required></textarea>
      <input v-model="newProduct.price" type="number" placeholder="Price" required />
      <input v-model="newProduct.code" placeholder="Code" required />
      <input v-model="newProduct.imageUrl" placeholder="Image URL" required />
      <input v-model="newProduct.isActive" placeholder="Active" type="checkbox" />
      <button type="submit">Add Product</button>
    </form>

    <h4 style="margin-top: 2rem;">Existing Products</h4>
    <ul>
      <li v-for="product in products?.content" :key="product.id" style="margin-bottom: 1rem;">
        {{ product.title }} (ID: {{ product.id }})
        <button @click="startEditing(product)">Edit</button>
        <template v-if="product?.prepStatus === PrepStatus.READY_TO_SHIP">
          <button @click="openStockForm(product.id)">Add Stock Items</button>
        </template>
        <!-- <button @click="deleteProduct(product.id)">Delete</button> -->
        <div v-if="showStockFormFor === product.id" style="margin-top: 1rem; border: 1px solid #aaa; padding: 1rem;">
          <h5>Add Stock Items to {{ product.title }}</h5>
          <input v-model="stockCount" type="number" placeholder="Count" required></input>
          <div style="margin-top: 0.5rem;">
            <button @click="addStockItems(product.id)">Submit</button>
            <button @click="cancelStockForm" style="margin-left: 0.5rem;">Cancel</button>
          </div>
        </div>
      </li>
    </ul>

    <div v-if="editingProduct" style="margin-top: 2rem; border: 1px solid #ccc; padding: 1rem;">
      <h4>Edit Product (ID: {{ editingProduct.id }})</h4>
      <form style="display: flex; flex-direction: column; gap: 0.5rem;">
        <input v-model="editingProduct.title" placeholder="Title" required />
        <textarea v-model="editingProduct.description" placeholder="Description" required></textarea>
        <input v-model="editingProduct.price" type="number" placeholder="Price" required />
        <input v-model="editingProduct.code" placeholder="Code" required />
        <input v-model="editingProduct.imageUrl" placeholder="Image URL" required />
        <input v-model="editingProduct.isActive" type="checkbox" placeholder="Active" required />
        <!-- <button @click="updateProduct">Save Changes</button> -->
        <button type="button" @click="cancelEditing">Cancel</button>
      </form>
    </div>

    <div v-if="error" style="color: red; margin-top: 1rem;">{{ error }}</div>
    <div v-if="success" style="color: green; margin-top: 1rem;">{{ success }}</div>
  </div>
</template> 