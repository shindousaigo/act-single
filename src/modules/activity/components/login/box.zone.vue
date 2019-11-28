<template>
  <div class="box-zone">
    <img
      class="login-bg-box"
      :src="require(`public/assets/${VUE_APP_PATH}/login/${$mode}/bg_box2.png`)"
    />
    <wrapper>
      <component
        class="select"
        :is="require(`src/modules/activity/components/login/select.login`).default"
      />
      <component
        class="btn-sdk"
        :is="require(`src/modules/activity/components/login/btn.sdk2`).default"
      />
      <component :is="require(`src/modules/activity/components/login/btn.close`).default" />
    </wrapper>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";

@Component
export default class BoxZone extends Vue { }
</script>


