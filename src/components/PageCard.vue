<script setup>

const props = defineProps({
  page: {
    type: Object,
    default: () => {}
  }
});

</script>

<template>
  <div class="card pageCard">
    <span class="pageCard-url">{{page.url}}</span>
    <span class="card-meta pageCard-status">{{page.status}}</span>
    <span class="card-meta pageCard-linkCount">{{page.counts.links}}</span>
    <span class="card-meta pageCard-uniqueHosts">{{page.counts.hosts}}</span>
  </div>
</template>