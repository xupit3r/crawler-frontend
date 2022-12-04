<script setup>
import { onUnmounted, reactive } from 'vue';
import { useOverviewStore } from '@/stores/overview';
import DashboardCounts from '@/components/DashboardCounts.vue';
import DashboardUpNext from '@/components/DashboardUpNext.vue';
import Loader from '@/components/Loader.vue';
import RainbowNav from '@/components/RainbowNav.vue';

const overviewStore = useOverviewStore();

const state = reactive({
  loading: true,
  poller: {
    timeout: null,
    stop: false
  }
});

const nav = [{
  title: 'Dashboard',
  to: 'dashboard'
}];

Promise.all([
  overviewStore.getUpNext(),
  overviewStore.getCounts()
]).finally(() => {
  state.loading = false;

  const refresher = () => {
    if (!state.stop) {
      state.poller = setTimeout(() => {
        Promise.all([
          overviewStore.getUpNext(),
          overviewStore.getCounts()
        ]).finally(refresher);
      }, 500);
    }
  };

  refresher();
});

onUnmounted(() => {
  state.stop = true;
  clearTimeout(state.poller);
});

</script>

<template>
  <RainbowNav :nav="nav" />
  <Loader v-if="state.loading" />
  <div v-else>
    <DashboardCounts :counts="overviewStore.counts" />
    <DashboardUpNext :items="overviewStore.upNext" />
  </div>
</template>