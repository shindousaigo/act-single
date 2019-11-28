<template>
  <div
    :class="`vw-act-app ${$mode}`"
    @click="appClick"
    :style="{maxWidth:`${VUE_APP_WIDTH_MAX}px`}"
  >
    <div v-if="!state.re_mount">
      <component :is="mode_lazy" />
      <lazy module="login" />
      <div
        :class="`event`"
        v-for="(event_data) in state.config.activityList"
        :key="event_data._id"
      >
        <lazy
          module="events/base"
          :event_data="event_data"
        />
      </div>
      <div class="event">
        <lazy :module="'widgets/copyright'" />
      </div>
      <lazy module="popup" />
    </div>
    <loader />
  </div>
</template>
 
<style lang="scss">
html,
body {
  color: #fff;
  font-family: "DokChampa", "Tahoma", Helvetica, Arial, sans-serif;
}
.vw-act-app {
  margin: 0 auto;
  font-size: calculator($state_bar_font_size_pc);
  .vw-act-wrapper {
    margin: 0 auto;
    .event {
      position: relative;
    }
  }
}
.mb.vw-act-app {
  font-size: calculator($state_bar_font_size_mb, vw);
  .event {
    position: relative;
    &:nth-child(1) {
      top: -1px;
    }
    &:nth-child(2) {
      top: -2px;
    }
    &:nth-child(3) {
      top: -3px;
    }
    &:nth-child(4) {
      top: -4px;
    }
    &:nth-child(5) {
      top: -5px;
    }
  }
}
</style>

<script lang="ts">
import Config from "src/modules/activity";
import { Component, Prop, Vue, Inject, Emit, Provide, Mixins } from "vue-property-decorator";
import { wait } from 'src/library';

@Component<App>({
  created() {
    this.$root["$App"] = this
    window.addEventListener("click", this.window_click_handler)
    if (this.$mode === "mb") {
      // import('src/modules/activity/ui/mb.vue').then((module) => {
      //   this.mode_lazy = module.default
      // })
    } else {
      import('src/modules/activity/components/widgets/navigator/index.vue').then((module) => {
        this.mode_lazy = module.default
      })
    }
  }
})
export default class App extends Vue {

  @Provide() get app() {
    return this
  }

  mode_lazy: any = ""

  state = {
    appClick: false,
    justClick: false,
    config: Config,
    re_mount: false,
  }

  async appClick() {
    this.commit("appClick", true)
    await wait()
    this.commit("appClick", false)
  }

  commit(key, val) {
    this.state[key] = val
  }

  async logout() {
    this.commit("re_mount", true)
    await wait(100)
    this.commit("appClick", false)
    this.commit("justClick", false)
    this.commit("re_mount", false)
  }

  async window_click_handler() {
    this.commit("justClick", true)
    await wait()
    this.commit("justClick", false)
  }

}
</script>


