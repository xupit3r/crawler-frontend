<script setup>

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
});
</script>

<template>
  <div class="card readOnly queueCard" :class="{ processing: item.processing }">
    <span class="queueCard-url">{{item.url}}</span>
    <span class="queueCard-processing"></span>
  </div>
</template>