<template>
  <Dialog
    @input="(v) => $emit('input', v)"
    :value="value"
    title="Add friends"
    icon="mdi-account-plus"
  >
    <v-row class="mx-0 mt-9">
        <v-autocomplete
          class="search-users"
          v-model="selected"
          :items="users"
          :loading="isLoading"
          :search-input.sync="search"
          item-text="name"
          item-value="_id"
          placeholder="Search for friends"
          prepend-icon="mdi-account-plus"
          dense
          rounded
          filled
          return-object
        >
          <template v-slot:selection="data">
            <v-chip
              small
              v-bind="data.attrs"
              :input-value="data.selected"
              @click="data.select"
            >
              <v-avatar left>
                <v-img :src="data.item.photo_url"></v-img>
              </v-avatar>
              <span class="text-body-4">{{ data.item.name }}</span>
            </v-chip>
          </template>
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
              <v-list-item-avatar>
                <v-img :src="data.item.photo_url" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
              </v-list-item-content>
            </template>
          </template> </v-autocomplete>
    </v-row>

    <v-card-actions class='mt-16'>
      <v-spacer></v-spacer>

      <Button
        text
        rounded
        @click="$emit('input', false)"
        label="Cancel"
        color="secondary"
      />
      <Button
        rounded
        @click="onAddFriend"
        label='Add'
      />
    </v-card-actions>
  </Dialog>
</template>

<script>
import { mapActions } from 'vuex';
import { getData, getError } from '../../helpers/requests';
import Button from '../generic/Button';
import Dialog from '../generic/Dialog';

export default {
  name: 'SearchUsers',
  components: { Dialog, Button },
  props: {
    value: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      isLoading: false,
      results: [],
      search: '',
      showDialog: true,
      selected: {},
    };
  },
  computed: {
    users() {
      return this.results.map((result) => {
        result['name'] = result.first_name + ' ' + result.last_name;
        return result;
      });
    },
  },
  methods: {
    ...mapActions(['searchUsers', 'sendFriendRequest']),
    reset() {
      this.selected = {};
      this.search = '';
      this.results = [];
      this.$emit('input', false);
    },
    onAddFriend() {
      this.sendFriendRequest({ user: this.selected._id })
        .then(() => {
          this.$notify({
            group: 'main',
            title: 'Success',
            text: 'Successfully sent friend request',
            type: 'success',
          });
          this.reset();
        })
        .catch((e) => {
          const err = getError(e);
          console.log(err);
          this.$notify({
            group: 'main',
            title: 'Error',
            text: err,
            type: 'error',
          });
        });
    },
  },
  watch: {
    search(name) {
      this.isLoading = true;
      this.searchUsers({ name })
        .then((res) => {
          this.results = getData(res);
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
  },
};
</script>

<style lang="scss">
.search-users {
  .v-text-field--rounded > .v-input__control > .v-input__slot {
    padding: 0 5px;
  }
}
</style>
