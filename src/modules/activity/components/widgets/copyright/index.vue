<template>
  <actui
    :class="`vw-act-copyright copyright`"
    :background="require(`public/assets/${VUE_APP_PATH}/copyright/${$mode}/bg.jpg`)"
  >
    <div class="txt">

      <span class="line1">주의 사항: </span> <br>
      1. 이벤트 기간: 2019/7/17 12:00~2019/7/19 12:00 <br>
      2. 행운의 추첨 명단은 2019년7월 19일 16:00 이후에 발표됩니다. 3개 근무일 내에 보상 발송 예정 <br>
      3. 인게임 내 우편을 통해 지급됩니다. 일부의 게임 계정은 느려질 수 있으니 기다려주세요 <br>
      3. 인게임 내 우편을 통해 지급됩니다. 일부의 게임 계정은 느려질 수 있으니 기다려주세요 <br>
      4. 문제가 있을시, 페이스북 팬페이지로 문의해주세요. 링크:
      <a
        href="https://www.facebook.com/TrainerLeague/"
        target="_blank"
      >
        https://www.facebook.com/TrainerLeague/
      </a> <br>
      <div class="company-container">
        <img
          class="company"
          :src="require(`public/assets/${VUE_APP_PATH}/copyright/${$mode}/company.png`)"
        >
      </div>
    </div>

    <!-- <div
      class="txt"
    ><span
        class="line1"
      >หมายเหตุ:</span><br data-v-0ff83d17="">
      1.ทีมงานขอสงวนสิทธิ์ในการอธิบายกิจกรรมครั้งนี้ <br data-v-0ff83d17="">
      2.ถ้าพบปัญหาเกี่ยวกับกิจกรรม กรุณาติดต่อGM <br data-v-0ff83d17="">
      เฟสบุ๊ค&nbsp;&gt;&gt;&gt;&nbsp;<a
        href="https://www.facebook.com/PokeSagago/"
        target="_blank"
      >https://www.facebook.com/PokeSagago</a><br data-v-0ff83d17="">
      <img
        :src="require(`public/assets/${VUE_APP_PATH}/copyright/${$mode}/company.png`)"
        class="company"
      ></div> -->

  </actui>
</template>

<script lang="ts">
import { Component, Prop, Vue, Inject, Emit, Provide, Mixins } from "vue-property-decorator";

@Component<CopyRight>({
  created() {
    import(`public/assets/${this.VUE_APP_PATH}/copyright/${this.$mode}/style.scss`)
  }
})
export default class CopyRight extends Vue {

  @Provide() get provider() {
    return this
  }

}
</script>


