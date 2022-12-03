<script setup>
import { useOverviewStore } from '@/stores/overview';
import DashboardCard from '../components/DashboardCard.vue';
import RainbowTitle from '../components/RainbowTitle.vue';

const overviewStore = useOverviewStore();

overviewStore.getCounts();

</script>

<template>
  <RainbowTitle title="Dashboard" />
  <div class="content-flex row-left">
    <DashboardCard v-for="count in overviewStore.counts"
                   :key="count.name"
                   :title="count.name"
                   :value="count.value" />
  </div>
</template>