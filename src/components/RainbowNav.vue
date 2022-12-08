<script setup>
import { computed } from '@vue/reactivity';

const props = defineProps({
  nav: {
    type: Array,
    default: () => []
  }
});

const currentColor = '#F8F988';
const others = '#C0EEE4';

const links = computed(() => {
  return props.nav.map((item, idx, arr) => ({
    ...item,
    key: `${item.to}-${idx}`,
    color: idx === arr.length - 1 ? currentColor : others
  }));
});
</script>

<template>
  <nav>
    <ul>
      <li v-for="link in links" 
          :key="link.key" 
          :style="{ color: link.color }">
          <router-link v-if="link.to" :to="{ name: link.to }">
            {{link.title}}
          </router-link>
          <span v-else>
            {{link.title}}
          </span>
      </li>
    </ul>
  </nav>
</template>