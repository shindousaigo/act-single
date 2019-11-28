<template>
  <div class="work">
    <div
      class="state1"
      v-if="!detail"
    >
      <el-tabs
        v-model="activeName"
        :before-leave="beforeLeave"
      >
        <el-tab-pane
          v-for="({ label, name }) in menu"
          :key="label"
          :label="label"
          :name="name"
        >
        </el-tab-pane>
      </el-tabs>
      <!-- 搜索栏 -->
      <div class="search-colunm">
        <span>{{txt.process_type}}</span>
        <el-select
          size="mini"
          v-model="model.process_type"
          placeholder="请选择"
          clearable=""
        >
          <el-option-group
            v-for="group in data.process_type"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-option-group>
        </el-select>
        <span class="ml-16">{{txt.serial_number}}</span>
        <el-input
          class="w-120"
          size="mini"
          v-model="model.serial_number"
        ></el-input>
        <!-- <span class="ml-16">{{txt.sponsor}}</span>
        <el-input
          class="w-120"
          size="mini"
        ></el-input>
        <el-button
          size="mini"
          class="ml-16"
        >{{txt.search}}</el-button> -->
      </div>
      <el-table
        :data="workList.slice(start,start+offset)"
        border
        size="small"
      >
        <el-table-column
          prop="serialNumber"
          label="流水号"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="processType"
          label="流程类型"
          width="150"
          :formatter="processTypeFormatter"
        >
        </el-table-column>
        <el-table-column
          prop="userId"
          label="发起人"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="申请时间"
          width="150"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="150"
        >
          <template
            slot
            slot-scope="{row, colunm, $index}"
          >
            <div class="operate">
              <div
                class="operate-item"
                @click="operateHandler.call(this, {row, colunm, $index, action: 1})"
              >
                查看
              </div>
              <div
                class="operate-item"
                v-if="activeName==='workProcess'"
                @click="operateHandler.call(this, {row, colunm, $index, action: 0})"
              >
                删除
              </div>
            </div>
          </template>

        </el-table-column>

      </el-table>
      <el-pagination
        v-if="workList.length>offset"
        layout="prev,pager,next"
        :pageSize="offset"
        :total="workList.length"
        @current-change="currentChange"
        style="margin-top:16px"
      >
      </el-pagination>
    </div>
    <div v-else>

      <span class="wrapper-detail_title">
        <span class="item-detail_title">{{process_type}}</span>
        <el-button
          @click="detail=''"
          size="mini"
        >返回</el-button>
      </span>
      <component
        :is="detail.component"
        :data="detail.data"
        @click="detail=''"
      />
    </div>

  </div>
</template>
 
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Leave from './Leave.vue'
import Overtime from './Overtime.vue'
import Attendance from './Attendance.vue'


@Component<Work>({
  components: {
    Leave, Overtime, Attendance
  },
  created() {
    this.beforeLeave(this.activeName)
  },
  computed: {
    workList() {
      let workList = this.$store.state.oa[this.activeName] || []
      let ret = this.model.process_type ? workList.filter(item => item.processType === this.model.process_type) : workList
      ret = this.model.serial_number ? ret.filter(item => item.serialNumber.includes(this.model.serial_number)) : ret
      return ret
    }
  }
})

export default class Work extends Vue {
  @Prop() title!: string

  activeName = 'workProcess'
  menu = [
    { label: '正在办理', name: 'workProcess', query: false },
    { label: '等待办理', name: 'workWait', query: false },
    { label: '完成办理', name: 'workOver', query: false },
    { label: '全部办理', name: 'workAll', query: false },
  ]

  start = 0
  offset = 10
  currentChange(page) {
    this.start = this.offset * (page - 1)
  }
  detail = ''

  txt = {
    search: '搜索',
    process_type: '流程类型：',
    serial_number: '流水号：',
    sponsor: '发起人：'
  }
  data = {
    process_type: [
      {
        label: '流程类型',
        options: [
          { value: 1, label: '补签申请' },
          { value: 2, label: '加班申请' },
          { value: 3, label: '请休假申请' },
        ]
      }
      // {
      //   label: '人事',
      //   options: [
      //     { value: 0, label: '请休假申请' },
      //     { value: 1, label: '加班申请' },
      //     { value: 2, label: '考勤卡单申请' },
      //   ]

      // }, {
      //   label: 'IT',
      //   options: [
      //     { value: 3, label: '请休假申请' },
      //     { value: 4, label: '加班申请' },
      //     { value: 5, label: '考勤卡单申请' },
      //   ]
      // }
    ]
  }
  model = {
    process_type: '',
    serial_number: ''
  }
  process_type

  processTypeFormatter({ processType }) {
    return ['', '补签申请', '加班申请', '请休假申请'][processType]
  }



  async operateHandler({ row, colunm, $index, action }) {
    let { serialNumber, processType } = row
    if (action) {
      let datas = await Promise.all([
        this.$store.dispatch("oa/approvalApplicationDetailInfo", {
          serialNumber
        }),
        this.$store.dispatch("oa/approvalApprovalDetailInfo", {
          serialNumber
        })
      ])
      this.process_type = this.processTypeFormatter({ processType })
      let data = datas[0]
      data.approvalDetailInfo = datas[1]
      this.detail = {
        component: ['', 'Attendance', 'Overtime', 'Leave'][processType],
        data: data
      } as any

    } else {
      this.$store.dispatch("oa/approvalDeleteApplication", {
        serialNumber
      }).then(data => {
        if (data.code === 200) {
          this.$notify.success("删除成功")
          this.$store.dispatch("oa/approvalApprovalProcessingInfo", {
            userId: this.$store.state.oa.userInfo.UserId
          })
          this.$store.dispatch("oa/approvalApprovalAllInfo", {
            userId: this.$store.state.oa.userInfo.UserId
          })
        }
      })
    }
  }



  beforeLeave(activeName) {
    switch (activeName) {
      case 'workProcess':
        if (!this.menu[0].query)
          this.$store.dispatch("oa/approvalApprovalProcessingInfo", {
            userId: this.$store.state.oa.userInfo.UserId
          })
        this.menu[0].query = true
        break;
      case 'workWait':
        if (!this.menu[1].query)
          this.$store.dispatch("oa/approvalApprovalWaitInfo", {
            userId: this.$store.state.oa.userInfo.UserId
          })
        this.menu[1].query = true
        break;
      case 'workOver':
        if (!this.menu[2].query)
          this.$store.dispatch("oa/approvalApprovalCompletedInfo", {
            userId: this.$store.state.oa.userInfo.UserId
          })
        this.menu[2].query = true
        break;
      case 'workAll':
        if (!this.menu[3].query)
          this.$store.dispatch("oa/approvalApprovalAllInfo", {
            userId: this.$store.state.oa.userInfo.UserId
          })
        this.menu[3].query = true
        break;
    }
  }

}
</script>

<style lang="scss">
.work {
  width: 1000px;
  .operate {
    display: flex;
    justify-content: flex-start;
    .operate-item {
      margin: 0 18px 0 0;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
  }
  .wrapper-detail_title {
    font-size: 14px;
    display: flex;
    align-items: center;
    margin-top: 17px;
    .item-detail_title {
      margin: 0 12px 0 0;
    }
  }
  .w-120 {
    width: 120px;
  }
  .ml-16 {
    margin-left: 16px;
  }
  .search-colunm {
    margin-bottom: 14px;
  }
  .back {
    margin-top: 12px;
    font-size: 22px;
    cursor: pointer;
  }
}
</style>
