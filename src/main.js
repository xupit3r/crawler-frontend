import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useSocket } from '@/utils/socket';

import App from '@/App.vue';
import router from '@/router';

import '@/assets/main.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);

useSocket();

app.mount('#app');
