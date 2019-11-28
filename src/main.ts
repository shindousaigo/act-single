/**
 * 入口脚本文件 main.ts
 */

import "src/polyfill"
import Vue from "vue"
import { i18n } from "src/store"

// Vue.config.errorHandler = function (err, vm, info) {
//   console.log(err, info)
// }

window.main = function () {
  require.context("src/modules/activity/components/common", false, /\.vue$/).keys().forEach(path => {
    const name = path.slice(2, -4)
    Vue.component(name, require(`src/modules/activity/components/common/${name}.vue`).default)
  })


  if (Vue.prototype.VUE_APP_FACEBOOK_MARK_ID) {
    Vue.prototype.$Mark = function (name) {
      import("src/modules/activity/components/mark/index.ts").then(m => {
        m.default.instance.mark(name)
      })
    }
  }

  window.$instance = new Vue({
    i18n,
    render: (h: any) => h(require("reset.css") && require("src/modules/activity/app.vue").default)
  }).$mount("#app")
}













