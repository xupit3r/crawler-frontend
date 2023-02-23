<script setup>
import { reactive, computed } from 'vue';
import RainbowNav from '@/components/RainbowNav.vue';
import SiteCard from '@/components/SiteCard.vue';
import { useSitesStore } from '@/stores/sites';
import Loader from '@/components/Loader.vue';
import Search from '@/components/Search.vue';
import ListLimited from '@/components/ListLimited.vue';

const sitesStore = useSitesStore();

const state = reactive({
  loading: true,
  show: 100,
  filterText: ''
});

const shownSites = computed(() => {
  const entries = (state.filterText
    ? sitesStore.sites.filter(site => site.name.indexOf(state.filterText) > -1)
    : sitesStore.sites
  );

  return entries.slice(0, state.show);
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
  <RainbowNav />
  <Loader v-if="state.loading" />
  <Search v-if="!state.loading"
          :term="state.filterText"
          :triggerSearch="triggerSearch"
          :clearSearch="clearSearch" />
  <ListLimited v-if="!state.loading" :showMore="showMore">
    <SiteCard v-for="site in shownSites" :site="site" />
  </ListLimited>
</template>