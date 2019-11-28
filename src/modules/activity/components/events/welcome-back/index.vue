<template>
  <actui
    class="vw-act-welcome-back"
    :background="require(`public/img/${VUE_APP_PATH}/${$mode}/ui/bg_welcome_back.jpg`)"
  >

    <div class="items">
      <div
        class="item"
        v-for="item in event_data.rewards.filter(item=>item.goodsType===3).map(item=>item.contentList).flat()"
        :key="item._id"
      >
        <img
          class="icon"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/welcome_back/${item.name.trim()}.png`)"
        />
        <div class="name">
          <span>{{item.name}}*{{item.count}}</span>
        </div>
      </div>
    </div>
    <div class="submit">
      <img
        class="btn"
        @click="submit"
        :src="state.cdKeys.length ? require(`public/img/${VUE_APP_PATH}/${$mode}/welcome_back/btn_ban.png`) : require(`public/img/${VUE_APP_PATH}/${$mode}/welcome_back/btn_submit.png`)"
      >
    </div>

  </actui>
</template>

<style lang="scss">
.vw-act-welcome-back {
  .wrapper {
    position: absolute;
    top: 0;
  }

  .items {
    float: left;
    margin: 324px 0 0 52px;
  }

  .item {
    display: block;
    position: relative;
    float: left;
    margin: 10px 56px 0 30px;
    .icon {
      border: 5px solid #fdcd47;
    }
    .name {
      color: #97dcff;
      font-size: 24px;
      padding: 4px 0 0 0;
      line-height: 80px;
      font-weight: 700;
      text-align: center;
      position: absolute;
      width: 160%;
      left: -30%;
      word-break: break-all;
    }
  }

  .submit {
    cursor: pointer;
    position: absolute;
    right: -11px;
    top: 437px;
  }
}

.mb .vw-act-welcome-back {
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: calculator(12, vw);
  }
  .items {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
    margin: 0;
  }
  .item {
    margin: calculator(270, vw) calculator(30, vw);
    .icon {
      border: calculator(10, vw) solid #fdcd47;
      width: calculator(127, vw);
    }
    .name {
      font-size: calculator(26, vw);
      height: 10vw;
      font-weight: 500;
      width: 118%;
      left: -9%;
      line-height: 5vw;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .submit {
    left: 0;
    top: 0;
    margin: calculator(530, vw) 0 0 calculator(532 * 0.5, vw);
    width: calculator(217, vw);
  }

  .btn {
    width: calculator(217, vw);
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Inject, Emit, Provide, Mixins } from "vue-property-decorator";
import { Activity } from '../../../../../const';

@Component<WelcomeBack>({
  created() {

    this.set$t("welcome-back.index", {
      success: {
        [Activity.Language.Zh]: '领取成功',
        [Activity.Language.Ti]: 'รับรางวัลแล้ว กรุณาไปเช็คดูในเกม',
      }
    })

    this.actions.cdKeys()
  }
})
export default class WelcomeBack extends Vue {

  @Provide() get provider() {
    return this
  }

  @Prop() event_data: any



  join_reward_id: string = this.event_data.rewards.filter(item => item.goodsType === 3)[0]._id

  state = {
    /** 礼包状态 */
    cdKeys: [],
    params: {
      cdKeys: {
        groupId: this.VUE_APP_ACTIVITY_GROUP_ID,
        actId: this.event_data._id,
        token: "",
      },
      join: {
        groupId: this.VUE_APP_ACTIVITY_GROUP_ID,
        actId: this.event_data._id,
        token: "",
        rewardId: this.join_reward_id,
      },
    }
  }

  commit(key, val) {
    this.$Set(this.state, key.split("."), val)
  }

  get actions() {
    return (() => {
      const { $root, $popup, $T, $http, state, commit, $Store, $refs, $Mark } = this
      return {
        /** 获取礼包状态 */
        async cdKeys() {
          return $http("/activity/cdKeys", {
            params: state.params.cdKeys
          }).then((res: any) => {
            if (res.length) {
              commit("cdKeys", res)
            }
          })
        },
        /** 参与留言申请 */
        async join() {
          return $http("/activity/join", {
            params: state.params.join
          }).then((res: any) => {
            if (res.isGet) {
              $popup($T("welcome-back.index.success"))
              commit("cdKeys", Array.prototype.concat.call(state.cdKeys, [res]))
            }
          })
        },

      }
    })()
  }

  submit() {
    if (!this.state.cdKeys.length) {
      this.actions.join()
    }
  }


}
</script>


