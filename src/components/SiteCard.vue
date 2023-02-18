<script setup>
import { useRouter } from 'vue-router';

const props = defineProps({
  site: {
    type: Object,
    default: () => {}
  }
});

const router = useRouter();

const loadSite = () => {
  router.push({
    name: 'site',
    params: {
      id: props.site._id
    }
  })
}

</script>

<template>
  <div class="card siteCard" @click.stop="loadSite">
    <span class="siteCard-name">{{site.name}}</span>
  </div>
</template>