<template>
  <v-slide-group show-arrows>
    <v-slide-item v-for="plan in plans" :key="plan._id" class="mx-8">
      <plan-card show-mini :plan="plan" />
    </v-slide-item>
  </v-slide-group>
</template>

<script>
import PlanCard from './PlanCard';
export default {
  name: 'PlanSlide',
  components: { PlanCard },
  props: {
    plans: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped></style>
