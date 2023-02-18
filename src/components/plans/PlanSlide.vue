<template>
  <div class='plan-slides'>
    <v-slide-item v-for="plan in plans" :key="plan._id">
      <plan-card class="mx-2 mx-md-5 d-inline-block snap-align-center" show-mini :plan="plan" />
    </v-slide-item>
  </div>
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

<style scoped>
.snap-align-center {
  scroll-snap-align: center;
}
.plan-slides {
  width: auto;
  height: 500px;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain
}
</style>
