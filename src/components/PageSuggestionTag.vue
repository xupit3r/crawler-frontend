<script setup>
const props = defineProps({
  suggestion: {
    type: String,
    default: ''
  },
  doThing: {
    type: Function,
    default: () => {}
  }
});
</script>

<template>
  <div class="suggestion-tag" @click.stop="doThing">
    {{ suggestion }}
  </div>
</template>