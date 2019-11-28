<template>
  <div class="attendance">
    <el-row>
      <el-button
        size="mini"
        @click="$emit('click')"
      >
        返回
      </el-button>
    </el-row>

    <el-row>
      <div class="flex">
        <div style="width:100%;position:absolute">
          <DateSelect
            :CurYear="lg25 && is12 ? CurYear+1 : CurYear"
            :CurMonth="lg25 ? ( is12 ? 1 : CurMonth+1 ) : CurMonth"
            @over="DateSelect"
          />
        </div>
        <span style="font-size:16px;font-weight:700;margin:20px 0;">{{Title}}</span>
      </div>
      <Overview />
      <Calendar />
    </el-row>

  </div>
</template>
 
<script lang="ts">
import moment from "moment"
import { Component, Prop, Vue } from 'vue-property-decorator'
import Overview from "./Overview.vue"
import Calendar from "./Calendar.vue"
import DateSelect from "./DateSelect.vue"


@Component<Attendance>({
  created() {
    let startTime = this.$store.getters["oa/MemberInfoAttendanceData"].StartDate
    let endTime = this.$store.getters["oa/MemberInfoAttendanceData"].EndDate
    Promise.all([
      this.$store.dispatch("oa/attendanceMonthlySummary", {
        userId: this.$store.state.oa.userInfo.UserId,
        startTime,
        endTime
      }),
      this.$store.dispatch("oa/attendancePageRecord", {
        userId: this.$store.state.oa.userInfo.UserId,
        startTime,
        endTime
      })
    ])
  },
  computed: {
    CurYear() {
      return this.$store.state.oa.MemberInfo.Attendance.CurYear
    },
    CurMonth() {
      return this.$store.state.oa.MemberInfo.Attendance.CurMonth
    },
    is1() {
      return this.$store.getters["oa/MemberInfoAttendanceIs1"]
    },
    is12() {
      return this.$store.getters["oa/MemberInfoAttendanceIs12"]
    },
    lg25() {
      return this.$store.getters["oa/MemberInfoAttendanceLg25"]
    },
    Title() {
      return this.$store.getters["oa/MemberInfoAttendanceData"].StartDate + " 至 " + this.$store.getters["oa/MemberInfoAttendanceData"].EndDate + " 考勤记录"
    },
  },

  components: {
    Overview,
    Calendar,
    DateSelect
  }

})

export default class Attendance extends Vue {

  lg25

  static date = new Date
  static storeState = {
    CurYear: Attendance.date.getFullYear(),
    CurMonth: Attendance.date.getMonth() + 1,
    CurDate: Attendance.date.getDate(),
    pageRecord: {},
    monthAttendance: null,
    queryPunchRecord: {}
  }

  async DateSelect(data: { CurYear: number, CurMonth: number }) {

    let startTime = this.lg25 ? moment(new Date(`${data.CurYear}-${data.CurMonth}-25`)).format("YYYY-MM-DD") : moment(new Date(`${data.CurYear}-${data.CurMonth}-25`)).add(-1, 'month').format("YYYY-MM-DD")
    let endTime = this.lg25 ? moment(new Date(`${data.CurYear}-${data.CurMonth}-24`)).add(1, 'month').format("YYYY-MM-DD") : moment(new Date(`${data.CurYear}-${data.CurMonth}-24`)).format("YYYY-MM-DD")

    await Promise.all([
      this.$store.dispatch("oa/attendanceMonthlySummary", {
        userId: this.$store.state.oa.userInfo.UserId,
        startTime,
        endTime
      }),
      this.$store.dispatch("oa/attendancePageRecord", {
        userId: this.$store.state.oa.userInfo.UserId,
        startTime,
        endTime
      })
    ])

    if (this.lg25) {
      this.$store.state.oa.MemberInfo.Attendance.CurYear = data.CurYear
      this.$store.state.oa.MemberInfo.Attendance.CurMonth = data.CurMonth - 1 || ((this.$store.state.oa.MemberInfo.Attendance.CurYear = data.CurYear - 1) && 12)
    } else {
      this.$store.state.oa.MemberInfo.Attendance.CurMonth = data.CurMonth
      this.$store.state.oa.MemberInfo.Attendance.CurYear = data.CurYear
    }

  }

}
</script>

<style lang="scss">
.oa .member-info .attendance {
  .flex {
    display: flex;
    justify-content: center;
  }
  .calendar {
    margin-top: 20px;
  }
}
</style>
