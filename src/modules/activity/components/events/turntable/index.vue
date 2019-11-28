<template>
  <div class="vw-act-turntable">

    <div class="turntable">
      <div class="txt l-txt">
        <!-- <div class="lo">다이아 누적 소모량</div> -->
        {{info.data.consume || 0}}
      </div>
      <div class="txt r-txt">
        <div class="sp">{{info.data.useCount || 0}} / 30</div>
        <div class="sp">{{(info.data.userSumCount - info.data.useCount) || 0}}</div>
      </div>
      <img
        v-if="state.remount"
        class="filling-img"
        :src="require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/${$mode}/turntable.png`)"
        :style="{
          'transform': 'rotate('+state.rotate+'deg)'
        }"
      >
      <wrapper>
        <img
          :class="`pointer${state.isTurning?' turning':''}`"
          @click="turn"
          :src="require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/${$mode}/pointer.png`)"
        >
      </wrapper>
    </div>

  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Inject, Emit, Provide, Mixins } from "vue-property-decorator";
import { wait, generateRandomValInGivenNum } from '../../../../../library';
@Component<Turntable>({
  created() {
    this.actions.cdKeys()
    this.actions.info()
  },
  computed: {
    event_data() {
      return this.provider.event_data
    },
    info() {
      return this.provider.state.info
    }
  }
})
export default class Turntable extends Vue {

  @Inject() provider

  state = {
    remount: true,
    isTurning: false,
    rotate: 0,
    plus: 0,
    isResponsed: false,
    isCatched: false
  }

  angles = {
    "5cfddb9fb5cb671494df0cef": [182, 222],
    "5cfdddd4b5cb671494df0cf3": [136, 176],
    "5cfdddf4b5cb671494df0cf4": [47, 86],
    "5cfdde0ab5cb671494df0cf5": [319, 358],
    "5cfdde24b5cb671494df0cf6": [273, 313],
    "5cfdde50b5cb671494df0cf7": [92, 131],
    "5cfdde6ab5cb671494df0cf8": [228, 267],
    "5cfdde89b5cb671494df0cf9": [3, 42],
  }

  get actions() {
    return {
      cdKeys: () => this.provider.actions.cdKeys(),
      join: () => {
        return this.provider.actions.join().then(res => {
          if (res.isGet) {
            const id = res.rewardId
            this.state.plus = generateRandomValInGivenNum(this.angles[id][0], this.angles[id][1])
            this.actions.info()
          }
        })
      },
      info: () => this.provider.actions.info(),
    }
  }

  commit(key, val) {
    this.$Set(this.state, key.split("."), val)
  }

  reInit() {
    this.state.rotate = 0
    this.state.plus = 0
    this.state.isResponsed = false
    this.state.isCatched = false
    this.state.remount = false
    requestAnimationFrame(() => {
      this.state.remount = true
    })
  }

  animation() {
    if (this.state.isCatched) {
      this.reInit()
    } else {
      if (!this.state.isResponsed) {
        this.state.rotate += 12
        requestAnimationFrame(() => {
          this.animation()
        })
      } else {
        let next = this.state.rotate + 11
        if (next < this.state.plus) {
          this.state.rotate = next
          requestAnimationFrame(() => {
            this.animation()
          })
        } else {
          this.state.rotate = this.state.plus
          setTimeout(() => {
            this.$popup(`받은 ${this.provider.state.cdKeys[this.provider.state.cdKeys.length - 1].rewardName} 을/를 축하합니다. <br>
            즉시 게임에 들어가 살펴보시기 바랍니다.`)
          }, 5250)
        }
      }
    }
  }

  turn() {
    if (!this.state.isTurning) {
      this.state.isTurning = true
      this.reInit()
      Promise.all([
        this.$root.$Login,
        wait(250)
      ]).then(([Login]) => {
        Login.state.userInfo.token && Login.state.roleInfo.length && this.animation()
      })
      Promise.all([
        this.actions.join(),
        wait(1500)
      ]).then(() => {
        this.state.isTurning = false
        this.state.isResponsed = true
        this.state.plus += Math.ceil(this.state.rotate / 360) * 360
      }).catch(err => {
        this.state.isTurning = false
        this.state.isCatched = true
      })
    }

  }
}
</script>