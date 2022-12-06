<script setup>
import CooldownCard from '@/components/CooldownCard.vue';

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
});

</script>

<template>
  <div v-if="items.length > 0" class="content">
    <h2>Cooldown</h2>
    <div class="content content-flex column">
      <CooldownCard v-for="item in items" 
                    :key="`${item._id}`" 
                    :item="item" />
    </div>
  </div>
</template>