<script lang="ts" setup>
import { ref } from 'vue';
import { useApiClient } from '@/api/ApiClient';
import type { SignupRequest, LoginRequest } from '@/api/AuthApi';

const api = useApiClient();

const isLogin = ref(true);
const email = ref('');
const password = ref('');
const error = ref('');
const success = ref('');

const handleSubmit = async () => {
  error.value = '';
  success.value = '';
  try {
    if (isLogin.value) {
      const req: LoginRequest = { email: email.value, password: password.value };
      await api.auth.login(req);
      success.value = 'Login successful!';
    } else {
      const req: SignupRequest = { email: email.value, password: password.value };
      await api.auth.signup(req);
      success.value = 'Signup successful! You can now log in.';
      isLogin.value = true;
    }
  } catch (e: any) {
    error.value = e.response?.data?.token || 'Authentication failed';
  }
};
</script>
<template>
  <div style="max-width: 400px; margin: 3rem auto; text-align: center;">
    <h2>{{ isLogin ? 'Login' : 'Sign Up' }}</h2>
    <form @submit.prevent="handleSubmit" style="display: flex; flex-direction: column; gap: 1rem;">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</button>
    </form>
    <button @click="isLogin = !isLogin" style="margin-top: 1rem;">
      {{ isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login' }}
    </button>
    <div v-if="error" style="color: red; margin-top: 1rem;">{{ error }}</div>
    <div v-if="success" style="color: green; margin-top: 1rem;">{{ success }}</div>
    <div style="margin-top: 2rem;">
      <a href="/oauth2/authorization/google">
        <button>Login with Google</button>
      </a>
    </div>
  </div>
</template> 