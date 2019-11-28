<template>
  <div class="vw-act-memorial-star-login">
    <div class="ui">
      <div
        class="ui-bg"
        :style="{
          width: '100%',
          position: 'absolute',
          overflow: 'hidden',
          top: '0',
          background:`url(${require(`public/img/${VUE_APP_PATH}/${$mode}/ui/bg_memorial_star_login.jpg`)}) center top no-repeat`,
          minWidth:`${VUE_APP_WIDTH_MIN}px`
        }"
      >
        <img
          class="hide filling-img"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/ui/bg_memorial_star_login.jpg`)"
        >

      </div>
      <div style="width:100%;overflow:hidden;">
        <img
          class="hide filling-img"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/ui/bg_memorial_star_login.jpg`)"
        >
      </div>

    </div>

    <div class="main">
      <div class="main-bg">
        <!-- <img
          class="block smain"
          :src="require(`public/img/${VUE_APP_PATH}/${$mode}/memorial-star-login/bg_main.png`)"
        > -->
        <div class="container">
          <div
            class="item"
            v-for="item in [0,1,2]"
            :key="item"
          >
            <img
              class="title"
              :src="require(`public/img/${VUE_APP_PATH}/${$mode}/memorial-star-login/d${item}.png`)"
            >
            <img
              class="star"
              :src="require(`public/img/${VUE_APP_PATH}/${$mode}/memorial-star-login/star.png`)"
            >
            <br>
            <span>Jubiläumsstern*{{(item*2+1)*2}}</span>
            <img
              v-if="state.loginFinished.length"
              @click="draw.call(this, item)"
              class="btn"
              :src="state.loginFinished[item] === true ? require(`public/img/${VUE_APP_PATH}/${$mode}/memorial-star-login/btn_grey.png`) : require(`public/img/${VUE_APP_PATH}/${$mode}/memorial-star-login/btn.png`)"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.vw-act-memorial-star-login {
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
    margin-top: 109px;
    width: 1203px;
    height: 314px;
  }
  .container {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100%;
    // background: red;
    .item {
      width: 254px;
      height: 100%;
      // background: red;
      float: left;
      margin: 0 73px;
      text-align: center;
      .title {
        display: inline-block;
        margin-top: 22px;
      }
      .star {
        display: inline-block;
        margin-top: 12px;
      }
      span {
        margin-top: 12px;
        display: inline-block;
        color: #ffd6cc;
        font-size: 18px;
      }
      .btn {
        cursor: pointer;
        margin-top: 12px;
      }
    }
  }
}

.mb .vw-act-memorial-star-login {
  .ui-bg {
    background-position-x: 0 !important;
    background-size: 100% !important;
    min-width: 0 !important;
  }
  .main-bg {
    margin-top: calculator(138, vw);
    width: calculator(643, vw);
    height: calculator(357, vw);
  }
  .container {
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;

      width: calculator(191, vw);
      margin: 0 calculator(11, vw);
      .title {
        width: calculator(170, vw);
        margin-top: calculator(38, vw);
      }
      .star {
        width: calculator(100, vw);
        margin-top: calculator(15, vw);
      }
      span {
        margin-top: calculator(0, vw);
        font-size: calculator(28, vw);
        transform: scale(0.88);
      }
      .btn {
        width: 100%;
        margin-top: calculator(20, vw);
      }
    }
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Inject, Emit, Provide, Mixins } from "vue-property-decorator";

@Component<MemorialStarLogin>({
  created() {
    this.$root["$MemorialStar"].then((MemorialStar) => {
      this.commit("MemorialStar", MemorialStar)
      MemorialStar.state.initPromie.then(() => {
        this.commit("loginFinished", MemorialStar.state.loginFinished)
      })
    })
  }
})
export default class MemorialStarLogin extends Vue {

  @Provide() get provider() {
    return this
  }

  @Prop() event_data!: any

  state = {
    MemorialStar: null as any,
    loginFinished: [false, false, false]
  }

  commit(key, val) {
    this.$Set(this.state, key.split("."), val)
  }

  draw(index) {
    if (this.state.loginFinished[index] === undefined) {
      this.state.MemorialStar.state.params.starReward.relatedActId = "5cbeb343b5cb6715042cd3f4,5cbeb61db5cb6715042cd3f9"
      this.state.MemorialStar.state.params.starReward.rewardId = ""
      this.state.MemorialStar.actions.starReward()
        .then(() => {
          this.commit("loginFinished", this.state.MemorialStar.state.loginFinished)
          this.$popup("Anmeldegeschenk \"Jubiläumsstern\" erfolgreich erhalten")
        })
      if (index === 0) {
        // this.$Mark("1day")
      }
    }
    else if (this.state.loginFinished[index] === null) {
      this.$popup("Leider können Sie nicht an der Veranstaltung teilnehmen")
    }
    else if (this.state.loginFinished[index] === true) {
      this.$popup("Sie haben Geschenke für diese Stufe erhalten")
    }
    else if (this.state.loginFinished[index] === false) {
      this.$root["$Login"].then(Login => {
        Login.login()
      })
    }
  }

}
</script>


