<template>
  <v-dialog
    persistent
    value="true"
    transition="dialog-top-transition"
    max-width="600"
  >
    <v-card>
      <v-toolbar color="primary" dark>
        <v-icon class="mr-5">mdi-account-multiple-plus</v-icon>Invite friends to
        plan
      </v-toolbar>
      <v-card-text>
        <div class="body-1 pa-12">
          <user-select v-model="invited" :users="friendsListf" />
        </div>
      </v-card-text>

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
      return this.friends.filter(
        (friend) => !this.planMembers.includes(friend._id)
      ).map(friend=> {
        return {
          ...friend,
          name: `${friend.first_name} ${friend.last_name}`
        }
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
        });
      }
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped></style>
