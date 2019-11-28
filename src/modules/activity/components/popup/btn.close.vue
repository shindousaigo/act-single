<template>
  <div class="btn-close">
    <img
      class="close"
      :src="require(`public/assets/${VUE_APP_PATH}/popup/${$mode}/btn_close.png`)"
      @click="$emit('hide')"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class BtnClose extends Vue { }
</script>
