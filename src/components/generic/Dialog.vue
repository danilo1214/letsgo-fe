<template>
  <v-dialog @input="(v) => $emit('input', v)" :value="value">
    <v-card class="mx-auto">
      <v-row class="max-100 pa-5 pa-lg-10">
        <v-col cols="12" md="2" class="align-center justify-center d-flex">
          <v-avatar slot="icon" :color="color" size="80">
            <v-icon x-large icon="mdi-lock" color="white">
              {{ icon }}
            </v-icon>
          </v-avatar>
        </v-col>

        <v-col cols="12" md="10">
          <h1 class="mb-3 mt-3 mb-lg-10 text-center">{{ title }}</h1>

          <slot />
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    color: {
      type: String,
      default: 'primary',
    },
    value: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
