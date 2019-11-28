<template>
  <div
    class="shaddow"
    @click="$emit('click')"
  ></div>
</template>

<style lang="scss" scoped>
.shaddow {
  background: #000;
  opacity: 0.6;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
}
</style>



