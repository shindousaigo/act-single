<template>
  <div class="box-login">
    <img
      class="bg"
      :src="require(`public/assets/${VUE_APP_PATH}/login/${$mode}/bg_box.png`)"
    />
    <wrapper>
      <component
        v-for="kind in kinds"
        class="input-com"
        :key="kind"
        :is="require(`src/modules/activity/components/login/input.login`).default"
        :kind="kind"
      />
      <div class="btns">
        <div
          v-for="way in login_ways"
          :key="way"
          class="wrapper-btn"
        >
          <component
            :is="require(`src/modules/activity/components/login/btn.${way}`).default"
            :ref="way"
          />
        </div>
      </div>
      <component :is="require(`src/modules/activity/components/login/btn.close`).default" />

      <img
        class="desc"
        :src="require(`public/assets/${VUE_APP_PATH}/login/${$mode}/desc.png`)"
      />
    </wrapper>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject, Model, Emit } from "vue-property-decorator";
import { Activity } from 'src/const';

@Component
export default class BoxLogin extends Vue {
  /**
   * 登录方式
   */
  login_ways = [
    "sdk", "facebook", "kakao"
  ]
  kinds = ["userName", "password"]

}
</script>


