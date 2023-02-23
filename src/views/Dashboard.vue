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
  loading: true
});

// get initial data for screen
Promise.all([
  overviewStore.getUpNext(),
  overviewStore.getCounts(),
  overviewStore.getCooldown()
]).finally(() => state.loading = false);

</script>

<template>
  <RainbowNav />
  <Loader v-if="state.loading" />
  <div v-else>
    <DashboardCounts :counts="overviewStore.counts" />
    <DashboardUpNext :items="overviewStore.upNext" />
    <DashboardCooldown :items="overviewStore.cooldown" />
  </div>
</template>