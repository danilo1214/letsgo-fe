<template>
  <Loader />
</template>

<script>
import Loader from '../generic/Loader';
import { mapActions } from 'vuex';
export default {
  name: 'EmailVerify',
  components: { Loader },
  methods: {
    ...mapActions(['verifyEmail']),
  },
  created() {
    this.verifyEmail({ token: this.$route.params.token }).then(() => {
      this.$router.replace({ name: 'home' });
    });
  },
};
</script>

<style scoped></style>
