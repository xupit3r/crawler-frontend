<script setup>
import DashboardCard from '../components/DashboardCard.vue';

const props = defineProps({
  counts: {
    type: Array,
    default: () => []
  }
});

</script>

<template>
  <div class="content-flex row">
    <DashboardCard v-for="count in counts"
                   :key="count.name"
                   :title="count.name"
                   :value="count.value"
                   :link="count.link" />
  </div>
</template>