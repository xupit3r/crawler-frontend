import { createRouter, createWebHashHistory } from 'vue-router';

import Dashboard from '@/views/Dashboard.vue';
import Sites from '@/views/Sites.vue';
import Pages from '@/views/Pages.vue';
import Queue from '@/views/Queue.vue';
import Cooldown from '@/views/Cooldown.vue';
import Page from '@/views/Page.vue';
import Site from '@/views/Site.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [{
    path: '/',
    name: 'dashboard',
    component: Dashboard
  }, {
    path: '/sites',
    name: 'sites',
    component: Sites
  }, {
    path: '/pages',
    name: 'pages',
    component: Pages
  }, {
    path: '/queue',
    name: 'queue',
    component: Queue
  }, {
    path: '/cooldown',
    name: 'cooldown',
    component: Cooldown
  }, {
    path: '/page/:id',
    name: 'page',
    component: Page
  }, {
    path: '/site/:id',
    name: 'site',
    component: Site
  }]
})

export default router
