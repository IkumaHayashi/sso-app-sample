<!-- Please remove this file from your project -->
<template>
  <div class="bg-white h-screen flex items-center justify-center">
    <div class=" text-center">
      <div class="font-medium max-w-xl text-xl">
        こんにちは、 {{email}} さん
      </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" @click="executeSignOut">
          サインアウトする
        </button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { signOut } from "firebase/auth"
import { auth } from '~/plugins/firebase';

export default Vue.extend({
  computed: {
    email: function() {
      return auth.currentUser?.email;
    },
  },
  methods: {
    executeSignOut : async function() {
      await signOut(auth);
      this.$router.push('/signin')
    }
  }
})
</script>