<template>
  <div class="pa-5">
    <h2 class="mt-10 mb-10 text-center">Make a new plan.</h2>
    <plan-form
      :error="error"
      :is-loading="isLoading"
      @submit="onSubmit"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

import { getError } from '@/helpers/requests';
import PlanForm from '@/components/plans/PlanForm';

export default {
  name: 'NewPlan',
  components: { PlanForm },
  data() {
    return {
      isLoading: false,
      error: '',
    };
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
    admin() {
      return this.user.id;
    },
  },
  methods: {
    ...mapActions(['createPlan']),
    onCancel() {
      this.$router.go(-1);
    },
    onSubmit(plan) {
      const { admin } = this;
      this.isLoading = true;

      this.createPlan({
        plan: {
          ...plan,
          admin,
        },
      })
        .then(() => {
          this.isLoading = false;
          this.$router.replace({ name: 'plans' });
          this.$notify({
            group: 'main',
            title: 'Success',
            text: 'Successfully created plan',
            type: 'success',
          });
        })
        .catch((err) => {
          this.isLoading = false;
          this.error = getError(err);
        });
    },
  },
};
</script>

<style scoped></style>
