<template>
  <div class="approvalLeave">
    <div
      class="flex"
      v-if="data"
    >
      <span class="l">办理流程：</span>
      <span v-html="manager"></span>
    </div>
    <div
      class="flex"
      v-if="data"
    >
      <span class="l">下一办理人：</span>
      <span
        v-html="nextManager || '无'"
        @click="test"
      ></span>
      <!-- <el-button
        size="mini"
        style="margin-left:10px;"
        @click="test1"
      >选择人员</el-button> -->

      <el-popover
        placement="right"
        width="300"
        trigger="click"
      >
        <div
          slot
          style="height:500px"
        >
          <el-input
            size="mini"
            style="width:240px;position:fixed;"
            clearable
            v-model="xzry_search"
          ></el-input>
          <div style="position:absolute;height:464px;overflow:auto;bottom:10px;width:285px;padding-right: 8px;">

            <div
              v-for="item in userAll"
              :key="item.userid"
              :class="nextApproverId.includes(item.userid)? 'xzry active':'xzry'"
              @click="xzry.call(this,item)"
            >
              <div v-if="(!xzry_search || (xzry_search && (item.userid+ item.name).indexOf(xzry_search) !== -1))">
                {{item.userid}} ({{item.name}})
              </div>
            </div>
          </div>
        </div>
        <el-button
          slot="reference"
          size="mini"
          style="margin-left:10px;"
          v-if="base[userId]"
        >
          选择人员
        </el-button>
      </el-popover>

    </div>
    <div class="flex">
      <span class="l">日期：</span>
      <div v-if="data">{{data.applicationDate}}</div>
      <div v-else>{{model.date}}</div>
    </div>
    <div class="flex">
      <span class="l">假别：</span>
      <div v-if="data">
        {{jiabie.length && jiabie.find(item => item.id == data.leaveType).leaveName}}
      </div>
      <el-select
        v-else
        size="mini"
        v-model="model.jiabie"
        placeholder="请选择"
        @change="jiabieChange"
      >
        <el-option
          v-for="item in jiabie"
          :key="item.id"
          :label="item.leaveName"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </div>

    <div class="flex">
      <span class="l">请假时间：</span>
      <el-col class="down">
        <div v-if="data">{{data.startTime}} 至 {{data.endTime}}</div>
        <div v-else>
          <el-row
            type="flex"
            align="middle"
            class="from-end"
          >
            <el-date-picker
              size="small"
              v-model="model.start"
              placeholder="选择日期"
              @change="startDatePickerChange"
              style="width:145px"
            >
            </el-date-picker>
            <el-select
              v-if="model.start"
              v-model="model.period1"
              size="small"
              placeholder="请选择"
              @change="period1Change"
              style="width:105px;margin-left:10px;"
              ref="period1"
            >
              <el-option
                v-for="item in period"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <div style="text-align:center;width:36px;">至</div>
            <el-date-picker
              size="small"
              v-model="model.end"
              placeholder="选择日期"
              @change="endDatePickerChange"
              style="width:145px"
            >
            </el-date-picker>
            <el-select
              v-if="model.end"
              v-model="model.period2"
              size="small"
              placeholder="请选择"
              @change="period2Change"
              style="width:105px;margin-left:10px;"
              ref="period2"
            >
              <el-option
                v-for="item in period"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-row>

          <div
            v-if="usingAvailableLeave"
            style="margin-top: 8px"
          >
            <div v-if="$store.state.oa.user.get($store.state.oa.userInfo.UserId).availableLeave">
              <div
                v-for="(v,k) in $store.state.oa.user.get($store.state.oa.userInfo.UserId).produceDetailInfoList"
                :key="k"
              >
                <div
                  v-if="v.availableLeave"
                  style="margin-top: 5px"
                >
                  可用 {{v.availableLeave}} 天，到期时间 {{v.expireDate}}
                </div>
              </div>
            </div>
            <div v-else>
              <div style="color: red">无可用假期</div>
            </div>
          </div>

          <el-row class="sumsize">
            总计：&nbsp;{{model.days}}&nbsp;天&nbsp;{{model.hours}}&nbsp;小时
          </el-row>

        </div>

      </el-col>
    </div>

    <div class="flex">
      <span class="l">请假事由：</span>
      <div v-if="data">{{data.reason || '无'}}</div>
      <el-input
        v-else
        ref="reason"
        style="width:500px"
        type="textarea"
        autosize
        v-model="model.reason"
      ></el-input>
    </div>

    <div class="flex">
      <span class="l">交接事项：</span>
      <div v-if="data">{{data.handover || '无'}}</div>
      <el-input
        v-else
        ref="handover"
        style="width:500px"
        type="textarea"
        autosize
        v-model="model.handover"
      ></el-input>
    </div>

    <el-row
      type="flex"
      justify="center"
      v-if="!data"
    >
      <el-button
        size="mini"
        class="submit"
        @click="submit"
      >
        提交
      </el-button>
    </el-row>

    <el-row
      style="width:320px"
      type="flex"
      justify="center"
      v-if="base[userId]"
    >
      <el-button
        size="mini"
        class="submit"
        @click="confirm.call(this, 1)"
        style="margin-right: 30px"
      >
        同意
      </el-button>
      <el-button
        size="mini"
        class="submit"
        @click="confirm.call(this, 0)"
      >
        驳回
      </el-button>
    </el-row>
  </div>

