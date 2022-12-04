<script setup>
const props = defineProps({
  nav: {
    type: Array,
    default: () => []
  }
});

const currentColor = '#F8F988';
const others = '#BCEAD5';

const links = props.nav.map((item, idx, arr) => ({
  ...item,
  key: `${item.to}-${idx}`,
  color: idx === arr.length - 1 ? currentColor : others
}));
</script>

<template>
  <nav>
    <ul>
      <li v-for="link in links" 
          :key="link.key" 
          :style="{ color: link.color }">
          <router-link :to="{ name: link.to }">
            {{link.title}}
          </router-link>
      </li>
    </ul>
  </nav>
</template>