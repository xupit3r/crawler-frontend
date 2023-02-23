<script setup>
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import { usePagesStore } from '@/stores/pages';
import { reactive } from 'vue';
import RainbowNav from '@/components/RainbowNav.vue';
import PageLinks from '@/components/PageLinks.vue';
import PageTextSummary from '@/components/PageTextSummary.vue';

const route = useRoute();
const pagesStore = usePagesStore();

const pageId = route.params.id;

const state = reactive({
  _id: '',
  url: '',
  host: '',
  html: '',
  links: [],
  text: false,
  sentiment: false,
  summarized: false,
  summary: '',
  pageText: {}
});

const showTextSummary = computed(() => {
  return (
    state.pageText.text &&
    state.pageText.text.length && 
    (
      state.sentiment || 
      state.summarized
    )
  );
});

pagesStore.getPage(pageId).then(page => {
  state._id = page._id;
  state.url = page.url;
  state.host = page.host;
  state.html = page.data;
  state.text = page.text || false;
  state.sentiment = page.sentiment || false;
  state.summarized = page.summarized || false;
  state.summary = page.summary || '';
  state.links = page.links;
});

pagesStore.getPageText(pageId).then(pageText => {
  state.pageText = pageText;
});

</script>

<template>
  <RainbowNav :visit="state.url" />
  <PageTextSummary v-if="showTextSummary" 
                   :summary="state.summary"
                   :pageText="state.pageText" />
  <PageLinks :links="state.links" />
</template>