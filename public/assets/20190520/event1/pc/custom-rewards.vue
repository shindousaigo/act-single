<template>
  <div class="login-day">
    <img
      :src="require(`public/assets/${VUE_APP_PATH}/event1/${$mode}/highlight.png`)"
      class="highlight"
    >
    <img
      :src="require(`public/assets/${VUE_APP_PATH}/event1/${$mode}/base.png`)"
      class="base"
    >
    <div class="cur-day">
      วันที่ {{index+1}}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject, Emit, Provide, Mixins } from "vue-property-decorator";

@Component<CustomRewards>({
  created() {

  }
})
export default class CustomRewards extends Vue {
  @Inject() provider

  @Prop() index
}
</script>

<style lang="scss" scoped>
.rewards:hover {
  & + .login-day {
    .highlight {
      visibility: visible;
    }
  }
}
.login-day {
  &:hover {
    .highlight {
      visibility: visible;
    }
  }
  .highlight {
    width: 394px;
    margin-left: 7px;
    top: -56px;
    position: absolute;
    z-index: 1;
    visibility: hidden;
  }
  .base {
    position: relative;
    z-index: 2;
  }
  .cur-day {
    position: absolute;
    top: 149px;
    width: 100%;
    z-index: 2;
    font-size: 24px;
    text-align: center;
    color: #94e2ff;
    font-weight: 700;
  }
}
</style>




