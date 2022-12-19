<template>
 <v-form class='pa-10 password-change-form'>
   <template v-if='step === 1'>
     <h1>Reset your password</h1>
     <p class='mt-4'>We will send you a unique code to verify your email address</p>
     <v-text-field v-model='email' class='mt-10' rounded dense filled placeholder='Email'></v-text-field>
     <Button class='mx-auto' rounded label='Send' @click='onSend'/>
   </template>
 </v-form>
</template>

<script>
import Button from '../../components/generic/Button';
import { mapActions } from 'vuex';
export default {
  name: 'PasswordChange',
  components: { Button },
  data() {
    return {
      step: 1,
      email: ""
    }
  },
  methods: {
    ...mapActions(['requestPasswordChange']),
    onSend() {
      console.log(this.email);
      this.step = 2;
    }
  }
};
</script>

<style scoped>
.password-change-form {
  width: 400px;
  margin: 100px auto;
}
</style>