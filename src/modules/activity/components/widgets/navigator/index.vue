<template>
  <div :class="`vw-act-navigator${state.show?' show':''}`">
    <div class="vw-act-box">
      <img :src="require(`public/assets/${VUE_APP_PATH}/navigator/${$mode}/bg.png`)">
      <wrapper>

        <img
          class="toggle"
          @click="toggle"
          :src="require(`public/assets/${VUE_APP_PATH}/navigator/${$mode}/toggle.png`)"
        >

        <div class="tags">
          <img
            class="tag"
            @click="scrollToEvent.call(this, 0)"
            :src="require(`public/assets/${VUE_APP_PATH}/navigator/${$mode}/tag_event0.png`)"
          >
          <img
            class="tag"
            @click="scrollToEvent.call(this, 1)"
            :src="require(`public/assets/${VUE_APP_PATH}/navigator/${$mode}/tag_event1.png`)"
          >
          <img
            class="tag"
            @click="scrollToEvent.call(this, 2)"
            :src="require(`public/assets/${VUE_APP_PATH}/navigator/${$mode}/tag_event2.png`)"
          >
          <img
            @click="scrollToBtm.call()"
            class="tag"
            :src="require(`public/assets/${VUE_APP_PATH}/navigator/${$mode}/tag_note.png`)"
          >
          <a
            href="https://www.facebook.com/TrainerLeague/"
            target="_blank"
            class="tag"
          >
            <img :src="require(`public/assets/${VUE_APP_PATH}/navigator/${$mode}/tag_contact.png`)">
          </a>
          <img
            @click="scrollTo.call(this, 0)"
            class="tag"
            :src="require(`public/assets/${VUE_APP_PATH}/navigator/${$mode}/tag_btt.png`)"
          >
        </div>

      </wrapper>
    </div>

  </div>
</template>

<style lang="scss">
$m1: 215;
.vw-act-box {
  position: relative;
}
.vw-act-navigator {
  position: fixed;
  right: 0;
  top: 50%;
  z-index: 9;
  transform: translate(100%, -64%);
  transition: transform 0.75s;
  &.show {
    transform: translate(0, -64%);
    .toggle {
      transform: rotate(0) translateX(-16px);
    }
  }
  .toggle {
    cursor: pointer;
    position: absolute;
    top: 331px;
    left: 0;
    transition: transform 0.75s;
    transform: rotateY(180deg) translateX(35px);
    transform-origin: (50%, 50%);
  }

  .tags {
    margin: calculator($m1) 0 0 0;
    text-align: center;
    padding-left: 5px;
  }
  .tag {
    cursor: pointer;
    &:nth-child(2) {
      margin: calculator(242 - $m1) 0 0 0;
    }
    &:nth-child(3) {
      margin: calculator(244 - $m1) 0 0 0;
    }
    &:nth-child(4) {
      margin: calculator(242 - $m1) 0 0 0;
    }
    &:nth-child(5) {
      display: block;
      padding: 0 50px 0 52px;
      margin: calculator(242 - $m1) 0 0 0;
    }
    &:nth-child(6) {
      padding: 0 0 0 6px;
      margin: calculator(249 - $m1) 0 0 0;
    }
  }
}

.mb .vw-act-navigator {
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Inject, Emit, Provide, Mixins } from "vue-property-decorator";
import { scrollToEvent, scrollToBtm } from '../../../functions';

@Component<CopyRight>({
  created() {

  }
})
export default class CopyRight extends Vue {

  @Provide() get provider() {
    return this
  }

  state = {
    show: true
  }

  scrollToEvent = scrollToEvent
  scrollToBtm = scrollToBtm

  toggle() {
    this.state.show = !this.state.show
  }

  scrollTo(y) {
    window.scrollTo(0, y)
  }

}
</script>


