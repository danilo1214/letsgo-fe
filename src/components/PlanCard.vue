<template>
  <div>
    <v-card class="mx-auto ma-10">
      <v-card-title>
        <span class="title">{{ plan.caption }}</span>
      </v-card-title>

      <v-card-text>
        {{ plan.description }}
      </v-card-text>

      <v-card-text>
        <v-icon class="mr-1" dark color="blue"> mdi-calendar </v-icon>
        <span class="subheading mr-2">{{ formatDate }}</span>
        <v-icon class="mr-1" color="blue" medium> mdi-cash-multiple </v-icon>
        <span class="subheading"
          >${{ plan.cost_lower }} - ${{ plan.cost_upper }}</span
        >
      </v-card-text>

      <v-card-actions>
        <Button rounded text v-if="editable" label="Edit" />
        <Button
          rounded
          color="error"
          text
          v-if="deletable"
          @click.stop="showDelete = true"
          label="Delete"
        />
      </v-card-actions>
    </v-card>

    <confirm-dialog
      :dialog="showDelete"
      entity="plan"
      name-key="caption"
      action="delete"
      :data="plan"
      @delete="onDelete"
      @cancel="onCancel"
    ></confirm-dialog>
  </div>
</template>

<script>
import moment from 'moment';
import ConfirmDialog from './generic/ConfirmDialog';
import { mapActions } from 'vuex';
import Button from './generic/Button';
export default {
  name: 'PlanCard',
  components: { Button, ConfirmDialog },
  props: {
    plan: {
      type: Object,
      required: true,
    },
    editable: {
      type: Boolean,
      required: true,
    },
    deletable: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      showDelete: false,
    };
  },
  computed: {
    formatDate() {
      const { plan } = this;
      return moment(plan.time).format('MM/DD/YYYY HH:mm a');
    },
  },
  methods: {
    ...mapActions(['deletePlan']),
    async onDelete() {
      const { _id: id } = this.plan;
      await this.deletePlan({ id });
      this.showDelete = false;
    },
    onCancel() {
      this.showDelete = false;
    },
  },
};
</script>

<style scoped></style>
