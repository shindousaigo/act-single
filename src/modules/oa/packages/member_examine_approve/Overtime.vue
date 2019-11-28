<template>
  <div class="jbsq">
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
      <span class="l">加班时间：</span>
      <el-col class="down">
        <div v-if="data">
          <div
            v-for="(i,index) in data.startTime.split(',')"
            :key="i"
          >{{i}} 至 {{data.endTime.split(',')[index]}}</div>
        </div>
        <div v-else>
          <el-row class="sumsize">
            总计：&nbsp;{{model.days}}&nbsp;天&nbsp;{{model.hours}}&nbsp;小时

            <i
              class="el-icon-circle-plus"
              @click="dates.push('')"
            ></i>

          </el-row>

          <el-row
            type="flex"
            align="middle"
            class="from-end"
            v-for="(i,index) in dates"
            :key="index"
          >
            <el-date-picker
              size="small"
              v-model="model.dates[index]"
              placeholder="选择日期"
              @change="startDatePickerChange.call(this, index)"
              style="width:145px"
            >
            </el-date-picker>
            <el-select
              v-model="model.period1[index]"
              size="small"
              placeholder="请选择"
              @change="period1Change.call(this, index)"
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
            <!-- <el-date-picker
              size="small"
              v-model="model.end"
              placeholder="选择日期"
              @change="endDatePickerChange"
              style="width:145px"
            >
            </el-date-picker> -->
            <el-select
              v-model="model.period2[index]"
              size="small"
              placeholder="请选择"
              @change="period2Change.call(this, index)"
              style="width:105px;margin-left:0;"
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

            <i
              class="el-icon-remove"
              v-if="index"
              @click="dates.splice(index,1) && model.dates.splice(index,1) && model.period1.splice(index,1) && model.period2.splice(index,1) && hours()"
            ></i>
          </el-row>

        </div>

      </el-col>

    </div>

    <div class="flex">
      <span class="l">加班事由：</span>
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
import { getHoursByFormat, getDateByFormat } from 'src/service/date';
@Component<Overtime>({
  created() {
    this.$store.dispatch('oa/departmentList').then(data => {
      this.$store.dispatch('oa/userList', {
        department_id: data.find(item => item.parentid === 0).id
      }).then(data => {
        this.userAll = data
      })
    })
  },
  computed: {
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

export default class Overtime extends Vue {
  @Prop() data!: any

  userAll = ''
  xzry_search = ''

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

  period = (function () {
    let arr: any = []
    for (let i = 6; i <= 23; i++) {
      // if (i === 13) continue
      arr.push({
        label: i + ':00',
        value: i
      })
      arr.push({
        label: i + ':30',
        value: i + 0.5
      })
    }
    return arr
  })()

  dates = ['']

  model = {
    date: getDateByFormat('yyyy-MM-dd'),
    jiabie: '',
    start: '',
    end: '',
    days: 0,
    hours: 0,
    period1: [],
    period2: [],
    duration: [],
    dates: [],
    reason: '',
  }
  hours() {
    (this.model.duration as any) = []
    this.model.dates.forEach((item, index) => {
      if (this.model.dates[index] && this.model.period1[index] && this.model.period2[index]) {
        (this.model.duration as any)[index] = Math.min(this.model.period2[index] - this.model.period1[index], 7.5)
      }
    })
    let hours = 0
    this.model.duration.forEach(item => {
      if (item) {
        hours += item
      }
    })
    this.model.days = Math.floor(hours / 7.5)
    this.model.hours = hours - this.model.days * 7.5
  }
  startDatePickerChange(index: number) {
    let D: Date = this.model.dates[index]
    for (let i = 0; i < this.model.dates.length; i++) {
      if (i !== index) {
        let date: Date = this.model.dates[i]
        if (D && date.getTime() === D.getTime()) {
          this.model.dates.splice(index, 1)
        }
      }
    }
    this.hours()
  }
  period1Change(index) {
    if (this.model.period2[index]) {

      if (this.model.period1[index] >= this.model.period2[index]) {
        (this.model.period1 as any)[index] = ''
      } else {
        this.hours()
      }

    }
  }
  period2Change(index) {
    if (this.model.period1[index]) {

      if (this.model.period1[index] >= this.model.period2[index]) {
        (this.model.period2 as any)[index] = ''
      } else {
        this.hours()
      }

    }
  }
  // endDatePickerChange(date: Date) {
  //   if (this.model.start) {
  //     if (this.model.start > this.model.end) this.model.end = ''
  //     if (this.model.period1 && this.model.period2) this.hours()
  //   } else {
  //     this.model.days = 0
  //     this.model.hours = 0
  //   }
  // }

  async submit() {
    let isValid = false
    for (let i = 0; i < this.model.dates.length; i++) {
      if (!this.model.dates[i] || !this.model.period1[i] || !this.model.period2[i]) {
        isValid = true
        this.$notify.error("参数不完整")
      }
    }
    if (!isValid) {
      let user = await this.$store.dispatch('oa/user', {
        id: this.$store.state.oa.userInfo.UserId
      })
      let data = {
        userId: 'qiao.luo' && this.$store.state.oa.userInfo.UserId,
        applicationDate: this.model.date,
        reason: this.model.reason,
        startTime: this.model.dates.map((item, index) => {
          return getDateByFormat("yyyy-MM-dd", this.model.dates[index] as any) + ' ' + this.$refs.period1[index]["selectedLabel"] + ":00"
        }).join(','),
        endTime: this.model.dates.map((item, index) => {
          return getDateByFormat("yyyy-MM-dd", this.model.dates[index] as any) + ' ' + this.$refs.period2[index]["selectedLabel"] + ":00"
        }).join(','),
        duration: this.model.duration.join(','),
        departmentId: '1487015696' && user.department[0]
      }
      this.$store.dispatch("oa/approvalOvertimeApplication", data).then(data => {
        if (data.code === 200) {
          this.$notify.success("提交成功")
        }
      })
    }

  }
}
</script>

<style lang="scss">
.jbsq {
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
      display: flex;
      align-items: center;
    }
    .from-end {
      margin-top: 10px;
    }
  }
  .submit {
    margin: 30px 0 0 -380px;
  }
  .el-icon-circle-plus,
  .el-icon-remove {
    color: #a6c5f6;
    font-size: 20px;
    margin-left: 15px;
    cursor: pointer;
  }
}
</style>
