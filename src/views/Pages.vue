<script setup>
import { reactive, computed } from 'vue';
import { debounce } from 'debounce';
import RainbowNav from '@/components/RainbowNav.vue';
import PageCard from '@/components/PageCard.vue';
import { usePagesStore } from '@/stores/pages';
import Loader from '../components/Loader.vue';

const pagesStore = usePagesStore();

const state = reactive({
  loading: true,
  show: 100
});

const nav = [{
  title: 'Dashboard',
  to: 'dashboard'
}, {
  title: 'Pages',
  to: 'pages'
}];

const shownPages = computed(() => {
  return pagesStore.pages.filter(page => {
    const filterResult = {
      processedText: false,
      textSearch: false
    };

    if (pagesStore.filter.textSearch.length > 2) {
      filterResult.textSearch = page.url.indexOf(pagesStore.filter.textSearch) > -1;
    } else {
      filterResult.textSearch = true;
    }

    if (pagesStore.filter.processedText) {
      filterResult.processedText = page.text || false;
    } else {
      filterResult.processedText = true;
    }

    return filterResult.processedText && filterResult.textSearch;
  }).slice(0, state.show);
});

function showMore () {
  state.show = state.show + 100;
}

const doFilter = debounce((ev) => {
  pagesStore.filter.textSearch = ev.target.value;
}, 250);

const toggleProcessedText = () => {
  pagesStore.filter.processedText = !pagesStore.filter.processedText;
};

if (!pagesStore.pages.length) {
  pagesStore.getPages().finally(() => state.loading = false);
} else {
  state.loading = false;
}
</script>

<template>
  <RainbowNav :nav="nav" />
  <Loader v-if="state.loading" />
  <div v-if="!state.loading" class="content-actions actions">
    <div class="input-field">
      <label class="label">Filter</label>
      <input type="text" 
             name="search" 
             class="input-search" 
             :value="pagesStore.filter.textSearch" 
             @input.stop="doFilter" />
    </div>

    <div class="input-checkbox">
      <label class="label">
        <input type="checkbox" 
               name="preprocessedText" 
               class="checkbox-search" 
               :checked="pagesStore.filter.textSearch"
               @click.stop="toggleProcessedText" />
        <span>Includes Text Processing</span>
      </label>
    </div>
  </div>
  <div v-if="!state.loading " class="content-flex row row-wrap">
    <PageCard v-for="page in shownPages" :page="page" />
  </div>
  <div v-if="!state.loading" class="content-centered content-actions">
    <button class="" @click="showMore">More</button>
  </div>
</template>