<template>
  <div class="pa-10">
    <Loader v-if="isLoading" />
    <template>
      <v-subheader>You are attending these upcoming plans</v-subheader>
      <v-divider></v-divider>
      <Plans
        v-if="upcomingPlans && upcomingPlans.length"
        @load-more="loadMorePlans"
        :plans="upcomingPlans"
        :loading="isLoading"
      >
      </Plans>
      <template v-else>
        <h1 class="mt-10">You are not attending any upcoming plans</h1>
        <Button
          color="primary lighten-1"
          class="ml-5 mt-10 mb-10"
          rounded
          to="/plans/"
          label="🔥 What's Popular?"
        />
      </template>
      <v-spacer class="mt-15"></v-spacer>

      <v-subheader>Past plans you've attended</v-subheader>
      <v-divider></v-divider>
      <Plans
        v-if="oldPlans && oldPlans.length"
        @load-more="loadMorePlans"
        :plans="oldPlans"
        :loading="isLoading"
      >
      </Plans>
      <h1 v-else class="mt-10">You haven't attended any plans.</h1>
    </template>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { getError } from '@/helpers/requests';

import Plans from '@/components/plans/Plans';
import Button from '../../components/generic/Button';
import Loader from '../../components/generic/Loader';

export default {
  name: 'attending-plans',
  components: { Loader, Button, Plans },
  data() {
    return {
      isLoading: false,
      limit: 10,
    };
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
    ...mapGetters(['oldPlans', 'upcomingPlans']),
  },
  methods: {
    ...mapActions(['getMyPlans']),
    init() {
      this.isLoading = true;
      this.getMyPlans({ limit: this.limit })
        .then(() => {
          this.isLoading = false;
        })
        .catch((err) => {
          this.$notify({
            group: 'main',
            title: 'Failed to load plans',
            text: getError(err),
            type: 'error',
          });
          this.isLoading = false;
        });
    },
    loadMorePlans(limit) {
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
