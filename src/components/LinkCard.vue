<script setup>

const props = defineProps({
  link: {
    type: Object,
    default: () => ({})
  }
});
</script>

<template>
  <div class="card readOnly linkCard">
    <span class="linkCard-url">{{link.url}}</span>
  </div>
</template>