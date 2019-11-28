<template>
  <div class="vw-act-break-egg">

    <div class="block-top">
      <div
        class="btn-history"
        @click="showHistory"
      >
        <img
          class="img-btn-history"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/break_egg_bg_btn.png`)"
        >
        <wrapper>
          <middle>รางวัลที่ได้รับ</middle>
        </wrapper>
      </div>
      <div class="reward-count">
        <img
          class="img-btn-history hide"
          style="padding: 0 20px"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/break_egg_bg_btn.png`)"
        >
        <wrapper>
          <middle>จำนวนที่ใช้ไปแล้ว: {{state.info.rewardCount}}</middle>
        </wrapper>
      </div>
    </div>

    <div class="btn-box">
      <img
        class="diz"
        :src="require(`public/img/${VUE_APP_PATH}/${$mode}/break_egg_icon_diz.png`)"
      />
      <img
        v-show="!egg1"
        :class="`btn _0${egg0?' ani':''}`"
        :src="require(`public/img/${VUE_APP_PATH}/${$mode}/break_egg_icon_egg0.png`)"
      />
      <img
        v-show="egg1"
        class="btn"
        :src="require(`public/img/${VUE_APP_PATH}/${$mode}/break_egg_icon_egg1.png`)"
      />
      <img
        v-show="!egg1"
        :class="`hammer${hammer?' ani':''}`"
        :src="require(`public/img/${VUE_APP_PATH}/${$mode}/break_egg_hammer.png`)"
      />
      <wrapper>
        <div
          class="rest-count"
          ref="count"
        ></div>
        <span style="visibility:hidden;position:absolute">{{restCount}}</span>
        <img
          @click="request.call(this, 1)"
          class="request one"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/break_egg_1.png`)"
        />
        <img
          @click="request.call(this, 10)"
          class="request ten"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/break_egg_10.png`)"
        />
      </wrapper>

    </div>

    <div class="msg-box">
      <img
        class="break_egg_bg_msg"
        :src="require(`public/img/${VUE_APP_PATH}/${$mode}/break_egg_bg_msg.png`)"
      />
      <wrapper>
        <div
          class="msg-container"
          id="vw-act-break-egg-scroll-msg"
        >
          <div class="cell">
            <div
              v-for="(item, index) in state.msgList"
              :key="index"
            >
              {{item.playerName}}[{{item.thirdGameZoneId}}] ได้รับ รางวัลพิเศษ {{event_data.rewardMap[item.rewardId].contentList.map(item => `${item.name}*${item.count}`).join(', ')}}
            </div>
          </div>

        </div>
      </wrapper>
    </div>

    <shaddow v-if="state.visibility.shaddow" />
    <center v-if="state.visibility.rewards">
      <component :is="require(`./box.rewards.vue`).default" />
    </center>
    <center v-if="state.visibility.history">
      <component :is="require(`./box.rewards.vue`).default" />
    </center>
    <center v-if="state.visibility.popup">
      <component :is="require(`./popup.rewards.vue`).default" />
    </center>
  </div>
</template>

<style lang="scss">
@keyframes hammer {
  from {
    transform: rotate(0deg);
  }
  36% {
    transform: rotate(20deg);
  }
  68% {
    transform: rotate(-18deg);
  }
  to {
    transform: rotate(0deg);
  }
}
@keyframes egg0 {
  from {
    transform: translateX(0);
  }
  4% {
    transform: translateX(2%);
  }
  12% {
    transform: translateX(-2%);
  }
  20% {
    transform: translateX(2%);
  }
  28% {
    transform: translateX(-2%);
  }
  36% {
    transform: translateX(2%);
  }
  44% {
    transform: translateX(-2%);
  }
  52% {
    transform: translateX(2%);
  }
  60% {
    transform: translateX(-2%);
  }
  68% {
    transform: translateX(2%);
  }
  76% {
    transform: translateX(-2%);
  }
  84% {
    transform: translateX(2%);
  }
  92% {
    transform: translateX(-2%);
  }
  97% {
    transform: translateX(1%);
  }
  to {
    transform: translateX(0);
  }
}

