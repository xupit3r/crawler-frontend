<script setup>
import { computed } from '@vue/reactivity';
import { reactive } from 'vue';

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