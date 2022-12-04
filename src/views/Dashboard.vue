<script setup>
import { useOverviewStore } from '@/stores/overview';
import { onUnmounted, reactive } from 'vue';
import DashboardCard from '../components/DashboardCard.vue';
import Loader from '../components/Loader.vue';
import RainbowNav from '../components/RainbowNav.vue';

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

overviewStore.getCounts().then(() => {
  state.loading = false;
  const refresher = () => {
    if (!state.stop) {
      state.poller = setTimeout(() => {
        overviewStore.getCounts().finally(refresher);
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
  <div v-else class="content-flex row">
    <DashboardCard v-for="count in overviewStore.counts"
                   :key="count.name"
                   :title="count.name"
                   :value="count.value"
                   :link="count.link" />
  </div>
</template>