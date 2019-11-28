import Vue from "vue";
import I18n from 'vue-i18n'
import axios, { AxiosInstance } from 'axios'
import { wait } from './library';

declare var VUE_APPS: any

for (let name in process.env) {
  Vue.prototype[name] = process.env[name]
}

for (let name in VUE_APPS) {
  let name_ = "VUE_APP_" + name
  Vue.prototype[name_] = VUE_APPS[name]
}

/** use vue-i18n */
Vue.use(I18n)

export const i18n = new I18n({
  locale: Vue.prototype.VUE_APP_LANGUAGE
})

Vue.prototype.i18n = i18n

/** overwrite */
Vue.prototype.$T = function (path) {
  return i18n.t(`${path}.${i18n.locale}`)
}

const set$tLoop = function (index, keys, root, value) {
  const key = keys[index]
  const isLast = index === keys.length - 1
  if (isLast) {
    root[key] = value
  } else {
    if (!root[key]) {
      root[key] = {}
    }
    set$tLoop(index + 1, keys, root[key], value)
  }
}

Vue.prototype.set$t = function (namespace, value) {
  const root = i18n.getLocaleMessage(Vue.prototype.VUE_APP_LANGUAGE)
  const keys = namespace.split('.')
  set$tLoop(0, keys, root, value)
  i18n.setLocaleMessage(Vue.prototype.VUE_APP_LANGUAGE, root)
}

/** $isMobile */
Vue.prototype.$isMobile = function () {
  return (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))
}

/** $mode */
Vue.prototype.$mode = Vue.prototype.$isMobile() && innerWidth <= 1920 ? 'mb' : 'pc'

/** $Set */
Vue.prototype.$Set = function (state: object, keys: string[], val: any, index: number = 0) {
  const key = keys[index]
  if (keys.length === index + 1) {
    state[key] = val
  } else {
    Vue.prototype.$Set(state[key], keys, val, index + 1)
  }
}

/** $Store */
Vue.prototype.$Store = new Store

function Store(this) {
  this.get = function (key: string) {
    return localStorage.getItem(key)
  }
  this.getJson = function (key: string) {
    let val
    val = localStorage.getItem(key)
    try {
      val = val && JSON.parse(val)
    } catch (e) {
      val = ""
      this.set(key, val)
    }
    return val
  }
  this.set = function (key: string, val) {
    if (typeof val === 'object') {
      localStorage.setItem(key, JSON.stringify(val))
    } else {
      localStorage.setItem(key, val)
    }
  }
  this.delete = function (key) {
    localStorage.removeItem(key)
  }
}

function detection() {

}

window.addEventListener("resize", detection)

const $http: AxiosInstance = axios.create({
  baseURL: BaseUrl
})

$http.interceptors.request.use(function (config) {
  return new Promise(async function (resolve, reject) {
    const hasToken = config.params.hasOwnProperty("token")
    const LoaderData = {
      appClick: $instance.$App.state.appClick,
      justClick: undefined,
      showLoader: false
    }
    !LoaderData.appClick && await wait()
    LoaderData.justClick = $instance.$App.state.justClick
    const Loader = await $instance.$Loader.show(config, LoaderData)
    if (Loader.showLoader) {
      if (Loader.justClick) {
        const $Login = await $instance.$Login
        if (hasToken && !config.params.token && (!$Login.state.userInfo.token || !$Login.state.roleInfo.length)) {
          $instance.$Loader.hide(config, 0)
          $Login.login()
          reject("")
        } else {
          if (hasToken) config.params.token = $Login.state.userInfo.token
          resolve(config)
        }
      } else {
        $instance.$Loader.hide(config, 0)
        if (hasToken && config.params.token) {
          resolve(config)
        } else {
          const $Login = await $instance.$Login
          await $Login.state.hasLoginPromise
          config.params.token = $Login.state.userInfo.token
          resolve(config)
        }
      }
    } else {
      reject("")
    }
  })
}, function (error) {
  return Promise.reject(error);
})

$http.interceptors.response.use(function (response) {
  return new Promise(async function (resolve, reject) {
    $instance.$Loader.hide(response, false)
    switch (response.data.code) {
      case 102:
        // 账号或者密码错误：
        Vue.prototype.$popup("계정이 존재하지 않거나 비밀번호가 다릅니다.")
        reject(response.data.state)
        break
      case 200:
        resolve(response.data.state)
        break
      case 300:
        const $Login = await $instance.$Login
        $Login.logout()
        reject(response.data.state)
        break
      case 400:
        // service ERROR !

        Vue.prototype.$popup("Sever Error!")
        reject(response.data.state)

        // location.reload()

        break
      case 401:
        // act not start
        Vue.prototype.$popup("웹이벤트가 아직 시작되지 않았습니다.")
        reject(response.data.state)
        break
      case 402:
        // act is end
        Vue.prototype.$popup("웹이벤트가 종료되었습니다!")
        reject(response.data.state)
        break
      case 1005:
        Vue.prototype.$popup("횟수 제한에 도달했습니다 (30회)！<br>참여해주셔서 감사합니다~2주년 축하합니다！")
        reject(response.data.state)
        break
      case 1006:
        // login count not over
        Vue.prototype.$popup("죄송합니다.아직 게임에 접속하지 않았습니다! 수령할 수 없음")
        reject(response.data.state)
        break
      case 1101:
        // send email failure
        Vue.prototype.$popup("죄송합니다.아직 게임에 접속하지 않았습니다! 수령할 수 없음")
        reject(response.data.state)
        break
      case 1000:
        // not achieve condition
        Vue.prototype.$popup("죄송합니다.추첨 횟수가 부족합니다.")
        reject(response.data.state)
        break
      default:
        if (response.data.state) {
          Vue.prototype.$popup(response.data.state)
          reject(response.data.state)
        } else {
          reject(response.data)
        }
        break
    }
  })
}, function (error) {
  return Promise.reject(error)
})

Vue.prototype.$http = $http
Vue.prototype.$popup = async function (msg) {
  const $Popup = await $instance.$Popup
  $Popup.popup(msg)
}
