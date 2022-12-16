<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
});

</script>

<template>
  <div class="textCard readOnly card">
    <div class="sentiment">{{item.emoji}}</div>
    <div class="text">{{item.text}}</div>
  </div>
</template>