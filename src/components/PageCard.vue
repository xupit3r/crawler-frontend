<script setup>
import { useRouter } from 'vue-router';
import IconSummary from '@/components/IconSummary.vue';
import IconSentiment from '@/components/IconSentiment.vue';

const props = defineProps({
  page: {
    type: Object,
    default: () => {}
  }
});

const router = useRouter();

const loadPage = () => {
  router.push({
    name: 'page',
    params: {
      id: props.page._id
    }
  });
};

</script>

<template>
  <div class="card pageCard" @click.stop="loadPage">
    <span class="pageCard-url">{{page.url}}</span>
    <div v-if="page.summarized || page.sentiment" 
         class="pageCard-text">
      <IconSummary v-if="page.summarized" />
      <IconSentiment v-if="page.sentiment" />
    </div>
    <div class="pageCard-tags">
      <span v-for="tag in page.tags" class="tag">{{tag}}</span>
    </div>
  </div>
</template>