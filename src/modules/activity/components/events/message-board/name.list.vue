<template>
  <div class="vw-act-name-list">
    <shaddow />
    <center>
      <img
        class="popup-bg-box"
        :src="require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/${$mode}/bg_namelist.png`)"
      />
      <wrapper class="t-wrap">
        <div class="t-head">
          <div class="item _1">넘버</div>
          <div class="item _2">캐릭터이름</div>
          <div class="item _3">서버</div>
        </div>
        <div
          class="t-body"
          id="vw-act-name-list-scroll-wrapper"
        >
          <div class="scroller">

            <div
              class="line"
              v-for="(item, index) in lotteryList"
              :key="index"
            >
              <div class="item _1">{{(index < 9 ? '0' : '') + (index + 1)}}</div>
              <div class="item _2">{{item.historyBase.playerName}}</div>
              <div class="item _3">S{{item.historyBase.thirdGameZoneId}}</div>
            </div>

          </div>
        </div>
      </wrapper>
      <div class="btn-close">
        <img
          class="close"
          :src="require(`public/assets/${VUE_APP_PATH}/popup/${$mode}/btn_close.png`)"
          @click="$emit('hide')"
        />
      </div>
    </center>
  </div>
</template>
<script lang="ts">

import { Component, Prop, Vue, Inject } from "vue-property-decorator";
import { wait } from '../../../../../library';

@Component<NameList>({
  created() {
    this.$mode === "pc" && import("iscroll").then(async (m) => {
      this.$nextTick(() => {
        this.provider.commit(this.newMethod(), new m.default("#vw-act-name-list-scroll-wrapper", {
          mouseWheel: true,
          scrollbars: true
        }))
      })
    })
  },
  computed: {
    event_data() {
      return this.provider.event_data
    }
  }
})
export default class NameList extends Vue {
  @Inject() provider
  @Prop() lotteryList

  private newMethod(): any {
    return "nameListScroller";
  }
}

</script>
