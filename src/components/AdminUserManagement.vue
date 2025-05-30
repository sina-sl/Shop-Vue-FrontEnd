<script lang="ts" setup>
// This component will handle listing users and changing roles
// It requires backend endpoints for:
// - GET /admin/users (list all users)
// - PATCH /admin/users/{id}/role (change user role)

import { ref, onMounted } from 'vue';
import { useApiClient } from '@/api/ApiClient';
import type { UserProfileResponse } from '@/api/UserApi'; // Assuming backend returns UserProfileResponse for admin list

const api = useApiClient();

const users = ref<UserProfileResponse[]>([]);
const error = ref<string | null>(null);
const success = ref<string | null>(null);
const selectedUser = ref<UserProfileResponse | null>(null);
const newRole = ref('');

const fetchAllUsers = async () => {
  error.value = null;
  success.value = null;
  try {
    // You will need to implement this backend endpoint:
    // const res = await api.user.getAllUsers(); // Assuming this method exists or similar
    // users.value = res.data;
    console.log('Fetching all users (backend endpoint needed)...');
    // Placeholder data for now
     users.value = [
       { id: 1, email: 'admin@example.com', role: 'ADMIN', createdAt: '', provider: 'local' },
       { id: 2, email: 'user@example.com', role: 'USER', createdAt: '', provider: 'local' },
     ];

  } catch (err: any) {
    error.value = err.response?.data || 'Failed to fetch users';
  }
};

const startEditingRole = (user: UserProfileResponse) => {
  selectedUser.value = user;
  newRole.value = user.role;
};

const cancelEditingRole = () => {
  selectedUser.value = null;
  newRole.value = '';
};

const updateRole = async () => {
  error.value = null;
  success.value = null;
  if (!selectedUser.value || !newRole.value) return;

  try {
    // You will need to implement this backend endpoint:
    // await api.user.updateUserRole(selectedUser.value.id, { role: newRole.value });
    success.value = `Role for ${selectedUser.value.email} updated to ${newRole.value}!`;
    cancelEditingRole();
    fetchAllUsers(); // Refresh list

  } catch (err: any) {
     error.value = err.response?.data || 'Failed to update user role';
  }
};

onMounted(fetchAllUsers);

</script>

<template>
  <div>
    <h4>Manage Users</h4>
    <ul>
      <li v-for="user in users" :key="user.id" style="margin-bottom: 0.5rem;">
        {{ user.email }} (Role: {{ user.role }})
        <button @click="startEditingRole(user)">Change Role</button>
      </li>
    </ul>

    <div v-if="selectedUser" style="margin-top: 1.5rem; border: 1px solid #ccc; padding: 1rem;">
      <h4>Change Role for {{ selectedUser.email }}</h4>
      <select v-model="newRole">
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
      </select>
      <button @click="updateRole" style="margin-left: 0.5rem;">Save</button>
      <button type="button" @click="cancelEditingRole" style="margin-left: 0.5rem;">Cancel</button>
    </div>

    <div v-if="error" style="color: red; margin-top: 1rem;">{{ error }}</div>
    <div v-if="success" style="color: green; margin-top: 1rem;">{{ success }}</div>
  </div>
</template> 