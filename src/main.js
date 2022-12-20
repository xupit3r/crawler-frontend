import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { useStaticStore } from './stores/static';
import { useSocket } from '@/utils/socket';

import App from '@/App.vue';
import router from '@/router';

import '@/assets/main.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);

const { socketSend } = useSocket();
const staticStore = useStaticStore();

if (!staticStore.ready.tf) {
  socketSend({type: 'tf'});
}

app.mount('#app');
