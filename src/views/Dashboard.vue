<script setup>
import { useOverviewStore } from '@/stores/overview';
import { onUnmounted, reactive } from 'vue';
import DashboardCard from '../components/DashboardCard.vue';
import Loader from '../components/Loader.vue';
import RainbowTitle from '../components/RainbowTitle.vue';

const overviewStore = useOverviewStore();

const state = reactive({
  loading: true,
  poller: null
});

overviewStore.getCounts().then(() => {
  state.loading = false;
  const refresher = () => {
    setTimeout(() => {
      overviewStore.getCounts().finally(refresher);
    }, 500);
  };

  refresher();
});

onUnmounted(() => {
  clearTimeout(state.poller);
});

</script>

<template>
  <RainbowTitle title="Dashboard" />
  <Loader v-if="state.loading" />
  <div v-else class="content-flex row-left">
    <DashboardCard v-for="count in overviewStore.counts"
                   :key="count.name"
                   :title="count.name"
                   :value="count.value" />
  </div>
</template>