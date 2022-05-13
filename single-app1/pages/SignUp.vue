<!-- Please remove this file from your project -->
<template>
  <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-10 w-4/12">
      <ValidationObserver v-slot="{invalid}">
        <div class="mb-4">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
            E-mail
          </label>
          <ValidationProvider rules="required|email" v-slot="{ errors }">
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" :class="{'border-red-500': errors[0]}" id="username" name='email' type="text" placeholder="E-mail" v-model="email">
            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
        <div class="mb-2">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
            パスワード<span class="text-xs text-gray-500">（半角数字・英字・記号を1文字ずつ以上含む8〜16文字）</span>
          </label>
          <ValidationProvider :rules="passwordValidate" v-slot="{ errors }" name="password" >
            <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" :class="{'border-red-500': errors[0]}" id="password" type="password" placeholder="******************" v-model="password">
            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              {{ errors[0] }}
            </span>
          </ValidationProvider>

        </div>
        <div class="mb-0">
          <label class="block text-grey-darker text-sm font-bold mb-2" for="confirm_password">
            パスワード確認
          </label>
          <ValidationProvider :rules="confirmPasswordValidate" v-slot="{ errors }">
            <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="confirm_password" type="password" placeholder="******************" v-model="confirmPassword">
            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              {{ errors[0] }}
            </span>
          </ValidationProvider>
        </div>
        <span class="flex items-center font-medium tracking-wide text-red-500 mt-1 ml-1" v-if="errorMessage">
          {{errorMessage}}
        </span>
        <div class="flex items-center justify-center">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  :disabled="invalid" :class="{ 'opacity-50': invalid, 'cursor-not-allowed': invalid}" type="button" @click="signup">
            サインアップ
          </button>
        </div>
      </ValidationObserver>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {extend} from "vee-validate"
import {auth} from "../plugins/firebase";
import { createUserWithEmailAndPassword, AuthError } from "firebase/auth"
import getLocalizeMessage from '~/plugins/localize';
import { currentUserStore } from '~/store';
extend("confirmPassword", {
  params: ['target'],
  validate(value, record: any) {
    return value === record.target;
  },
  message: "入力されたパスワードが異なります"
})

export default Vue.extend({
  data: function() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
      errorMessage: ""
    }
  },
  computed: {
    passwordValidate: function() {
      return {
        required: true,
        password: true
      }
    },
    confirmPasswordValidate: function() {
      return {
        required: true,
        password: true,
        confirmPassword: {
          target: '@password'
        }
      }
    },
  },
  methods: {
    signup: async function() {
      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password);
        await currentUserStore.login({email: this.email, password: this.password});
        this.$router.push('/')
      } catch (error) {
        this.errorMessage = getLocalizeMessage(error as AuthError)
      }
    },
  }
})
</script>