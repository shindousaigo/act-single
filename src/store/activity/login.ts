import Vue from "vue"
import md5 from "md5"
import { Activity } from 'src/const';

Activity

const { VUE_APP_SDK_VERSION, $Set, $http, $popup, set$t } = Vue.prototype

export default {
  namespaced: true,
  state: {
    visibility: {
      shaddow: false
    },
    params: {
      login: {
        userName: "",
        password: "",
        version: VUE_APP_SDK_VERSION
      }
    },
    userInfo: "",
    thirdGameZoneId: "",
    zoneList: "",
  },
  mutations: {
    set(state, { key, val }) {
      $Set(state, key.split("."), val)
    }
  },
  getters: {},
  actions: {
    login({ commit, dispatch, getters, rootGetters, state, rootState }) {
      if (!state.userName || !state.password) {
        $popup("123123123")
      } else {
        const params = state.params.login
        params.password = md5(params.password)
        return $http.get("/user/sdk/login", { params })
      }
    }
  }
}
