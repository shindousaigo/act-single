import Vue from "vue";
import axios, { AxiosInstance } from 'axios'

const $http: AxiosInstance = axios.create({
  baseURL: BaseUrl
})

$http.interceptors.request.use(function (config) {
  if (config.data) {
    console.log(config.data) 
    config.data = Object.keys(config.data).map(key => {
      return `${key}=${config.data[key]}`
    }).join('&')
  }
  return config;
}, function (error) {
  console.log(error)
  return Promise.reject(error);
})

$http.interceptors.response.use(function (response) {
  if (response.data.code === 200) {
    return Promise.resolve(response.data.state)
  } else {
    Vue.prototype.$popup(response.data.state)
    return Promise.reject(response.data.state)
  }
}, function (error) {
  Vue.prototype.$popup(error)
  return Promise.reject(error)
})

Vue.prototype.$http = $http

const state = {}

Object.keys($http).forEach(fn_name => {
  state[fn_name] = $http[fn_name]
})

export default {
  state
}
