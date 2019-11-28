<template>
  <div class="pc-lazy">
    <div class="cnt">
      <div
        :class="`item ${isCur[index] && 'cur'}`"
        :style="{background:`url(${require(`public/img/${VUE_APP_PATH}/${$mode}/ui/oval.png`)})`}"
        v-for="(item, index) in events"
        :key="item"
        @click="scroll.call(this, index)"
      >
        {{item}}
      </div>
    </div>
    <div :class="`cnt2${isOpen ? ' open':' close'}`">
      <img
        class="filling-img"
        :src="require(`public/img/${VUE_APP_PATH}/${$mode}/ui/right.png`)"
      >
      <div :class="`wrp${isLogin?' is-login':''}`">
        <img
          @click="open(`https://bit.ly/2q1aq6M`)"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/ui/btn_ios.png`)"
        >
        <img
          @click="open(`https://bit.ly/2Ws8TnG`)"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/ui/btn_android.png`)"
        >
        <img
          @click="open(`https://www.facebook.com/pg/trainer3ds/`)"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/ui/btn_facebook.png`)"
        >
        <img
          v-if="isLogin"
          @click="share"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/ui/btn_share.png`)"
        >
      </div>
      <div
        class="toggle"
        @click="toggle"
        :style="{
           background: `url(${require(`public/img/${VUE_APP_PATH}/${$mode}/ui/_.png`)}) 7px 10px no-repeat`,
      }"
      >
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.pc-lazy {
  position: fixed;
  top: 90px;
  right: 255px;
  z-index: 10;
  width: 0;
  .cnt {
    width: 42px;
    margin: 0 0 148px 200px;
  }
  .item {
    width: 42px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    font-size: 24px;
    color: #d5a093;
    font-weight: 700;
    cursor: pointer;
    float: left;
    margin: 3px 0;
    &.cur {
      color: #fff;
    }
  }
  .cnt2 {
    display: table;
    position: relative;
    transition: transform 0.75s;
    &.close {
      transform: translateX(230px);
      .toggle {
        transform: rotate(180deg);
        left: 2px;
      }
    }
    .wrp {
      position: absolute;
      float: left;
      top: 123px;
      left: 37px;
      img {
        cursor: pointer;
        margin-top: 25px;
      }
      &.is-login {
        img {
          margin-top: 7px;
        }
      }
    }
    .toggle {
      cursor: pointer;
      position: absolute;
      top: 250px;
      left: 0px;
      width: 27px;
      height: 40px;
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Share from '../components/share';
@Component<Pc>({
  created() {
    this.$nextTick(() => {
      this.$root["$Login"].then(Login => {
        Login.state.hasLoginPromise.then(() => {
          this.isLogin = true
        })
      })
    })
    if (!Pc.cached) {
      Pc.cached = true
      window.addEventListener("scroll", this.onscroll)
    }
  },
  beforeDestroy() {
    Pc.cached = false
    window.removeEventListener("scroll", this.onscroll)
  }
})
export default class Pc extends Vue {

  static cached = false

  isOpen = true

  isLogin = false

  get scale() {
    return Math.min(screen.availWidth, this.VUE_APP_WIDTH_MAX) / this.VUE_APP_WIDTH_MAX * .8
  }

  events = [1, 2, 3]

  isCur = [false, false, false]

  onscroll() {
    let scrollTop = (document.scrollingElement || document.body).scrollTop
    if (scrollTop >= 900) {
      if (scrollTop >= 2570) {
        this.isCur = [false, false, true]
      } else if (scrollTop >= 1812) {
        this.isCur = [false, true, false]
      } else {
        this.isCur = [true, false, false]
      }
    } else {
      this.isCur = [false, false, false]
    }
  }

  scroll(index) {
    window.scrollTo(0, [1050, 1890, 2825][index]);
  }

  open(url) {
    open(url)
  }

  toggle() {
    this.isOpen = !this.isOpen
  }

  share() {
    Share.instance.share(location.href)
    this.$root["$MemorialStar"].then(MemorialStar => {
      MemorialStar.actions.share()
    })
  }

}
</script>


