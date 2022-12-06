<script setup>
import { onUnmounted, reactive } from 'vue';
import { useOverviewStore } from '@/stores/overview';
import DashboardCounts from '@/components/DashboardCounts.vue';
import DashboardUpNext from '@/components/DashboardUpNext.vue';
import DashboardCooldown from '@/components/DashboardCooldown.vue';
import Loader from '@/components/Loader.vue';
import RainbowNav from '@/components/RainbowNav.vue';

const overviewStore = useOverviewStore();

const state = reactive({
  loading: true,
  pollers: {
    counts: null,
    upNext: null,
    cooldown: null,
    stop: false
  }
});

const nav = [{
  title: 'Dashboard',
  to: 'dashboard'
}];

Promise.all([
  overviewStore.getUpNext(),
  overviewStore.getCounts(),
  overviewStore.getCooldown()
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

  const cooldownRefresher = () => {
    if (!state.stop) {
      state.pollers.cooldown = setTimeout(() => {
        overviewStore.getCooldown().finally(cooldownRefresher);
      }, 200);
    }
  };

  countRefresher();
  nextUpRefresher();
  cooldownRefresher();
});

onUnmounted(() => {
  state.stop = true;
  clearTimeout(state.pollers.counts);
  clearTimeout(state.pollers.upNext);
  clearTimeout(state.pollers.cooldown);
});

</script>

<template>
  <RainbowNav :nav="nav" />
  <Loader v-if="state.loading" />
  <div v-else>
    <DashboardCounts :counts="overviewStore.counts" />
    <DashboardUpNext :items="overviewStore.upNext" />
    <DashboardCooldown :items="overviewStore.cooldown" />
  </div>
</template>