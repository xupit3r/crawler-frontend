<script setup>
import { reactive, computed } from 'vue';
import RainbowNav from '@/components/RainbowNav.vue';
import PageCard from '@/components/PageCard.vue';
import { usePagesStore } from '@/stores/pages';
import { useFilter } from '@/composables/filter';
import Loader from '@/components/Loader.vue';

const pagesStore = usePagesStore();

const staticState = {
  pages: [],
  texts: []
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
  let pageIds = {};

  if (state.searched) {
    const term = pagesStore.filter.textSearch.toLowerCase();
    
    pageIds = staticState.texts.filter(doc => {
      return doc.text.indexOf(term) > -1;
    }).map(doc => doc.page).reduce((h, pageId) => {
      return h[pageId] = true, h;
    }, {});
  }

  return staticState.pages.filter((page) => {
    const filterResult = {
      textSummary: true,
      textSentiment: true,
      textSearch: true
    };

    if (state.searched) {
      filterResult.textSearch = !!pageIds[page._id];
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
  });
}

const { filterState, doFilter } = useFilter(
  filterResults, 
  state.limit
);

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

const toggleTextSummary = () => {
  pagesStore.filter.textSummary = !pagesStore.filter.textSummary;
  doFilter();
};

const toggleTextSentiment = () => {
  pagesStore.filter.textSentiment = !pagesStore.filter.textSentiment;
  doFilter();
};

Promise.all([
  pagesStore.getPages(),
  pagesStore.getPageTexts()
]).then(([pages, texts]) => {
  staticState.pages = pages;
  staticState.texts = texts.map(doc => {
    return {
      page: doc.page,
      text: doc.text.map(pageText => pageText.text.toLowerCase()).join(' ')
    };
  });

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
      <button v-if="showClear" @click="clearSearch">Clear</button>
      <button @click="doSearch" :disabled="filterState.isFiltering">Query</button>
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