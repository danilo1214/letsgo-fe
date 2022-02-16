<template>
  <div>
    <v-card class="mx-auto ma-10 plan-card" :to='`/plan/${plan._id}`'>
      <Loader v-if="isLoading" />
      <v-card-title>
        <span class="title">{{ plan.caption }}</span>
      </v-card-title>

        <v-img v-if="editable" :src="getPlanImage" @mouseenter="hover=true" @mouseleave="hover=false">
              <div :class="getHoverWrapperClass">
                <v-file-input
                  dark
                  v-model="image"
                  @change="onImageChange"
                  prepend-icon="mdi-camera"
                  label="Change Image..."
                />
              </div>
        </v-img>
      <v-img v-else :src="getPlanImage" />
      <v-card-text>
        {{ plan.description }}
      </v-card-text>

      <v-card-text>
        <v-icon class="mr-1" dark color="primary darken-2">
          mdi-calendar</v-icon
        >
        <span class="subheading mr-2">{{ formatDate }}</span>
      </v-card-text>

      <v-card-text>
        <v-icon class="mr-1" color="primary darken-2" medium>
          mdi-cash-multiple</v-icon
        >
        <span class="subheading">{{ cost }}</span>
      </v-card-text>

      <v-card-text>
        <v-icon class="mr-1" color="primary darken-2" medium>
          mdi-map-marker</v-icon
        >
        <span class="subheading">{{ address }}</span>
      </v-card-text>

      <v-card-actions>
        <Button
          rounded
          text
          v-if="editable"
          label="Edit"
          @click.stop="showEdit = true"
        />
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

    <Dialog
      v-model="showEdit"
      v-if="editable"
      title="Edit plan"
      icon="mdi-pencil"
    >
      <plan-form
        :initial="plan"
        :error="error"
        @cancel="onCancelEdit"
        @submit="onEdit"
      />
    </Dialog>
    <confirm-dialog
      :dialog="showDelete"
      entity="plan"
      name-key="caption"
      icon="mdi-delete"
      action="delete"
      :data="plan"
      @ok="onDelete"
      @cancel="onCancelDelete"
    ></confirm-dialog>
  </div>
</template>

<script>
import moment from 'moment';
import { mapActions } from 'vuex';

import { getError } from '@/helpers/requests';
import ConfirmDialog from '@/components/generic/ConfirmDialog';
import Button from '@/components/generic/Button';
import Dialog from '@/components/generic/Dialog';
import PlanForm from './PlanForm';
import Loader from "../generic/Loader";

export default {
  name: 'PlanCard',
  components: { Loader, PlanForm, Dialog, Button, ConfirmDialog },
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
      error: '',
      showDelete: false,
      showEdit: false,
      image: null,
      isLoading: false,
      hover: false
    };
  },
  computed: {
    getHoverWrapperClass() {
      const {hover} = this;
      return {
        'pa-4': true,
        'mx-auto': true,
        'primary': true,
        'upload-wrapper': true,
        hover
      }
    },
    formatDate() {
      const { date, time } = this.plan;
      return `${moment(date).format('DD.MM.YYYY')} ${time || ''}`;
    },
    getPlanImage() {
      return this.plan.photo_url || '../../../assets/default.jpg';
    },
    address() {
      return this.plan.address || 'Hidden';
    },
    cost() {
      const { cost_lower, cost_upper } = this.plan;
      if (cost_lower === 0 && cost_upper === 0) return 'Free';
      else if (cost_upper === cost_lower) return `$${cost_upper}`;
      return `$${cost_lower} - $${cost_upper}`;
    },
  },
  methods: {
    ...mapActions(['deletePlan', 'updatePlan', 'uploadPlanImage']),
    async onImageChange() {
      if(!this.image){
        return;
      }

      this.isLoading = true;
      let formData = new FormData();
      formData.append('image', this.image);
      await this.uploadPlanImage({id: this.plan._id, formData});
      this.image = null;
      this.isLoading = false;
    },
    onEdit(plan) {
      const { _id: id } = plan;
      this.updatePlan({ id, plan })
        .then(() => {
          this.showEdit = false;
        })
        .catch((err) => {
          this.error = getError(err);
        });
    },
    async onDelete() {
      const { _id: id } = this.plan;
      await this.deletePlan({ id });
      this.showDelete = false;
    },
    onCancelDelete() {
      this.showDelete = false;
    },
    onCancelEdit() {
      this.showEdit = false;
    },
  },
};
</script>

<style scoped>
.upload-wrapper {
  width: 200px;
  opacity: 0.75;
  margin-top: 50px;
  border-radius: 10px;
  transition: .1s ease-in-out;
}

.upload-wrapper.hover{
  transition: .1s ease-in-out;
  opacity: 1;
  margin-top: 55px;
}

@media screen and (max-width: 600px) {
  .plan-card {
    width: 300px;
  }
}

@media screen and (min-width: 600px) {
  .plan-card {
    width: 400px;
  }
}

@media screen and (min-width: 1200px) {
  .plan-card {
    width: 600px;
  }
}
</style>
