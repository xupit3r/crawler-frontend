<script setup>
import { reactive, computed } from 'vue';
import { debounce } from 'debounce';
import RainbowNav from '@/components/RainbowNav.vue';
import PageCard from '@/components/PageCard.vue';
import { usePagesStore } from '@/stores/pages';
import Loader from '@/components/Loader.vue';

const pagesStore = usePagesStore();

const state = reactive({
  loading: true,
  filtering: false,
  show: 50,
  shownPages: []
});

const nav = [{
  title: 'Dashboard',
  to: 'dashboard'
}, {
  title: 'Pages',
  to: 'pages'
}];

const filterPages = () => {
  state.filtering = true;

  // give the browser a chance to render the loading 
  // indicator
  setTimeout(() => {
    const filtered = pagesStore.pages.filter(page => {
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
    }).slice(0, state.show);
  
    state.shownPages = filtered;
    state.filtering = false;
  }, 0);
};

function showMore () {
  state.show = state.show + 50;
  filterPages();
}

const doFilter = debounce((ev) => {
  pagesStore.filter.textSearch = ev.target.value;
  filterPages();
}, 250);

const toggleTextSummary = () => {
  pagesStore.filter.textSummary = !pagesStore.filter.textSummary;
  filterPages();
};

const toggleTextSentiment = () => {
  pagesStore.filter.textSentiment = !pagesStore.filter.textSentiment;
  filterPages();
};

if (!pagesStore.pages.length) {
  pagesStore.getPages().finally(() => {
    filterPages();
    state.loading = false;
  });
} else {
  filterPages();
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
             :disabled="state.filtering" 
             :value="pagesStore.filter.textSearch" 
             @input.stop="doFilter" />
    </div>
    
    <div class="search-checkboxes">
      <div class="input-checkbox">
        <label class="label">
          <input type="checkbox" 
                 name="textSummary" 
                 class="checkbox-search"
                 :disabled="state.filtering"
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
                 :disabled="state.filtering"
                 :checked="pagesStore.filter.textSentiment"
                 @click.stop="toggleTextSentiment" />
          <span>Includes Text Sentiment</span>
        </label>
      </div>
    </div>
  </div>
  <div v-if="!state.loading && !state.filtering" class="content-flex row row-wrap">
    <PageCard v-for="page in state.shownPages" :page="page" />
  </div>
  <div v-if="!state.loading && !state.filtering" class="content-centered content-actions">
    <button class="" @click="showMore">More</button>
  </div>
  <div v-if="state.filtering" class="content-centered content-actions">
    <Loader />
  </div>
</template>