<template>
  <div class="pa-10">
    <h2>Welcome {{ name }}</h2>

    <v-subheader>Your upcoming plans</v-subheader>
    <v-divider></v-divider>
    <Loader v-if="isLoading" />
    <plan-slide
      v-else-if="upcomingPlans && upcomingPlans.length"
      :plans="upcomingPlans"
    />
    <template v-else>
      <h1 class="mt-10">You do not have any upcoming plans</h1>
      <Button
        class="ml-auto mt-12 text-center"
        rounded
        to="/plans/"
        label="What's Popular?"
      />
    </template>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import { getError } from '@/helpers/requests';
import { fullName } from '@/helpers/format';

import PlanSlide from '../components/plans/PlanSlide';
import Button from '../components/generic/Button';
import Loader from '../components/generic/Loader';

export default {
  name: 'Welcome',
  components: { Loader, Button, PlanSlide },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters(['upcomingPlans']),
    ...mapState({ user: (state) => state.auth.user }),
    name() {
      return fullName(this.user);
    },
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
  mounted() {
    this.init();
  },
};
</script>

<style scoped></style>
