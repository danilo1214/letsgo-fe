<template>
  <v-form class="repoort-form pa-5 pa-md-15">
    <v-textarea
      v-model="description"
      placeholder="Tell us why"
      clearable
      auto-grow
      filled
      rounded
    ></v-textarea>

    <v-card-actions>
      <v-spacer></v-spacer>

      <Button
        text
        rounded
        @click="$emit('cancel')"
        label="Cancel"
        color="secondary"
      />
      <Button
        color="error"
        rounded
        text
        @click="$emit('ok', description)"
        label="Report"
      />
    </v-card-actions>
  </v-form>
</template>

<script>
import Button from '../generic/Button';
export default {
  name: 'ReportUserForm',
  components: { Button },
  data() {
    return {
      description: '',
    };
  },
};
</script>

<style scoped></style>
