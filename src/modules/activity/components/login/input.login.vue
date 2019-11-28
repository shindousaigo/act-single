<template>
  <div :class="`input-login ${type}`">
    <div
      v-if="VUE_APP_INPUT_TYPE==='inside'"
      class="inside"
    >
      <img
        class="login_bg_input"
        :src="require(`public/assets/${VUE_APP_PATH}/login/${$mode}/bg_input.png`)"
      />
      <div class="prefix">
        {{$T(`login.input.login.${kind}.prefix`)}}
      </div>
      <input
        class="input"
        :ref="kind"
        :type="type"
        v-model="model"
      />
    </div>
    <div
      v-else
      class="outside"
    >
      <img
        class="block"
        :src="require(`public/assets/${VUE_APP_PATH}/login/${$mode}/bg_input.png`)"
        :style="{
          width: $mode === 'mb' ? '42vw':'auto',
          height: $mode === 'mb' ? '9vw':'auto'
        }"
      />
      <div class="prefix">
        {{$T(`login.input.login.${kind}.prefix`)}}
      </div>
      <input
        class="input"
        :ref="kind"
        :type="type"
        v-model="model"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
// .mb .input-login {
//   .outside {
//     position: relative;
//     display: table;
//     left: calculator(104, vw);
//     .prefix {
//       font-size: calculator(24, vw);
//       &::after {
//         top: calculator(-2, vw);
//         right: calculator(-12, vw);
//       }
//     }
//     .input {
//       padding: 0 calculator(20, vw);
//       width: 98%;
//       height: calculator(48, vw);
//       font-size: calculator(24, vw);
//     }
//   }
// }
</style>

<script lang="ts">
import { Component, Prop, Vue, Model, Watch, Emit, Inject } from "vue-property-decorator";
import { Activity } from 'src/const';
import md5 from "md5"


@Component<InputLogin>({
  created() {
    this.set$t("login.input.login", {
      userName: {
        prefix: {
          [Activity.Language.Zh]: "账户",
          [Activity.Language.Ti]: "บัญชีี",
          [Activity.Language.De]: "KONTO",
          [Activity.Language.Ko]: "계정",
        }
      },
      password: {
        prefix: {
          [Activity.Language.Zh]: "密码",
          [Activity.Language.Ti]: "รหัส",
          [Activity.Language.De]: "PASSWORT",
          [Activity.Language.Ko]: "비밀번호",
        }
      }
    })
  }
})
export default class InputLogin extends Vue {

  @Prop() kind!: string
  @Inject() provider

  is_password = this.kind === "password"

  type = this.is_password ? "password" : "text"

  model: string = ''
  @Watch("model")
  modelChange(val) {
    this.provider.commit(`params.login.${this.kind}`, this.is_password ? (val ? md5(val) : val) : val)
  }

}
</script>
