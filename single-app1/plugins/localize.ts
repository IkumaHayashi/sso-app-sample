import {AuthError} from "firebase/auth";
const getLocalizeMessage = function (e: AuthError) {
  console.log("e", e)
  switch (e.code) {
    case 'auth/invalid-email':
      return 'メールアドレスの形式が正しくありません'
    case 'auth/user-disabled':
      return 'サービスの利用が停止されています'
    case 'auth/user-not-found':
      return 'メールアドレスまたはパスワードが違います'
    case 'auth/wrong-password':
      return 'メールアドレスまたはパスワードが違います'
    case 'auth/email-already-in-use':
      return 'そのメールアドレスはすでに使われています'
    default:
      return e.message
  }
}
export default getLocalizeMessage
