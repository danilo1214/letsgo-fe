<template>
  <div>
    <v-card class="mx-auto ma-10 plan-card" :to="`/plan/${plan._id}`">
      <v-card-title>
        <span class="title">{{ plan.caption }}</span>
      </v-card-title>
      <v-banner two-line v-if="showJoinBanner">
        <v-avatar slot="icon" color="primary darken-1" size="40">
          <v-icon icon="mdi-lock" color="white"> mdi-account </v-icon>
        </v-avatar>

        Request to join this plan.

        <template v-slot:actions>
          <v-btn text color="primary" @click.stop.prevent="onRequestJoin">
            Request Join
          </v-btn>
        </template>
      </v-banner>

      <v-skeleton-loader v-if="isLoading" type="image"> </v-skeleton-loader>

      <v-img
        v-if="isAdmin && !isLoading"
        :src="getPlanImage"
        height="400"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
      >
        <div :class="getHoverWrapperClass" @click.stop.prevent>
          <v-file-input
            class="ma-0 pa-0"
            @click.stop
            dark
            v-model="image"
            @change="onImageChange"
            prepend-icon="mdi-camera"
            hide-input
          />
        </div>
      </v-img>
      <v-img v-else-if="!isAdmin" :src="getPlanImage" height="400" />
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
          v-if="isAdmin"
          label="Edit"
          @click.stop.prevent="showEdit = true"
        />
        <Button
          rounded
          color="error"
          text
          v-if="isAdmin"
          @click.stop.prevent="showDelete = true"
          label="Delete"
        />
        <Button
          rounded
          color="info"
          text
          v-if="isAdmin"
          @click.stop.prevent="showDuplicate = true"
          label="Duplicate"
        />
      </v-card-actions>
    </v-card>

    <Dialog
      v-model="showEdit"
      v-if="isAdmin"
      title="Edit Plan"
      icon="mdi-pencil"
    >
      <plan-form
        :initial="plan"
        :error="error"
        ok-label="Update Plan"
        @cancel="onCancelEdit"
        @submit="onEdit"
      />
    </Dialog>

    <Dialog
      v-model="showDuplicate"
      v-if="isAdmin"
      title="Duplicate Plan"
      icon="mdi-content-duplicate"
    >
      <plan-form
        :initial="duplicatePlanInitial"
        :error="duplicateError"
        ok-label="Duplicate Plan"
        @cancel="onCancelDuplicate"
        @submit="onDuplicate"
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
import { mapActions, mapState } from 'vuex';

import { getError } from '@/helpers/requests';
import ConfirmDialog from '@/components/generic/ConfirmDialog';
import Button from '@/components/generic/Button';
import Dialog from '@/components/generic/Dialog';
import PlanForm from './PlanForm';

export default {
  name: 'PlanCard',
  components: { PlanForm, Dialog, Button, ConfirmDialog },
  props: {
    plan: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      error: '',
      duplicateError: '',
      showDelete: false,
      showEdit: false,
      showDuplicate: false,
      image: null,
      isLoading: false,
      hover: false,
    };
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
    duplicatePlanInitial() {
      const {plan} = this;
      return {
        date: plan.date,
        time: plan.time,
        cost_upper: plan.cost_upper,
        cost_lower: plan.cost_lower,
        caption: plan.caption,
        description: plan.description,
        address: plan.address,
        admin: plan.admin._id || plan.admin,
        photo_url: plan.photo_url
      }
    },
    isAdmin() {
      return (
        this.plan &&
        this.user &&
        (this.plan.admin === this.user._id ||
          (this.plan.admin && this.plan.admin._id === this.user._id))
      );
    },
    isMember() {
      return (
        this.user &&
        this.user._id &&
        this.plan.members &&
        this.plan.members.some(
          (member) => member === this.user._id || member._id === this.user._id
        )
      );
    },
    hasRequested() {
      return (
        this.user &&
        this.user._id &&
        this.plan.requests.some(
          (request) =>
            request === this.user._id || request._id === this.user._id
        )
      );
    },
    showJoinBanner() {
      return (
        this.user &&
        this.user._id &&
        !this.isMember &&
        !this.hasRequested &&
        !this.isAdmin
      );
    },
    getHoverWrapperClass() {
      const { hover } = this;
      return {
        'pa-4': true,
        'mx-auto': true,
        'upload-wrapper': true,
        hover,
      };
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
    ...mapActions([
      'deletePlan',
      'updatePlan',
      'uploadPlanImage',
      'createRequest',
      'createPlan'
    ]),
    onRequestJoin() {
      this.createRequest({ plan: this.plan._id })
        .then(() => {
          this.$notify({
            group: 'main',
            title: 'Sent join request',
            text: 'Successfully requested to join this plan.',
            type: 'success',
          });
          this.$emit('join', this.plan._id);
        })
        .catch((err) => {
          const error = getError(err);
          this.$notify({
            group: 'main',
            title: 'Failed to send join request',
            text: error,
            type: 'error',
          });
        });
    },
    async onImageChange() {
      if (!this.image) {
        return;
      }

      this.isLoading = true;
      let formData = new FormData();
      formData.append('image', this.image);
      await this.uploadPlanImage({ id: this.plan._id, formData });
      this.image = null;
      this.isLoading = false;
    },
    onDuplicate(plan) {
      this.createPlan({
        plan: {
          ...plan,
        },
      })
        .then(() => {
          this.isLoading = false;
          if(this.$route.name === 'my-plans') {
            this.$router.go();
          } else {
            this.$router.replace({ name: 'my-plans' });
          }
          this.$notify({
            group: 'main',
            title: 'Success',
            text: 'Successfully created plan',
            type: 'success',
          });
        })
        .catch((err) => {
          this.isLoading = false;
          this.duplicateError = getError(err);
        });
    },
    onEdit(plan) {
      const { _id: id } = plan;
      this.updatePlan({ id, plan })
        .then(() => {
          this.showEdit = false;
          this.$notify({
            group: 'main',
            title: 'Success',
            text: 'Successfully updated plan',
            type: 'success',
          });
        })
        .catch((err) => {
          this.error = getError(err);
          this.$notify({
            group: 'main',
            title: 'Failed to update plan',
            text: this.error,
            type: 'error',
          });
        });
    },
    async onDelete() {
      const { _id: id } = this.plan;
      await this.deletePlan({ id }).then(() => {
        this.$notify({
          group: 'main',
          title: 'Plan deleted',
          text: 'Successfully deleted plan',
          type: 'success',
        });
        this.$router.replace({ name: 'my-plans' });
      });
      this.showDelete = false;
    },
    onCancelDelete() {
      this.showDelete = false;
    },
    onCancelEdit() {
      this.showEdit = false;
    },
    onCancelDuplicate() {
      this.showDuplicate = false;
    },
  },
};
</script>

<style lang="scss">
.upload-wrapper {
  align-items: center;
  width: 55px;
  height: 55px;
  opacity: 0.85;
  margin-top: 25%;
  border-radius: 100%;
  transition: 0.1s ease-in-out;
  position: absolute;
  bottom: 15px;
  right: 15px;

  .v-file-input {
    .v-input__prepend-outer {
      margin: 0 !important;
      .v-icon--link {
        padding: 25px !important;
        border-radius: 100%;
        background: #6481e0;
      }
    }
  }
}

.upload-wrapper.hover {
  transition: 0.1s ease-in-out;
  opacity: 1;
  margin-top: 25.5%;
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
