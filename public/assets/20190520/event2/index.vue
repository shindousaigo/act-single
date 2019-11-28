<template>
  <div class="event2">
    <img
      v-for="(item, index) in event_data.rewards"
      :key="item._id"
      :style="{
        cursor: provider.state.condition.submitable ? 'pointer' : 'default'
      }"
      @click="provider.state.condition.submitable && $emit('submit', event_data.rewardMap[item._id])"
      :class="`btn btn${index+1}`"
      :src="provider.state.condition.submitable ? require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/${$mode}/btn_submit.png`) : require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/${$mode}/btn_disabled.png`)"
    >
  </div>
</template>

<style lang="scss" scoped>
.event2 {
  .btn {
    position: absolute;
  }
  .btn1 {
    top: 710px;
    left: 150px;
  }
  .btn2 {
    top: 805px;
    left: 565px;
  }
  .btn3 {
    top: 697px;
    left: 985px;
  }
}

.mb .event2 {
  .btn {
    width: calculator(168, vw);
  }
  .btn1 {
    top: 74vw;
    left: 22vw;
  }
  .btn2 {
    top: 74vw;
    left: 71vw;
  }
  .btn3 {
    top: 142vw;
    left: 46vw;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Inject, Emit, Provide, Mixins } from "vue-property-decorator";

@Component<Event3>({
  created() {
  }
})
export default class Event3 extends Vue {

  @Prop() provider: any

  @Prop() event_data: any

}

</script>

