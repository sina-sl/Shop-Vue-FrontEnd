<template>
  <div>
    <h2>User Profile Plugin</h2>
    <button @click="fetchProfile">Get Profile</button>
    <div v-if="profile">
      <pre>{{ profile }}</pre>
    </div>
    <div v-if="error" style="color:red">{{ error }}</div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
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
</script> 