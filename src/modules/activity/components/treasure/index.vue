<template>
  <div class="vw-act-treasure">
    <div class="btn-box">
      <component
        :class="`btn${val.class ? ' ' + val.class : ''}`"
        v-for="(val, key) in state.btns"
        :is="require(`./btn.treasure.vue`).default"
        :key="key"
        :state="val"
        :title="key"
      />
    </div>
    <div
      class="info"
      v-if="gotLength<state.gifts.length"
    >
      <span>
        {{$T("treasure.index.keys")}}：{{state.info.restCount}}
      </span>
      <span>
        {{$T("treasure.index.next")}}：{{state.info.Nextcount}}
      </span>
    </div>
    <div class="treasure-box">
      <component :is="require(`./box.treasure.vue`).default" />
    </div>

    <shaddow v-if="state.visibility.shaddow" />
    <center v-if="state.visibility.rewards">
      <component :is="require(`./box.rewards.vue`).default" />
    </center>
    <center v-if="state.visibility.history">
      <component :is="require(`./box.rewards.vue`).default" />
    </center>
    <center v-if="state.visibility.popup">
      <component :is="require(`./popup.treasure.vue`).default" />
    </center>
  </div>
</template>

<style lang="scss">
.vw-act-treasure {
  position: relative;
  display: table;
  width: 100%;
  font-size: 24px;
  color: #93390d;
  font-weight: bold;

  .btn-box {
    display: table;
    margin: 0 0 20px 0;
    .btn {
      float: left;
      margin: 0 30px 0 100px;
    }
  }
  .treasure-box {
    display: table;
    margin: 0 auto;
  }
  .info {
    margin: 15px 0 20px 0;
    span {
      margin: 0 71px 0 123px;
    }
  }
}

.mb .vw-act-treasure {
  font-size: calculator(24, vw);
  .btn-box {
    display: flex;
    justify-content: center;
    margin: 0 0 calculator(24, vw) 0;
    .btn {
      margin: 0 2vw;
    }
  }
  .info {
    display: flex;
    justify-content: center;
    margin: calculator(20, vw) 0;
    span {
      margin: 0 calculator(24, vw);
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Inject, Emit, Provide, Mixins } from "vue-property-decorator";
import { wait } from '../../../../library';
import { Activity } from '../../../../const';
import Share from "src/modules/activity/components/share/index"

@Component<Treasure>({
  created() {

    this.set$t("treasure.index", {
      keys: {
        [Activity.Language.Zh]: '当前拥有钥匙数',
        [Activity.Language.Ti]: 'จำนวนคีย์',
      },
      next: {
        [Activity.Language.Zh]: '开启下一个宝箱需要钥匙数',
        [Activity.Language.Ti]: 'จำนวนคีย์ต้องการ',
      }
    })

    this.actions.cardCount()
    Share.instance.promise.then(() => {
      this.commit("btns.แชร์.class", '')
    })
  },
  computed: {
    gotLength() {
      return this.state.gifts.filter(item => {
        return item.isGet
      }).length
    }
  }
})
export default class Treasure extends Vue {

  @Provide() get provider() {
    return this
  }

  @Prop() event_data: any

  state = {
    btns: {
      "ดูรางวัล": {
        clickFn() {
          $instance.$Treasure.then(({ commit }) => {
            commit("visibility.shaddow", true)
            commit("visibility.rewards", true)
          })
        }
      },
      "รางวัลที่ได้รับ": {
        clickFn() {
          $instance.$Treasure.then(({ commit }) => {
            commit("visibility.shaddow", true)
            commit("visibility.history", true)
          })
        }
      },
      "แชร์": {
        class: "hide",
        clickFn() {
          $instance.$Treasure.then(({ actions }) => {
            actions.cardBoxFB()
          })
        }
      }
    },
    visibility: {
      shaddow: false,
      rewards: false,
      history: false,
      popup: false,
    },
    gifts: (() => {
      const gifts = this.event_data.rewards.map(item => {
        item.index = item.index - 1 + ''
        item.isGet = false
        return item
      })
      return gifts
    })(),
    rewards: (() => {
      const rewards = {}
      this.event_data.rewards.map(item => item.contentList).flat().forEach(item => {
        item.size = 0
        rewards[item.name] = item
      })
      return rewards
    })(),
    popup: "",
    /** 礼包状态 */
    info: {
      FBCount: 0,
      Nextcount: 0,
      dayCount: 0,
      extraCount: 0,
      payCount: 0,
      restCount: 0,
      returnCount: 0,
      rewardList: [] as any,
      wishCount: 0,
    },
    params: {
      cardCount: {
        groupId: this.VUE_APP_ACTIVITY_GROUP_ID,
        actId: this.event_data._id,
        token: "",
        fbShare: false,
        wishId: "",
        wishActId: ""
      },
      cardReward: {
        groupId: this.VUE_APP_ACTIVITY_GROUP_ID,
        actId: this.event_data._id,
        token: "",
        rewardId: "",
        index: ""
      },
      cardBoxFB: {
        groupId: this.VUE_APP_ACTIVITY_GROUP_ID,
        actId: this.event_data._id,
        token: "",
        fbShare: true,
        wishId: "",
        wishActId: ""
      }
    }
  }

  commit(key, val) {
    this.$Set(this.state, key.split("."), val)
  }

  updateHistory(rewardId) {
    this.state.gifts.find(treasure => treasure._id === rewardId).contentList.forEach(item => {
      this.state.rewards[item.name].size += item.count
    })
  }

  get actions() {
    return (() => {
      const { $root, $popup, $T, $http, state, commit, $Store, $refs, $set, updateHistory, $Mark } = this
      return {
        /** 获取礼包状态 */
        async cardCount() {
          return $http("/activity/cardCount", {
            params: state.params.cardCount
          }).then((res: any) => {
            for (let name in state.info) {
              state.info[name] = res[name]
            }
            state.info.rewardList.forEach((item) => {
              let index = item.index * 1
              $set(state.gifts, index, Object.assign(state.gifts[index], item, { isGet: true }))
              updateHistory(item.rewardId)
            })
          })
        },
        async cardReward() {
          return $http("/activity/cardReward", {
            params: state.params.cardReward
          })
        },
        async cardBoxFB() {
          $http("/activity/cardBoxFB", {
            params: state.params.cardBoxFB
          }).then((res: any) => {
            for (let name in state.info) {
              state.info[name] = res[name]
            }
          })
          // $Mark("fbshare")
          Share.instance.share(location.href)
          // .then(data => {
          //   if (data["code"] === 200) {

          //   }
          // })
        }
      }
    })()
  }

}
</script>


