<script setup>
import LinkCard from '@/components/LinkCard.vue';
import { computed, reactive } from '@vue/reactivity';

const props = defineProps({
  links: {
    type: Array,
    default: () => []
  }
});

const state = reactive({
  show: 5,
  expanded:  false
});

const shownLinks = computed(() => {
  return props.links.slice(0, state.show);
});

function expand () {
  state.show = props.links.length;
  state.expanded = true;
}

function collapse () {
  state.show = 5;
  state.expanded = false;
}

</script>

<template>
  <div class="content">
    <h2>Links</h2>
    <div class="content content-flex column">
      <LinkCard v-for="(link, idx) in shownLinks" 
                :key="`pagelink-${idx}`" 
                :link="link" />

      <div class="content-centered content-actions">
        <button v-if="!state.expanded" @click="expand">Show All</button>
        <button v-else @click="collapse">Show Some</button>
      </div>
    </div>
  </div>
</template>