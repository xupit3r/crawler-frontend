<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    default: 'Title'
  },
  value: {
    type: String,
    default: '10,000'
  },
  link: {
    type: String,
    default: 'dashboard'
  }
});

const router = useRouter();

function goToLink () {
  router.push({
    name: props.link
  })
}
</script>

<template>
  <div class="dashboardCard" @click="goToLink">
    <span class="dashboardCard-title">{{title}}</span>
    <span class="dashboardCard-value">{{value}}</span>
  </div>
</template>