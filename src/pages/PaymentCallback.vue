<template>
  <div>
    <h1>Payment Verification</h1>
    <div v-if="loading">Verifying your payment...</div>
    <div v-if="successMessage">{{ successMessage }}</div>
    <div v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useApiClient } from '@/api/ApiClient';

const api = useApiClient();
const route = useRoute();
const loading = ref(true);
const successMessage = ref<string | null>(null);
const errorMessage = ref<string | null>(null);

const handleCallback = async () => {
  const authority = route.query.Authority as string | undefined;
  const status = route.query.Status as string | undefined;
  const orderId = route.query.orderId as string | undefined;

  if (!authority || !status) {
    errorMessage.value = 'Missing payment parameters.';
    loading.value = false;
    return;
  }

  try {
    const res = await api.payment.verifyPayment({
      status,
      orderId,
      authority
    });
    successMessage.value = res.data; // Assuming backend returns a success message
  } catch (err) {
    errorMessage.value = (err as Error).message;
  } finally {
    loading.value = false;
  }
};

onMounted(handleCallback);
</script> 