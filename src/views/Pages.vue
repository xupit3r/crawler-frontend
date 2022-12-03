<script setup>
import { reactive, computed } from 'vue';
import RainbowTitle from '@/components/RainbowTitle.vue';
import PageCard from '@/components/PageCard.vue';
import { usePagesStore } from '@/stores/pages';
import Loader from '../components/Loader.vue';

const pagesStore = usePagesStore();

const state = reactive({
  loading: true,
  show: 100
});

const shownPages = computed(() => {
  return pagesStore.pages.slice(0, state.show);
});

function showMore () {
  state.show = state.show + 100;
}

pagesStore.getPages().finally(() => state.loading = false);
</script>

<template>
  <RainbowTitle title="Pages" />
  <Loader v-if="state.loading" />

  <div v-if="!state.loading " class="content-flex row row-wrap">
    <PageCard v-for="page in shownPages" :page="page" />
  </div>
  <div v-if="!state.loading" class="content-centered content-actions">
    <button class="" @click="showMore">More</button>
  </div>
</template>