<template>
  <div
    class="box-rewards"
    :style="{transform:`scale(${innerWidth/VUE_APP_WIDTH_MAX})`}"
  >

    <img
      class="treasure_bg_rewards"
      :src="require(`public/img/${VUE_APP_PATH}/${$mode}/treasure_bg_rewards.png`)"
    >

    <wrapper class="wrap">
      <div
        class="reward"
        v-for="(reward, key) in provider.state.rewards"
        :key="key"
      >

        <img
          class="icon"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/treasure_${reward.name.trim()}.png`)"
        >
        <middle class="txt">{{reward.name.trim()}}{{provider.state.visibility.history ? '*' + reward.size : ""}}</middle>
      </div>

    </wrapper>

    <img
      class="close"
      @click="close"
      :src="require(`public/img/${VUE_APP_PATH}/${$mode}/treasure_icon_close.png`)"
    >

  </div>
</template>

<style lang="scss" scoped>
.box-rewards {
  display: table;

  .close {
    cursor: pointer;
    position: absolute;
    right: 3.8%;
    top: 2.8%;
  }

  .wrap {
    padding: 104px 0 0 86px;
    .reward {
      position: relative;
      display: table;
      float: left;
      color: #943b0b;

      margin: 44px 60px;

      .icon {
        width: 130px;
        height: 130px;
        border: 5px solid #fdcd47;
      }

      .txt {
        font-size: 24px;
        text-align: center;
        position: absolute;
        width: 140%;
        bottom: -50%;
        left: -20%;
        word-break: break-all;
        height: 74px;
        line-height: 30px;
      }
    }
  }
}

.mb .box-rewards {
  .treasure_bg_rewards {
    width: calculator(657, vw);
  }
  .close {
    width: calculator(38, vw);
    right: 4.8%;
    top: 2.2%;
  }
  .wrap {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    justify-content: center;
    align-items: center;
    height: 85%;
    margin: calculator(80, vw) 0 0 0;
    .icon {
      width: calculator(128, vw);
      height: calculator(128, vw);
    }

    .reward {
      margin: 0 calculator(26, vw);
    }
    .txt {
      font-size: calculator(24, vw);
      height: calculator(60, vw);
      line-height: calculator(28, vw);
      width: 126%;
      bottom: -40%;
      left: -13%;
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Inject, Emit, Provide, Mixins } from "vue-property-decorator";

@Component
export default class BoxRewards extends Vue {

  @Inject() provider: any

  close() {
    this.provider.commit("visibility.shaddow", false)
    this.provider.commit("visibility.rewards", false)
    this.provider.commit("visibility.history", false)
  }

  get innerWidth() {
    return this.$mode === "pc" ? Math.min(screen.availWidth, this.VUE_APP_WIDTH_MAX) : this.VUE_APP_WIDTH_MAX
  }

}
</script>


