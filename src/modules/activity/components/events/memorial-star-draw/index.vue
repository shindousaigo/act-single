<template>
  <div class="vw-act-memorial-star-draw">
    <div class="ui">
      <div
        class="ui-bg"
        :style="{
          width: '100%',
          position: 'absolute',
          overflow: 'hidden',
          top: '0',
          background:`url(${require(`public/img/${VUE_APP_PATH}/${$mode}/ui/bg_memorial_star_draw.jpg`)}) center top no-repeat`,
          minWidth:`${VUE_APP_WIDTH_MIN}px`
        }"
      >
        <img
          class="hide filling-img"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/ui/bg_memorial_star_draw.jpg`)"
        >
      </div>
      <div style="width:100%;overflow:hidden;">
        <img
          class="hide filling-img"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/ui/bg_memorial_star_draw.jpg`)"
        >
      </div>

    </div>

    <div class="main">
      <div class="main-bg">
        <!-- <img
          class="block smain"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/memorial-star-draw/bg_main.png`)"
        > -->
        <div class="container">
          <div class="jgg">
            <div
              class="item"
              v-for="item in [0,1,2,3,4,5,6,7,8]"
              :key="item"
              @click="!ani1_isRunning && go.call(this, item)"
            >
              <img
                class="icon"
                :src="require(`public/img/${VUE_APP_PATH}/${$mode}/memorial-star-draw/${item}.png`)"
              >
              <img
                class="gl"
                :style="{
                  visibility: jgg[item] ? 'visible' : 'hidden'
                }"
                :src="require(`public/img/${VUE_APP_PATH}/${$mode}/memorial-star-draw/gl.png`)"
              >
            </div>
          </div>
          <div class="info">
            <div class="line item">
              Diamantverbrauch：{{state.info.consume}}
            </div>
            <div class="line item">
              Anzahl der Ziehen：{{state.info.userSumCount - state.info.useCount}}
            </div>
            <div class="item">
              Jubiläumssterne erhalten：{{stars}}
            </div>
            <img
              @click="commit('visibility.history', true)"
              class="btn"
              :src="require(`public/img/${VUE_APP_PATH}/${$mode}/memorial-star-draw/btn.png`)"
            >
          </div>
        </div>
        
      </div>
    </div>

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
            <tbody>
              <tr
                v-for="(item, index) in state.cdKeys"
                :key="index"
              >
                <td class="_0">{{item.rewardName}}</td>
                <td class="_1">{{item.getDate}}</td>
                <td class="_2">{{item.thirdGameZoneId}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </center>

  </div>
</template>

<style lang="scss">
.vw-act-memorial-star-draw {
  position: relative;
  .main {
    position: absolute;
    top: 0;
    width: 100%;
  }
  .main-bg {
    position: relative;
    display: table;
    margin: 0 auto;
    margin-top: 172px;
    width: 1203px;
    height: 589px;
  }
  .container {
    .jgg {
      width: 600px;
      height: 600px;
      position: absolute;
      top: 6px;
      left: 50px;
      .item {
        float: left;
        width: 188px;
        height: 188px;
        // margin: 1px;
        position: relative;
        &:nth-child(5) {
          cursor: pointer;
          .gl {
            display: none;
          }
        }
        .gl {
          position: relative;
        }
        .icon {
          position: absolute;
          left: 11px;
          top: 11px;
        }
      }
    }
    .info {
      font-size: 30px;
      font-weight: 700;
      position: absolute;
      top: 50%;
      transform: translateY(-51%);
      right: 100px;

      .line {
        border-bottom: 2px #822a02 dotted;
      }
      .item {
        line-height: 76px;
      }
      .btn {
        cursor: pointer;
        margin-top: 36px;
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
        position: relative;
        text-align: center;
        width: 100%;

        thead {
          position: absolute;
          width: 1020px;
          font-size: 24px;
          font-weight: 700;
          top: 20px;
          left: 13%;
          th {
            line-height: 76px;
            &:nth-child(1) {
              width: 320px;
            }
            &:nth-child(2) {
              width: 254px;
            }
            &:nth-child(3) {
              width: 400px;
            }
          }
        }

        tbody {
          overflow: auto;
          position: absolute;
          width: 1020px;
          height: 360px;
          top: 90px;
          left: 13%;
          tr {
            display: inline-block;
            width: 100%;
            td {
              float: left;
              line-height: 56px;
            }
            td._0 {
              width: 320px;
            }
            td._1 {
              width: 254px;
            }
            td._2 {
              width: 400px;
            }
          }
        }
      }
    }
  }
}

.mb .vw-act-memorial-star-draw {
  .ui-bg {
    background-position-x: 0 !important;
    background-size: 100% !important;
    min-width: 0 !important;
  }
  .main-bg {
    margin-top: calculator(154, vw);
    width: calculator(643, vw);
    height: calculator(1025, vw);
  }

  .container {
    .jgg {
      width: calculator(600, vw);
      height: calculator(600, vw);
      top: calculator(25, vw);
      left: calculator(38, vw);
      .item {
        width: calculator(188, vw);
        height: calculator(188, vw);
        &:nth-child(5) {
          .gl {
            width: calculator(168, vw);
            height: calculator(168, vw);
          }
          .icon {
            top: calculator(13, vw);
          }
        }
        .gl {
          width: 100%;
          height: 100%;
          // visibility: visible;
        }
        .icon {
          width: calculator(166, vw);
          height: calculator(166, vw);
          left: calculator(11, vw);
          top: calculator(11, vw);
        }
      }
    }
    .info {
      font-size: calculator(30, vw);
      top: calculator(610, vw);
      transform: translateY(0);
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      left: 0;
      .line {
        border-bottom-width: 0.6vw;
      }
      .item {
        line-height: calculator(80, vw);
      }
      .btn {
        width: calculator(290, vw);
        margin-top: calculator(24, vw);
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
      font-size: calculator(20, vw);

      table {
        thead {
          // background: #822a02;
          width: calculator(620, vw);
          font-size: calculator(28, vw);
          font-weight: 500;
          top: calculator(20, vw);
          left: 14%;
          display: flex;
          height: calculator(60, vw);
          align-items: center;
          th {
            line-height: calculator(40, vw);
            word-break: break-all;
            &:nth-child(1) {
              width: 32%;
            }
            &:nth-child(2) {
              width: 30%;
            }
            &:nth-child(3) {
              margin-left: 2%;
              width: 34%;
            }
          }
        }

        tbody {
          // background: #000;
          overflow: auto;
          position: absolute;
          width: calculator(620, vw);
          height: calculator(210, vw);
          top: calculator(84, vw);
          left: 14%;
          tr {
            display: flex;
            align-items: center;
            td {
              line-height: calculator(38, vw);
            }
            td._0 {
              width: 32%;
            }
            td._1 {
              width: 30%;
            }
            td._2 {
              margin-left: 2%;
              width: 34%;
            }
          }
        }
      }
    }
  }
}
</style>

<script lang="ts">

/**
 * charge 充值数量
 * consume 消费数量
 * oldMoney 用户上一次充值或消费数量
 * useCount 已使用次数
 * userLoginCount 用户登录获得次数
 * userConsumeCount 用户消费获得次数
 * userChargeCount 用户充值获得次数
 * userSumCount 用户获得总次数
 * sumCount 活动最大参与次数上限
 */

import { Component, Prop, Vue, Inject, Emit, Provide, Mixins } from "vue-property-decorator";

@Component<MemorialStarDraw>({
  created() {
    this.actions.cdKeys()
    this.actions.info()
    this.$root["$MemorialStar"].then(MemorialStar => {
      this.MemorialStar = MemorialStar
    })

    // let rewardId = "5cbec2a6b5cb6715042cd401"
    // this.ani1_times_index = this.ani1_map[rewardId]
    // this.animation1('Quadratic', 'Out', {
    //   rewardName: rewardId
    // })

  },
  computed: {
    stars() {
      if (this.MemorialStar) {
        return this.MemorialStar.state.starReward.consumeCount
      }
      return 0
    }
  }
})
export default class MemorialStarDraw extends Vue {

  MemorialStar = null as any

  @Provide() get provider() {
    return this
  }

  @Prop() event_data!: any

  state = {
    MemorialStar: null as any,
    loginFinished: [],

    cdKeys: [],
    join: null as any,
    info: {
      userSumCount: 0,
      useCount: 0,
      consume: 0,
    } as any,

    visibility: {
      history: false
    },

    params: {
      info: {
        groupId: this.VUE_APP_ACTIVITY_GROUP_ID,
        actId: this.event_data._id,
        token: "",
      },
      cdKeys: {
        groupId: this.VUE_APP_ACTIVITY_GROUP_ID,
        actId: this.event_data._id,
        token: "",
      },
      join: {
        groupId: this.VUE_APP_ACTIVITY_GROUP_ID,
        actId: this.event_data._id,
        token: "",
        rewardId: "5cbebe38b5cb6715042cd3fd"
      }
    }
  }

  get actions() {
    return (() => {
      const { $root, $popup, $T, $http, state, commit, $Store, $refs, $set, event_data, $Mark } = this
      return {

        async cdKeys() {
          return $http("/activity/cdKeys", {
            params: state.params.cdKeys
          }).then((data) => {
            commit('cdKeys', (data as any).sort(function (a, b) {
              return new Date(b.getDate).getTime() - new Date(a.getDate).getTime()
            } as any))
          })
        },

        async info() {
          return $http("/activity/info", {
            params: state.params.info
          }).then((data) => {
            commit('info.userSumCount', data.data.userSumCount || 0)
            commit('info.useCount', data.data.useCount || 0)
            commit('info.consume', data.data.consume || 0)
          })
        },

        async join() {
          return $http("/activity/join", {
            params: state.params.join
          }).then((data: any) => {
            if (data.rewardId) {
              commit('info.useCount', state.info.useCount + 1)
              this.info()
              this.cdKeys()
            }
            commit('join', data)
            return data
          })
        },

      }
    })()
  }

  commit(key, val) {
    this.$Set(this.state, key.split("."), val)
  }

  go(index) {
    if (index === 4) {
      if (this.state.info.userSumCount > this.state.info.useCount) {
        // this.$Mark("GO")
        this.actions.join().then((data) => {
          this.ani1_times_index = this.ani1_map[data.rewardId]
          this.ani1_isRunning = true
          this.animation1('Quadratic', 'Out', data)
          this.$root["$MemorialStar"].then((MemorialStar) => {
            MemorialStar.state.params.starReward.rewardId = ""
            MemorialStar.actions.starReward()
          })
        })
      } else {
        this.$popup("Leider können Sie nicht an der Veranstaltung teilnehmen")
      }
    }
  }

  ani1_map = {
    "5cbec2fab5cb6715042cd404": 3,
    "5cbec2dfb5cb6715042cd403": 2,
    "5cbec2c0b5cb6715042cd402": 1,
    "5cbec238b5cb6715042cd400": 0,
    "5cbebe38b5cb6715042cd3fd": -1,
    "5cbec1d7b5cb6715042cd3fe": -2,
    "5cbec212b5cb6715042cd3ff": -3,
    "5cbec2a6b5cb6715042cd401": -4,
  }
  lastDuration = 0
  ani1_times_index = 0
  ani1_times = 26
  ani1_duration = 1200
  ani1_interval = 0
  ani1_isRunning = false
  jgg = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  sxx = [0, 1, 2, 5, 8, 7, 6, 3]
  glindex = 0
  QuadraticOut = function (k) {
    return k * (2 - k);
  }
  QuadraticIn = function (k) {
    return k * k;
  }
  CubicOut = function (k) {
    return --k * k * k + 1;
  }
  CubicIn = function (k) {
    return k * k * k;
  }
  animation1(name, type, data) {
    this.ani1_times_index++
    if (this.ani1_times_index <= this.ani1_times) {
      let jgg = [0, 0, 0, 0, 0, 0, 0, 0, 0]
      jgg[this.sxx[this.glindex]] = 1
      this.jgg = jgg
      let glindex = this.glindex + 1
      if (glindex === 8) {
        glindex = 0
      }
      this.glindex = glindex
      let duration = this[name + type](1 / this.ani1_times * this.ani1_times_index) * this.ani1_duration
      this.ani1_interval = duration - this.lastDuration
      setTimeout(() => {
        this.lastDuration = duration
        this.animation1(name, type, data)
      }, this.ani1_interval)
    } else {
      this.lastDuration = 0
      this.ani1_times_index = 0
      if (type === 'Out') {
        this.animation1(name, 'In', data)
      } else {
        for (let i = 0; i <= 4; i++) {
          ((i) => {
            let time = this.ani1_interval * i + (i * i * 90)
            setTimeout(() => {
              if (i === 4) {
                this.$popup(`Herzlichen Glückwunsch, Sie haben "${data.rewardName}" erhalten, melden Sie sich das Spiel an und den Mailbox öffnen um zu erhalten!`)
                this.glindex = 0
                this.ani1_isRunning = false
              } else {
                let jgg = [0, 0, 0, 0, 0, 0, 0, 0, 0]
                jgg[this.sxx[this.glindex]] = 1
                this.jgg = jgg
                let glindex = this.glindex + 1
                if (glindex === 8) {
                  glindex = 0
                }
                this.glindex = glindex
              }
            }, time)
          })(i)
        }
      }
    }
  }




}
</script>


