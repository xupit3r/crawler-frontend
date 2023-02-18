<script setup>
import { computed, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useSitesStore } from '@/stores/sites';
import RainbowNav from '@/components/RainbowNav.vue';
import PageCard from '@/components/PageCard.vue';

const route = useRoute();
const sitesStore = useSitesStore();

const siteId = route.params.id;

const state = reactive({
  _id: '',
  name: '',
  pages: []
});

const nav = computed(() => {
  return [{
    title: 'Dashboard',
    to: 'dashboard'
  }, {
    title: 'Sites',
    to: 'sites'
  }, {
    title: state.name
  }]
});

sitesStore.getSite(siteId).then(site => {
  state._id = site._id;
  state.name = site.name;
  state.pages = site.pages;
});

</script>

<template>
  <RainbowNav :nav="nav" :visit="state.url" />
  <div class="content-flex row row-wrap">
    <PageCard v-for="page in state.pages" :page="page" />
  </div>
</template>