<template>
  <div
    v-if="isVisible"
    class="btn-facebook"
  >
    <img
      class="btn"
      :src="require(`public/assets/${VUE_APP_PATH}/login/${$mode}/btn_facebook.png`)"
      @click="login"
    />
  </div>
</template>

<script lang="ts">
declare const FB: any

import { Vue, Component, Inject } from 'vue-property-decorator'
import Config from "src/modules/activity"

let promise = new Promise(resolve => {
  let script = document.createElement("script")
  script.src = "https://connect.facebook.net/en_US/sdk.js"
  document.body.appendChild(script)
  script.onload = () => {
    resolve()
  }
})

@Component<BtnFacebook>({
  async beforeCreate() {
    await promise
    const initConfig = {
      appId: Vue.prototype.VUE_APP_FACEBOOK_APPLICATION_ID,
      autoLogAppEvents: true,
      xfbml: true,
      version: Vue.prototype.VUE_APP_FACEBOOK_SDK_VERSION
    }
    FB.init(initConfig)
    this.isVisible = true
  }
})
export default class BtnFacebook extends Vue {

  @Inject() provider

  @Inject() app

  isVisible = false

  login() {
    const FBSdkLogin = this.FBSdkLogin
    FB.getLoginStatus((response) => {
      if (response.status === "connected") {
        FBSdkLogin(response.authResponse.accessToken)
      } else {
        FB.login((response) => {
          if (response.status === "connected") {
            FBSdkLogin(response.authResponse.accessToken)
          } else {
            /** ... */
          }
        })
      }
    })
  }

  async FBSdkLogin(access_token) {
    let params = {
      clientId: Config.appId,
      access_token
    }
    this.app.commit("appClick", true)
    this.app.commit("justClick", true)
    const res = await this.$http.get("/user/fb/login", { params })
    this.app.commit("appClick", false)
    this.app.commit("justClick", false)
    this.$Store.set("userInfo", res)
    this.provider.commit("userInfo", res)
  }

}
</script>
