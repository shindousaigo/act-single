<template>
  <actui
    :class="`vw-act-base event${event_data.index}`"
    :background="require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/${$mode}/bg.jpg`)"
  >
    <component
      ref="event"
      :is="components[event_data.index].default"
      :props="components[event_data.index].props || {}"
    />
  </actui>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject, Emit, Provide, Mixins } from "vue-property-decorator";
import { Activity } from 'src/const';

@Component<Base>({
  created() {
    import(`public/assets/${this.VUE_APP_PATH}/event${this.event_data.index}/${this.$mode}/style.scss`)
  }
})
export default class Base extends Vue {

  @Provide() get provider() {
    return this
  }

  @Prop() event_data!: any

  rewards!: any

  components = [
    {
      default: require(`src/modules/activity/components/events/gifts/index.vue`).default,
    },
    {
      default: require(`src/modules/activity/components/events/message-board/index.vue`).default,
    },
    {
      default: require(`src/modules/activity/components/events/turntable/index.vue`).default
    },
  ]

  state = {
    /** 礼包状态 */
    cdKeys: [] as {
      actId: string
      /** 2019-06-20 12:59:51 */
      getDate: string
      goodsId: string
      historyId: string
      isGet: string
      playerName: string
      rewardId: string
      rewardName: string
      thirdGameZoneId: string
      userId: string
      userInfo?: {
        wish: string
      }
      userName: string
    }[],
    /** 用户状态 */
    info: { data: {} } as {
      /** 消费总量 */
      comsumeCount: number
      data: {
        actId: string
        activityType: number
        charge: number
        /** ** */
        consume: number
        createDate: string
        endTime: string
        isPool: boolean
        key: string
        oldMoney: number
        resourceId: string
        startTime: string
        sumCount: number
        sumScore: number
        /** ** */
        useCount: number
        userActivityResourceMap: any
        userChargeCount: number
        /** ** */
        userConsumeCount: number
        userLoginCount: number
        userSumCount: number
      }
      dayKey: string
      joinTime: {
        dayTime: number
        sumTime: number
      }
    },
    params: {
      groupId: this.VUE_APP_ACTIVITY_GROUP_ID,
      actId: this.event_data._id,
      token: "",
    }
  }

  commit(key, val) {
    this.$Set(this.state, key.split("."), val)
  }

  get actions() {
    return {
      cdKeys: async (rewardId = "") => {
        return this.$http("/activity/cdKeys", {
          params: Object.assign(this.state.params, {
            rewardId
          })
        }).then((res: any) => {
          console.log(`event${this.event_data.index} cdKeys`, res)
          res.length && this.commit(`cdKeys`, res)
          return res
        })
      },
      join: async (rewardId = "") => {
        return this.$http("/activity/join", {
          params: Object.assign(this.state.params, {
            rewardId
          })
        }).then((res: any) => {
          if (res.isGet) {
            this.commit("cdKeys", Array.prototype.concat.call(this.state.cdKeys, [res]))
          }
          return res
        })
      },
      info: async (rewardId = "") => {
        return this.$http("/activity/info", {
          params: Object.assign(this.state.params, {
            rewardId
          })
        }).then((res: any) => {
          this.commit("info", res)
          return res
        })
      },
    }
  }

}
</script>