<template>
  <Plans :plans="plans"> </Plans>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Plans from '@/components/Plans';

export default {
  name: 'search-plans',
  components: { Plans },
  computed: {
    ...mapGetters(['plans']),
  },
  methods: {
    ...mapActions(['loadPlans']),
    init() {
      const { query } = this.$route;
      this.loadPlans({
        query,
      });
    },
  },
  created() {
    this.init();
  },
  watch: {
    $route() {
      this.init();
    },
  },
};
</script>

<style scoped></style>
