<template>
  <div
    class="loader"
    v-if="visible"
  >
    <shaddow />
  </div>
</template>


<style lang="scss" scoped>
.loader {
  .shaddow {
    opacity: 0.1 !important;
  }
}
</style>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  created() {
    this.$root["$Loader"] = this
  },
  data() {
    return {
      visible: false,
      cacheMap: {} as Object
    }
  },
  methods: {
    show(config, data) {

      return new Promise(async resolve => {
        let key = config.baseURL + config.url + config.params.actId

        if (key.indexOf('join') > -1) {
          const _ = key.replace('join', 'cdKeys')
          if (!this.cacheMap.hasOwnProperty(_) || this.cacheMap[_] !== false) {
            const $Login = await $instance.$Login
            if ($Login.state.userInfo.token && $Login.state.roleInfo.length) {
              resolve(data)
              return
            }
          }
        }

        if (this.cacheMap[key]) {
          resolve(data)
        } else {
          this.cacheMap[key] = true
          this.visible = true
          data.showLoader = true
          resolve(data)
        }
      })


    },
    hide(response, val) {
      let key
      if (response.config) {
        key = response.config.url + response.config.params.actId
      } else {
        key = response.baseURL + response.url + response.params.actId
      }
      this.cacheMap[key] = val
      this.visible = false
    }
  }
})
</script>




