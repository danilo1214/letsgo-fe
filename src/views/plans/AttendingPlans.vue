<template>
  <div class="pa-10">
    <Loader v-if="isLoading" />
    <template v-else>
      <v-subheader>You are attending these upcoming plans</v-subheader>
      <v-divider></v-divider>
      <Plans
        v-if="upcomingPlans && upcomingPlans.length"
        :plans="upcomingPlans"
      >
      </Plans>
      <template v-else>
        <h1 class="mt-10">You are not attending any upcoming plans</h1>
      </template>
      <Button
        class="mt-12"
        rounded
        to="/plans/"
        text
        label="What's Popular?"
      />
      <v-spacer class="mt-15"></v-spacer>

      <v-subheader>Past plans you've attended</v-subheader>
      <v-divider></v-divider>
      <Plans v-if="oldPlans && oldPlans.length" :plans="oldPlans"> </Plans>
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
      plans: [],
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
      this.getMyPlans()
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
