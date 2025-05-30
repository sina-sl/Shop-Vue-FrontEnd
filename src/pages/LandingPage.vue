<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<template>
  <div style="text-align:center; margin-top: 3rem;">
    <h1>Welcome to Card Sealing</h1>
    <p>This is the landing page.</p>
    <button @click="router.push('/auth')">Login / Signup</button>
    <button @click="router.push('/dashboard')">Dashboard</button>
  </div>
</template> 