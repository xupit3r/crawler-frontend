<script setup>
const props = defineProps({
  message: {
    type: String,
    default: ''
  }
});
</script>

<template>
  <div class="content-centered">
    <span class="loader"></span>
    <p v-if="message">{{ message }}</p>
  </div>
</template>