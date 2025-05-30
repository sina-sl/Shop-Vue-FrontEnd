<template>
  <div>
    <h3>User Profile</h3>
    <div v-if="error" style="color: red;">{{ error }}</div>
    <div v-else-if="!profile">
      Loading...
    </div>
    <div v-else>
      <ul>
        <li><strong>ID:</strong> {{ profile.id }}</li>
        <li><strong>Name:</strong> {{ profile.name }}</li>
        <li><strong>Email:</strong> {{ profile.email }}</li>
        <li><strong>Role:</strong> {{ profile.role }}</li>
        <li><strong>Created At:</strong> {{ profile.createdAt }}</li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useApiClient } from '@/api/ApiClient';
import type { UserProfileResponse } from '@/api/UserApi';

const api = useApiClient();

const profile = ref<UserProfileResponse | null>(null);
const error = ref('');

const fetchProfile = async () => {
  error.value = '';
  try {
    const res = await api.user.getProfile();
    profile.value = res.data;
  } catch (e: any) {
    error.value = e.response?.data || 'Failed to fetch profile';
  }
};

onMounted(fetchProfile);
</script> 