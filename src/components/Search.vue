<script setup>
import { computed } from 'vue';

const props = defineProps({
  term: {
    type: String,
    default: ''
  },
  triggerSearch: {
    type: Function,
    default: () => {}
  },
  clearSearch: {
    type: Function,
    default: () => {}
  }
});

const showClear = computed(() => props.term.length > 0);

</script>

<template>
  <div class="content-actions actions search">
    <div class="input-field search-field">
      <label class="label">Search</label>
      <input type="text" 
              name="search" 
              class="input-search"
              :value="term"
              @input.stop="triggerSearch" />
      <button v-show="showClear" 
              class="clear-button" 
              @click="clearSearch">&#215;</button>
    </div>
  </div>
</template>