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
  show: 10
});

const shownLinks = computed(() => {
  return props.links.slice(0, state.show);
});

function showMore () {
  state.show = state.show + 10;
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
        <button class="" @click="showMore">More</button>
      </div>
    </div>
  </div>
</template>