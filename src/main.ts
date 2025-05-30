import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import axios from 'axios';
import VueAxios from 'vue-axios';

// Import the ApiClient plugin directly
import { ApiClient } from '@/api/ApiClient';

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);
// Install the ApiClient plugin, providing the base URL
app.use(ApiClient, { baseURL: 'http://localhost:8080' });

app.mount('#app'); 