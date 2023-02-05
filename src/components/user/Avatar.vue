<template>
  <v-badge
    class="avatar-badge"
    :color="verifiedColor"
    avatar
    bottom
    bordered
    overlap
    light
  >
    <template v-slot:badge>
      <v-avatar>
        <v-icon color="white" light small v-if="isVerified"
          >mdi-checkbox-marked-circle</v-icon
        >
        <v-icon small color="white" v-else>mdi-alert-circle</v-icon>
      </v-avatar>
    </template>

    <template v-if="isMe && isVerified && isMobile">
      <v-btn
        class="selfie"
        fab
        x-small
        color="primary lighten-1"
        :disabled="isSelecting"
        @click="handleFileImport"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>

      <!-- Create a File Input that will be hidden but triggered with JavaScript -->
      <v-file-input
        ref="uploader"
        class="d-none"
        type="file"
        capture="user"
        accept="image/*"
        @change="onFileChanged"
      />
    </template>

    <v-avatar :size="size">
      <Tooltip
        fixed
        :attach="`#user-${user._id}`"
        :text="verifiedText"
        :color="verifiedColor"
      >
        <v-img
          :src="photo"
          slot-scope="{ activator }"
          v-on="activator.on"
          v-bind="activator.attrs"
        />
      </Tooltip>
    </v-avatar>
  </v-badge>
</template>

<script>
import Tooltip from '@/components/generic/Tooltip';
import { Camera } from '@capacitor/camera';
import { mapActions } from 'vuex';
import { getError } from '../../helpers/requests';

export default {
  components: { Tooltip },
  name: 'Avatar',
  props: {
    isMe: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Object,
      required: true,
    },
    size: {
      type: Number,
      default: 40,
    },
  },
  data() {
    return {
      file: '',
      isMobile: false,
      isSelecting: false,
    };
  },
  computed: {
    isVerified() {
      return this.user && this.user.email_verified && this.user.photo_verified;
    },
    verifiedColor() {
      return this.isVerified ? 'primary' : 'error';
    },
    verifiedText() {
      return this.isVerified ? 'Verified' : 'Unverified';
    },
    photo() {
      return this.user.photo_url || '../../../assets/default-profile.png';
    },
  },
  methods: {
    ...mapActions(['verifySelfie']),
    handleFileImport() {
      this.isSelecting = true;
      window.addEventListener(
        'focus',
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );
      this.$refs.uploader.$refs.input.click();
    },
    async onFileChanged(file) {
      if (!file) {
        return;
      }

      let formData = new FormData();
      formData.append('image', file);
      await this.verifySelfie({ formData })
        .then(() => {
          this.$router.replace({ name: 'home' });
          this.$notify({
            group: 'main',
            title: 'Verified',
            text: 'Successfully uploaded selfie',
            type: 'success',
          });
        })
        .catch((err) => {
          this.$notify({
            group: 'main',
            title: 'Failed to upload selfie',
            text: getError(err),
            type: 'error',
          });
        });
    },
  },
  created() {
    Camera.requestPermissions().then(() => {
      this.isMobile = true;
    });
  },
};
</script>

<style lang="scss">
.avatar-badge {
  span.v-badge__badge.error {
    inset: auto 5% 5% auto !important;
    z-index: 1;
    position: absolute;
  }

  span.v-badge__badge.primary {
    inset: auto 5% 5% auto !important;
    z-index: 1;
    position: absolute;
  }
}

.selfie {
  inset: 5% auto 5% auto !important;
  z-index: 1;
  position: absolute;
  max-width: 35px;
  max-height: 35px;
}
</style>
