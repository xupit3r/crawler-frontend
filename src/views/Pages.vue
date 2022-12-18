<script setup>
import { reactive, computed } from 'vue';
import debounce from 'debounce';
import RainbowNav from '@/components/RainbowNav.vue';
import PageCard from '@/components/PageCard.vue';
import Loader from '@/components/Loader.vue';
import { usePagesStore } from '@/stores/pages';
import { useStaticStore } from '@/stores/static';
import { useSocket } from '@/utils/socket';
import { useSearch } from '@/composables/search';

const pagesStore = usePagesStore();
const staticStore = useStaticStore();
const { socketSend } = useSocket();
const { search } = useSearch();

const state = reactive({
  loading: true,
  limit: 50,
  searched: false
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

const clearSearch = () => {
  pagesStore.filter.textSearch = '';
  state.searched = false;
  pagesStore.results.pages = [];
}

const doSearch = debounce(() => {
  const term = pagesStore.filter.textSearch.toLowerCase();
  
  if (term.length > 0) {
    const pageIds = search(term).slice(0, state.limit)
                                .map((doc) => doc.id);

    state.searched = true;
    pagesStore.getPageResults(pageIds)
              .then(() => state.filtering = false);
  }
}, 100);

const triggerSearch = (ev) => {
  pagesStore.filter.textSearch = ev.target.value;
  doSearch();
};

const isLoading = computed(() => !staticStore.ready.tf);

if (!staticStore.ready.tf) {
  socketSend({type: 'tf'});
}

if (staticStore.ready.tf) {
  doSearch();
}
</script>

<template>
  <RainbowNav :nav="nav" />
  <Loader v-if="isLoading" />
  <div v-if="!isLoading" class="content-actions actions search">
    <div class="input-field search-field">
      <label class="label">Search</label>
      <input type="text" 
             name="search" 
             class="input-search"
             :value="pagesStore.filter.textSearch"
             @input.stop="triggerSearch" />
      <button v-if="showClear" class="clear-button" @click="clearSearch">&#215;</button>
    </div>
  </div>

  <div class="content-flex row row-wrap">
    <PageCard v-for="page in pagesStore.results.pages" :page="page" />
  </div>
</template>