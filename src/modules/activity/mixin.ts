import { Vue, Component, Provide } from "vue-property-decorator";

@Component<Mixin>({
  created() {
    console.log("MIXINS")
  }
})
export default class Mixin extends Vue {
  public readonly name!: string
  @Provide() commit(key: string, val: any) {
    this.$store.commit(`${this.name}/set`, {
      key, val
    })
  }
  @Provide() state = this.$store.state[this.name]
}