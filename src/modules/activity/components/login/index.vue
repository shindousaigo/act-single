<template>

  <actui
    class="vw-act-login"
    :background="require(`public/assets/${VUE_APP_PATH}/login/${$mode}/bg.jpg`)"
  >
    <div
      class="login-wrap"
      :style="{
        width: `${$mode==='pc'?VUE_APP_WIDTH_MIN+'px':'100%'}`
      }"
    >
      <!-- 顶部状态栏 -->
      <div
        v-if="state.visibility.statebar"
        class="state-bar"
      >
        <a
          v-if="!state.userInfo.token"
          class="login"
          @click="login"
        >
          <span>{{$T("login.index.login")}}</span>
        </a>
        <a
          v-else
          class="login"
        >
          <span>{{(state.roleInfo.length && state.roleInfo[0].playerName) || state.userInfo.userName}}</span>
          <span @click="logout">{{$T("login.index.logout")}}</span>
        </a>
      </div>

      <div :style="{
        position: 'relative',
        top: state.userInfo.token && state.roleInfo.length ? ($mode==='pc'?'-6px':'-1vw') : ($mode==='pc'?'74px':'8.2vw')
      }">
        <img
          class="btn_ios"
          @click="open(`http://www.cooltechnet.com/ios_download_guide/`)"
          :src="require(`public/assets/${VUE_APP_PATH}/login/${$mode}/btn_ios.png`)"
        />
        <img
          class="btn_apk"
          @click="open(`http://www.cooltechnet.com/com.posesmilegame.wtp/`)"
          :src="require(`public/assets/${VUE_APP_PATH}/login/${$mode}/btn_apk.png`)"
        />
      </div>

      <!-- 登录按钮 -->
      <component
        v-if="!state.userInfo.token || !state.roleInfo.length"
        :is="require(`src/modules/activity/components/login/btn.login`).default"
        @click="login"
      />
      <!-- 登录状态 -->
      <!-- <component
        v-if="state.userInfo.token && state.roleInfo.length"
        :is="require(`src/modules/activity/components/login/login.state`).default"
      /> -->
      <!-- 阴影层 -->
      <shaddow
        v-show="state.visibility.shaddow"
        @click="shadowVisible.call(this, false)"
      />

      <center
        class="window"
        v-if="(state.visibility.shaddow && !state.userInfo.token) || (state.visibility.shaddow && state.userInfo.token && !state.roleInfo.length)"
      >
        <!-- 登录窗口 -->
        <component
          v-if="state.visibility.shaddow && !state.userInfo.token"
          :is="require(`src/modules/activity/components/login/box.login`).default"
        />
        <!-- 区服窗口 -->
        <component
          v-if="state.visibility.shaddow && state.userInfo.token && !state.roleInfo.length"
          :is="require(`src/modules/activity/components/login/box.zone`).default"
        />

      </center>

    </div>

  </actui>

</template>

<style lang="scss">
.vw-act-login {
  position: relative;
  margin-top: calculator($state_bar_height_pc, px);

  .login-wrap {
    position: relative;
    margin: 0 auto;
  }

  .state-bar {
    z-index: 9;
    height: calculator($state_bar_height_pc, px);
    background: #000;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    .login {
      float: right;
      cursor: pointer;
      font-size: calculator($state_bar_font_size_pc);
      line-height: calculator($state_bar_height_pc);
      margin-right: calculator($state_bar_login_mr_pc);
      span {
        float: left;
        padding: 0 calculator($state_bar_login_span_plr_pc);
        margin-left: calculator($state_bar_login_span_ml_pc);
        transition: background-color 0.5s ease-in-out;
        &:hover {
          background-color: #360b0b;
        }
      }
    }
  }
}
.mb .vw-act-login {
  margin-top: calculator($state_bar_height_mb, vw);

  .state-bar {
    height: calculator($state_bar_height_mb, vw);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .login {
      font-size: calculator($state_bar_font_size_mb, vw);
      margin-right: calculator($state_bar_login_mr_mb, vw);
      span {
        padding: 0 calculator($state_bar_login_span_plr_mb, vw);
        margin-left: calculator($state_bar_login_span_ml_mb, vw);
      }
    }
  }
}
</style>

<script lang="ts">

import StoreLogin from "src/store/activity/login"
import { Activity } from 'src/const';
import Config from "src/modules/activity"
import { Component, Prop, Vue, Inject, Emit, Provide, Mixins } from "vue-property-decorator";
import { wait } from 'src/library';

