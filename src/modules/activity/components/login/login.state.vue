<template>
  <div class="login-state">
    &nbsp;&nbsp;ID: {{this.provider.state.roleInfo[0].playerName }}
    &nbsp;&nbsp;&nbsp;
    Server: {{this.provider.state.roleInfo[0].server}}
    &nbsp;&nbsp;&nbsp;
    <span
      style="cursor:pointer"
      @click="this.provider.logout"
    >[ {{$T("login.index.logout")}} ]</span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model, Watch, Emit, Inject } from "vue-property-decorator";
import { Activity } from 'src/const';

@Component<LoginState>({
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
export default class LoginState extends Vue {
  @Inject() provider
}
</script>


