<script setup>
import { reactive, computed } from 'vue';
import RainbowNav from '@/components/RainbowNav.vue';
import SiteCard from '@/components/SiteCard.vue';
import { useSitesStore } from '@/stores/sites';
import Loader from '@/components/Loader.vue';
import Search from '@/components/Search.vue';

const sitesStore = useSitesStore();

const state = reactive({
  loading: true,
  show: 100,
  filterText: ''
});

const nav = [{
  title: 'Dashboard',
  to: 'dashboard'
}, {
  title: 'Sites',
  to: 'sites'
}];

const shownSites = computed(() => {
  if (state.filterText) {
    return sitesStore.sites.filter(site => {
      return site.name.indexOf(state.filterText) > -1
    });
  }

  return sitesStore.sites.slice(0, state.show);
});

function showMore () {
  state.show = state.show + 100;
}

const triggerSearch = (ev) => {
  state.filterText = ev.target.value;
}

const clearSearch = () => state.filterText = '';

sitesStore.getSites().finally(() => state.loading = false);
</script>

<template>
  <RainbowNav :nav="nav" />
  <Loader v-if="state.loading" />
  <Search v-if="!state.loading"
          :term="state.filterText"
          :triggerSearch="triggerSearch"
          :clearSearch="clearSearch" />

  <div v-if="!state.loading " class="content-flex row row-wrap">
    <SiteCard v-for="site in shownSites" :site="site" />
  </div>
  <div v-if="!state.loading" class="content-centered content-actions">
    <button class="" @click="showMore">More</button>
  </div>
</template>