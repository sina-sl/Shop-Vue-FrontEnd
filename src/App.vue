<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useApiClient } from '@/api/ApiClient';

const router = useRouter();
const api = useApiClient();

// Provide the API client plugin globally (key: 'main', baseURL: '/')

const handleLogout = async () => {
  try {
    await api.auth.logout();
    // Redirect to landing page after successful logout
    router.push('/');
  } catch (error) {
    console.error('Logout failed:', error);
    // Even if API call fails, try to redirect for better UX
    router.push('/');
  }
};
</script>

<template>
  <div>
    <nav style="padding: 1rem; background: #f5f5f5; display: flex; gap: 1rem;">
      <router-link to="/">Landing</router-link>
      <router-link to="/auth">Auth</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
      <button @click="handleLogout" style="margin-left: auto;">Logout</button>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
