<template>
  <div class="vw-com-ui">
    <div
      class="vw-com-ui-bg"
      :style="{
        background:`url(${background}) center top no-repeat`,
        minWidth:`${VUE_APP_WIDTH_MIN}px`
      }"
    >
      <img
        class="hide filling-img"
        :src="background"
      >
    </div>
    <div class="vw-com-ui-bg2">
      <img
        class="hide filling-img"
        :src="background"
      >
      <div class="main">
        <div
          class="container"
          :style="{width: `${VUE_APP_WIDTH_MIN}px`}"
        >
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vw-com-ui {
  position: relative;
  .vw-com-ui-bg {
    width: 100%;
    position: absolute;
    overflow: hidden;
    top: 0;
    left: 0;
  }
  .vw-com-ui-bg2 {
    width: 100%;
    overflow: hidden;
    .main {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      .container {
        position: relative;
        margin: 0 auto;
      }
    }
  }
}
.mb .vw-com-ui {
  .vw-com-ui-bg {
    background-position-x: 0 !important;
    background-size: 100% !important;
    min-width: 0 !important;
  }
  .vw-com-ui-bg2 {
    .main {
      .container {
        width: 100% !important;
      }
    }
  }
}
</style>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
@Component<ActUi>({})
export default class ActUi extends Vue {
  @Prop() background!: string
}
</script>




