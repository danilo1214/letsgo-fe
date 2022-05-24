<template>
  <div class="pa-10">
    <h2>Welcome {{ name }}</h2>

    <v-subheader>Your upcoming plans</v-subheader>
    <v-divider></v-divider>
    <plan-slide v-if="myPlans && myPlans.length" :plans="myPlans" />
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
import { mapActions, mapState } from 'vuex';
import { getError, getData } from '@/helpers/requests';
import PlanSlide from '../components/plans/PlanSlide';
import Button from '../components/generic/Button';

export default {
  name: 'Welcome',
  components: { Button, PlanSlide },
  data() {
    return {
      myPlans: [],
    };
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
    name() {
      return `${this.user.first_name} ${this.user.last_name}`;
    },
  },
  methods: {
    ...mapActions(['getMyPlans']),
    init() {
      this.getMyPlans()
        .then((res) => {
          this.myPlans = getData(res);
        })
        .catch((err) => {
          this.$notify({
            group: 'main',
            title: 'Failed to load plans',
            text: getError(err),
            type: 'error',
          });
        });
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped></style>
