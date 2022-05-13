import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { auth } from "~/plugins/firebase";
import { AuthError, signInWithEmailAndPassword, signOut } from "firebase/auth";
import getLocalizeMessage from '~/plugins/localize';

type LoginInfo = {
  email: string
  password: string
}

@Module({
  name: "currentUser",
  stateFactory: true,
  namespaced: true,
})


export default class CurrentUser extends VuexModule {
  private _isLoggedIn: boolean = false

  get isLoggedIn(): boolean {
    return this._isLoggedIn
  }
  @Mutation
  updateIsLoggedIn(isLoggedIn: boolean) {
    this._isLoggedIn = isLoggedIn
  }

  @Action({ rawError: true })
  public async login(payload: LoginInfo): Promise<string> {
    try {
      await signInWithEmailAndPassword(auth, payload.email, payload.password)
      this.updateIsLoggedIn(true)
      return ''
    } catch (error) {
      return getLocalizeMessage(error as AuthError)
    }
  }
  @Action({ rawError: true })
  public async logout(): Promise<void> {
    await signOut(auth)
    this.updateIsLoggedIn(false)
  }
}