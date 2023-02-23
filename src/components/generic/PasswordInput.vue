<template>
  <v-text-field
    v-bind="$attrs"
    :value="value"
    @input="(v) => $emit('input', v)"
    :type='inputType'
    :append-icon="appendIcon"
    @click:append="toggleHide"
  >
  </v-text-field>
</template>

<script>
export default {
  name: 'PasswordInput',
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      hidden: true,
    };
  },
  computed: {
    appendIcon() {
      return this.hidden ? 'mdi-eye' : 'mdi-eye-off';
    },
    inputType() {
      return this.hidden? 'password' : 'text';
    },
  },
  methods: {
    toggleHide() {
      this.hidden = !this.hidden;
    },
  },
};
</script>

<style scoped></style>
