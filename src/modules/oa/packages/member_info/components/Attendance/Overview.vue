<template>
  <div class="overview">
    <el-table
      :data="[$store.state.oa.MemberInfo.Attendance.monthAttendance]"
      border
      align="center"
      size="mini"
    >
      <el-table-column
        :width="v.width? v.width : (v.label.length>2 ? 58 : 43)"
        v-for="(v,k) in columns"
        :key="k"
        :label="v.label"
        :prop="v.prop"
        align="center"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
 
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import moment from "moment"

@Component<AttendanceOverview>({

})
export default class AttendanceOverview extends Vue {
  columns = [
    { label: "工号", prop: "employeeNumber", width: 54 },
    // { label: "部门", prop: "department", width: 134 },
    { label: "姓名", prop: "userName", width: 62 },
    { label: "扣款", prop: "deduction" },
    { label: "迟到", prop: "late" },
    { label: "早退", prop: "early" },
    { label: "旷工", prop: "absent" },
    { label: "无假单", prop: "personalLeave" },
    { label: "事假", prop: "sickLeave" },
    { label: "年假", prop: "annualLeave" },
    { label: "病假", prop: "sickLeave" },
    { label: "婚假", prop: "marriageLeave" },
    { label: "产假", prop: "maternityLeave" },
    { label: "护理假", prop: "nursingLeave" },
    { label: "孕检假", prop: "prenatalCheckUpLeave" },
    { label: "计生假", prop: "familyPlanningLeave" },
    { label: "丧假", prop: "bereavementLeave" },
    { label: "调休", prop: "leaveInLieu" },
    { label: "补签卡", prop: "complementSignedTimes" },
    { label: "未打卡", prop: "noCheckTimes" },
    { label: "全勤奖", prop: "fullAttendance" },
    { label: "3倍", prop: "threeTimes" },
    { label: "加班", prop: "overtime" },
    // { label: "惩罚", prop: "test" },
    // { label: "补贴", prop: "test" },
  ]
}
</script>

<style lang="scss">
.oa .member-info .attendance .overview {
  width: 1090px;
  transform-origin: 0;
  transform: scale(0.92);
  th,
  td {
    font-size: 12px;
  }
  .el-table--border td,
  .el-table--border th,
  .el-table__body-wrapper
    .el-table--border.is-scrolling-left
    ~ .el-table__fixed {
    border-right: 2px solid #e4e7ed;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 2px solid #e4e7ed;
  }
  .el-table--border,
  .el-table--group {
    border-top-color: #e4e7ed;
    border-top-style: solid;
    border-top-width: 2px;
    // border-right-color: #e4e7ed;
    // border-right-style: solid;
    // border-right-width: 2px;
    // border-bottom-color: #e4e7ed;
    // border-bottom-style: solid;
    // border-bottom-width: 2px;
    border-left-color: #e4e7ed;
    border-left-style: solid;
    border-left-width: 2px;
    border-image-source: initial;
    border-image-slice: initial;
    border-image-width: initial;
    border-image-outset: initial;
    border-image-repeat: initial;
  }
}
</style>
