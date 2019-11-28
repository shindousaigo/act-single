<template>
  <div :class="`popup-rewards${isCreated ? ' created':''}`">
    <img
      class="break_egg_bg_popup"
      :src="require(`public/img/${VUE_APP_PATH}/${$mode}/break_egg_bg_popup.png`)"
    >

    <wrapper id="vw-act-break-egg-scroll-popup">
      <middle class="list-container">
        <div
          v-for="(count, name) in list"
          :key="name"
        >
          {{name}} * {{count}}
        </div>
      </middle>
    </wrapper>

    <img
      class="close"
      @click="close"
      :src="require(`public/img/${VUE_APP_PATH}/${$mode}/break_egg_icon_close.png`)"
    >
  </div>
</template>

<style lang="scss">
.popup-rewards {
  display: table;
  transform: scale(0);
  transition: transform 0.3s;
  &.created {
    transform: scale(1);
  }
  .close {
    cursor: pointer;
    position: absolute;
    right: 6%;
    top: 5.6%;
  }
  .list-container {
    color: #943b0b;
    line-height: 48px;
  }
  .wrapper {
    top: 80px;
    overflow: hidden;
    bottom: 0;
    height: 352px;
  }
}

.mb .popup-rewards {
  .break_egg_bg_popup {
    width: calculator(659, vw);
  }
  .close {
    width: calculator(38, vw);
  }
  .wrapper {
    top: calculator(80, vw);
    height: calculator(308, vw);
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Inject, Emit, Provide, Mixins } from "vue-property-decorator";
import { wait } from '../../../../library';

@Component<PopupRewards>({
  created() {
    wait(250).then(() => {
      this.isCreated = true
      this.provider.commit("visibility.shaddow", true)
    })
    this.$mode === "pc" && import("iscroll").then(m => {
      this.scroller = new m.default("#vw-act-break-egg-scroll-popup", {
        mouseWheel: true,
        scrollbars: true
      })
    })
  },
  computed: {
    list() {
      if (this.provider.state.info.rewardList.length) {
        setTimeout(() => {
          this.$nextTick(() => {
            this.scroller.refresh()
          })
        })

        const list = {}
        this.provider.state.info.rewardList.map(({ rewardId }) => {
          return this.provider.event_data.rewardMap[rewardId].contentList
        }).flat().forEach(item => {
          let { name, count } = item
          name = name.trim()
          if (list[name]) {
            list[name] += count
          } else {
            list[name] = count
          }
        })

        return list

      }

      return []
    }
  }
})
export default class PopupRewards extends Vue {

  @Inject() provider: any

  isCreated = false

  close() {
    this.provider.commit("visibility.shaddow", false)
    this.provider.commit("visibility.popup", false)
    this.provider.egg1 = false
  }

  scroller = { refresh: () => { } }

}
</script>


