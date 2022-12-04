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
  pollers: {
    counts: null,
    upNext: null,
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

  const countRefresher = () => {
    if (!state.stop) {
      state.pollers.counts = setTimeout(() => {
        overviewStore.getCounts().finally(countRefresher);
      }, 500);
    }
  };

  const nextUpRefresher = () => {
    if (!state.stop) {
      state.pollers.nextUp = setTimeout(() => {
        overviewStore.getUpNext().finally(nextUpRefresher);
      }, 50);
    }
  };

  countRefresher();
  nextUpRefresher();
});

onUnmounted(() => {
  state.stop = true;
  clearTimeout(state.pollers.counts);
  clearTimeout(state.pollers.upNext);
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