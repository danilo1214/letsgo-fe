<template>
  <v-progress-circular class="spinner-main" indeterminate color="secondary" />
</template>

<script>
export default {
  name: 'Loader',
};
</script>

<style scoped>
.spinner-main {
  width: 100vw !important;
  height: 100vh !important;
  margin: 0;
  position: fixed;
  background: rgba(4, 4, 4, 0.1);
  z-index: 300000000000000000000;
  top: 0;
  left: 0;
}
</style>
