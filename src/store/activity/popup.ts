import Vue from "vue"
import md5 from "md5"
const v = Vue.prototype

export default {
  state: {
    visibility: {
      shadow: false
    },
    params: {
      login: {
        userName: "",
        password: "",
        version: v.VUE_APP_SDK_VERSION
      }
    },
    userInfo: "",
    thirdGameZoneId: "",
    zoneList: "",
  },
  mutations: {
    set(state, { key, val }) {
      v.$Set(state, key.split("."), val)
    }
  },
  getters: {},
  actions: {
    login({ commit, dispatch, getters, rootGetters, state, rootState }) {
      if (!state.userName || !state.password) {
        v.$popup("123123123")
      } else {
        const params = state.params.login
        params.password = md5(params.password)
        return v.$http.get("/user/sdk/login", { params })
      }
    }
  }
}
