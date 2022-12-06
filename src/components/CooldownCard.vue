<script setup>
import { computed } from '@vue/reactivity';
import moment from 'moment';

const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
});

const relativeTime = computed(() => {
  const date = moment(props.item.expireAt);
  return date.fromNow();
});
</script>

<template>
  <div class="card readOnly cooldownCard">
    <span class="cooldownCard-host">{{item.hostname}}</span>
    <span class="cooldownCard-date">{{relativeTime}}</span>
  </div>
</template>