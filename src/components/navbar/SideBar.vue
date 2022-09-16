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
      <template v-for="item in availableRoutes">
        <side-bar-item v-if="!item.children" :item="item" :key="item.title" />
        <v-list-group :key="item.title" v-else no-action>
          <template v-slot:activator>
            <v-list-item class="pa-0 ma-0">
              <v-list-item-icon>
                <v-icon>
                  {{ item.icon }}
                </v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <side-bar-item
            :item="child"
            v-for="child in item.children"
            :key="child.title"
          />
        </v-list-group>
      </template>
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
import SideBarItem from '../generic/SideBarItem';

export default {
  name: 'SideBar',
  components: { SideBarItem, Avatar, Button },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({ user: (state) => state.auth.user }),
    ...mapGetters(['signedIn', 'friendRequests', 'newMessages', 'invites']),
    items() {
      return [
        { title: 'Home', icon: 'mdi-home-city', link: '/', isPublic: true },
        {
          title: 'My Account',
          icon: 'mdi-account',
          link: '/account',
          isPublic: false,
          notifications:
            this.user && this.user.email_verified && this.user.photo_verified
              ? 0
              : 1,
        },
        {
          title: 'My Plans',
          icon: 'mdi-calendar',
          children: [
            {
              title: 'Hosting',
              icon: 'mdi-calendar-edit',
              link: '/my-plans',
              isPublic: false,
            },
            {
              title: 'Attending',
              icon: 'mdi-calendar-clock',
              link: '/attending-plans',
              isPublic: false,
              notifications: this.newMessages,
            },
            {
              title: 'Invites',
              icon: 'mdi-calendar-clock',
              link: '/invites',
              isPublic: false,
              notifications: this.invites.length,
            },
          ],
        },
        {
          title: 'Friends',
          icon: 'mdi-account-group',
          link: '/friends',
          isPublic: false,
          notifications: this.friendRequests.length,
        },
        {
          title: 'Sign Out',
          icon: 'mdi-logout',
          link: '/sign-out',
          isPublic: false,
        },
      ];
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
