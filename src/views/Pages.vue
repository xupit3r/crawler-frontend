<script setup>
import { reactive, toRef } from 'vue';
import { debounce } from 'debounce';
import RainbowNav from '@/components/RainbowNav.vue';
import PageCard from '@/components/PageCard.vue';
import { usePagesStore } from '@/stores/pages';
import { useFilter } from '@/composables/filter';
import Loader from '@/components/Loader.vue';

const pagesStore = usePagesStore();

const state = reactive({
  loading: true,
  limit: 100
});

const nav = [{
  title: 'Dashboard',
  to: 'dashboard'
}, {
  title: 'Pages',
  to: 'pages'
}];

const filterPredicate = (page) => {
  const filterResult = {
    textSummary: true,
    textSentiment: true,
    textSearch: false
  };

  if (pagesStore.filter.textSearch.length > 2) {
    filterResult.textSearch = page.url.indexOf(pagesStore.filter.textSearch) > -1;
  } else {
    filterResult.textSearch = true;
  }

  if (pagesStore.filter.textSummary) {
    filterResult.textSummary = page.summarized || false;
  }

  if (pagesStore.filter.textSentiment) {
    filterResult.textSentiment = page.sentiment || false;
  }

  return (
    filterResult.textSummary && 
    filterResult.textSentiment && 
    filterResult.textSearch
  );
}

const { filterState, doFilter } = useFilter(toRef(pagesStore, 'pages'), filterPredicate, state.limit);

const doTextFilter = debounce((ev) => {
  pagesStore.filter.textSearch = ev.target.value;
  doFilter();
}, 250);

const toggleTextSummary = () => {
  pagesStore.filter.textSummary = !pagesStore.filter.textSummary;
  doFilter();
};

const toggleTextSentiment = () => {
  pagesStore.filter.textSentiment = !pagesStore.filter.textSentiment;
  doFilter();
};

if (!pagesStore.pages.length) {
  pagesStore.getPages().finally(() => {
    doFilter();
    state.loading = false;
  });
} else {
  doFilter();
  state.loading = false;
}
</script>

<template>
  <RainbowNav :nav="nav" />
  <Loader v-if="state.loading" />
  <div v-if="!state.loading" class="content-actions actions search">
    <div class="input-field">
      <label class="label">Filter</label>
      <input type="text" 
             name="search" 
             class="input-search"
             :disabled="filterState.isFiltering" 
             :value="pagesStore.filter.textSearch" 
             @input.stop="doTextFilter" />
    </div>
    
    <div class="search-checkboxes">
      <div class="input-checkbox">
        <label class="label">
          <input type="checkbox" 
                 name="textSummary" 
                 class="checkbox-search"
                 :disabled="filterState.isFiltering"
                 :checked="pagesStore.filter.textSummary"
                 @click.stop="toggleTextSummary" />
          <span>Includes Text Summary</span>
        </label>
      </div>
  
      <div class="input-checkbox">
        <label class="label">
          <input type="checkbox" 
                 name="textSentiment" 
                 class="checkbox-search"
                 :disabled="filterState.isFiltering"
                 :checked="pagesStore.filter.textSentiment"
                 @click.stop="toggleTextSentiment" />
          <span>Includes Text Sentiment</span>
        </label>
      </div>
    </div>
  </div>

  <div v-if="filterState.isFiltering" class="content-centered content-actions">
    <Loader />
  </div>
  <div v-else class="content-flex row row-wrap">
    <PageCard v-for="page in filterState.results" :page="page" />
  </div>
</template>