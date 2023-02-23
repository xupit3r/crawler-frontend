<script setup>
import { reactive, computed } from 'vue';
import debounce from 'debounce';
import RainbowNav from '@/components/RainbowNav.vue';
import PageCard from '@/components/PageCard.vue';
import PageSuggestionTag from '@/components/PageSuggestionTag.vue';
import Loader from '@/components/Loader.vue';
import { usePagesStore } from '@/stores/pages';
import Search from '@/components/Search.vue';

const pagesStore = usePagesStore();

const state = reactive({
  limit: 50,
  searched: false,
  filtering: false,
  requestingSuggestions: false
});

const hasTerm = computed(() => {
  return pagesStore.filter.textSearch.length > 0;
});

const clearSearch = () => {
  pagesStore.filter.textSearch = '';
  state.searched = false;
  state.filtering = false;
  pagesStore.results.pages = [];
  pagesStore.results.suggestions = [];
}

const doSearch = debounce(() => {
  const term = pagesStore.filter.textSearch.toLowerCase();
  
  if (term.length > 0) {
    state.searched = true;
    state.filtering = true;
    pagesStore.getPageResults(term)
              .then(() => state.filtering = false);
  }

  if (term.length > 5) {
    state.requestingSuggestions = true;
    pagesStore.getSuggestions(term)
              .then(() => state.requestingSuggestions = false);
  }
}, 100);

const triggerSearch = (ev) => {
  pagesStore.filter.textSearch = ev.target.value;
  doSearch();
};

const setSearchTerm = (suggestion) => () => {
  pagesStore.filter.textSearch = suggestion;
  doSearch();
}

if (pagesStore.filter.textSearch.length > 0) {
  state.searched = true;
}
</script>

<template>
  <RainbowNav />
  <Search :term="pagesStore.filter.textSearch" 
          :triggerSearch="triggerSearch" 
          :clearSearch="clearSearch" />

  <div v-if="pagesStore.results.suggestions.length"
       class="content-flex column search-suggestions">

    <h3>Some other suggested terms</h3>
    <div v-if="!state.requestingSuggestions" 
         class="content-flex row row-wrap">
      <PageSuggestionTag v-for="suggestion in pagesStore.results.suggestions" 
                         :suggestion="suggestion"
                         :doThing="setSearchTerm(suggestion)"/>  
    </div>
    <div v-else class="suggestions-loading">
      <Loader />
      <span>loading suggestions</span>
    </div>
  </div>

  <div v-if="!state.filtering && hasTerm" 
       class="content-flex row row-wrap">
    <PageCard v-for="page in pagesStore.results.pages" :page="page" />
  </div>
</template>