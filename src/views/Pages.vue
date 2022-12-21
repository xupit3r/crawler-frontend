<script setup>
import { reactive, computed } from 'vue';
import debounce from 'debounce';
import RainbowNav from '@/components/RainbowNav.vue';
import PageCard from '@/components/PageCard.vue';
import { usePagesStore } from '@/stores/pages';

const pagesStore = usePagesStore();

const state = reactive({
  limit: 50,
  searched: false,
  filtering: false
});

const nav = [{
  title: 'Dashboard',
  to: 'dashboard'
}, {
  title: 'Pages'
}];

const showClear = computed(() => {
  return state.searched && pagesStore.filter.textSearch.length > 0;
});

const hasTerm = computed(() => {
  return pagesStore.filter.textSearch.length > 0;
});

const clearSearch = () => {
  pagesStore.filter.textSearch = '';
  state.searched = false;
  state.filtering = false;
  pagesStore.results.pages = [];
}

const doSearch = debounce(() => {
  const term = pagesStore.filter.textSearch.toLowerCase();
  
  if (term.length > 0) {
    state.searched = true;
    state.filtering = true;
    pagesStore.getPageResults(term)
              .then(() => state.filtering = false);
  }
}, 100);

const triggerSearch = (ev) => {
  pagesStore.filter.textSearch = ev.target.value;
  doSearch();
};

if (pagesStore.filter.textSearch.length > 0) {
  state.searched = true;
}
</script>

<template>
  <RainbowNav :nav="nav" />
  <div class="content-actions actions search">
    <div class="input-field search-field">
      <label class="label">Search</label>
      <input type="text" 
             name="search" 
             class="input-search"
             :value="pagesStore.filter.textSearch"
             @input.stop="triggerSearch" />
      <button v-show="showClear" class="clear-button" @click="clearSearch">&#215;</button>
    </div>
  </div>

  <div v-if="!state.filtering && hasTerm" class="content-flex row row-wrap">
    <PageCard v-for="page in pagesStore.results.pages" :page="page" />
  </div>
</template>