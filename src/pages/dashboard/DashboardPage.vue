<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
// Removed component imports as they will be handled by router-view
// import UserProfilePlugin from '../components/UserProfilePlugin.vue';
// import CardsPlugin from '../components/CardsPlugin.vue';
// import OrdersPlugin from '../components/OrdersPlugin.vue';
// import AdminCardManagement from '../components/AdminCardManagement.vue';
// import AdminUserManagement from '../components/AdminUserManagement.vue';
import { useApiClient } from '@/api/ApiClient';
import type { UserProfileResponse } from '@/api/UserApi';
import { useRouter } from 'vue-router'; // Import useRouter

const api = useApiClient();
const userProfile = ref<UserProfileResponse | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);
const router = useRouter(); // Get router instance

const isAdmin = computed(() => userProfile.value?.role === 'ADMIN');

const fetchUserProfile = async () => {
    isLoading.value = true;
    error.value = null;
    try {
        const response = await api.user.getProfile();
        userProfile.value = response.data;
    } catch (err: any) {
        error.value = err.response?.data || 'Failed to fetch user profile.';
        // If fetching profile fails (e.g., not authenticated), redirect to auth
        router.push('/auth');
    } finally {
        isLoading.value = false;
    }
};

onMounted(fetchUserProfile);

</script>
<template>
  <div style="max-width: 900px; margin: 2rem auto;">
    <h2>Dashboard</h2>

    <div v-if="isLoading">Loading user profile...</div>
    <div v-else-if="error && !userProfile" style="color: red;">{{ error }}</div>
    <div v-else>
      <!-- User State Display -->
      <div v-if="userProfile">
        <p>Logged in as: {{ userProfile.email }} (Role: {{ userProfile.role }})</p>
      </div>

      <!-- Dashboard Navigation -->
      <nav style="margin-bottom: 1rem; padding: 0.5rem; background: #eee; display: flex; gap: 1rem;">
        <router-link :to="{ name: 'UserProfile' }">Profile</router-link>
        <template v-if="!isAdmin">
          <router-link :to="{ name: 'CardStore' }">Card Store</router-link>
          <router-link :to="{ name: 'UserCards' }">Cards</router-link>
          <router-link :to="{ name: 'UserOrders' }">Orders</router-link>
        </template>
        <template v-if="isAdmin">
          <router-link :to="{ name: 'AdminCardManagement' }">Manage Cards</router-link>
          <router-link :to="{ name: 'AdminOrders' }">Manage Orders</router-link>
          <router-link :to="{ name: 'AdminUserManagement' }">Manage Users</router-link>
        </template>
      </nav>

      <!-- Router View for Child Routes -->
      <router-view />

    </div>
  </div>
</template> 