</template>
 
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getDateByFormat, getHoursByFormat } from 'src/service/date';
import { OA } from 'types';
@Component<Leave>({
  async created() {
    this.$store.dispatch('oa/user', {
      id: this.$store.state.oa.userInfo.UserId
    })
    this.$store.dispatch('oa/leaveAllType')
    this.$store.dispatch('oa/user', {
      id: this.$store.state.oa.userInfo.UserId
    })
    // this.$store.dispatch('oa/leaveOvertimeDetailInfo', { userId: this.$store.state.oa.userInfo.UserId })
    this.$store.dispatch('oa/departmentList').then(data => {
      this.$store.dispatch('oa/userList', {
        department_id: data.find(item => item.parentid === 0).id
      }).then(data => {
        this.userAll = data
      })
    })
  },
  computed: {
    jiabie() {
      return this.$store.state.oa.leaveAllType
    },
    userId() {
      return this.$store.state.oa.userInfo.UserId
    },
    base() {
      let base = {
        [this.$store.state.oa.userInfo.UserId]: false
      }
      if (this.data && this.data.approvalDetailInfo.length) {
        this.data.approvalDetailInfo.forEach(item => {
          if (item.approvalResult === 3) { // 待审批
            base[item.userId] = item
          }
        })
      }
      return base
    },
    manager() {
      let _ = '&nbsp;&nbsp;->&nbsp;&nbsp;'
      let flag = {}
      let str = '';
      [...[{ label: this.data.userId + '(申请人)' }], ...this.data.approvalDetailInfo.map(item => {
        let ret = {
          label: (item.userId + `(${['', '同意', '驳回', '待审批', '已转审', '已撤回'][item.approvalResult]})`),
          s: flag[item.order] ? ',' : _
        }
        flag[item.order] = true
        return ret
      })].forEach((item, index, arr) => {
        str += item.label + (arr[index + 1] ? arr[index + 1].s : '')
      })
      return str
    },
    nextManager() {
      if (this.data.userId === this.$store.state.oa.userInfo.UserId) {
        return this.data.approvalDetailInfo[0].nextApproverId
      } else {
        return this.nextApproverId.map(item => {
          return `<span>${item}</span>&nbsp;<i class="el-icon-circle-close" name="${item}"></i>`
        }).join('&nbsp;,&nbsp;&nbsp;')
      }
    }
  }
})

