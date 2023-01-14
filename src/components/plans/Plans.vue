<template>
  <v-container ref='plans'>
    <v-row v-if='plans.length'>
      <v-col v-for="plan in plans" :key="plan._id" sm="12" md="6">
        <plan-card :plan="plan" @join="onPlanJoin"> </plan-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PlanCard from '@/components/plans/PlanCard';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Plans',
  components: { PlanCard },
  props: ['plans',  'loading'],
  data() {
    return {
      limit: 10,
      lastScroll: 0
    }
  },
  computed: {
    ...mapGetters(['lastScrollAt']),
  },
  methods: {
    ...mapActions(['setLastScrollAt']),
    onPlanJoin(id) {
      this.$router.push(`/plan/${id}`);
    },
    loadMorePlans(e) {
      if(this.loading) {
        return;
      }

      const height = e.target.scrollTop;

      if(height <= this.lastScrollAt) {
        return;
      }


      if(Math.abs(height + e.target.offsetHeight - e.target.scrollHeight) <= 120) {
        this.setLastScrollAt({lastScrollAt: height});
        this.limit += 10;
        this.$emit('load-more', this.limit);
      }
    }
  },
  mounted() {
    document.getElementsByClassName('v-application--wrap')[0].addEventListener('scroll', this.loadMorePlans);
  },
  beforeDestroy() {
    this.setLastScrollAt({lastScrollAt: 0});
    document.getElementsByClassName('v-application--wrap')[0].removeEventListener('scroll', this.loadMorePlans);
  }
};
</script>

<style scoped></style>
