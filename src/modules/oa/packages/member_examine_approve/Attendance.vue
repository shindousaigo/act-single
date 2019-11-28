<template>
  <div
    class="attendance"
    v-if="user"
  >
    <div v-if="data">

      <div class="flex">
        <span class="l">日期：</span>
        <div>{{data.checkInDate}}</div>
      </div>

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
            <div style="position:absolute;height:464px;overflow:auto;bottom:10px;width:285px;padding-right: 8px">

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

      <el-table
        header-cell-class-name="theadcenter"
        border
        :data="dataTable"
        style="margin-top:16px"
      >
        <el-table-column
          prop="checkInTime"
          label="日期"
          width="146"
        >
        </el-table-column>
        <el-table-column
          prop="checkInType"
          label="类别"
          width="124"
        >
          <template
            slot
            slot-scope="{row, colunm, $index}"
          >
            {{['','忘记打卡', '外出办事'][row.checkInType]}}
          </template>
        </el-table-column>
        <el-table-column
          prop="timeSlot"
          label="时段"
          width="114"
        >
          <template
            slot
            slot-scope="{row, colunm, $index}"
          >
            {{['','上班 ', '下班','全天'][row.timeSlot]}}
          </template>
        </el-table-column>
        <el-table-column
          prop="reason"
          label="说明"
          width="245"
        >

          <template
            slot
            slot-scope="{row, colunm, $index}"
          >
            {{row.reason || '无'}}
          </template>

        </el-table-column>
      </el-table>
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
    <div v-else>

      <div style="margin:20px 0 20px 0;">
        <div>您上月({{model.startTime1}}~{{model.endTime1}})已补签上班卡{{model.checkInRecord1.onInfoSize}}次，下班卡{{model.checkInRecord1.offInfoSize}}次</div>
        <div> 您本月({{model.startTime2}}~{{model.endTime2}})已补签上班卡{{model.checkInRecord2.onInfoSize}}次，下班卡{{model.checkInRecord2.offInfoSize}}次</div>
        <div>备注</div>
        <div v-html="beizhu"></div>
      </div>

      <el-row
        type="flex"
        align="center"
      >
        <div
          class="flex"
          style="margin: 0"
        >
          <span class="l">签卡人：</span>
          {{user.userid}}
        </div>
        <i
          class="el-icon-circle-plus"
          style="margin-left:540px;font-size:24px;color:#a6c5f6"
          @click="add"
        ></i>
      </el-row>

      <el-table
        header-cell-class-name="theadcenter"
        border
        :data="model.table"
        style="width: 730px;"
      >
        <el-table-column
          prop="date"
          label="日期"
          width="146"
        >
          <template
            slot
            slot-scope="{row, colunm, $index}"
          >
            <el-date-picker
              v-model="model.table[$index].date"
              align="right"
              type="date"
              placeholder="选择日期"
              size="mini"
              class="date"
              format="yyyy-MM-dd"
              @change="change"
            >
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column
          prop="userId"
          label="类别"
          width="124"
        >
          <template
            slot
            slot-scope="{row, colunm, $index}"
          >
            <el-select
              size="mini"
              v-model="model.table[$index].type"
              placeholder="请选择"
            >
              <el-option
                v-for="item in model.type"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="userId"
          label="时段"
          width="114"
        >
          <template
            slot
            slot-scope="{row, colunm, $index}"
          >
            <el-select
              size="mini"
              v-model="model.table[$index].timeBucket"
              placeholder="请选择"
            >
              <el-option
                v-for="item in model.timeBucket"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="userId"
          label="说明"
          width="245"
        >
          <template
            slot
            slot-scope="{row, colunm, $index}"
          >
            <el-input
              v-model="model.table[$index].state"
              type="textarea"
              autosize
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column
          prop="userId"
          label="操作"
          width="100"
        >
          <template
            slot
            slot-scope="{row, colunm, $index}"
          >
            <el-button
              size="mini"
              @click="del.call(this, $index)"
              :disabled="model.table.length===1"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-row
        type="flex"
        justify="center"
      >
        <el-button
          size="mini"
          class="submit"
          @click="submit"
        >
          提交
        </el-button>
      </el-row>
    </div>

  </div>
