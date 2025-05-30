<template>
  <div>
    <h2>Auth Plugin</h2>
    <form @submit.prevent="handleSignup">
      <input v-model="signupEmail" placeholder="Signup Email" />
      <input v-model="signupPassword" type="password" placeholder="Signup Password" />
      <button type="submit">Sign Up</button>
    </form>
    <form @submit.prevent="handleLogin">
      <input v-model="loginEmail" placeholder="Login Email" />
      <input v-model="loginPassword" type="password" placeholder="Login Password" />
      <button type="submit">Login</button>
    </form>
    <button @click="handleRefresh">Refresh Token</button>
    <div v-if="token">Token: {{ token }}</div>
    <div v-if="error" style="color:red">{{ error }}</div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useApiClient } from '@/api/ApiClient';
import type { SignupRequest, LoginRequest, AuthResponse } from '@/api/ApiClient';

const api = useApiClient();

const signupEmail = ref('');
const signupPassword = ref('');
const loginEmail = ref('');
const loginPassword = ref('');
const error = ref('');
const token = ref('');

const handleSignup = async () => {
  error.value = '';
  try {
    const req: SignupRequest = { email: signupEmail.value, password: signupPassword.value };
    const res = await api.auth.signup(req);
    token.value = res.data.token;
  } catch (e: any) {
    error.value = e.response?.data?.token || 'Signup failed';
  }
};

const handleLogin = async () => {
  error.value = '';
  try {
    const req: LoginRequest = { email: loginEmail.value, password: loginPassword.value };
    const res = await api.auth.login(req);
    token.value = res.data.token;
  } catch (e: any) {
    error.value = e.response?.data?.token || 'Login failed';
  }
};

const handleRefresh = async () => {
  error.value = '';
  try {
    const res = await api.auth.refresh();
    token.value = res.data.token;
  } catch (e: any) {
    error.value = e.response?.data?.token || 'Refresh failed';
  }
};
</script> 