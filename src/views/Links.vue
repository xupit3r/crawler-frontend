<script setup>
import RainbowNav from '@/components/RainbowNav.vue';

const nav = [{
  title: 'Dashboard',
  to: 'dashboard'
}, {
  title: 'Links',
  to: 'links'
}];
</script>

<template>
  <RainbowNav :nav="nav" />
</template>