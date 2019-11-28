<template>
  <div class="vw-act-gifts">
    <div
      v-for="(item, index) in event_data.rewards"
      :key="item._id"
      class="gift"
    >

      <div class="rewards">
        <div
          v-for="item in item.contentList"
          :key="item.name"
          class="reward"
        >
          <img
            class="reward-icon"
            :src="require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/${$mode}/${item.name.replace(/ /g, '_')}.png`)"
          >
          <wrapper class="reward-name">
            <middle>{{item.name}} * {{item.count}}</middle>
          </wrapper>
        </div>
      </div>
      
      <component
        v-if="custom_rewards"
        :is="state.custom_components.rewards"
        :index="index"
      />

      <img
        class="btn"
        :style="{
          cursor: (state.gifts[item._id] && state.gifts[item._id].isGet) ? 'default' : 'pointer'
        }"
        @click="(state.gifts[item._id] && state.gifts[item._id].isGet) || actions.join(item._id)"
        :src="(state.gifts[item._id] && state.gifts[item._id].isGet) ? require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/${$mode}/btn_disabled.png`) : require(`public/assets/${VUE_APP_PATH}/event${event_data.index}/${$mode}/btn_available.png`)"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject, Emit, Provide, Mixins } from "vue-property-decorator";
@Component<Gifts>({
  created() {
    this.actions.cdKeys()
  },
  computed: {
    event_data() {
      return this.provider.event_data
    },
    custom_rewards() {
      if (this.props.custom && this.props.custom.indexOf("rewards") !== -1) {
        import(`public/assets/${this.VUE_APP_PATH}/event${this.provider.event_data.index}/${this.$mode}/custom-rewards.vue`).then(md => {
          this.state.custom_components.rewards = md.default
        })
        return true
      } else {
        return null
      }
    }
  }
})
export default class Gifts extends Vue {

  @Prop() props
  @Inject() provider

  get actions() {
    return {
      cdKeys: () => {
        this.provider.actions.cdKeys().then(res => {
          res.forEach(item => {
            this.state.gifts[item.rewardId].isGet = true
          })
        })
      },
      join: (rewardId) => {
        this.provider.actions.join(rewardId).then(res => {
          if (res.isGet) {
            this.state.gifts[rewardId].isGet = true
            this.$popup("당신은 이미 수령했습니다. 게임 내에서 보상을 확인해 주세요")
          }
        })
      }
    }
  }

  state = {
    gifts: (() => {
      const gifts = {}
      this.provider.event_data.rewards.forEach(reward => {
        gifts[reward._id] = {
          isGet: false
        }
      })
      return gifts
    })(),
    custom_components: {
      rewards: ""
    }
  }

}
</script>