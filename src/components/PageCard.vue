<script setup>
import { useRouter } from 'vue-router';

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
  </div>
</template>