<template>
  <div class="mb-lazy">
    <div
      class="ios blk"
      @click="open(`https://bit.ly/2q1aq6M`)"
      :style="{background:`url(${require(`public/img/${VUE_APP_PATH}/${$mode}/ui/btn_ios.png`)})`,backgroundSize: '100% 100%'}"
    ></div>
    <div
      class="android blk"
      @click="open(`https://bit.ly/2Ws8TnG`)"
      :style="{background:`url(${require(`public/img/${VUE_APP_PATH}/${$mode}/ui/btn_android.png`)})`,backgroundSize: '100% 100%'}"
    ></div>
    <div
      class="facebook blk"
      @click="open(`https://www.facebook.com/pg/trainer3ds/`)"
      :style="{background:`url(${require(`public/img/${VUE_APP_PATH}/${$mode}/ui/btn_facebook.png`)})`,backgroundSize: '100% 100%'}"
    ></div>
    <div
      v-if="isLogin"
      class="share blk"
      @click="share"
      :style="{background:`url(${require(`public/img/${VUE_APP_PATH}/${$mode}/ui/btn_share.png`)})`,backgroundSize: '100% 100%'}"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.mb-lazy {
  width: 100%;
  height: calculator(150, vw);
  display: flex;
  justify-content: space-around;
  .blk {
    float: left;
    width: calculator(180, vw);
    height: calculator(63, vw);
    margin: 13vw 0 0 0;
  }
}
</style>
<style>
body {
  background: #2a0900 !important;
}
</style>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Share from '../components/share';
@Component<Mb>({
  created() {
    this.$nextTick(() => {
      this.$root["$Login"].then(Login => {
        Login.state.hasLoginPromise.then(() => {
          this.isLogin = true
        })
      })
    })
  },
})
export default class Mb extends Vue {

  isLogin = false

  open(url) {
    open(url)
  }

  share() {
    Share.instance.share(location.href)
    this.$root["$MemorialStar"].then(MemorialStar => {
      MemorialStar.actions.share()
    })
  }

}
</script>


