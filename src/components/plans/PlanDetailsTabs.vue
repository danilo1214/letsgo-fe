<template>
  <div class='mt-10'>
    <v-tabs
      v-model="tab"
      class='rounded'
      background-color="primary accent-4"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#1">
        Members ({{plan.members.length}})
        <v-icon>mdi-account-supervisor</v-icon>
      </v-tab>

      <v-tab href="#2">
        Requests ({{plan.requests.length}})
        <v-icon>mdi-account-alert</v-icon>
      </v-tab>

      <v-tab href="#3">
        Chat
        <v-icon>mdi-chat</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class='tab-items'>
      <v-tab-item
        value="1">
            <user-card class='mt-8' v-for='member in plan.members' :key='member._id' :user='member' />
      </v-tab-item>

      <v-tab-item
        value="2">
        <v-card flat>
          <request class='mt-8' v-for='request in plan.requests' :key='request._id' :user='request' />
        </v-card>
      </v-tab-item>

      <v-tab-item
        value="3">
        <v-card flat>
          3
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import UserCard from '../user/UserCard';
import Request from '../user/Request';
export default {
  name: 'PlanDetailsTabs',
  components: { Request, UserCard },
  props: {
    plan: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tab: '#2'
    }
  }
};
</script>

<style scoped>
.tab-items {
  height: 500px;
  overflow-y: scroll;
}
</style>