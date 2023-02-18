<script setup>
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import RainbowNav from '@/components/RainbowNav.vue';
import { useSitesStore } from '@/stores/sites';

const route = useRoute();
const sitesStore = useSitesStore();

const siteId = route.params.id;

const state = reactive({
  _id: '',
  name: ''
});

const nav = computed(() => {
  return [{
    title: 'Dashboard',
    to: 'dashboard'
  }, {
    title: 'Sites',
    to: 'sites'
  }, {
    title: state.name
  }]
});

sitesStore.getSite(siteId).then(site => {
  state._id = site._id;
  state.name = site.name;
});

</script>

<template>
  <RainbowNav :nav="nav" :visit="state.url" />
</template>