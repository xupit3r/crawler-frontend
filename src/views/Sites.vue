<script setup>
import { reactive, computed } from 'vue';
import RainbowNav from '@/components/RainbowNav.vue';
import SiteCard from '@/components/SiteCard.vue';
import { useSitesStore } from '@/stores/sites';
import Loader from '../components/Loader.vue';

const sitesStore = useSitesStore();

const state = reactive({
  loading: true,
  show: 100
});

const nav = [{
  title: 'Dashboard',
  to: 'dashboard'
}, {
  title: 'Sites',
  to: 'sites'
}];

const shownSites = computed(() => {
  return sitesStore.sites.slice(0, state.show);
});

function showMore () {
  state.show = state.show + 100;
}

sitesStore.getSites().finally(() => state.loading = false);
</script>

<template>
  <RainbowNav :nav="nav" />
  <Loader v-if="state.loading" />

  <div v-if="!state.loading " class="content-flex row row-wrap">
    <SiteCard v-for="site in shownSites" :site="site" />
  </div>
  <div v-if="!state.loading" class="content-centered content-actions">
    <button class="" @click="showMore">More</button>
  </div>
</template>