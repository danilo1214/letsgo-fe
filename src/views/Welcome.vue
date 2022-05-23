<template>
  <div class="pa-10">
    <h2>Welcome {{ name }}</h2>

    <v-subheader>Your upcoming plans</v-subheader>
    <v-divider></v-divider>
    <plan-slide :plans="myPlans" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { getError, getData } from '@/helpers/requests';
import PlanSlide from '../components/plans/PlanSlide';

export default {
  name: 'Welcome',
  components: { PlanSlide },
  data() {
    return {
      myPlans: [],
    };
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
    name() {
      return this.user.first_name + this.user.last_name;
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