.vw-act-break-egg {
  position: relative;
  display: table;
  font-size: 24px;
  color: #93390d;
  font-weight: bold;
  width: 100%;

  .block-top {
    display: table;
    margin: 0 0 0 100px;
    .btn-history {
      float: left;
      display: table;
      position: relative;
      cursor: pointer;
    }
    .reward-count {
      display: table;
      position: relative;
      float: left;
    }
  }

  .btn-box {
    position: relative;
    display: table;
    // transform: rotate(-1deg);
    margin: 0 auto;
    margin-top: 390px;

    .btn {
      margin: 0;
      position: absolute;
      left: 0;
      bottom: 94px;
      width: 100%;
      &._0.ani {
        animation: egg0 0.9s ease-in-out infinite;
      }
    }
    .hammer {
      position: absolute;
      right: -7%;
      top: -260%;
      transform: rotate(0deg);
      transform-origin: 100% 100%;
      &.ani {
        animation: hammer 1.2s;
      }
    }

    .request {
      cursor: pointer;
      position: absolute;
      &.one {
        left: 125%;
        top: -180%;
      }
      &.ten {
        left: -85%;
        top: -121%;
      }
    }
    .rest-count {
      width: 100%;
      color: #fff;
      position: absolute;
      bottom: 17%;
    }
  }

  .msg-box {
    display: table;
    position: relative;
    margin: 0 auto;
    margin-top: 4px;

    .msg-container {
      width: 93%;
      line-height: 30px;
      font-size: 16px;
      font-weight: 500;
      color: #7d7d7d;
      position: absolute;
      top: 76px;
      bottom: 13px;
      left: 0;
      right: 0;
      overflow: hidden;
      padding-left: 5%;
    }
  }
}

