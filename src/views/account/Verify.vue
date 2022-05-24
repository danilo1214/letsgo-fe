<template>
  <v-form>
    <Loader v-if="isLoading" />
    <v-subheader class="title">Finish setting up your account!</v-subheader>
    <v-timeline v-if="!isVerified" class="mt-10 mx-5" dense clipped>
      <v-timeline-item
        class="mb-4"
        color="success"
        icon-color="grey lighten-2"
        small
      >
        <v-row justify="space-between">
          <v-col cols="5"> The account was created.</v-col>
          <v-col cols="7" class="text-right"> {{ createdAt }}.</v-col>
        </v-row>
      </v-timeline-item>

      <template v-if="!user.email_verified">
        <v-timeline-item class="mb-4" small>
          <v-row justify="space-between">
            <v-col cols="5">
              Verification e-mail sent to {{ user.email }}
            </v-col>
            <v-col class="text-right" cols="7">
              {{ createdAt }}
            </v-col>
          </v-row>
        </v-timeline-item>
      </template>
      <template v-else>
        <v-timeline-item class="mb-4" small color="success">
          <v-row justify="space-between">
            <v-col cols="5"> E-mail verified</v-col>
          </v-row>
        </v-timeline-item>

        <v-timeline-item class="mb-4" small>
          <v-row justify="space-between">
            <v-col cols="12">
              <v-file-input
                rounded
                label="Verify selfie"
                v-model="file"
                filled
                capture="user"
                accept="image/*"
                prepend-icon="mdi-camera"
              ></v-file-input>
            </v-col>
          </v-row>
        </v-timeline-item>
      </template>
    </v-timeline>
    <v-alert type="error" v-if="error" class="mt-10 mx-5">
      {{ error }}
    </v-alert>
    <v-alert type="success" class="mt-10 mx-5" v-if="isVerified">
      Successfully verified account
    </v-alert>

    <Button class="mt-10 ml-10" label="Back" color="secondary" @click="back" />
    <Button
      v-if="!isVerified"
      class="mt-10 ml-10"
      right
      label="Next"
      :disabled="nextDisabled"
      @click="next"
    />
  </v-form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

import { getError } from '@/helpers/requests';
import Button from '@/components/generic/Button';
import Loader from '@/components/generic/Loader';

export default {
  name: 'Verify',
  components: { Loader, Button },
  data() {
    return {
      isLoading: false,
      file: null,
      error: '',
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
    createdAt() {
      return moment(this.user.createdAt).format('YYYY-MM-DD HH:mm a');
    },
    nextDisabled() {
      return this.user.email_verified && !this.file;
    },
    isVerified() {
      return this.user.email_verified && this.user.photo_verified;
    },
  },
  methods: {
    ...mapActions(['checkAuth', 'verifySelfie']),
    back() {
      this.$router.go(-1);
    },
    async loadUser() {
      this.isLoading = true;
      await this.checkAuth();
      this.isLoading = false;
    },
    async next() {
      if (!this.user.email_verified) {
        this.loadUser();
        return;
      }
      // upload selfie
      this.isLoading = true;
      let formData = new FormData();
      formData.append('image', this.file);
      await this.verifySelfie({ formData })
        .then(() => {
          this.isLoading = false;
          this.error = '';
          this.$notify({
            group: 'main',
            title: 'Verified',
            text: 'Successfully verified selfie',
            type: 'success',
          });
          this.loadUser();
        })
        .catch((err) => {
          this.error = getError(err);
          this.isLoading = false;
        });
    },
  },
  watch: {
    file() {
      this.error = '';
    },
  },
};
</script>

<style scoped></style>
