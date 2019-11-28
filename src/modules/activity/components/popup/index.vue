<template>
  <div
    class="vw-act-popup"
    v-if="messages.length"
  >
    <shaddow />
    <center>
      <img
        class="popup-bg-box"
        :src="require(`public/assets/${VUE_APP_PATH}/popup/${$mode}/bg_box.png`)"
      />
      <div
        class="wrap-message"
        v-for="(message, index) in messages"
        :key="index"
      >
        <div class="message" v-html="message"></div>
      </div>
      <component
        :is="require(`src/modules/activity/components/popup/btn.close`).default"
        @hide="hide"
      />
    </center>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator";

@Component<Popup>({
  created() {
    import(`public/assets/${this.VUE_APP_PATH}/popup/${this.$mode}/style.scss`)
  }
})
export default class Popup extends Vue {

  messages: any = []

  popup(msg) {
    if (this.messages.indexOf(msg) === -1) {
      this.messages.push(msg)
    }
  }

  hide() {
    this.messages.splice(0, 1)
  }

}

</script>
