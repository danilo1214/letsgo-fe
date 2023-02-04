<template>
  <div class="pa-10">
    <Loader v-if="isLoading" />
    <template>
      <v-subheader>You are hosting these upcoming plans</v-subheader>
      <v-divider></v-divider>
        <Plans
          v-if="upcomingPlans && upcomingPlans.length"
          :loading='isLoading'
          :plans="upcomingPlans"
          @load-more='loadMore'
        >
        </Plans>
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

      <v-spacer class="mt-15"></v-spacer>

      <template  v-if="oldPlans && oldPlans.length">
        <v-subheader>Past plans you've hosted</v-subheader>
        <v-divider></v-divider>
        <Plans :plans="oldPlans" @load-more='loadMore' :loading='isLoading'> </Plans>
      </template>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Plans from '@/components/plans/Plans';
import Button from '../../components/generic/Button';
import moment from 'moment';
import Loader from '../../components/generic/Loader';

export default {
  name: 'my-plans',
  components: { Loader, Button, Plans },
  data() {
    return {
      isLoading: false,
      limit: 10,
    };
  },
  computed: {
    ...mapGetters(['adminPlans']),
    oldPlans() {
      return this.adminPlans.filter(
        (plan) => !moment().isBefore(moment(plan.date))
      );
    },
    upcomingPlans() {
      return this.adminPlans.filter((plan) =>
        moment().isBefore(moment(plan.date))
      );
    },
  },
  methods: {
    ...mapActions(['getMyPlans']),
    async init() {
      this.isLoading = true;
      await this.getMyPlans({
        limit: this.limit
      });
      this.isLoading = false;
    },
    loadMore(limit) {
      this.limit = limit;
      this.init();
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
