<template>
  <component
    :ref="key"
    :is="is"
    :event_data="event_data"
  />
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject } from "vue-property-decorator";
@Component<Lazy>({
  computed: {
    key() {
      return "$" + this.module.replace('events/', '').split("-").map(item => String.prototype.toUpperCase.call(item.slice(0, 1)) + item.slice(1)).join("")
    }
  },
  async created() {
    if (this.module) {
      let resolve
      this.$root[this.key] = new Promise(r => {
        resolve = r
      })
      const [m] = await Promise.all([
        import(`src/modules/activity/components/${this.module}/index.vue`),
        // import(`src/modules/activity/ui/style/${this.module}.${this.app.state.initWidth < 768 ? 'xs' : 'lg'}`),
      ])
      // m.default.style = s.default
      this.is = m.default
      this.$nextTick(() => {
        const m: any = this.$refs[this.key]
        resolve(m)
      })
    }
  }
})
export default class Lazy extends Vue {
  @Prop() module!: any
  @Prop() event_data!: any

  @Inject() app

  key!: string
  is: string = ""
}
</script>



