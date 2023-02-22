<template>
  <v-dialog persistent :value="dialog" max-width="80vh">
    <v-card>
      <v-row class="max-100 pa-10 ma-0">
        <v-col cols="12" md="5" class="align-center justify-center d-flex">
          <v-avatar slot="icon" :color="color" size="100">
            <v-icon large icon="mdi-lock" color="white" class="ma-10">
              {{ icon }}
            </v-icon>
          </v-avatar>
        </v-col>

        <v-col cols="12" md="7">
          <h1 class="text-center">
            {{ capitalize(action) }} {{ entity ? capitalize(entity) : '' }}
          </h1>
          <p class="mt-2 text-center">
            Are you sure you want to {{ action }}
            {{ entity ? `the ${entity} ${name}` : '' }}?
          </p>
        </v-col>
      </v-row>

      <v-card-actions>
        <v-spacer></v-spacer>

        <Button
          text
          rounded
          @click="$emit('cancel')"
          label="Cancel"
          color="secondary"
        />
        <Button
          small
          :color="color"
          rounded
          @click="$emit('ok')"
          :label="capitalize(action)"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Button from './Button';
import { capitalize } from '@/helpers/format';

export default {
  name: 'ConfirmDialog',
  components: { Button },
  props: {
    color: {
      type: String,
      default: 'primary',
    },
    icon: {
      type: String,
      default: '',
    },
    action: {
      type: String,
      required: true,
    },
    dialog: {
      type: Boolean,
      default: false,
    },
    entity: {
      type: String,
      default: '',
    },
    nameKey: {
      type: String,
      default: '',
    },
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    name() {
      const { data, nameKey } = this;
      return data[nameKey];
    },
  },
  methods: {
    capitalize,
  },
};
</script>

<style scoped></style>