@Component<Login>({
  created() {
    import(`public/assets/${this.VUE_APP_PATH}/login/${this.$mode}/style.scss`)
    this.set$t("login.index", {
      login: {
        [Activity.Language.Zh]: '登录',
        [Activity.Language.Ti]: 'ล็อกอิน',
        [Activity.Language.De]: 'ANMELDEN',
        [Activity.Language.Ko]: '로그인',
      },
      logout: {
        [Activity.Language.Zh]: '登出',
        [Activity.Language.Ti]: 'ออกจากระบบ',
        [Activity.Language.De]: 'BEENDEN',
        [Activity.Language.Ko]: '로그아웃',
      },
      username_password: {
        [Activity.Language.Zh]: '账号或者密码输入错误',
        [Activity.Language.Ti]: 'ไม่มีบัญชีนี้หรือรหัสไม่ถูกต้อง',
        [Activity.Language.De]: 'Konto oder Passwort ist falsch',
        [Activity.Language.Ko]: '계정이 존재하지 않거나 비밀번호가 다릅니다.',
      },
      no_role_info: {
        [Activity.Language.Zh]: '区服没有角色',
        [Activity.Language.Ti]: 'ไม่มีตัวละครในเซิร์ฟเวอร์นี้',
        [Activity.Language.De]: 'Server hat keine Charakter',
        [Activity.Language.Ko]: '해당 서버에서 캐릭터를 찾지 못 했습니다.서버를 다시 선택하십시오.',
      }
    })
    const userInfo = this.$Store.getJson("userInfo") || this.state.userInfo
    this.commit("userInfo", userInfo)

    this.commit("hasLoginPromise", new Promise(resolve => {
      this.commit("hasLoginResolve", resolve)
    }))

    const roleInfo = this.$Store.getJson("roleInfo") || this.state.roleInfo
    this.commit("roleInfo", roleInfo)
  },
})
export default class Login extends Vue {

  @Provide() get provider() {
    return this
  }

  @Inject() app

  /** store state */
  state = {
    hasLoginResolve: function () { },
    hasLoginPromise: null,
    visibility: {
      /** 阴影背景是否可视 */
      shaddow: false,
      statebar: true
    },
    params: { /** 请求参数 */
      login: {
        userName: "",
        password: "",
        version: this.VUE_APP_SDK_VERSION
      },
      zone: {
        appId: Config.appId,
        token: ""
      },
      role: {
        appId: Config.appId,
        gameZoneId: "",
        token: ""
      }
    },
    userInfo: {
      token: "",
      userId: "",
      userName: ""
    },
    roleInfo: [],
    zoneList: [],
    server: ""
  }
  /** store provide */
  get actions() {
    return (() => {
      const { $popup, $T, $http, state, commit, $Store, $Mark } = this
      return {
        sdk() {
          // debugger
          if (!state.userInfo.token) {
            this.login()
          } else {
            this.role()
          }
        },
        async login() {
          if (!state.params.login.userName || !state.params.login.password) {
            $popup($T("login.index.username_password"))
            return
          }
          const res: {
            token: string
            userId: string
            userName: string
          } = await $http.get("/user/sdk/login", { params: state.params.login }) as any
          commit("params.login.userName", "")
          commit("params.login.password", "")
          $Store.set("userInfo", res)
          commit("userInfo", res)
        },
        async zone() {
          const res: {
            appId: number
            gameZoneId: number
            localName: string
            mainGameZoneId: number
            thirdGameZoneId: string
          }[] = await $http("/user/sdk/zones", { params: Object.assign({}, state.params.zone, { token: state.userInfo.token }) }) as any
          // res.forEach((item, index, arr) => {
          //   if (item.thirdGameZoneId.length === 4) {
          //     (arr as any)[index].thirdGameZoneId = (item as any).thirdGameZoneId - 1000 + ''
          //   }
          // })
          commit("zoneList", res)
        },
        async role() {
          if (!state.params.role.gameZoneId) {
            $popup($T("login.select.login.placeholder"))
            return
          }

          const params = Object.assign({}, state.params.role, { token: state.userInfo.token })
          // debugger
          const res: {
            appId: number
            gameZoneId: number
            localName: string
            mainGameZoneId: number
            thirdGameZoneId: string
          }[] = await $http("/user/player/list", { params }) as any
          if (res.length) {
            res[0]["server"] = state.server
            commit("roleInfo", res)
            commit("visibility.shaddow", false)
            commit("params.role.gameZoneId", "")
            $Store.set("roleInfo", res)
            $Mark('login20190522')
          } else {
            $popup($T("login.index.no_role_info"))
          }
        }
      }
    })()
  }
  /** store commit */
  async commit(key: string, val: any) {
    this.$Set(this.state, key.split("."), val)
    switch (key) {
      case "userInfo":
        if (val.token) {
          await this.$nextTick
          if (!this.state.roleInfo.length) {
            this.commit("visibility.shaddow", true)
            this.actions.zone()
          }
        }
        break
      case "roleInfo":
        if (val.length) {
          this.state.hasLoginResolve()
        }
        break
    }
  }
  /** login */
  login() {
    this.shadowVisible(true)
  }
  /** logout */
  logout() {
    const userInfo = {
      token: "",
      userId: "",
      userName: ""
    }
    const roleInfo = []

    this.commit("userInfo", userInfo)
    this.$Store.set("userInfo", userInfo)

    this.commit("roleInfo", roleInfo)
    this.$Store.set("roleInfo", roleInfo)

    this.app.logout()
  }
  /** shaddow */
  shadowVisible(visibility) {
    this.commit("visibility.shaddow", visibility)
  }
  open(url) {
    window.open(url)
  }
}

</script>
