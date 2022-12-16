<script setup>
import { computed } from '@vue/reactivity';
import { useText } from '@/composables/text';
import { reactive } from 'vue';

const props = defineProps({
  pageText: {
    type: Object,
    default: () => ({})
  }
});

const { isRelevant, assignEmoji } = useText();

const state = reactive({
  expanded: false
});

const relevantText = computed(() => {
  return (props.pageText.text || []).filter(text => isRelevant(text.parent, text.text)).map(text => {
    return {
      ...text,
      emoji: assignEmoji(text.sentiment)
    }
  });
});

const summary = computed(() => (props.pageText || {}).summary || '');

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
    return relevantText.value.slice(0, 5);
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
      <div class="content content-flex column pageTextSummary-cards">
        <div v-for="item in textToShow" class="textCard card">
          <div class="sentiment">{{item.emoji}}</div>
          <div class="text">{{item.text}}</div>
        </div>


        <div v-if="textToShow.length > 5" class="content-centered content-actions">
          <button v-if="!state.expanded" @click="expand">All Text</button>
          <button v-else @click="collapse">Some Text</button>
      </div>
      </div>
    </div>
  </div>
</template>