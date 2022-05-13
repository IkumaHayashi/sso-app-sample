import { Context } from '@nuxt/types'
import { auth } from "@/plugins/firebase";
import { onAuthStateChanged } from '@firebase/auth'
import { currentUserStore } from '~/store';

export default async (context: Context) =>  {
  await new Promise<void>(resolve => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        currentUserStore.updateIsLoggedIn(true)
      } else {
        currentUserStore.updateIsLoggedIn(false)
      }
      resolve();
    })
  })
console.log("context.route.path:", context.route.path)
  if (currentUserStore.isLoggedIn) {
    if (context.route.path === '/signin' || context.route.path === '/signup') {
      return context.redirect('/')
    } else {
      return
    }
  } else {
    if (context.route.path === '/signin' || context.route.path === '/signup') {
      return
    } else {
      return context.redirect('/signin')
    }
  }
}
