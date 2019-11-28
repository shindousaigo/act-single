<template>
  <div class="vw-act-confirm">
    <shaddow />
    <center>
      <img
        class="popup-bg-box"
        :src="require(`public/assets/${VUE_APP_PATH}/popup/${$mode}/bg_box.png`)"
      />
      <div class="wrap-message">
        <div class="message">
          캐릭터당 1회만 작성할수있습니다. <br>
          등록 하시겠습니까?
        </div>
      </div>
      <img
        class="btn btn-no"
        :src="require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/${$mode}/no.png`)"
         @click="$emit('hide')"
      >
      <img
        class="btn btn-yes"
        :src="require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/${$mode}/yes.png`)"
         @click="$emit('submit')"
      >
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
@Component<Confirm>({
  computed: {
    event_data() {
      return this.provider.event_data
    }
  }
})
export default class Confirm extends Vue {
  @Inject() provider
}

</script>
