<template>
  <div
    class="box-rewards"
    :style="{transform:`scale(${innerWidth/VUE_APP_WIDTH_MAX})`}"
  >

    <img
      class="break_egg_bg_rewards"
      :src="require(`public/img/${VUE_APP_PATH}/${$mode}/break_egg_bg_rewards.png`)"
    >

    <wrapper class="wrap">
      <div class="rewards">
        <div
          class="reward"
          v-for="(reward, name) in provider.state.rewards"
          :key="name"
        >
          <img
            class="icon"
            :src="require(`public/img/${VUE_APP_PATH}/${$mode}/break_egg_${name.trim().replace(/ |-/g, '_')}.png`)"
          >
          <div class="txt-wrap">
            <span class="txt">
              {{name.trim()}}{{provider.state.visibility.history ? '*' + (provider.state.info.total[name.trim()] || '0') : ""}}
            </span>
          </div>

        </div>
      </div>

      <img
        class="close"
        @click="close"
        :src="require(`public/img/${VUE_APP_PATH}/${$mode}/break_egg_icon_close.png`)"
      >
    </wrapper>

  </div>
</template>

<style lang="scss" scoped>
.box-rewards {
  display: table;

  .wrap {
    .rewards {
      padding: 102px 0 0 40px;
    }
    .reward {
      position: relative;
      display: table;
      float: left;
      color: #943b0b;

      margin: 38px 48px;

      .icon {
        width: 80px;
        height: 84px;
        border: 5px solid #fdcd47;
      }
      .txt-wrap {
        position: absolute;
        display: table;
        height: 42px;
        width: 200%;
        left: -50%;
        bottom: -50%;
      }

      .txt {
        font-size: 16px;
        text-align: center;
        position: absolute;
        width: 100%;
        bottom: -40%;
        word-break: break-all;
        height: 60px;
        line-height: 28px;
      }
    }
    .close {
      cursor: pointer;
      position: absolute;
      right: 5%;
      top: 2.8%;
    }
  }
}

.mb .box-rewards {
  .break_egg_bg_rewards {
    width: calculator(657, vw);
  }
  .close {
    right: 6%;
    top: 1.9%;
    width: calculator(38, vw);
  }
  .wrap {
    .rewards {
      display: flex;
      padding: 0;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      -ms-flex-pack: distribute;
      justify-content: space-around;
      overflow: auto;
      top: 11vw;
      position: absolute;
      bottom: 2vw;

      .reward {
        margin: calculator(38, vw) calculator(48, vw);
        .icon {
          width: calculator(76, vw);
          height: calculator(76, vw);
        }
        .txt-wrap {
          height: calculator(42, vw);
        }

        .txt {
          font-size: calculator(24, vw);
          text-align: center;
          position: absolute;
          bottom: -40%;
          word-break: break-all;
          height: calculator(60, vw);
          // display: flex;
          // align-items: center;
          // justify-content: center;
          line-height: calculator(30, vw);
        }
      }
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


