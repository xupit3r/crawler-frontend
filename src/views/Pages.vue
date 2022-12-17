<script setup>
import { reactive, computed } from 'vue';
import RainbowNav from '@/components/RainbowNav.vue';
import PageCard from '@/components/PageCard.vue';
import { usePagesStore } from '@/stores/pages';
import { useFilter } from '@/composables/filter';
import { useSearch } from '@/composables/search';
import Loader from '@/components/Loader.vue';

const pagesStore = usePagesStore();

const staticState = {
  pages: {}
};

const state = reactive({
  loading: true,
  limit: 50,
  searched: false
});

const nav = [{
  title: 'Dashboard',
  to: 'dashboard'
}, {
  title: 'Pages',
  to: 'pages'
}];

const filterResults = () => {
  const term = pagesStore.filter.textSearch.toLowerCase();
  
  if (term.length > 0) {
    return search(term).map((doc) => {
      return staticState.pages[doc.id];
    });
  }

  return [];
}

const { filterState, doFilter } = useFilter(
  filterResults, 
  state.limit
);

const { addDocuments, search } = useSearch();

const showClear = computed(() => {
  return state.searched && pagesStore.filter.textSearch.length > 0;
});

const clearSearch = () => {
  pagesStore.filter.textSearch = '';
  state.searched = false;
  doFilter();
}

const doSearch = () => {
  doFilter();
  state.searched = true;
}

const collectText = (ev) => {
  pagesStore.filter.textSearch = ev.target.value;
}

Promise.all([
  pagesStore.getPages(),
  pagesStore.getPageTexts()
]).then(([pages, texts]) => {
  staticState.pages = pages.reduce((h, page) => {
    return h[page._id] = page, h;
  }, {});

  // add the documents to the search corpus
  addDocuments(texts.map(doc => {
    return {
      page: doc.page,
      text: doc.text.map(pageText => pageText.text.toLowerCase()).join(' ')
    };
  }), 'page');

  doFilter();
  state.searched = pagesStore.filter.textSearch.length > 0;
  state.loading = false;
});
</script>

<template>
  <RainbowNav :nav="nav" />
  <Loader v-if="state.loading" />
  <div v-if="!state.loading" class="content-actions actions search">
    <div class="input-field search-field">
      <label class="label">Search</label>
      <input type="text" 
             name="search" 
             class="input-search"
             :disabled="filterState.isFiltering" 
             :value="pagesStore.filter.textSearch"
             @input.stop="collectText" />
      <button v-if="showClear" class="clear-button" @click="clearSearch">&#215;</button>
      <button @click="doSearch" :disabled="filterState.isFiltering">Query</button>
    </div>
  </div>

  <div v-if="filterState.isFiltering" class="content-centered content-actions">
    <Loader />
  </div>
  <div v-else class="content-flex row row-wrap">
    <PageCard v-for="page in filterState.results" :page="page" />
  </div>
</template>