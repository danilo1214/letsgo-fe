<template>
  <v-dialog persistent :value="dialog" max-width="290">
    <v-card>
      <v-toolbar color="primary" dark class="text-center">
        <v-banner two-line>
          <v-avatar slot="icon" color="primary" size="40">
            <v-icon icon="mdi-lock" color="white" class="ml-auto mr-auto p-5">
              {{ icon }}
            </v-icon>
          </v-avatar>

          <v-toolbar-title
            >{{ capitalize(action) }} {{ entity? capitalize(entity) : '' }}</v-toolbar-title
          >
        </v-banner>
      </v-toolbar>
      <v-card-title class="text-center" v-if="icon"> </v-card-title>

      <v-card-text>
        Are you sure you want to {{ action }} {{entity? `the ${ entity } ${ name }` : ''}}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <Button
          text
          rounded
          @click="$emit('cancel')"
          label="Cancel"
          color="secondary"
        />
        <Button rounded text @click="$emit('ok')" :label="capitalize(action)" />
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
