<template>
  <div class="oa">
    <div
      v-if="code"
      class="main"
    >
      <h1 class="title">{{title}}</h1>
      <el-tabs v-model="activeName">
        <el-tab-pane
          v-for="({name, label, component}, index) in menu"
          :key="index"
          :label="label"
          :name="name"
        >
          <component
            v-if="activeName===name"
            :is="component"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div
      v-else
      id="oa-wwlogin"
      class="wwlogin"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import member_edit from './packages/member_edit/Index.vue'
import member_info from './packages/member_info/Index.vue'
import member_examine_approve from './packages/member_examine_approve/Index.vue'
import system_config from './packages/system_config/Index.vue'

import { getParameterByName } from 'src/utils/fns';
import { OA_CONST } from 'apollo-server/utils/const'
import { OA } from 'types';
import { Notification } from 'element-ui';
import * as CryptoJS from "crypto-js"

let code = getParameterByName(OA_CONST.CODE)
let wwLoginScript = document.createElement('script')
let wwLoginScriptPromise = (function () {
  let resolve
  let promise = new Promise(_ => {
    resolve = _
  })
  return { promise, resolve }
})()
let wwLoginScriptSrc = "//rescdn.qqmail.com/node/ww/wwopenmng/js/sso/wwLogin-1.0.0.js"
const isRoot = true
wwLoginScript.src = wwLoginScriptSrc
document.body.appendChild(wwLoginScript)
wwLoginScript.onload = () => {
  wwLoginScriptPromise.resolve()
}

@Component<Oa>({
  components: {
    member_info,
    member_edit,
    member_examine_approve,
    system_config
  },
  async created() {
    if (code) {
      let user: OA.USER.UserInfoRes = await this.$store.dispatch('oa/userInfo'), res
      res = (await this.$store.dispatch('oa/userPermission', {
        userId: user.UserId
      })).data.roleInfo
      if (res.roleStatus) {
        let banList = (process.env.VUE_APP_MOUDLE_BAN as string).split(',')
        if (this.$store.state.oa.userPermission.data.roleInfo.permissionLevel >= 15) {
          this.menu = [
            { name: 'member-info', label: '个人信息', component: 'member_info' },
            { name: 'member-edit', label: '成员编辑', component: 'member_edit' },
            { name: 'member-examine-approve', label: '个人审批', component: 'member_examine_approve' },
            { name: 'system-config', label: '系统配置', component: 'system_config' },
          ].filter(item => {
            return !banList.includes(item.name)
          })
        } else {
          this.menu = [
            { name: 'member-info', label: '个人信息', component: 'member_info' },
            { name: 'member-examine-approve', label: '个人审批', component: 'member_examine_approve' },
          ].filter(item => {
            return !banList.includes(item.name)
          })
        }
      } else {
        Notification.info('权限不足')
      }
    }
  },
  mounted() {
    if (!code) {
      wwLoginScriptPromise.promise.then(function () {
        let config = {
          id: 'oa-wwlogin',
          href: '',
          state: '',
          appid: OA_CONST.CORP_ID,
          agentid: OA_CONST.AGENT_ID,
          redirect_uri: encodeURIComponent(process.env.VUE_APP_HTTP_ORIGIN + '/oa')
        }
        window.WwLogin(config)
      })
    }
  },
  watch: {

  }
})
export default class Oa extends Vue {
  /** authCode */
  code = code
  title = "OA管理系统"
  activeName = process.env.VUE_APP_MOUDLE_DEFAULT
  menu: any[] = []

  createNonceStr() {
    return '0123456789ABCDEF'
  }

  getSignPackage() {
    let $jsapiTicket = "HoagFKDcsGMVCIY2vOjf9oeAOqoE-xI0_1a_qeo8xwa7a6uSUBFuMPNtmKoeasYOLj1RbLfR3THscJzoNmN3CA";
    let $url = `http://www.shindousaigo.com:4001/oa`
    let $timestamp = Math.floor(Date.now() / 1000)
    let $nonceStr = this.createNonceStr();
    let $string = `jsapi_ticket=${$jsapiTicket}&noncestr=${$nonceStr}&timestamp=${$timestamp}&url=${$url}`
    let $signature = CryptoJS.SHA1($string).toString();
    let $signPackage = {
      "appId": 'wwc5265d7ecd0d5d29',
      "nonceStr": $nonceStr,
      "timestamp": $timestamp,
      "url": $url,
      "signature": $signature,
      "rawString": $string
    }
    return $signPackage;
  }



}
</script>

<style lang="scss">
.oa {
  margin: 0 auto;
  width: 1200px;
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title {
    margin-top: 40px;
  }
  .wwlogin {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: -10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
