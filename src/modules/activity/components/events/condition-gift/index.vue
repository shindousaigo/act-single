<template>

  <component
    @submit="submit"
    :event_data="event_data"
    :provider="this"
    :is="require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/index.vue`).default"
  />

</template>

<script lang="ts">
import { Component, Prop, Vue, Inject, Emit, Provide, Mixins } from "vue-property-decorator";
import { Activity } from '../../../../../const';
@Component<ConditionGift>({
  created() {


    this.set$t("accumulative-login.index", {
      success: {
        [Activity.Language.Zh]: '领取成功',
        [Activity.Language.Ti]: 'รับรางวัลแล้ว กรุณาไปเช็คดูในเกม',
        [Activity.Language.Ko]: '수령 성공',
      },
    })

    Object.keys(
      this.provider.event_data.conditionMap
    ).forEach(condition => {
      this[condition] && this[condition]()
    })

    this.actions.cdKeys()

  },

})
export default class ConditionGift extends Vue {

  @Inject() provider

  public event_data: any = this.provider.event_data

  state = {
    condition: {
      submitable: true
    },
    data: {
      cdKeys: [],
    },
    params: {
      cdKeys: {
        groupId: this.VUE_APP_ACTIVITY_GROUP_ID,
        actId: this.provider.event_data._id,
        token: "",
      },
      join: {
        groupId: this.VUE_APP_ACTIVITY_GROUP_ID,
        actId: this.provider.event_data._id,
        token: "",
        rewardId: "",
      },
    }
  }

  JoinTimeCondition() {
    this.actions.cdKeys = (function (fn, JoinTimeCondition, commit) {
      return function () {
        return fn().then(res => {
          if (res.length === JoinTimeCondition.sumTimePerson) {
            commit("condition.submitable", false)
          }
          return res
        })
      }
    })(this.actions.cdKeys, this.provider.event_data.conditionMap.JoinTimeCondition, this.commit)
  }

  commit(key, val) {
    this.$Set(this.state, key.split("."), val)
  }

  actions = {
    cdKeys: () => {
      return this.provider.actions.cdKeys().then(res => {
        if (res.length) {
          this.commit("data.cdKeys", res)
        }
        return res
      })
    },
    join: (reward) => {
      return this.$http("/activity/join", {
        params: this.state.params.join
      }).then((res: any) => {
        if (res.isGet) {
          this.$popup(this.$T("accumulative-login.index.success"))
          this.commit("data.cdKeys", Array.prototype.concat.call(this.state.data.cdKeys, [res]))
          this.commit("condition.submitable", false)
          this.$Mark('pay0' + reward.index)
        }
        return res
      })
    }
  }

  submit(reward) {
    this.state.params.join.rewardId = reward._id
    this.actions.join(reward)
  }

}
</script>