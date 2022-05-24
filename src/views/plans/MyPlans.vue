<template>
  <div class="pa-10">
    <v-subheader>You are organizing</v-subheader>
    <v-divider></v-divider>
    <Plans v-if="plans && plans.length" :plans="plans"> </Plans>
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
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Plans from '@/components/plans/Plans';
import Button from '../../components/generic/Button';

export default {
  name: 'my-plans',
  components: { Button, Plans },
  computed: {
    ...mapGetters(['plans']),
    ...mapState({ user: (state) => state.auth.user }),
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