export default class Leave extends Vue {
  @Prop() data!: any
  userAll = ''
  xzry_search = ''
  nextApproverId: string[] = this.data && this.data.approvalDetailInfo.length && this.data.approvalDetailInfo[0].nextApproverId ? this.data.approvalDetailInfo[0].nextApproverId.split(',') : []
  nextApproverName: string[] = this.data && this.data.approvalDetailInfo.length && this.data.approvalDetailInfo[0].nextApproverName ? this.data.approvalDetailInfo[0].nextApproverName.split(',') : []
  test(el) {
    if (el.target.classList.contains('el-icon-circle-close')) {
      let name = el.target.getAttribute("name")
      this.nextApproverId.splice(
        this.nextApproverId.indexOf(name),
        1
      )
    }
  }

  confirm(isConfirm) {
    let data_m
    for (let i = 0; i < this.data.approvalDetailInfo.length; i++) {
      let item = this.data.approvalDetailInfo[i];
      if (item.userId === this.$store.state.oa.userInfo.UserId) {
        data_m = item
        break
      }
    }
    let data: any = {
      order: data_m.order,
      serialNumber: this.data.serialNumber,
      userId: this.$store.state.oa.userInfo.UserId,
      userName: data_m.userName,
      approvalResult: isConfirm || 2,
    }
    data_m.hasOwnProperty('nextApproverId') && (data.nextApproverId = data_m.nextApproverId);
    data_m.hasOwnProperty('nextApproverName') && (data.nextApproverName = data_m.nextApproverName);
    data_m.hasOwnProperty('nextDepartmentId') && (data.nextDepartmentId = data_m.nextDepartmentId);
    data_m.hasOwnProperty('isEnd') && (data.isEnd = data_m.isEnd);


    this.$store.dispatch("oa/approvalConfirm", data).then(data => {
      if (data.code === 200) {
        this.$emit('click')
        this.$notify.success("操作完成")
        this.$store.dispatch("oa/approvalApprovalWaitInfo", {
          userId: this.$store.state.oa.userInfo.UserId
        })
        this.$store.dispatch("oa/approvalApprovalCompletedInfo", {
          userId: this.$store.state.oa.userInfo.UserId
        })
      }
    })
  }

  usingAvailableLeave = false

  jiabieChange(type) {
    if (type === 1 || type === 2) {
      this.usingAvailableLeave = true
    } else {
      this.usingAvailableLeave = false
    }
  }

  xzry(userInfo) {
    let userid = userInfo.userid
    let name = userInfo.name
    let index = this.nextApproverId.indexOf(userid)
    if (index === -1) {
      this.nextApproverId.push(userid)
      this.nextApproverName.push(name)
    } else {
      this.nextApproverId.splice(index, 1)
      this.nextApproverName.splice(index, 1)
    }
  }

  period = (function () {
    let arr: any = []
    for (let i = 9; i <= 18; i++) {
      if (i === 13) continue
      arr.push({
        label: i + ':00',
        value: i
      })
      arr.push({
        label: i + ':30',
        value: i + 0.5
      })
    }
    arr.shift()
    return arr
  })()

