import { createRouter, createWebHashHistory } from 'vue-router';

import Dashboard from '@/views/Dashboard.vue';
import Sites from '@/views/Sites.vue';
import Pages from '@/views/Pages.vue';
import Queue from '@/views/Queue.vue';
import Cooldown from '@/views/Cooldown.vue';
import Page from '@/views/Page.vue';
import Site from '@/views/Site.vue';

const routes = [{
  path: '/',
  name: 'dashboard',
  component: Dashboard,
  meta: {
    parent: null
  }
}, {
  path: '/sites',
  name: 'sites',
  component: Sites,
  meta: {
    parent: 'dashboard'
  }
}, {
  path: '/sites/:id',
  name: 'site',
  component: Site,
  meta: {
    parent: 'sites'
  }
}, {
  path: '/pages',
  name: 'pages',
  component: Pages,
  meta: {
    parent: 'dashboard'
  }
}, {
  path: '/pages/:id',
  name: 'page',
  component: Page,
  meta: {
    parent: 'pages'
  }
}, {
  path: '/queue',
  name: 'queue',
  component: Queue,
  meta: {
    parent: 'dashboard'
  }
}, {
  path: '/cooldown',
  name: 'cooldown',
  component: Cooldown,
  meta: {
    parent: 'dashboard'
  }
}];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});

// set the current path for the rainbow nav
router.beforeEach((to) => {
  const path = [ to.name ];

  // like fry, i am my own parent...
  let parent = to.name;

  do {
    const route = routes.find(r => r.name === parent);
    parent = route.meta.parent;

    if (route !== null && parent !== null) {
      path.push(route.meta.parent);
    }
  } while (parent !== null)

  to.meta.nav = path.reverse().map((p, idx) => ({
    title: p.toUpperCase(),
    to: idx !== path.length -1 ? p : ''
  }));
});

export default router
