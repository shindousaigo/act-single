<template>
  <div class="btn-close">
    <img
      class="close"
      :src="require(`public/assets/${VUE_APP_PATH}/login/${$mode}/btn_close.png`)"
      @click="provider.shadowVisible.call(this, false)"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Inject } from 'vue-property-decorator'

@Component
export default class BtnClose extends Vue {
  @Inject() provider
}
</script>
