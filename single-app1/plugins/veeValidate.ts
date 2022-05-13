import Vue from 'vue';
import {ValidationProvider, ValidationObserver,extend, localize} from 'vee-validate';
import * as rules from "vee-validate/dist/rules"
import ja from "vee-validate/dist/locale/ja.json"
localize("ja", ja)

for (let [rule, validation] of Object.entries(rules)) {
  extend(rule, {
    ...validation
  });
}
extend("password", {
  validate: value => {
    return value.match(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,16}$/)
  },
  message: "半角の小文字英字・大文字英字・数字を含む8〜16文字で設定してください。"
})

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);