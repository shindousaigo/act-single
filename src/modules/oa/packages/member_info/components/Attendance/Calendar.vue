<template>
  <div class="calendar">
    <el-table
      :data="tabelData"
      border
      align="center"
      size="mini"
      @cell-click="query"
    >
      <el-table-column
        v-for="(v,k) in columns"
        :key="k"
        :label="v.label"
        align="center"
        class-name="item"
      >
        <template
          slot
          slot-scope="{row}"
        >
          <!-- <div @click="test.call(row[k])"> -->
          <span>{{row[k]}}</span>
          <span
            v-for="(item, index) in $store.state.oa.MemberInfo.Attendance.pageRecord[row[k]]"
            :key="index"
          >
            {{item}}
          </span>
          <!-- </div> -->
        </template>
      </el-table-column>
    </el-table>
    <div style="margin: 10px 0 50px 0">
      <div style="font-size: 15px; margin: 0 0 0 16px;">
        查询打卡记录(当天数据会有延迟)
      </div>
      <div v-if="punchRecord && punchRecord.length">
        <div style="font-size: 14px; margin: 5px 0 0 16px;">{{punchRecordDate}}</div>
        <span
          v-for="(item, index) in punchRecord"
          :key="index"
          :class="'punch-record-item' + (index === 0 ? ' first-child' : index === punchRecord.length-1 ? ' last-child' : '')"
        >
          {{item.substr(11)}}
        </span>
      </div>
      <div v-else>
        <div style="font-size: 14px; margin: 5px 0 0 16px;">{{punchRecordDate}}</div>
        <div style="font-size: 14px; margin: 5px 0 0 16px;">没有任何打卡记录</div>
      </div>
    </div>

  </div>
</template>
 
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import moment from "moment"

@Component<AttendanceCalendar>({
  computed: {
    tabelData() {
      let Day1 = (new Date(this.$store.getters["oa/MemberInfoAttendanceData"].StartDate)).getDay() || 7
      let TotalDays = (this.$store.getters["oa/MemberInfoAttendanceData"].LastDate - 25 + 1) + 24
      let FirstLineLen = 7 - Day1 + 1
      let LeftLineLen = TotalDays - FirstLineLen
      let TotalLine = Math.ceil(LeftLineLen / 7) + 1
      let tabelData: any = []
      let add = 0
      for (let i = 0; i < TotalLine; i++) {
        let arr: any = []
        if (!i) {
          for (let n = 1; n <= 7; n++) {
            if (n >= Day1) {
              arr.push(
                moment(new Date(this.$store.getters["oa/MemberInfoAttendanceData"].StartDate)).add(add, 'day').format("YYYY-MM-DD")
              )
              add++
            } else {
              arr.push('')
            }
          }
        } else {
          for (let n = 1; n <= 7; n++) {
            if (TotalDays === add) {
              break
            }
            arr.push(
              moment(new Date(this.$store.getters["oa/MemberInfoAttendanceData"].StartDate)).add(add, 'day').format("YYYY-MM-DD")
            )
            add++
          }
        }
        tabelData.push(arr)
      }
      return tabelData
    }
  }
})

export default class AttendanceCalendar extends Vue {

  columns: any = [
    { label: "星期一", prop: "monday" },
    { label: "星期二", prop: "tuesday" },
    { label: "星期三", prop: "wednesday" },
    { label: "星期四", prop: "thursday" },
    { label: "星期五", prop: "friday" },
    { label: "星期六", prop: "saturday" },
    { label: "星期日", prop: "sunday" },
  ]

  indexMap = (() => {
    let map = {}
    this.columns.forEach((element, index) => {
      map[element.label] = index
    })
    return map
  })()

  async query(row, column, cell, event) {
    let index = this.indexMap[column.label]
    let date = row[index]
    if (date) {
      let res = await this.$store.dispatch("oa/attendanceQueryPunchRecord", {
        userId: this.$store.state.oa.userInfo.UserId,
        date
      })
      this.punchRecord = res
      this.punchRecordDate = date
    }
  }
  punchRecordDate = null
  punchRecord = null

}
</script>

<style lang="scss">
.oa .member-info .attendance .calendar {
  .item {
    height: 100px;
    cursor: pointer;
    .cell {
      justify-content: center;
      width: 100%;
      height: 100%;
      padding: 0 !important;
      align-items: center;
      flex-direction: column;
    }
  }
  th.item {
    height: 60px;
    .cell {
      line-height: 60px;
    }
  }
  .punch-record-item {
    display: inline-block;
    margin-left: 16px;
    background: #000;
    padding: 0 8px;
    border-radius: 8px;
    color: #fff;
    line-height: 20px;
    margin-top: 10px;
    &.first-child {
      background: #468877;
    }
    &.last-child {
      background: #f89401;
    }
  }
}
</style>
