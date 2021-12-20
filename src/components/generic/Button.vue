<template>
  <v-btn
    v-bind="$attrs"
    :color="color"
    @click="(e) => $emit('click', e)"
    :disabled="disabled"
  >
    <v-icon v-if="iconLeft" dark left>{{ iconLeft }}</v-icon>
    {{ label }}
    <v-icon v-if="iconRight" dark left>{{ iconRight }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'Button',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'primary',
    },
    iconLeft: {
      type: String,
      default: '',
    },
    iconRight: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped></style>
