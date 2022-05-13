import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import CurrentUser from '~/store/currentUser'

let currentUserStore: CurrentUser
function initialiseStores(store: Store<any>): void {
  currentUserStore = getModule(CurrentUser, store)
}

export { initialiseStores, currentUserStore }
