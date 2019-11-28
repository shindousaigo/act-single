<template>

  <div class="oa-member-examine-approve">
    <div class="menu">
      <div
        :class="'item' + (curMenu.title === item.title ?  ' active' : '')"
        v-for="(item, index) in menuList"
        :key="item.title"
        @click="menuHandler.call(this, index)"
      >
        <img :src="item.icon" />
        <span>{{item.title}}</span>
      </div>
    </div>
    <div class="wrapper-component">
      <h2>{{curMenu.title}}</h2>
      <component
        :is="curMenu.component"
        :itemList="itemList"
      />
    </div>
  </div>

</template>
 
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Leave from './Leave.vue'
import Overtime from './Overtime.vue'
import Attendance from './Attendance.vue'
import Configs from './Configs.vue'
import Works from './Works.vue'

@Component<MemberExamineApprove>({
  components: { Leave, Works, Overtime, Attendance, Configs },
  computed: {
    curMenu() {
      return this.menuList[this.menuIndex]
    },
    userPermission() {
      return this.$store.state.oa.userPermission
    }
  },
  created() {
    this.menuList = [
      {
        icon: require("src/assets/oa/icon-examine-approve.svg"),
        title: '我的工作',
        component: "Works"
      },
      ...this.itemList,

    ]
    if (this.$store.state.oa.userPermission.data.roleInfo.permissionLevel >= 15) {
      this.menuList.push(
        {
          icon: require("src/assets/oa/icon-examine-approve.svg"),
          title: '审批流程配置',
          component: "Configs"
        }
      )
    }
  }
})

export default class MemberExamineApprove extends Vue {
  menuIndex = 0
  menuList: any[] = []
  itemList = [
    {
      icon: require("src/assets/oa/icon-examine-approve.svg"),
      title: '请休假申请',
      type: 3,
      component: "Leave"
    },
    {
      icon: require("src/assets/oa/icon-examine-approve.svg"),
      title: '加班申请',
      type: 2,
      component: "Overtime"
    },
    {
      icon: require("src/assets/oa/icon-examine-approve.svg"),
      title: '补签申请',
      component: "Attendance",
      type: 1,
    }
  ]

  menuHandler(index) {
    this.menuIndex = index
  }
}
</script>

<style lang="scss">
.oa-member-examine-approve {
  display: flex;
  flex-direction: column;

  .wrapper-component {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .menu {
    margin-top: 16px;
    display: flex;
    width: 100%;
    .item {
      &.active,
      &:hover {
        background: rgba($color: #888, $alpha: 0.3);
      }
      position: relative;
      cursor: pointer;
      width: 76px;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: 26px;
      padding: 10px 0 6px 0;
      border-radius: 6px;
      img {
        width: 36px;
        height: 36px;
        margin-bottom: 10px;
      }
      .el-icon-error {
        font-size: 23px;
        position: absolute;
        color: #888;
        right: 12px;
        top: 3px;
      }
    }
  }
}
</style>
