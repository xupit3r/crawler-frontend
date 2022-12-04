<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
});
</script>

<template>
  <div class="card readOnly queueCard">
    <span class="queueCard-url">{{item.url}}</span>
  </div>
</template>