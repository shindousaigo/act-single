<template>
  <div class="box-treasure">

    <div class="wrap">
      <div
        :class="`reward _${index+1}`"
        v-for="(reward, index) in provider.state.gifts"
        :key="reward._id"
        :style="{
          background: index%2 ? '#fff5ce' : '#fee9a3'
        }"
      >
        <img
          @click="cardReward.call(this, reward, index)"
          class="treasure flash"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/treasure_bg_flash.png`)"
        >
        <img
          @click="cardReward.call(this, reward, index)"
          class="treasure"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/treasure_icon_treasure.png`)"
        >

        <div class="number">{{index+1}}</div>

        <div :class="`ed${reward.isGet?'':' hide'}`">
          <span class="font">รับแล้ว</span>
        </div>
      </div>

    </div>

  </div>
</template>

<style lang="scss" scoped>
.box-treasure {
  position: relative;
  display: table;
  background: #fff;
  box-sizing: border-box;
  padding: 7px;
  border-radius: 60px;

  .wrap {
    width: 1196px;
    display: table;
  }
  .reward {
    width: 398px;
    height: 190px;
    border: 1px dashed #cc9c6f;

    position: relative;
    float: left;
    display: table;
    cursor: pointer;
    .number {
      position: absolute;
      font-size: 24px;
      color: #93390d;
      left: 9%;
      top: 12%;
    }
    &._1 {
      border-top-left-radius: 50px;
      .ed {
        border-top-left-radius: 50px;
      }
    }
    &._3 {
      border-top-right-radius: 50px;
      .ed {
        border-top-right-radius: 50px;
      }
    }
    &._7 {
      border-bottom-left-radius: 50px;
      .ed {
        border-bottom-left-radius: 50px;
      }
    }
    &._9 {
      border-bottom-right-radius: 50px;
      .ed {
        border-bottom-right-radius: 50px;
      }
    }

    &._1,
    &._2,
    &._3,
    &._7,
    &._8,
    &._9 {
      border-top-width: 0;
      border-bottom-width: 0;
    }
    &._1,
    &._2,
    &._4,
    &._5,
    &._7,
    &._8 {
      border-left-width: 0;
    }
    &._3,
    &._2,
    &._6,
    &._5,
    &._9,
    &._8 {
      border-right-width: 0;
    }
    .treasure {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .ed {
      font-size: 36px;

      color: #fffcee;
      position: absolute;
      background: rgba(#7e4a00, 0.5);
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      .font {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}

.mb .box-treasure {
  border-radius: calculator(60, vw);

  .wrap {
    width: 100%;
  }
  .reward {
    width: calculator(238, vw);
    height: calculator(120, vw);
    .number {
      left: 11%;
      top: 13%;
      font-size: calculator(29, vw);
    }
    .treasure {
      width: calculator(90, vw);
    }
    .ed {
      font-size: calculator(36, vw);
    }
    .flash {
      width: 106%;
    }

    &._1 {
      border-top-left-radius: calculator(50, vw);
      .ed {
        border-top-left-radius: calculator(50, vw);
      }
    }
    &._3 {
      border-top-right-radius: calculator(50, vw);
      .ed {
        border-top-right-radius: calculator(50, vw);
      }
    }
    &._7 {
      border-bottom-left-radius: calculator(50, vw);
      .ed {
        border-bottom-left-radius: calculator(50, vw);
      }
    }
    &._9 {
      border-bottom-right-radius: calculator(50, vw);
      .ed {
        border-bottom-right-radius: calculator(50, vw);
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Inject, Emit, Provide, Mixins } from "vue-property-decorator";
import { Activity } from '../../../../const';

@Component<BoxTreasure>({
  created() {

    this.set$t("treasure.box.treasure", {
      no_jump: {
        [Activity.Language.Zh]: '无法跳过未开启的宝箱',
        [Activity.Language.Ti]: 'เปิดหีบก่อนหน้านี้ก่อนแล้วเปิดหีบปัจจุบัน',
      },
    })

  }
})
export default class BoxTreasure extends Vue {

  @Inject() provider: any

  async cardReward(reward, index) {

    if (index) { // check
      if (!this.provider.state.gifts[index - 1].isGet) {
        this.$popup(this.$T("treasure.box.treasure.no_jump"))
        return
      }
    }

    this.provider.commit("params.cardReward.rewardId", reward._id)
    this.provider.commit("params.cardReward.index", index)

    const info = await this.provider.actions.cardReward()

    this.$set(this.provider.state.gifts, index, Object.assign(this.provider.state.gifts[index], { isGet: true }))

    this.provider.updateHistory(info.rewardId)
    this.provider.commit("popup", info.rewardId)
    this.provider.commit("info.Nextcount", info.Nextcount)
    this.provider.commit("info.restCount", info.restCount)
    this.provider.commit("visibility.shaddow", true)
    this.provider.commit("visibility.popup", true)

    // this.$Mark("palygift0" + (index + 1))

  }

}
</script>


