<template>
  <div class="vw-act-memorial-star">
    <div class="ui">
      <div
        class="ui-bg"
        :style="{
          width: '100%',
          position: 'absolute',
          overflow: 'hidden',
          top: '0',
          background:`url(${require(`public/img/${VUE_APP_PATH}/${$mode}/ui/bg_memorial_star.jpg`)}) center top no-repeat`,
          minWidth:`${VUE_APP_WIDTH_MIN}px`
        }"
      >
        <img
          class="hide filling-img"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/ui/bg_memorial_star.jpg`)"
        >
      </div>
      <div style="width:100%;overflow:hidden;">
        <img
          class="hide filling-img"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/ui/bg_memorial_star.jpg`)"
        >
      </div>

    </div>

    <div class="main">
      <div class="main-bg">
        <div class="_250-container">
          <img
            :style="{borderColor: state._250index === index ? '#fbd11a' : '#fff'}"
            @click="toggle(index)"
            v-for="(item, index) in state._250s"
            :key="index"
            :src="require(`public/img/${VUE_APP_PATH}/${$mode}/memorial-star/${item}.jpg`)"
          >
        </div>

        <div class="own-container">
          <img
            v-if="$mode==='pc'"
            class="star"
            :src="require(`public/img/${VUE_APP_PATH}/${$mode}/memorial-star/memorial_star_icon.png`)"
          >
          <img
            v-for="(item, index) in state.starReward.restCount"
            :key="index"
            :src="require(`public/img/${VUE_APP_PATH}/${$mode}/memorial-star/_${item}.png`)"
          >
          <img
            v-if="$mode==='mb'"
            class="star"
            :src="require(`public/img/${VUE_APP_PATH}/${$mode}/memorial-star/memorial_star_icon.png`)"
          >
        </div>

        <div
          class="history-btn"
          @click="commit('visibility.history', true)"
        >
          <img
            class="filling-img"
            :src="require(`public/img/${VUE_APP_PATH}/${$mode}/memorial-star/history.png`)"
          >
        </div>

        <div class="part1">
          <component :is="require(`./btn.submit`).default" />
        </div>

        <div class="part2">
          <component
            :is="require(`./btn.submit`).default"
            :id="'5cbeb7b7b5cb6715042cd3fa'"
          />
        </div>

        <div class="part3">
          <component
            :is="require(`./btn.submit`).default"
            :id="'5cbeb81fb5cb6715042cd3fb'"
          />
        </div>

      </div>

    </div>

    <shaddow
      v-if="state.visibility.popup"
      @click="commit('visibility.popup', false)"
    />
    <center v-if="state.visibility.popup">
      <div class="popup">
        <img
          class="_bg"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/memorial-star/memorial_star_popup.png`)"
        >

        <img
          class="role"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/ui/role.png`)"
        >

        <div class="cnt">
          <span class="du-hast">Du hast nur eine Chance, um Geschenk zu tauschen. Bist du sicher, dass du dieses Geschenk tauschen möchtest?</span>
          <div>
            <img
              @click="commit('visibility.popup', false);actions.starReward()"
              class="btn"
              :src="require(`public/img/${VUE_APP_PATH}/${$mode}/memorial-star/btn_yes.png`)"
            >
            <img
              @click="commit('visibility.popup', false)"
              class="btn"
              :src="require(`public/img/${VUE_APP_PATH}/${$mode}/memorial-star/btn_no.png`)"
            >
          </div>
        </div>

      </div>
    </center>
    <shaddow
      v-if="state.visibility.history"
      @click="commit('visibility.history', false)"
    />
    <center v-if="state.visibility.history">
      <div class="history">
        <img
          class="_bg"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/memorial-star/memorial_star_history.png`)"
        >
        <img
          class="role"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/ui/role.png`)"
        >
        <div class="ctn">
          <table>
            <thead>
              <th>TOOLS</th>
              <th>EMPFANGENDE ZEIT</th>
              <th>EMPFANGENDES SERVER</th>
            </thead>
            <tr
              v-for="(item, index) in state.cdKeys"
              :key="index"
            >
              <td>{{item.rewardName}}</td>
              <td>{{item.getDate}}</td>
              <td>{{item.thirdGameZoneId}}</td>
            </tr>
          </table>
        </div>
      </div>
    </center>

    <!-- <shaddow
      v-if="state.visibility.ios"
      @click="commit('visibility.ios', false)"
    />
    <center v-if="state.visibility.ios">
      <div class="popup">
        <img
          class="_bg"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/memorial-star/memorial_star_popup.png`)"
        >

        <img
          class="role"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/ui/role.png`)"
        >

        <div class="cnt">
          <span class="du-hast">Bitte bestätigen Sie, ob Sie teilen möchten</span>
          <div>
            <img
              @click="commit('visibility.ios', false);share()"
              class="btn"
              :src="require(`public/img/${VUE_APP_PATH}/${$mode}/memorial-star/btn_yes.png`)"
            >
            <img
              @click="commit('visibility.ios', false)"
              class="btn"
              :src="require(`public/img/${VUE_APP_PATH}/${$mode}/memorial-star/btn_no.png`)"
            >
          </div>
        </div>

      </div>
    </center> -->

  </div>
