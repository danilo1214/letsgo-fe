<template>
  <v-form class="verify-steps pa-5">
    <Loader v-if="isLoading" />
    <h1 class="title mt-10 text-center">Finish setting up your account</h1>
    <v-timeline v-if="!isVerified" class="mt-10" dense clipped>
      <v-timeline-item class="mb-4" color="success" small icon="mdi-check">
        <v-row justify="space-between">
          <v-col> Created </v-col>
        </v-row>
      </v-timeline-item>

      <template v-if="!user.email_verified">
        <v-timeline-item class="mb-4" small color="info">
          <v-row justify="space-between">
            <v-col> Verification e-mail sent to {{ user.email }} </v-col>
          </v-row>
        </v-timeline-item>
      </template>
      <template v-else>
        <v-timeline-item class="mb-4" small color="success" icon="mdi-check">
          <v-row justify="space-between">
            <v-col> E-mail verified</v-col>
          </v-row>
        </v-timeline-item>

        <v-timeline-item class="mb-4" small color="grey">
          <v-row justify="space-between">
            <v-col>
              <v-file-input
                v-if="isMobile"
                rounded
                label="Verify selfie"
                v-model="file"
                filled
                capture="user"
                accept="image/*"
                prepend-icon="mdi-camera"
              ></v-file-input>
              <span v-else>Selfie upload only allowed on app</span>
            </v-col>
          </v-row>
        </v-timeline-item>
      </template>
    </v-timeline>
    <v-alert type="error" v-if="error" class="mt-10 mx-5">
      {{ error }}
    </v-alert>

    <template v-if="isVerified">
      <v-row class="align-center justify-center">
        <v-col cols="5">
          <v-avatar color="success" size="100" class="mx-auto">
            <v-icon x-large icon="mdi-alert" color="white" class="ma-10">
              mdi-check
            </v-icon>
          </v-avatar>
        </v-col>
      </v-row>
      <h1 class="text-center mt-5">Successfully verified account</h1>
    </template>

    <v-row justify="space-between" class="pa-15">
      <Button rounded label="Back" text color="secondary" @click="back" />
      <Button
        class="ml-2"
        v-if="!isVerified"
        right
        rounded
        label="Next"
        @click="next"
      />
    </v-row>
  </v-form>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

import { getError } from '@/helpers/requests';
import Button from '@/components/generic/Button';
import Loader from '@/components/generic/Loader';

import { Camera } from '@capacitor/camera';

export default {
  name: 'Verify',
  components: { Loader, Button },
  data() {
    return {
      isLoading: false,
      file: null,
      error: '',
      isMobile: false,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
    createdAt() {
      return moment(this.user.createdAt).format('dddd, MMMM Do YYYY');
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
  created() {
    Camera.requestPermissions().then(() => {
      this.isMobile = true;
    });
  },
};
</script>

<style scoped>
.verify-steps {
  max-width: 400px;
  margin: auto;
}
</style>
