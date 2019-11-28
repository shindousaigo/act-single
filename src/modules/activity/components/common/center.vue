<template>
  <div
    class="center"
    :style="props.style"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.center {
  position: fixed;
  display: table;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 11;
}
</style>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
@Component<Center>({})
export default class Center extends Vue {
  @Prop({
    default: function () {
      return {}
    }
  }) props!: any
}
</script>




