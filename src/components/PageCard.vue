<script setup>
import { reactive } from '@vue/reactivity';
import { useRouter } from 'vue-router';

const props = defineProps({
  page: {
    type: Object,
    default: () => {}
  }
});

const router = useRouter();

const state = reactive({
  status: props.page.status ? props.page.status : '?',
  counts: {
    links: props.page.links.length,
    hosts: Object.values(props.page.links.reduce((h, link) => {
      h[link.host] = true;
      return h;
    }, {})).length
  }
})

const loadPage = () => {
  router.push({
    name: 'page',
    params: {
      id: props.page._id
    }
  });
};

</script>

<template>
  <div class="card pageCard" @click.stop="loadPage">
    <span class="pageCard-url">{{page.url}}</span>
    <span class="card-meta pageCard-status">{{state.status}}</span>
    <span class="card-meta pageCard-linkCount">{{state.counts.links}}</span>
    <span class="card-meta pageCard-uniqueHosts">{{state.counts.hosts}}</span>
  </div>
</template>