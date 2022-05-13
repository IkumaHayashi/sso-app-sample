<!-- Please remove this file from your project -->
<template>
  <div class="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-10 w-4/12">
      <div class="mb-4">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
          E-mail
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="E-mail" v-model="email">
      </div>
      <div class="mb-6">
        <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
          パスワード
        </label>
        <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="******************" v-model="password">
      </div>
      <div class="flex items-center justify-center">
        <!-- ここにサインアップボタンを追加 -->
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="button" @click="signIn">
          サインイン
        </button>
      </div>
      <div class="flex mt-6 justify-center text-xs">
        <nuxt-link to="/signup" class="text-blue-400 hover:text-blue-500">サインアップ</nuxt-link>
      </div>
      <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1" v-if="errorMessage !== ''">
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import { currentUserStore } from '~/store'

export default Vue.extend({
  data() {
    return {
      loading: false as boolean,
      errorMessage: "" as string,
      email: "" as string,
      password: "" as string
    }
  },
  methods: {
    async signIn() {
      this.loading = true
      this.errorMessage = ''
      const result = await currentUserStore.login({
        email: this.email,
        password: this.password,
      })
      if (result !== '') {
        this.errorMessage = result
        return
      }
      this.$router.push('/')
      this.loading = false
    }
  }
})
</script>