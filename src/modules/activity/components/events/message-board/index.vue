<template>
  <div class="container">
    <div class="msg">
      <img
        class="bg"
        :src="require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/${$mode}/bg_msglist.png`)"
      />
      <div
        id="vw-act-message-board-scroll-wrapper"
        class="scroll-wrapper"
      >

        <div class="scroller">
          <div
            class="item"
            v-for="(msg, index) in state.msgList.filter(item=>item.userInfo)"
            :key="index"
          >
            {{msg.userInfo.wish}} "{{msg.playerName}} Server{{msg.thirdGameZoneId}}"
          </div>
        </div>

      </div>
      <div class="input-wrapper">
        <div class="input-msg">
          <img
            class="bg-input"
            :src="require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/${$mode}/bg_input.png`)"
          />
          <input
            class="input"
            type="text"
            v-model="model"
          />
        </div>
        <img
          @click="confirm"
          class="submit"
          :style="{
            cursor: state.wishInfo.isGet ? 'default' : 'pointer'
          }"
          :src="state.wishInfo.isGet ? require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/${$mode}/btn_disabled.png`) : require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/${$mode}/btn_available.png`)"
        />
      </div>
    </div>
    <div class="receive">
      <img
        class="hide"
        :src="require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/${$mode}/gift.png`)"
      >
      <wrapper>
        <img
          class="gift img"
          :src="require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/${$mode}/gift.png`)"
        >
        <span class="gift name">
          {{email_gift_items[0].name}}
        </span>
        <img
          @click="!state.giftInfo.isGet && actions.joinGift()"
          class="btn"
          :style="{
            cursor: state.giftInfo.isGet ? 'default' : 'pointer'
          }"
          :src="state.giftInfo.isGet ? require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/${$mode}/btn_received.png`) : require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/${$mode}/btn_receive.png`)"
        >
      </wrapper>
    </div>
    <div class="gifts">
      <img
        class="bg-gifts"
        :src="require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/${$mode}/bg_gifts.png`)"
      />
      <div class="items">
        <div
          class="item"
          v-for="(item, index) in gifts_display_list"
          :key="item.name"
        >
          <img
            class="icon"
            :src="require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/${$mode}/${item.name.replace(/ /g, '_')}.png`)"
          />
          <img
            class="order "
            :src="require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/${$mode}/_${index}.png`)"
          />
          <wrapper class="name">
            <middle>{{item.name}}*{{item.count}}</middle>
          </wrapper>
        </div>
      </div>
      <img
        class="btn"
        :src="require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/${$mode}/btn_name_list.png`)"
        @click="checkNameList"
      >
    </div>
    <component
      v-if="state.popup.confirm"
      :is="require(`./confirm.vue`).default"
      @hide="commit('popup.confirm', false)"
      @submit="actions.submit()"
    />
    <component
      v-if="state.popup.nameList"
      :lotteryList="state.lotteryList"
      :is="require(`./name.list.vue`).default"
      @hide="commit('popup.nameList', false)"
    />
  </div>
</template>

<script lang="ts">

import StoreLogin from "src/store/activity/login"
import { Activity } from 'src/const';
import Config from "src/modules/activity"
import { Component, Prop, Vue, Inject, Emit, Provide, Mixins, Watch } from "vue-property-decorator";

@Component<MessageBoard>({
  created() {
    this.set$t("message-board.index", {
      success: {
        [Activity.Language.Zh]: '您已许愿成功',
        [Activity.Language.Ti]: 'ส่งคำอวยพรสำเร็จ อย่าลืมไปรับรางวัลในเกมน',
        [Activity.Language.Ko]: '축하메세지를 성공적으로 보냈습니다.게임에 접속하여 선물을 받으세요',
      },
      is_got: {
        [Activity.Language.Zh]: '奖励已领取',
        [Activity.Language.Ko]: '이미 수령',
      },
      error: {
        no_msg: {
          [Activity.Language.Zh]: '请输入许愿',
          [Activity.Language.Ti]: 'ระบุคำอวยพรหรือความคิดเห็น',
          [Activity.Language.Ko]: '메시지를 입력하세요',
        },
      }
    })
    this.$mode === "pc" && import("iscroll").then(m => {
      this.commit("scroller", new m.default("#vw-act-message-board-scroll-wrapper", {
        mouseWheel: true,
        scrollbars: true
      }))
    })
    this.event_data.rewards.forEach(item => {
      if (item.goodsType === 4) {
        this.state.params.joinWish.rewardId = item._id
      }
      if (item.goodsType === 3) {
        this.state.params.joinGift.rewardId = item._id
      }
    })
    this.actions.msgList()
    this.actions.cdKeys()
    this.actions.lotteryList()
  },
  computed: {
    condition_gift_items() {
      return this.event_data.rewards.filter(item => item.goodsType === 4).map(item => item.contentList).flat()
    },
    email_gift_items() {
      return this.event_data.rewards.filter(item => item.goodsType === 3).map(item => item.contentList).flat()
    }
  }
})
export default class MessageBoard extends Vue {

  @Inject() provider

  public event_data: any = this.provider.event_data

  model = ""
  @Watch("model")
  modelChange(nv, ov) {
    this.commit("msg", nv)
  }

  gifts_display_list = [
    { name: "휴대도구 합성카드", count: "100" },
    { name: "서사 장식품상자", count: "6" },
    { name: "돌파카드", count: "500" },
    { name: "서사 휴대 보물상자", count: "3" },
    { name: "서사 비전기", count: "3" },
    { name: "주황 카드 상자", count: "5" },
    { name: "주황색 특수 방어 소원의 별", count: "1" },
    { name: "불빛 머니", count: "200" },
    { name: "영역 파워", count: "999" },
    { name: "주황색 물리 방어 소원의 별", count: "1" },
  ]