</template>

<style lang="scss">
.vw-act-memorial-star {
  position: relative;
  .main {
    position: absolute;
    top: 0;
    width: 100%;
    .main-bg {
      width: 1203px;
      height: 589px;
      position: relative;
      display: table;
      margin: 0 auto;
      margin-top: 120px;
    }
  }
  ._250-container {
    position: absolute;
    top: 64px;
    left: 18px;
    img {
      float: left;
      margin: 0 16px;
      border: 6px solid #fff;
      border-radius: 18px;
      cursor: pointer;
    }
  }
  .own-container {
    width: 366px;
    height: 61px;
    position: absolute;
    right: 0;
    top: 75px;
    text-align: center;
    .star {
      transform: translateY(-2px);
    }
    img {
      padding-top: 10px;
    }
  }
  .history-btn {
    cursor: pointer;
    position: absolute;
    right: 17px;
    top: 140px;
    // background: rgba($color: #000000, $alpha: 0.4);
  }
  .part1 {
    width: 791px;
    height: 100px;
    position: absolute;
    left: 0;
    top: 394px;
    // background: rgba($color: #000000, $alpha: 0.4);
    .btn {
      position: absolute;
      right: 0;
    }
  }
  .part2 {
    width: 346px;
    height: 140px;
    position: absolute;
    right: 0;
    top: 208px;
    // background: rgba($color: #000000, $alpha: 0.4);
    .btn {
      position: absolute;
      width: 168px;
      right: 25px;
      top: 53px;
    }
  }
  .part3 {
    width: 346px;
    height: 140px;
    position: absolute;
    right: 0;
    top: 379px;
    // background: rgba($color: #000000, $alpha: 0.4);
    .btn {
      position: absolute;
      width: 168px;
      right: 25px;
      top: 51px;
    }
  }
  .popup {
    .role {
      position: absolute;
      top: -190px;
      left: -110px;
    }
    .cnt {
      position: absolute;
      width: 100%;
      height: 100%;
      text-align: center;
      top: 0;
      font-size: 24px;
      .du-hast {
        width: 74%;
        line-height: 39px;
        margin-top: 50px;
        display: inline-block;
      }
      div {
        width: 100%;
        height: 128px;
        text-align: center;
        position: absolute;
        bottom: 0;
      }
      .btn {
        margin: 0 40px;
        cursor: pointer;
      }
    }
  }
  .history {
    .role {
      position: absolute;
      top: -100px;
      left: -110px;
    }
    .ctn {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      font-size: 20px;
      table {
        width: 88%;
        text-align: center;
        margin: 3% 0 0 12%;
        thead {
          font-size: 24px;
          font-weight: 700;
        }
        th {
          line-height: 76px;
          &:first-child {
            width: 34%;
          }
          &:nth-child(2) {
            width: 25%;
          }
        }
        td {
          line-height: 56px;
        }
      }
    }
  }
}

