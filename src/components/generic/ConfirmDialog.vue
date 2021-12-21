<template>
  <v-dialog v-model="dialog" max-width="290">
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>{{ capitalize(action) }} {{ entity }}</v-toolbar-title>
      </v-toolbar>

      <v-card-text class="mt-5">
        Are you sure you want to {{ action }} the {{ entity }} '{{ name }}'?
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <Button
          text
          @click="$emit('cancel')"
          label="Cancel"
          color="secondary"
        />
        <Button text @click="$emit('delete')" label="Delete" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Button from './Button';
import { capitalize } from '../../helpers';

export default {
  name: 'ConfirmDialog',
  components: { Button },
  props: {
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
      required: true,
    },
    nameKey: {
      type: String,
      required: true,
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