</template>
 
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getDateByFormat } from 'src/service/date';
import moment from "moment"
@Component<Attendance>({
  async created() {

    this.$store.dispatch('oa/departmentList').then(data => {
      this.$store.dispatch('oa/userList', {
        department_id: data.find(item => item.parentid === 0).id
      }).then(data => {
        this.userAll = data
      })
    })

    await this.$store.dispatch('oa/user', {
      id: this.$store.state.oa.userInfo.UserId
    })

    if (!this.data) {

      let date = new Date
      let curDate = date.getDate()
      let curYear = date.getFullYear()
      let curMonth = date.getMonth() + 1
      let startTime1, endTime1, startTime2, endTime2
      if (curDate > 24) {
        startTime1 = moment(new Date([curYear, curMonth, 25].join('-'))).add(-1, "month").format("YYYY-MM-DD")
        endTime1 = moment(new Date([curYear, curMonth, 24].join('-'))).format("YYYY-MM-DD")
        startTime2 = moment(new Date([curYear, curMonth, 25].join('-'))).format("YYYY-MM-DD")
        endTime2 = moment(new Date([curYear, curMonth, 24].join('-'))).add(1, "month").format("YYYY-MM-DD")
      } else {
        startTime1 = moment(new Date([curYear, curMonth, 25].join('-'))).add(-2, "month").format("YYYY-MM-DD")
        endTime1 = moment(new Date([curYear, curMonth, 24].join('-'))).add(-1, "month").format("YYYY-MM-DD")
        startTime2 = moment(new Date([curYear, curMonth, 25].join('-'))).add(-1, "month").format("YYYY-MM-DD")
        endTime2 = moment(new Date([curYear, curMonth, 24].join('-'))).format("YYYY-MM-DD")
      }
      this.$store.dispatch('oa/approvalCheckInRecord', {
        startTime: startTime1, endTime: endTime1, userId: this.user.userid,
      }).then(res => {
        this.model.startTime1 = startTime1
        this.model.endTime1 = endTime1
        this.model.checkInRecord1 = res.data
      })
      setTimeout(() => {
        this.$store.dispatch('oa/approvalCheckInRecord', {
          startTime: startTime2, endTime: endTime2, userId: this.user.userid,
        }).then(res => {
          this.model.startTime2 = startTime2
          this.model.endTime2 = endTime2
          this.model.checkInRecord2 = res.data
        })
      }, 1)

    }


  },
  computed: {
    dataTable() {
      let dataTable = this.data.checkInTime.split(',').map((item, index) => {
        // checkInDate: "2019-02-22"
        // checkInTime: "2019-02-28,2019-02-27"
        // checkInType: "1,1"
        // createTime: "2019-02-22 17:15:18.0"
        // departmentId: 1487015649
        // reason: "|123"
        // serialNumber: "XY50826918016_61"
        // timeSlot: "1,2"
        // userId: "shindousaigo"
        return {
          checkInTime: item,
          checkInType: this.data.checkInType.split(',')[index],
          reason: (this.data.reason || '').split('|')[index],
          timeSlot: this.data.timeSlot.split(',')[index],
        }
      })
      return dataTable
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
    user() {
      if (this.$store.state.oa.user) {
        return this.$store.state.oa.user.get(
          this.$store.state.oa.userInfo.UserId
        )
      }
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

export default class Attendance extends Vue {
  @Prop() data!: any
  jiabie: any = []
  model = {
    startTime1: '',
    startTime2: '',
    checkInRecord1: '',
    endTime1: '',
    endTime2: '',
    checkInRecord2: '',
    table: [
      {
        date: '',
        type: '',
        timeBucket: '',
        state: '',
      }
    ],
    type: [
      {
        label: '忘记打卡',
        value: 1
      },
      {
        label: '外出办事',
        value: 2
      }
    ],
    timeBucket: [
      {
        label: '上班',
        value: 1
      },
      {
        label: '下班',
        value: 2
      },
      {
        label: '全天',
        value: 3
      }
    ]
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
  xzry_search = ''
  userAll = ''
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

  beizhu = '1、此单用于未打卡情况的补充签到；<br/>2、因忘记而未打卡的成员，每人每月可补签7次（含2次上班卡5次下班），须注明未打卡原因；<br/>3、因外出办事而未打卡的成员，不限补签次数，不影响出勤，须注明外出办事地点、外出办事事由；<br/>4、纸质签卡单仅限于指纹无法打卡并且经由人力资源部确认的成员使用，且签卡需在每日9:30前完成，其余成员签卡无效；<br/>5、因设备问题无法打卡的成员请及时联系余晓珊同学；<br/>6、未打卡且不履行签卡义务的成员，按旷工处理。'

  user

  submit() {
    let checkInType: any = [], timeSlot: any = [], reason: any = [], checkInTime: any = []
    this.model.table.forEach((item: any) => {
      checkInType.push(item.type)
      timeSlot.push(item.timeBucket)
      reason.push(item.state)
      checkInTime.push(
        getDateByFormat('yyyy-MM-dd', item.date)
      )
    })
    let data = {
      userId: 'qiao.luo' && this.user.userid,
      departmentId: '1487015696' && this.user.department.join(','),
      checkInDate: getDateByFormat('yyyy-MM-dd'),
      checkInType: checkInType.join(','),
      timeSlot: timeSlot.join(','),
      checkInTime: checkInTime.join(','),
      reason: reason.join('|'),
    }
    this.$store.dispatch("oa/approvalCheckInApplication", data).then(data => {
      if (data.code === 200) {
        this.$notify.success("申请完成")
      } else {
        this.$notify.error(data.message)
      }
    })
  }
  add() {
    this.model.table.push({
      date: '',
      type: '',
      timeBucket: '',
      state: '',
    })
  }
  del(index) {
    this.model.table.splice(index, 1)
  }
  change(date: Date) {

    if (date) {
      let count = 0
      let timestamp = date.getTime()
      this.model.table.forEach((item, index) => {
        timestamp === (!this.model.table[index].date ? this.model.table[index].date : this.model.table[index].date['getTime']()) && count++
        if (count > 1) {
          this.model.table[index].date = ''
        }
      })
    }

  }
}
</script>

<style lang="scss">
.attendance {
  width: 1000px;
  .date {
    width: 125px;
  }
  .flex {
    margin: 15px 0 -5px 0;
    display: flex;
    align-items: center;
    .l {
      width: 78px;
    }
  }
  .cell {
    padding: 0 6px !important;
    display: flex;
    justify-content: center;
  }
  .el-icon-circle-plus {
    font-size: 26px;
    cursor: pointer;
    margin: 0 10px 10px 0;
    color: #4e8cee;
    &:hover {
      color: #a6c5f6;
    }
  }
  .submit {
    margin: 20px 0 0 -274px;
  }
  .theadcenter {
    text-align: center;
  }
}
</style>
