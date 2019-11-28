<template>
  <div class="btn-sdk">
    <img
      class="btn"
      :src="require(`public/assets/${VUE_APP_PATH}/login/${$mode}/btn_sdk2.png`)"
      @click="login"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from "vue-property-decorator";
import { wait } from '../../../../library';

@Component<LoginBtnSdk>({
  created() {
    window.addEventListener("keyup", this.enter)
  },
  beforeDestroy() {
    window.removeEventListener("keyup", this.enter)
  }
})
export default class LoginBtnSdk extends Vue {

  @Inject() provider
  @Inject() app

  login() {
    this.provider.actions.sdk()
  }

  async enter({ keyCode }) {
    if (keyCode === 13) {
      this.login()
      this.app.commit("justClick", true)
    }
  }

}
</script>
