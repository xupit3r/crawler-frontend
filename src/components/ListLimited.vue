<script setup>
const props = defineProps({
  showMore: {
    type: Function,
    default: () => {}
  }
});
</script>

<template>
  <div class="content-flex row row-wrap">
    <slot></slot>
  </div>
  <div class="content-centered content-actions">
    <button class="" @click="showMore">More</button>
  </div>
</template>