import { createRouter, createWebHashHistory } from 'vue-router';

import Dashboard from '@/views/Dashboard.vue';
import Pages from '@/views/Pages.vue';
import Links from '@/views/Links.vue';
import Queue from '@/views/Queue.vue';
import Cooldown from '@/views/Cooldown.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [{
    path: '/',
    name: 'dashboard',
    component: Dashboard
  }, {
    path: '/pages',
    name: 'pages',
    component: Pages
  }, {
    path: '/links',
    name: 'links',
    component: Links
  }, {
    path: '/queue',
    name: 'queue',
    component: Queue
  }, {
    path: '/cooldown',
    name: 'cooldown',
    component: Cooldown
  }]
})

export default router
