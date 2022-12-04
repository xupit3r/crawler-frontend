<script setup>
import RainbowNav from '@/components/RainbowNav.vue';

const nav = [{
  title: 'Dashboard',
  to: 'dashboard'
}, {
  title: 'Cooldown',
  to: 'cooldown'
}];
</script>

<template>
  <RainbowNav :nav="nav" />
</template>