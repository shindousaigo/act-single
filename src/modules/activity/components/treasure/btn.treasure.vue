<template>
  <div
    class="btn-treasure"
    @click="state.clickFn && state.clickFn()"
  >
    <img
      class="bg"
      :src="require(`public/img/${VUE_APP_PATH}/${$mode}/treasure_bg_btn.png`)"
    >
    <div class="wrapper">
      <span class="title-box">
        <span class="title">{{title}}</span>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn-treasure {
  position: relative;
  display: table;
  cursor: pointer;
  color: #900501;
  padding: 0.6% 0 0 0;
  .wrapper {
    font-size: 24px;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    .title-box {
      display: table;
      width: 100%;
      height: 100%;
      .title {
        display: table-cell;
        text-align: center;
        vertical-align: middle;
      }
    }
  }
}

.mb .btn-treasure {
  .bg {
    width: calculator(203, vw);
  }
  .wrapper {
    font-size: calculator(24, vw);
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Inject, Emit, Provide, Mixins } from "vue-property-decorator";

@Component
export default class BtnTreasure extends Vue {

  @Prop() state!: any
  @Prop() title!: any

}
</script>


