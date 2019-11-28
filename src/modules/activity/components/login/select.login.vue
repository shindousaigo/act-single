<template>
  <div class="select-login">
    <img
      class="login_bg_select"
      :src="require(`public/assets/${VUE_APP_PATH}/login/${$mode}/bg_select.png`)"
    />
    <div class="login_icon_select_wrapper">
      <img
        class="login_icon_select"
        :src="require(`public/assets/${VUE_APP_PATH}/login/${$mode}/icon_select.png`)"
      />
      <div class="login_select_tri_wrapper">
        <img
          class="login_select_tri"
          :src="require(`public/assets/${VUE_APP_PATH}/login/${$mode}/select_tri.png`)"
        />
      </div>
    </div>

    <v-select
      class="v-select"
      v-model="model"
      :options="provider.state.zoneList"
      label="thirdGameZoneId"
      :placeholder="$T('login.select.login.placeholder')"
      :filter="filter"
    >
      <template
        slot="option"
        slot-scope="option"
      >
        <span class="option-item">{{option.thirdGameZoneId}}</span>
      </template>
    </v-select>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject, Watch } from "vue-property-decorator"
import { Activity } from "src/const"
import vSelect from 'vue-select'

Vue.component('v-select', vSelect)

@Component<SelectLogin>({
  async created() {

    this.set$t("login.select.login", {
      placeholder: {
        [Activity.Language.Zh]: "请选择区服",
        [Activity.Language.Ti]: "กรุณาเลือกเซิร์ฟเวอร์",
        [Activity.Language.De]: "wählen sie den server aus",
        [Activity.Language.Ko]: "서버 선택",
      }
    })

  }
})
export default class SelectLogin extends Vue {
  @Inject() provider

  model = ""
  @Watch("model")
  modelChange(val) {
    this.provider.commit(`server`, val.thirdGameZoneId)
    this.provider.commit(`params.role.gameZoneId`, val.gameZoneId)
  }

  filter(options, search) {
    const filter = options.filter((option) => {
      return option.thirdGameZoneId.indexOf(search) > -1
    })
    if (filter.length) {
      this.model = filter[0]
    }
    return filter
  }
}
</script>
