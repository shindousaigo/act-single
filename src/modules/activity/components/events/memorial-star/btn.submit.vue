<template>
  <div
    class="btn btn-submit"
    @click="draw"
  >
    <img
      class="block"
      :src="ed ? require(`public/img/${VUE_APP_PATH}/${$mode}/memorial-star/btn_grey.png`) : require(`public/img/${VUE_APP_PATH}/${$mode}/memorial-star/memorial_star_btn.png`)"
    >
  </div>
</template>

<style lang="scss" scoped>
.btn-submit {
  cursor: pointer;
  .block {
    width: 100%;
    height: 100%;
  }
}

.mb .btn-submit {
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Inject, Emit, Provide, Mixins } from "vue-property-decorator";

@Component<BtnSubmit>({
  computed: {
    ed() {
      let ret = false
      if (this.provider.state.cdKeys.length) {
        if (this.id) {
          ret = this.provider.state.cdKeys.filter(item => item.rewardId === this.id).length === 1
        } else {
          ret = this.provider.state.cdKeys.filter(item => (item.rewardId != "5cbeb7b7b5cb6715042cd3fa" && item.rewardId != "5cbeb81fb5cb6715042cd3fb")).length >= 1
        }
      }
      return ret
    }
  }
})
export default class BtnSubmit extends Vue {

  ed

  @Inject() provider: any

  @Prop() id!: string

  draw() {
    if (!this.ed) {
      if (this.id) {
        this.provider.state.params.starReward.rewardId = this.id
        this.provider.commit('visibility.popup', true)
      } else {
        if (this.provider.state._250index !== -1) {
          this.provider.state.params.starReward.rewardId = this.provider.state._250s[this.provider.state._250index]
          this.provider.commit('visibility.popup', true)
        } else {
          this.$popup("Wählen Sie ein Geschenk aus, um zu tauschen!")
        }
      }
    } else {
      this.$popup("Sie haben Geschenke für diese Stufe erhalten")
    }
  }


}
</script>


