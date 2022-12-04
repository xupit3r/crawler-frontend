<script setup>
import { reactive } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
});

const classes = reactive({
  processing: props.item.processing
});
</script>

<template>
  <div class="card readOnly queueCard" :class="classes">
    <span class="queueCard-url">{{item.url}}</span>
    <span class="queueCard-processing"></span>
  </div>
</template>