<script setup>
import { useOverviewStore } from '@/stores/overview';
import { reactive } from 'vue';
import DashboardCard from '../components/DashboardCard.vue';
import Loader from '../components/Loader.vue';
import RainbowTitle from '../components/RainbowTitle.vue';

const overviewStore = useOverviewStore();

const state = reactive({
  loading: true
});

overviewStore.getCounts().then(() => state.loading = false);

</script>

<template>
  <RainbowTitle title="Dashboard" />
  <div v-if="state.loading" class="content-centered">
    <Loader />
  </div>
  <div v-else class="content-flex row-left">
    <DashboardCard v-for="count in overviewStore.counts"
                   :key="count.name"
                   :title="count.name"
                   :value="count.value" />
  </div>
</template>