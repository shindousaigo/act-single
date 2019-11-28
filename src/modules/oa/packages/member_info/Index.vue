<template>
  <div class="member-info">

    <div
      v-if="inner"
      :is="inner"
      @click="inner=''"
    ></div>

    <div v-if="user && !inner">
      <div class="top-row">
        <span class="userid"> {{user.userid}} </span>
        <span class="position">{{user.position}}</span>
      </div>
      <div class="main">
        <div class="main_left">
          <img
            class="avatar"
            :src="user.avatar || require('src/assets/oa/rg.png')"
          >
          <el-button
            style="margin-top:15px"
            size="mini"
            @click="inner='Attendance'"
          >
            个人考勤
          </el-button>
        </div>
        <div class="rt-box">
          <span class="item">
            <span class="rt-box-title">工号：</span>
            <span class="content">{{user.employeeNumber}}</span>
          </span>
          <span class="item">
            <span class="rt-box-title">姓名：</span>
            <span class="content">{{user.name}}</span>
          </span>
          <span class="item">
            <span class="rt-box-title">电话：</span>
            <span class="content">{{user.mobile}}</span>
          </span>
          <span class="item">
            <span class="rt-box-title">部门：</span>
            <span
              class="content"
              :key="department.id"
              v-for="department in userDepartment"
            >{{department.name}}</span>
          </span>
          <span class="item">
            <span class="rt-box-title">成员状态：</span>
            <span class="content">{{userStatusSet[user.userStatus]}}</span>
          </span>
          <span class="item">
            <span class="rt-box-title">入职日期：</span>
            <span class="content">{{user.entryDate||defaultDate}}</span>
          </span>
          <span
            class="item"
            v-if="user.userStatus>=2"
          >
            <span class="rt-box-title">转正日期：</span>
            <span class="content">{{user.correctionDate||defaultDate}}</span>
          </span>
          <span
            class="item"
            v-if="user.userStatus===3"
          >
            <span class="rt-box-title">离职日期：</span>
            <span class="content">{{user.eparationDate||defaultDate}}</span>
          </span>

          <span class="item">
            <span class="rt-box-title">新签合同日期：</span>
            <span class="content">{{user.newContractDate||defaultDate}}</span>
          </span>
          <span class="item">
            <span class="rt-box-title">合同到期时间：</span>
            <span class="content">{{user.contractExpirationDate||defaultDate}}</span>
          </span>
          <span class="item">
            <span class="rt-box-title">年假 [可用]：</span>
            <span class="content">{{user.produceDetailInfoList.length ? '['+user.produceDetailInfoList[user.produceDetailInfoList.length-1].expireDate+']':''}} {{user.availableLeave || '0'}}天</span>
          </span>
          <div class="leave-detail">
            <div>
              <el-row
                type="flex"
                align="middle"
              >
                年假明细 [产生]：
                <i
                  v-if="user.produceDetailInfoList.length>1"
                  :class="produceMore?'el-icon-circle-plus-outline':'el-icon-remove-outline'"
                  @click="more.call(this, 1)"
                >
                </i>
              </el-row>
              <div v-if="user.produceDetailInfoList.length>0">
                <div
                  class="leave-detail-item"
                  v-for="item in (produceMore?user.produceDetailInfoList.slice(0,1):user.produceDetailInfoList)"
                  :key="item.id"
                >
                  <span v-if="item.extraLeave">[手动编辑] {{({1:'+',2:'-'})[item.extraLeaveType]}}{{item.extraLeave}}天</span>
                  <span v-else>[{{item.produceDate}}] {{item.leaveTotal}}天</span>
                </div>
                <div
                  style="margin: -5px 0 0 8px;"
                  v-if="produceMore"
                >... ...</div>
              </div>
              <div v-else>
                <div class="leave-detail-item">空</div>
              </div>
            </div>

            <div style="margin-left:66px;">
              <el-row
                type="flex"
                align="middle"
              >
                年假明细 [使用]：
                <i
                  v-if="user.useDetailInfoList.length>1"
                  :class="useMore?'el-icon-circle-plus-outline':'el-icon-remove-outline'"
                  @click="more.call(this, 2)"
                >
                </i>
              </el-row>
              <div v-if="user.useDetailInfoList.length>0">
                <div
                  class="leave-detail-item"
                  v-for="item in (useMore?user.useDetailInfoList.slice(0,1):user.useDetailInfoList)"
                  :key="item.id"
                >
                  <span>[{{item.useDate}}] {{item.duration}}天</span>
                </div>
                <div
                  style="margin: -5px 0 0 8px;"
                  v-if="useMore"
                >... ...</div>
              </div>
              <div v-else>
                <div class="leave-detail-item">空</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
 
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { OA } from 'types';
import Attendance from "./components/Attendance/Index.vue"

let sql = require('src/graphql/oa.gql')
@Component<MemberInfo>({
  components: {
    Attendance
  },
  computed: {
    user() {
      if (this.$store.state.oa.user) {
        return this.$store.state.oa.user.get(
          this.$store.state.oa.userInfo.UserId
        )
      }
    },
    userDepartment() {
      return this.$store.state.oa.userDepartment || []
    },
  },
  async created() {
    /** 获取当前用户信息 */
    let userInfo = await this.$store.dispatch("oa/userInfo")
    let user: OA.USER.UserAll = await this.$store.dispatch("oa/user", {
      id: userInfo.UserId
    })
    this.produceMore = user.produceDetailInfoList.length > 1
    this.useMore = user.useDetailInfoList.length > 1
    user.department.forEach(id => { /** 获取当前用户的部门信息 */
      this.$store.dispatch('oa/departmentList', { id })
    })
  }
})

export default class MemberInfo extends Vue {
  inner = ""
  defaultDate = '1970-01-01'
  userStatusSet = ['实习生', '试用期', '正式员工', '离职员工']

  produceMore = false
  useMore = false
  more(i) {
    if (i === 1) {
      this.produceMore = !this.produceMore
    } else {
      this.useMore = !this.useMore
    }
  }
}
</script>

<style lang="scss">
.oa .member-info {
  font-family: "Raleway", sans-serif;
  width: 1000px;
  margin: 0 auto;
  .top-row {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 30px 0 36px 0;
    .userid {
      text-transform: uppercase;
      letter-spacing: 4px;
      font-size: 50px;
    }
    .position {
      margin: -15px 0 0 0;
      font-size: 14px;
      letter-spacing: 10px;
    }
  }
  .main {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    margin-top: 12px;
    .main_left {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .avatar {
      width: 120px;
      height: 120px;
    }
    .rt-box {
      margin: 0 0 0 40px;
      font-size: 15px;
      display: flex;
      flex-direction: column;
      .item {
        position: relative;
        line-height: 18px;
        margin: 12px 0;
        .rt-box-title {
          display: inline-block;
          width: 160px;
        }
      }
    }
    .leave-detail {
      display: flex;
      font-size: 12px;
      color: #a77474;
      margin-bottom: 60px;
      .leave-detail-item {
        line-height: 28px;
      }
    }
    .el-icon-circle-plus-outline,
    .el-icon-remove-outline {
      font-size: 19px;
      cursor: pointer;
      position: relative;
      top: 1px;
    }
  }
}
</style>
