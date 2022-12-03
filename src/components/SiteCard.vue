<script setup>

const props = defineProps({
  site: {
    type: Object,
    default: () => {}
  }
});

</script>

<template>
  <div class="card siteCard">
    <span class="siteCard-name">{{site.name}}</span>
    <span class="card-meta siteCard-pages">{{site.counts.pages}}</span>
  </div>
</template>