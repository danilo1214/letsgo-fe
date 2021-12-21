<template>
  <v-tooltip bottom :color="color">
    <template v-slot:activator="{ on, attrs }">
      <slot v-bind:activator="{ on, attrs }"></slot>
    </template>
    <span>{{ text }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'secondary',
    },
  },
  name: 'Tooltip',
};
</script>

<style scoped></style>
