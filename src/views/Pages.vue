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
  show: 100,
  filter: ''
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
    if (state.filter.length > 2) {
      return page.url.indexOf(state.filter) > -1;
    }

    return true;
  }).slice(0, state.show);
});

function showMore () {
  state.show = state.show + 100;
}

const doFilter = debounce((ev) => {
  state.filter = ev.target.value;
}, 250);

pagesStore.getPages().finally(() => state.loading = false);
</script>

<template>
  <RainbowNav :nav="nav" />
  <Loader v-if="state.loading" />
  <div v-if="!state.loading" class="content-actions">
    <label class="input-field">
      <div class="label">Filter</div>
      <input type="text" name="search" class="input-search" @input.stop="doFilter" />
    </label>
  </div>
  <div v-if="!state.loading " class="content-flex row row-wrap">
    <PageCard v-for="page in shownPages" :page="page" />
  </div>
  <div v-if="!state.loading" class="content-centered content-actions">
    <button class="" @click="showMore">More</button>
  </div>
</template>