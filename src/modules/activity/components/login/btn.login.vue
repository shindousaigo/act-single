<template>
  <div class="btn-login">
    <img
      @click="$emit('click')"
      :src="require(`public/assets/${VUE_APP_PATH}/login/${$mode}/btn_login.png`)"
    />
  </div>
</template>