  model = {
    date: getDateByFormat('yyyy-MM-dd'),
    jiabie: '',
    start: '',
    end: '',
    days: 0,
    hours: 0,
    period1: '',
    period2: '',
    duration: 0,
    reason: '',
    handover: '',
  }
  hours() {
    let startDay = (this.model.start as any).getDate()
    let endDay = (this.model.end as any).getDate()
    if (startDay && endDay) {
      let { days } = getHoursByFormat(
        (this.model.end as any).getTime() - (this.model.start as any).getTime()
      )
      let hours
      let period1: number = this.model.period1 as any
      let period2: number = this.model.period2 as any
      if (days === 0) { // 同一天
        hours = period2 - period1 - ((period1 < 13 && period2 > 13) ? 1.5 : 0)
      }
      else if (days === 1) { // 前后2天
        hours = 18.5 - period1 - (period1 < 13 ? 1.5 : 0)
        hours += period2 - 9.5 - (period2 > 13 ? 1.5 : 0)
      }
      else {
        hours = 18.5 - period1 - (period1 < 13 ? 1.5 : 0)
        hours += period2 - 9.5 - (period2 > 13 ? 1.5 : 0)
        hours += (days - 1) * 7.5
      }
      this.model.days = Math.floor(hours / 7.5)
      this.model.hours = hours - this.model.days * 7.5
      this.model.duration = hours
    }
  }
  startDatePickerChange(date: Date) {
    if (this.model.end) {
      if (this.model.start > this.model.end) this.model.start = ''
      if (this.model.period1 && this.model.period2) this.hours()
    } else {
      this.model.days = 0
      this.model.hours = 0
    }
  }
  period1Change(value) {
    if (this.model.period2) {
      if (this.model.end <= this.model.start) {
        if (this.model.period1 >= this.model.period2) {
          this.model.period1 = ''
        } else {
          this.hours()
        }
      } else {
        this.hours()
      }
    }
  }
  endDatePickerChange(date: Date) {
    if (this.model.start) {
      if (this.model.start > this.model.end) this.model.end = ''
      if (this.model.period1 && this.model.period2) this.hours()
    } else {
      this.model.days = 0
      this.model.hours = 0
    }
  }
  period2Change(value) {
    if (this.model.period1) {
      if (this.model.end <= this.model.start) {
        if (this.model.period1 >= this.model.period2) {
          this.model.period2 = ''
        } else {
          this.hours()
        }
      } else {
        this.hours()
      }
    }
  }
  async submit() {
    if (!this.model.jiabie) {
      this.$notify.error("请选择假别")
    }
    else if (!this.model.start) {
      this.$notify.error("请选择startTime")
    }
    else if (!this.model.end) {
      this.$notify.error("请选择endTime")
    }
    else if (!this.model.period1) {
      this.$notify.error("请选择period1")
    }
    else if (!this.model.period2) {
      this.$notify.error("请选择period2")
    }
    else if (this.model.jiabie as any <= 2 && this.$store.state.oa.user.get(this.$store.state.oa.userInfo.UserId).availableLeave * 7.5 < this.model.duration) {
      this.$notify.error("假期不足")
    }
    else {
      let data = {
        userId: 'qiao.luo' && this.$store.state.oa.userInfo.UserId,
        applicationDate: this.model.date,
        leaveType: this.model.jiabie,
        startTime: getDateByFormat("yyyy-MM-dd", this.model.start as any) + ' ' + this.$refs.period1["selectedLabel"] + ":00",
        endTime: getDateByFormat("yyyy-MM-dd", this.model.end as any) + ' ' + this.$refs.period2["selectedLabel"] + ":00",
        duration: this.model.duration,
        reason: this.model.reason,
        handover: this.model.handover,
        departmentId: '1487015696' && this.$store.state.oa.user.department[0]
      }
      this.$store.dispatch("oa/approvalLeaveApplication", {
        data
      }).then(data => {
        if (data.code === 200) {
          this.$notify.success("提交成功")
        }
      })
    }

  }
}
</script>

<style lang="scss">
.approvalLeave {
  width: 1000px;
  padding: 0 0 50px 0;
  .flex {
    margin: 15px 0 -5px 0;
    display: flex;
    align-items: center;
    .l {
      width: 78px;
    }
    .down {
      position: relative;
      width: auto;
    }
    .sumsize {
      margin-top: 8px;
    }
  }
  .submit {
    margin: 30px 0 0 -380px;
  }
  .el-icon-circle-close {
    cursor: pointer;
    font-size: 15px;
    position: relative;
    top: 1px;
  }
}
.xzry {
  line-height: 30px;
  cursor: pointer;
  padding-left: 8px;
  &.active {
    color: #fff;
    background: #4e8cee;
  }
}
</style>
