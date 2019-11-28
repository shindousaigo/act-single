<template>
  <div class="vw-com-can">
    <img
      class="filling-img"
      :src="background"
    >
    <div class="slot">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vw-com-can {
  display: table;
  position: relative;
  .slot {
    display: table;
    position: absolute;
    left: 0;
    top: 0;
  }
}
.mb .vw-com-can {
}
</style>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
@Component<ActUi>({})
export default class ActUi extends Vue {
  @Prop() background!: string
}
</script>