.mb .vw-act-memorial-star {
  .ui-bg {
    background-position-x: 0 !important;
    background-size: 100% !important;
    min-width: 0 !important;
  }
  .main {
    .part1 {
      width: 100%;
      height: calculator(167, vw);
      top: calculator(35, vw);
      right: 0;
      .btn {
        right: calculator(8, vw);
        bottom: calculator(4, vw);
        width: calculator(220, vw);
      }
    }
    .part2 {
      width: 100%;
      height: calculator(146, vw);
      top: calculator(391, vw);
      right: 0;
      // background: rgba($color: #000000, $alpha: 0.4);
      .btn {
        top: calculator(60, vw);
        left: calculator(186, vw);
        width: calculator(220, vw);
      }
    }

    .part3 {
      width: 100%;
      height: calculator(146, vw);
      top: calculator(552, vw);
      right: 0;
      // background: rgba($color: #000000, $alpha: 0.4);
      .btn {
        top: calculator(60, vw);
        right: calculator(185, vw);
        width: calculator(220, vw);
      }
    }
  }
  .main-bg {
    margin-top: 19vw;
    width: 85.8vw;
    height: 96.5vw;
  }
  ._250-container {
    z-index: 1;
    position: absolute;
    top: 5.8vw;
    left: 2.2vw;
    img {
      width: calculator(110, vw);
      height: calculator(145, vw);
      float: left;
      margin: 0 0.8vw;
      border: 0.6vw solid #fff;
      border-radius: 3vw;
      cursor: pointer;
    }
  }

  .own-container {
    display: flex;
    align-items: center;
    width: 38.4vw;
    height: 6.5vw;
    position: absolute;
    right: 0;
    top: 36.1vw;
    // background: rgba($color: #000000, $alpha: 0.4);
    text-align: left;
    .star {
      width: calculator(22, vw);
      transform: translate(0.5vw, 0.5vw);
    }
    img {
      width: calculator(32, vw);
      padding-top: 10px;
    }
  }
  .history-btn {
    display: table;
    position: absolute;
    left: calculator(30, vw);
    top: calculator(335, vw);
    width: calculator(373, vw);
    img {
      height: calculator(39, vw);
    }
    // background: rgba($color: #000000, $alpha: 0.4);
  }

  .popup {
    ._bg {
      width: calculator(670, vw);
    }
    .role {
      width: calculator(160, vw);
      top: calculator(-100, vw);
      left: calculator(-45, vw);
    }
    .cnt {
      margin: calculator(20, vw) 0 0 4.6vw;
      // line-height: calculator(34, vw);
      font-size: calculator(23, vw);
      .du-hast {
        width: 90%;
        line-height: calculator(34, vw);
        margin-top: calculator(-2, vw);
        display: inline-block;
      }

      div {
        width: 100%;
        height: calculator(84, vw);
        text-align: center;
        position: absolute;
        bottom: 0;
      }
      .btn {
        width: calculator(130, vw);
        margin: 0 calculator(60, vw) 0 calculator(30, vw);
      }
    }
  }
  .history {
    ._bg {
      width: calculator(740, vw);
      transform: scaleY(1.1);
    }
    .role {
      width: calculator(160, vw);
      top: calculator(-50, vw);
      left: calculator(-30, vw);
    }
    .ctn {
      overflow: auto;
      font-size: calculator(20, vw);
      table {
        width: 88%;
        text-align: center;
        margin: 1% 0 0 12%;
        thead {
          font-size: calculator(20, vw);
          font-weight: 500;
        }
        th {
          line-height: calculator(30, vw);
          &:first-child {
            width: 32%;
          }
          &:nth-child(2) {
            width: 30%;
          }
        }
        td {
          vertical-align: middle;
          line-height: calculator(30, vw);
          padding: calculator(6, vw) 0;
        }
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Inject, Emit, Provide, Mixins } from "vue-property-decorator";
import { wait } from '../../../../../library';
import Share from '../../share';

@Component<MemorialStar>({
  created() {
    this.init()
    this.actions.cdKeys();
  }
})
export default class MemorialStar extends Vue {

  init() {
    this.actions.starReward().then(() => {
      this.state.initResolve()
    })
  }

  @Provide() get provider() {
    return this
  }

  @Prop() event_data!: any

  state = {

    initResolve: null as any,
    initPromie: new Promise(async (resolve) => {
      await wait()
      this.state.initResolve = resolve
    }),
    loginFinished: null as any,

    _250index: -1,
    _250s: ['5cbeb57bb5cb6715042cd3f7', '5cbeb59bb5cb6715042cd3f8', '5cbeb54bb5cb6715042cd3f6'],
    starReward: {
      FBCount: 0,
      consumeCount: 0,
      dayCount: 0,
      days: 0,
      restCount: '0'
    },
    cdKeys: [] as any[],
    visibility: {
      popup: false,
      history: false,
      // ios: false,
    },
    params: {
      cdKeys: {
        groupId: this.VUE_APP_ACTIVITY_GROUP_ID,
        actId: this.event_data._id,
        token: "",
      },
      starReward: {
        groupId: this.VUE_APP_ACTIVITY_GROUP_ID,
        actId: this.event_data._id,
        token: "",
        relatedActId: "5cbeb343b5cb6715042cd3f4",
        rewardId: ""
      }
    }
  }

  commit(key, val) {
    if (key === "starReward") {
      let loginFinished = [undefined, undefined, undefined] as any[]
      for (let i = 0; i < 3; i++) {
        switch (i) {
          case 0:
            if (val.days >= 1) {
              if (val.dayCount >= 2) {
                loginFinished[i] = true
              }
            } else {
              loginFinished[i] = null
            }
            break;
          case 1:
            if (val.days >= 3) {
              if (val.dayCount >= 8) {
                loginFinished[i] = true
              }
            } else {
              loginFinished[i] = null
            }
            break;
          case 2:
            if (val.days >= 5) {
              if (val.dayCount >= 18) {
                loginFinished[i] = true
              }
            } else {
              loginFinished[i] = null
            }
            break;
        }
      }
      this.state.loginFinished = loginFinished
    }
    this.$Set(this.state, key.split("."), val)
  }

  get actions() {
    return (() => {
      const { $root, $popup, $T, $http, state, commit, $Store, $refs, $set, event_data, $Mark } = this
      return {

        async share() {
          return $http("/activity/starReward", {
            params: Object.assign({}, state.params.starReward, { relatedActId: "FB", rewardId: "" })
          }).then((data: any) => {
            // $Mark("share")
            data.restCount = data.restCount.toString()
            commit('starReward', data)
            return data
          })
        },

        async starReward() {
          return $http("/activity/starReward", {
            params: state.params.starReward
          }).then((data: any) => {
            if (data.rewardId) {
              $popup(`Herzlichen Glückwunsch, Sie haben "${data.rewardName}" erhalten, melden Sie sich das Spiel an und den Mailbox öffnen um zu erhalten!`)
              this.cdKeys()
            }
            data.restCount = data.restCount.toString()
            commit('starReward', data)
            return data
          })
        },

        async cdKeys() {
          return $http("/activity/cdKeys", {
            params: state.params.cdKeys
          }).then((data) => {
            commit('cdKeys', data)
          })
        },

      }
    })()
  }

  toggle(index) {
    this.commit('_250index', index)
  }

}
</script>


