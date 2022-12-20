<script setup>
import { computed } from '@vue/reactivity';
import { useText } from '@/composables/text';
import { reactive } from 'vue';
import SentimentCard from './SentimentCard.vue';

const props = defineProps({
  summary: {
    type: String,
    default: ''
  },
  pageText: {
    type: Object,
    default: () => ({})
  }
});

const { assignEmoji } = useText();

const state = reactive({
  expanded: false
});

const relevantText = computed(() => {
  return (props.pageText.text || []).map(text => {
    return {
      ...text,
      emoji: assignEmoji(text.sentiment)
    }
  });
});

const averageSentiment = computed(() => {
  const total = relevantText.value.reduce((sum, text) => {
    return sum + text.sentiment;
  }, 0);

  return total / relevantText.value.length;
});

const totalEmoji = computed(() => {
  return assignEmoji(averageSentiment.value);
})

const textToShow = computed(() => {
  if (!state.expanded) {
    return relevantText.value.slice(0, 20);
  }

  return relevantText.value;
});

function expand () {
  state.expanded = true;
}

function collapse () {
  state.expanded = false;
}

</script>

<template>
  <div class="content">
    <h2>Text Summary</h2>
    <div class="pageTextSummary">
      <div class="pageTextSummary-overall">
        <div class="summary">
          {{ summary }}
        </div>
        <div class="scores">
          <div class="score">
            <span class="label">sentiment</span>
            <span class="value">{{totalEmoji}}</span>
          </div>
        </div>
      </div>
      <div class="content content-flex row-wrap pageTextSummary-cards">
        <SentimentCard v-for="(item, idx) in textToShow" :key="idx" :item="item" />
        <div v-if="relevantText.length > 20" class="content-centered content-actions">
          <button v-if="!state.expanded" @click="expand">All Text</button>
          <button v-else @click="collapse">Some Text</button>
        </div>
      </div>
    </div>
  </div>
</template>