  /** store state */
  state = {
    scroller: { refresh: () => { } },
    nameListScroller: { refresh: () => { } },
    msg: "",
    giftInfo: {} as {
      rewardId: string
      goodsId: string
      isGet: boolean
    },
    wishInfo: {} as {
      rewardId: string
      goodsId: string
      isGet: boolean
    },
    msgList: [],
    lotteryList: [],
    popup: {
      confirm: false,
      nameList: false,
    },
    params: {
      submit: {
        groupId: this.VUE_APP_ACTIVITY_GROUP_ID,
        token: "",
        goodsId: "",
        userInfo: ""
      },
      msgList: {
        actId: this.event_data._id,
        groupId: this.VUE_APP_ACTIVITY_GROUP_ID,
        limit: 45,
        token: "",
      },
      joinWish: {
        groupId: this.VUE_APP_ACTIVITY_GROUP_ID,
        actId: this.event_data._id,
        token: "",
        rewardId: "",
      },
      joinGift: {
        groupId: this.VUE_APP_ACTIVITY_GROUP_ID,
        actId: this.event_data._id,
        token: "",
        rewardId: "",
      },
      cdKeys: {
        groupId: this.VUE_APP_ACTIVITY_GROUP_ID,
        actId: this.event_data._id,
        token: "",
      },
      lotteryList: {
        // activity/lottery/lis
        groupId: this.VUE_APP_ACTIVITY_GROUP_ID,
        actId: this.event_data._id,
        token: "",
      },
    }
  }
  /** store provide */
  get actions() {

    return {
      submit: async () => {
        this.commit("popup.confirm", false)

        console.log("submit", this.state.wishInfo)

        if (!this.state.wishInfo.rewardId) {
          await this.actions.joinWish()
        }

        if (this.state.wishInfo.isGet) {
          this.$popup(this.$T('message-board.index.is_got'))
          return
        }
        if (!this.state.msg) {
          this.$popup(this.$T("message-board.index.error.no_msg"))
          return
        }
        this.commit("params.submit.userInfo", JSON.stringify({
          wish: this.state.msg
        }))
        const [popup, $Login] = await Promise.all([
          this.$http("/activity/submit/info", {
            params: this.state.params.submit
          }),
          this.$root.$Login
        ])
        const msgList = Array.prototype.concat([], [{
          playerName: $Login.state.roleInfo[0].playerName,
          userInfo: {
            wish: this.state.msg
          }
        }], this.state.msgList)
        this.commit("msgList", msgList)
        this.commit("msg", (this.model = ""))
        this.commit("wishInfo.isGet", true)
        // this.joinGift()
        this.actions.msgList()
      },
      /** 获取留言列表 */
      msgList: async () => {
        this.commit("msgList", await this.$http("/activity/recently/cdkeys", {
          params: this.state.params.msgList
        }))
      },
      /** 获取礼包状态 */
      cdKeys: async () => {
        this.provider.actions.cdKeys().then(res => {
          let wishInfo, giftInfo
          res.forEach(item => {
            if (item.rewardId === this.state.params.joinWish.rewardId) {
              wishInfo = item
              this.commit("wishInfo", wishInfo)
              this.commit("params.submit.goodsId", wishInfo.goodsId)
            }
            if (item.rewardId === this.state.params.joinGift.rewardId) {
              giftInfo = item
              this.commit("giftInfo", giftInfo)
            }
          })
        })
      },
      /** 参与留言申请 */
      joinWish: async () => {
        return this.provider.actions.join(this.state.params.joinWish.rewardId).then(wishInfo => {
          console.log("join wish succ", wishInfo)
          this.commit("wishInfo", wishInfo)
          this.commit("params.submit.goodsId", wishInfo.goodsId)
        })
      },
      /** 领取礼包 */
      joinGift: async () => {
        if (this.state.wishInfo.isGet) {
          this.provider.actions.join(this.state.params.joinGift.rewardId).then(res => {
            this.commit("giftInfo", res)
            this.$popup(this.$T("message-board.index.success"))
            this.actions.cdKeys()
          })
        } else {
          this.$popup("죄송합니다. 아직 메시지를 보내지 않으셨으니 보상을 받을 수 없습니다.")
        }
      },
      /** 查询获奖名单 */
      lotteryList: async () => {
        this.$http("/activity/lottery/list", {
          params: this.state.params.lotteryList
        }).then((res: any) => {
          if (res.length) {
            // var res2 = []
            // for (var i = 0; i < 20; i++) {
            //   res2 = res2.concat(res)
            // }
            this.commit("lotteryList", res)
          }
        })
      },
    }
  }

  commit(key: string, val: any) {
    key === "msgList" && setTimeout(() => {
      this.$nextTick(() => {
        this.state.scroller.refresh()
      })
    })
    this.$Set(this.state, key.split("."), val)
  }

  async confirm() {
    const Login = await this.$root.$Login
    if (Login.state.roleInfo.length) {
      !this.state.wishInfo.isGet && this.commit('popup.confirm', true)
    } else {
      Login.login()
    }
  }

  checkNameList() {
    if (this.state.lotteryList.length) {
      this.commit("popup.nameList", true)
    } else {
      this.$popup('행운의 추첨 명단은 2019년7월 19일 16:00 이후에 발표됩니다3개 근무일 내에 발송 예정 보상 아이템의 경우 인게임 내 우편을 통해 지급됩니다.')
    }
  }

}

</script>
