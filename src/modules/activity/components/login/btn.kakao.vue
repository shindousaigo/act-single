<template>
  <div
    v-if="isVisible"
    class="btn-kakao"
  >
    <img
      class="btn"
      :src="require(`public/assets/${VUE_APP_PATH}/login/${$mode}/btn_kakao.png`)"
      @click="login"
    />
  </div>
</template>

<script lang="ts">
declare const Kakao: any

import { Vue, Component, Inject } from 'vue-property-decorator'
import Config from "src/modules/activity"

let promise = new Promise(resolve => {
  let script = document.createElement("script")
  script.src = "https://developers.kakao.com/sdk/js/kakao.min.js"
  document.body.appendChild(script)
  script.onload = () => {
    resolve()
  }
})

let KakaoIsInit = false

@Component<BtnKakao>({
  async beforeCreate() {
    await promise
    this.isVisible = true
    if (!KakaoIsInit) {
      Kakao.init(this.VUE_APP_KAKAO_APPLICATION_ID);
      KakaoIsInit = true
    }
  }
})
export default class BtnKakao extends Vue {

  @Inject() provider

  @Inject() app

  isVisible = false

  login() {
    const KakaoLogin = this.KakaoLogin
    Kakao.Auth.login({
      success: function (authObj) {
        // authObj: { access_token:"...", refresh_token:"..." token_type:"bearer", expires_in:43199, scope:"Basic_Profile"}
        KakaoLogin(
          authObj.access_token
        )
      },
      fail: function (err) {
        console.error(JSON.stringify(err));
      }
    });
  }

  async KakaoLogin(access_token) {
    let params = {
      clientId: Config.appId,
      access_token
    }
    this.app.commit("appClick", true)
    this.app.commit("justClick", true)
    const res = await this.$http.get("/user/kk/login", { params })
    this.app.commit("appClick", false)
    this.app.commit("justClick", false)
    this.$Store.set("userInfo", res)
    this.provider.commit("userInfo", res)
  }

}
</script>
