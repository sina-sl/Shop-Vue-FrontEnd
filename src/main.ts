import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';

import axios from "axios";
import VueAxios from 'vue-axios';

import { ApiClient } from '@/api/ApiClient';

const app = createApp(App);
app.use(router);
app.use(ApiClient);

app.use(VueAxios, axios);

app.mount('#app'); 