<template>
  <v-dialog
    persistent
    value="true"
    transition="dialog-top-transition"
    max-width="600"
  >
    <v-card>
      <v-row class="max-100 pa-7 pa-lg-10 ma-0">
        <v-col cols="12" md="2" class="align-center justify-center d-flex">
          <v-avatar slot="icon" color="primary" size="100">
            <v-icon large icon="mdi-lock" color="white" class="ma-10">
              mdi-account-multiple-plus
            </v-icon>
          </v-avatar>
        </v-col>

        <v-col cols="12" md="10">
          <h1 class="ml-5 ml-lg-8 text-center">Invite friends to plan</h1>
          <v-card-text>
            <div class="body-1 pa-3 pa-md-12">
              <user-select v-model="invited" :users="friendsList" />
            </div>
          </v-card-text>
        </v-col>
      </v-row>

      <v-card-actions>
        <v-spacer></v-spacer>
        <Button rounded color="secondary" text @click="goBack" label="Back" />
        <Button rounded text @click="onSend" label="Invite" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Button from '@/components/generic/Button';
import UserSelect from '../../components/user/UserSelect';
import { mapState, mapActions, mapGetters } from 'vuex';
import { getError } from '../../helpers/requests';
export default {
  name: 'AddFriendsModal',
  components: { UserSelect, Button },
  data() {
    return {
      invited: [],
    };
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
    ...mapGetters(['plans', 'friends']),
    plan() {
      return this.plans.find((plan) => plan._id === this.id);
    },
    id() {
      return this.$route.params.id;
    },
    planMembers() {
      return this.plan.members.map((member) => member._id || member);
    },
    friendsList() {
      return this.friends
        .filter((friend) => !this.planMembers.includes(friend._id))
        .map((friend) => {
          return {
            ...friend,
            name: `${friend.first_name} ${friend.last_name}`,
          };
        });
    },
  },
  methods: {
    ...mapActions(['inviteFriend']),
    goBack() {
      this.$router.go(-1);
    },
    async onSend() {
      for (const user of this.invited) {
        await this.inviteFriend({
          plan: this.id,
          user,
        }).catch((err) => {
          this.$notify({
            group: 'main',
            title: 'Failed to invite user',
            text: getError(err),
            type: 'error',
          });
        });
      }
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped></style>
