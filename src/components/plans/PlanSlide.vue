<template>
  <v-slide-group show-arrows>
    <v-slide-item v-for="plan in plans" :key="plan._id">
      <plan-card class="mx-2 mx-md-5" show-mini :plan="plan" />
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
