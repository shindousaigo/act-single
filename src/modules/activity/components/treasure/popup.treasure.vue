<template>
  <div class="popup-treasure">
    <img
      class="treasure_bg_popup"
      :src="require(`public/img/${VUE_APP_PATH}/${$mode}/treasure_bg_popup.png`)"
    >

    <wrapper>
      <img
        class="close"
        @click="close"
        :src="require(`public/img/${VUE_APP_PATH}/${$mode}/treasure_icon_close.png`)"
      >
      <div class="list">
        <div
          class="reward"
          v-for="item in provider.state.gifts.find(treasure => treasure._id === provider.state.popup).contentList"
          :key="item.name"
        >
          <img
            class="icon"
            :src="require(`public/img/${VUE_APP_PATH}/${$mode}/treasure_${item.name.trim()}.png`)"
          >
          <!-- <wrapper> -->
          <middle class="txt">{{item.name}}*{{item.count}}</middle>
          <!-- </wrapper> -->
        </div>
      </div>
    </wrapper>

  </div>
</template>

<style lang="scss">
.popup-treasure {
  display: table;
  .close {
    cursor: pointer;
    position: absolute;
    right: 4.5%;
    top: 5.8%;
  }
  .list {
    display: table;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .reward {
    display: table;
    position: relative;
    float: left;
    color: #943b0b;

    font-size: 20px;
    margin: 0 60px;
  }
  .icon {
    width: 130px;
    height: 130px;
    border: 5px solid #fdcd47;
  }
  .txt {
    text-align: center;
    position: absolute;
    width: 140%;
    bottom: -46%;
    left: -20%;
    word-break: break-all;
    height: 60px;
    line-height: 28px;
  }
}

.mb .popup-treasure {
  .close {
    width: calculator(38, vw);
  }
  .treasure_bg_popup {
    width: calculator(657, vw);
  }
  .icon {
    width: calculator(128, vw);
    height: calculator(128, vw);
  }
  .reward {
    font-size: calculator(20, vw);
    margin: 0 calculator(60, vw);
  }
  .list {
    display: flex;
  }
  .txt {
    height: calculator(60, vw);
    line-height: calculator(28, vw);
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Inject, Emit, Provide, Mixins } from "vue-property-decorator";

@Component
export default class PopupTreasure extends Vue {

  @Inject() provider: any

  close() {
    this.provider.commit("visibility.shaddow", false)
    this.provider.commit("visibility.popup", false)
  }

}
</script>


