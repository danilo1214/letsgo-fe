<template>
  <v-dialog persistent :value="dialog" max-width="290">
    <v-card>
      <v-toolbar color="primary" dark class="text-center">
        <v-toolbar-title
          ><v-icon light color="white" x-large class="ml-auto mr-auto">{{
            icon
          }}</v-icon></v-toolbar-title
        >
        <v-toolbar-title
          >{{ capitalize(action) }} {{ capitalize(entity) }}</v-toolbar-title
        >
      </v-toolbar>
      <v-card-title class="text-center" v-if="icon"> </v-card-title>

      <v-card-text>
        Are you sure you want to {{ action }} the {{ entity }} {{ name }}?
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <Button
          text
          @click="$emit('cancel')"
          label="Cancel"
          color="secondary"
        />
        <Button text @click="$emit('ok')" :label="capitalize(action)" />
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