.mb .vw-act-break-egg {
  font-size: calculator(24, vw);

  .block-top {
    margin: 0 auto;
  }
  .img-btn-history {
    width: calculator(203, vw);
    height: calculator(50, vw);
  }
  .request {
    width: calculator(208, vw);
    &.one {
      left: 80%;
      top: 97%;
    }
    &.ten {
      left: -42%;
      top: 99%;
    }
  }
  .diz {
    width: calculator(347, vw);
  }

  .hammer {
    width: calculator(157, vw);
  }
  .break_egg_bg_msg {
    width: calculator(658, vw);
  }
  .msg-box {
    margin: calculator(176, vw) auto;
  }
  .msg-container {
    font-size: calculator(16, vw);
    top: calculator(70, vw);
    bottom: calculator(14, vw);
    overflow: auto;
  }
  .btn-box {
    margin-top: 54vw;
    .btn {
      bottom: calculator(96, vw);
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Inject, Emit, Provide, Mixins } from "vue-property-decorator";
import { wait } from '../../../../library';
import CircleType from 'circletype';

@Component<BreakEgg>({
  beforeDestroy() {
    clearInterval(this.interval)
  },
  created() {

    this.$mode === "pc" && import("iscroll").then(m => {
      this.scroller = new m.default("#vw-act-break-egg-scroll-msg", {
        mouseWheel: true,
        scrollbars: true
      })
    })

    this.actions.propReward()
    this.actions.poolList()

    this.interval = setInterval(() => {
      this.actions.poolList()
    }, 1000 * 15)
  },
  computed: {
    restCount() {
      const count = this.state.info.restCount
      setTimeout(() => {
        this.$nextTick(() => {
          if (this.$refs.count) {
            this.$refs.count["innerHTML"] = `จำนวนตอนนี้: ${count}`
            new CircleType(this.$refs.count)
              .dir(-1)
              .radius(700);
            document.querySelectorAll(".rest-count span").forEach((item, index) => {
              if (index > 11) {
                item["style"].color = "#ffe84f"
                item["style"]["font-size"] = this.$mode === "pc" ? '30px' : (30 / 750 * 100 + "vw")
                item["style"]["margin"] = "0 0 0 -4%"
                item["style"]["top"] = this.$mode === "pc" ? "11%" : "-5%"
              }
            })
          }
        })
      })
      return count
    }
  }
})
export default class BreakEgg extends Vue {

  @Provide() get provider() {
    return this
  }

  hammer = false
  egg0 = false
  egg1 = false

  interval = "" as any

  scroller = { refresh: () => { } }

  @Prop() event_data: any

  state = {
    restCountDom: "" as any,
    gifts: this.event_data.rewards.map(item => {
      item.index = item.index - 1 + ''
      return item
    }),
    msgList: [],
    info: {
      rewardCount: 0,
      restCount: 0,
      rewardList: [],
      total: {}
    },
    rewards: (() => {
      const rewards = {}
      this.event_data.rewards.map(item => item.contentList).flat().forEach(item => {
        item.size = 0
        rewards[item.name] = item
      })
      return rewards
    })(),
    visibility: {
      shaddow: false,
      rewards: false,
      history: false,
      popup: false
    },
    params: {
      propReward: {
        groupId: this.VUE_APP_ACTIVITY_GROUP_ID,
        actId: this.event_data._id,
        token: "",
        number: 0,
      },
      cdKeys: {
        groupId: this.VUE_APP_ACTIVITY_GROUP_ID,
        actId: this.event_data._id,
        token: "",
      },
      poolList: {
        groupId: this.VUE_APP_ACTIVITY_GROUP_ID,
        actId: this.event_data._id,
        token: "",
        rewardIds: ""
      }
    }
  }

  commit(key, val) {
    if (key === "msgList") {
      setTimeout(() => {
        this.$nextTick(() => {
          this.scroller.refresh()
        })
      })
    }
    this.$Set(this.state, key.split("."), val)
  }

  get actions() {
    return (() => {
      const { $root, $popup, $T, $http, state, commit, $Store, $refs, $set, event_data, $Mark } = this
      return {
        async propReward(number = 0) {
          state.params.propReward.number = number
          return $http("/activity/propReward", {
            params: state.params.propReward
          })
            .then((info: any) => {
              if (number) {
                info.rewardList.map(({ rewardId }) => {
                  return event_data.rewardMap[rewardId].contentList
                }).flat().forEach(item => {
                  let { name, count } = item
                  name = name.trim()
                  if (state.info.total[name]) {
                    state.info.total[name] += count
                  } else {
                    state.info.total[name] = count
                  }
                })
                info.total = state.info.total
                commit("info", info)
                // $Mark("lottery" + (number > 1 ? "10" : "01"))
              } else {
                Object.keys(info.rewardList).map(index => {
                  const rewardId = info.rewardList[index]
                  return event_data.rewardMap[rewardId].contentList
                }).flat().forEach(item => {
                  let { name, count } = item
                  name = name.trim()
                  if (state.info.total[name]) {
                    state.info.total[name] += count
                  } else {
                    state.info.total[name] = count
                  }
                })
                info.total = state.info.total
                commit("info", info)
              }
            })
        },
        async poolList() {
          state.params.poolList.rewardIds = state.gifts.filter(item => {
            return item.index >= 19
          }).map(item => item._id).join(",")
          return $http('/activity/poolList', {
            params: state.params.poolList
          }).then(msgList => {
            commit("msgList", msgList)
          })
        },
      }
    })()
  }

  async request(number) {
    const promise = this.actions.propReward(number)
    if (number) {
      this.hammer = true
      await Promise.all([
        promise,
        new Promise(resolve => {
          setTimeout(() => {
            this.hammer = false
            resolve()
          }, 1200)
        })
      ])
      this.egg0 = true
      await wait(750)
      this.egg0 = false
      this.egg1 = true
      this.commit("visibility.popup", true)
    }

  }

  showHistory() {
    this.commit("visibility.shaddow", true)
    this.commit("visibility.history", true)
  }


}
</script>


