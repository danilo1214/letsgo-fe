<template>
  <Plans :plans="plans" :editable="true" :deletable="true"> </Plans>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Plans from '@/components/Plans';

export default {
  name: 'my-plans',
  components: { Plans },
  computed: {
    ...mapGetters(['plans']),
    ...mapState(['user']),
  },
  methods: {
    ...mapActions(['loadPlans']),
    init() {
      const { user } = this;
      const query = {
        admin: user._id,
      };
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
