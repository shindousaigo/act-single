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
  margin: 0;
  margin-top: 17vw;
  position: relative;
  float: left;
  &:hover {
    .highlight {
      visibility: visible;
    }
  }
  .highlight {
    position: absolute;
    z-index: 1;
    visibility: hidden;
    width: 48.53333vw;
    margin-left: 0.53333vw;
    top: -6.6vw;
  }
  .base {
    position: relative;
    z-index: 2;
    width: 50vw;
  }
  .cur-day {
    position: absolute;
    width: 100%;
    z-index: 2;
    text-align: center;
    color: #94e2ff;
    font-weight: 700;
    top: 18.3vw;
    font-size: 3.4vw;
  }
}
</style>




