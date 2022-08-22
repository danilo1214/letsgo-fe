<template>
  <v-navigation-drawer
    app
    :value="value"
    @input="(v) => $emit('input', v)"
    mobile-breakpoint="xs"
  >
    <v-list-item class="px-2" v-if="signedIn">
      <Avatar :user="user" />
      <v-list-item-title>{{ name }}</v-list-item-title>
    </v-list-item>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
        v-for="item in availableRoutes"
        :key="item.title"
        :to="item.link"
        link
      >
        <v-list-item-icon>
          <v-badge v-if='item.notifications' :content="item.notifications">
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-badge>
          <v-icon v-else>
            {{item.icon }}
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <div class="mt-5 ml-5">
      <Button v-if="signedIn" label="Plan" icon-left="mdi-plus" to="/new" />
      <Button v-else to="/sign-in" label="Sign in" icon-left="mdi-import" />
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Button from '@/components/generic/Button';
import Avatar from '@/components/user/Avatar';

export default {
  name: 'SideBar',
  components: { Avatar, Button },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
    ...mapGetters(['signedIn', 'friendRequests']),
    items() {
      return [
        { title: 'Home', icon: 'mdi-home-city', link: '/', isPublic: true },
        {
          title: 'My Account',
          icon: 'mdi-account',
          link: '/account',
          isPublic: false,
          notifications: this.user && this.user.email_verified && this.user.photo_verified? 0 : 1
        },
        {
          title: 'My Plans',
          icon: 'mdi-calendar',
          link: '/my-plans',
          isPublic: false,
        },
        {
          title: 'Friends',
          icon: 'mdi-account-group',
          link: '/friends',
          isPublic: false,
          notifications: this.friendRequests.length
        },
        {
          title: 'Sign Out',
          icon: 'mdi-logout',
          link: '/sign-out',
          isPublic: false,
        },
      ]
    },
    availableRoutes() {
      if (this.signedIn) {
        return this.items;
      }
      return this.items.filter((item) => item.isPublic);
    },
    name() {
      return `${this.user.first_name} ${this.user.last_name}`;
    },
  },
};
</script>

<style scoped></style>
