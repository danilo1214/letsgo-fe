<template>
  <div class="pa-10">
    <Loader v-if='isLoading' />
    <template v-else>
      <v-subheader>You are organizing these upcoming plans</v-subheader>
      <v-divider></v-divider>
      <Plans v-if="upcomingPlans && upcomingPlans.length" :plans="upcomingPlans"> </Plans>
      <template v-else>
        <h1 class="mt-10">You are not hosting any upcoming plans</h1>
        <Button
          class="ml-auto mt-12 text-center"
          rounded
          to="/new"
          label="New Plan"
          icon-left="mdi-plus"
        />
      </template>

      <v-spacer class='mt-15'></v-spacer>

      <v-subheader>Past plans you've organized</v-subheader>
      <v-divider></v-divider>
      <Plans v-if="oldPlans && oldPlans.length" :plans="oldPlans"> </Plans>
      <h1 v-else class="mt-10">You haven't organized any plans.</h1>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Plans from '@/components/plans/Plans';
import Button from '../../components/generic/Button';
import moment from 'moment';
import Loader from '../../components/generic/Loader';

export default {
  name: 'my-plans',
  components: { Loader, Button, Plans },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters(['plans']),
    ...mapState({ user: (state) => state.auth.user }),
    oldPlans() {
      return this.plans.filter(plan => !moment().isBefore(moment(plan.date)));
    },
    upcomingPlans() {
      return this.plans.filter(plan => moment().isBefore(moment(plan.date)));
    }
  },
  methods: {
    ...mapActions(['loadPlans']),
    async init() {
      const { user } = this;
      const query = {
        admin: user._id,
        old: true
      };
      this.isLoading = true;
      await this.loadPlans({
        query,
      });
      this.isLoading = false;
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
