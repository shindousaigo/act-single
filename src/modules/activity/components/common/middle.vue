<template>
  <div class="middle">
    <div class="cell">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.middle {
  display: table;
  height: 100%;
  width: 100%;
}
.cell {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
</style>





