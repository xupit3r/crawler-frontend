<script setup>
const props = defineProps({
  title: {
    type: String,
    default: 'Title'
  }
});

const colors = [
  '#F8F988',
  '#FF9E9E'
];

const characters = props.title.split('').map((character, idx) => ({
  value: character,
  key: `${character}-${idx}`,
  color: colors[idx % colors.length]
}));
</script>

<template>
  <h1>
    <span v-for="character in characters" 
          :key="character.key"
          :style="{ color: character.color }">{{character.value}}</span>
  </h1>
</template>