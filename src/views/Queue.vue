<script setup>
import RainbowNav from '@/components/RainbowNav.vue';

const nav = [{
  title: 'Dashboard',
  to: 'dashboard'
}, {
  title: 'Queue',
  to: 'queue'
}];
</script>

<template>
  <RainbowNav :nav="nav" />
</template>