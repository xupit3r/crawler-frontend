<script setup>
import QueueCard from '@/components/QueueCard.vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
});

</script>

<template>
  <div class="content">
    <h2>Up Next</h2>
    <div class="content content-flex column">
      <QueueCard v-for="item in items" 
                :key="`${item._id}`" 
                :item="item" />
    </div>
  </div>
</template>