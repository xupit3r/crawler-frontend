<script setup>
const props = defineProps({
  nav: {
    type: Array,
    default: () => []
  }
});

const colors = [
  '#F8F988',
  '#FF9E9E'
];

const links = props.nav.map((item, idx) => ({
  ...item,
  key: `${item.to}-${idx}`,
  color: colors[idx % colors.length]
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