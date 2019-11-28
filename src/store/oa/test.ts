// import { OA_CONST } from 'apollo-server/utils/const'
import { APOLLO, OA } from 'types';
// import { getParameterByName } from 'src/utils/fns';
// import moment from "moment"
// const sql = require('src/graphql/oa.gql')
// class AccessToken {
//   constructor({ commit }) {
//     AccessToken.Ins = this
//     this.init({ commit })
//   }
//   static Ins: AccessToken
//   static instance({ commit }): AccessToken {
//     return this.Ins || new AccessToken({ commit })
//   }
//   resolve: any
//   promise: Promise<APOLLO.ServerRes<OA.Res<string>>> = new Promise(resolve => {
//     this.resolve = resolve
//   })
//   async init({ commit }) {
//     const { $apollo } = $instance
//     let res: APOLLO.ServerRes<OA.Res<string>> = await $apollo.query({
//       query: sql.accessToken,
//       variables: {
//         name: OA_CONST.QUERY.ACCESS_TOKEN
//       }
//     })
//     commit('accessToken', res.data.oa)
//     this.resolve(res.data.oa)
//   }
// }

// class UserInfo {
//   constructor({ commit, state }) {
//     UserInfo.Ins = this
//     this.init({ commit, state })
//   }
//   static Ins: UserInfo
//   static instance({ commit, state }): UserInfo {
//     return this.Ins || new UserInfo({ commit, state })
//   }
//   resolve: any
//   promise: Promise<OA.USER.UserInfoRes> = new Promise(resolve => {
//     this.resolve = resolve
//   })
//   async init({ commit, state }) {
//     await AccessToken.instance({ commit }).promise
//     const { $apollo } = $instance
//     let res: APOLLO.ServerRes<OA.Res<OA.USER.UserInfoRes>> = await $apollo.mutate({
//       mutation: sql.userInfo,
//       variables: {
//         data: {
//           access_token: state.accessToken,
//           code: getParameterByName('code')
//         }
//       }
//     })
//     commit('userInfo', res.data.oa)
//     this.resolve(res.data.oa)
//   }
// }

// class User {
//   constructor(args) {
//     this.init(args)
//   }
//   static instance(args): User {
//     return User.map.get(args.id) ? {
//       promise: new Promise(function (resolve) {
//         resolve(User.map.get(args.id))
//       })
//     } as any : new User(args)
//   }
//   resolve: any
//   promise: Promise<APOLLO.ServerRes<OA.Res<OA.USER.UserRes>>> = new Promise(resolve => {
//     this.resolve = resolve
//   })
//   static map = new Map
//   async init(args) {
//     const { $apollo, $http } = $instance
//     let [user1_, user2, user3]: [APOLLO.ServerRes<OA.Res<OA.USER.UserRes>>, OA.RgServerRes<OA.USER.RgUserRes>, OA.RgServerRes<OA.USER.RgLeaveInfo>] = await Promise.all([
//       args.user1 ? new Promise(function (resolve) {
//         resolve({ data: { oa: args.user1 } })
//       }) : $apollo.mutate({
//         mutation: sql.user,
//         variables: {
//           data: {
//             access_token: args.state.accessToken,
//             userid: args.id
//           }
//         }
//       }),
//       $http.post('/user/userInfo', {
//         userId: args.id
//       }).then(response => {
//         return response.data
//       }),
//       args.dispatch("leaveAnnualLeaveDetailInfo", {
//         userId: args.id
//       })
//     ])
//     const user = Object.assign(
//       user2.data.userInfo,
//       (function () {
//         let availableLeave = 0
//         user3.data.produceDetailInfoList.forEach(item => {
//           availableLeave += item.availableLeave
//         })
//         return {
//           availableLeave
//         }
//       })(),
//       {
//         useDetailInfoList: user3.data.useDetailInfoList,
//         produceDetailInfoList: user3.data.produceDetailInfoList
//       },
//       user1_.data.oa)
//     args.commit('user', {
//       id: args.id,
//       data: user
//     })
//     this.resolve(user)
//   }
// }

// class DepartmentList {
//   constructor({ commit, state, id }) {
//     DepartmentList.map.set(id, this)
//     this.init({ commit, state, id })
//   }
//   static instance({ commit, state, id }): DepartmentList {
//     return this.map.get(id) || new DepartmentList({ commit, state, id })
//   }
//   static map: Map<string, DepartmentList> = new Map
//   resolve: any
//   promise: Promise<APOLLO.ServerRes<OA.Res<OA.DEPARTMENT.DepartmentListRes>>> = new Promise(resolve => {
//     this.resolve = resolve
//   })
//   async init({ commit, state, id }) {
//     await AccessToken.instance({ commit }).promise
//     const { $apollo } = $instance
//     let res: APOLLO.ServerRes<OA.Res<OA.DEPARTMENT.DepartmentListRes>> = await $apollo.mutate({
//       mutation: sql.departmentList,
//       variables: {
//         data: id ? { access_token: state.accessToken, id } : { access_token: state.accessToken }
//       }
//     })
//     id ? commit('userDepartment', res.data.oa) : commit('departmentList', res.data.oa)
//     this.resolve(res.data.oa)
//   }
// }

// class UserList {
//   constructor({ commit, state, department_id }) {
//     UserList.map.set(department_id, this)
//     this.init({ commit, state, department_id })
//   }
//   static instance({ commit, state, department_id }): UserList {
//     return this.map.get(department_id) || new UserList({ commit, state, department_id })
//   }
//   static map: Map<string, UserList> = new Map
//   resolve: any
//   promise: Promise<APOLLO.ServerRes<OA.Res<OA.USER.User[]>>> = new Promise(resolve => {
//     this.resolve = resolve
//   })
//   async init({ commit, state, department_id }) {
//     await AccessToken.instance({ commit }).promise
//     const { $apollo } = $instance
//     let res: APOLLO.ServerRes<OA.Res<OA.USER.User[]>> = await $apollo.mutate({
//       mutation: sql.userList,
//       variables: {
//         data: {
//           access_token: state.accessToken,
//           department_id
//         }
//       }
//     })

//     commit('userList', (function () {
//       let ret = {}
//       res.data.oa.forEach(item => {
//         ret[item.userid] = item
//       })
//       return ret
//     })())
//     this.resolve(res.data.oa)

//   }
// }

export default {
  state: {
    accessToken: '',
    userInfo: '',
    user: '',
    userList: '',
    userDepartment: '',
    departmentList: '',
    workProcess: '',
    workWait: '',
    workOver: '',
    workAll: '',
    userPermission: '',
    leaveAllType: [],
    MemberInfo: {
      Attendance: {
        CurYear: 0,
        CurMonth: 0,
        CurDate: 0,
      }
    },
    SystemConfig: (function () {
      const files = require.context('src/modules/oa/packages/system_config/components', false, /\.vue$/)
      const state = {
        components: {}
      }
      const keys = files.keys()
      keys.forEach(key => {
        const component = files(key).default
        const name = key.replace('./', '').replace('.vue', '')
        state.components[name] = component
        state[name] = component.storeState
      })
      return state
    })()
  },
  mutations: {
    SystemConfig(state, { key, val, child }) {
      state.SystemConfig[child][key] = val
    },

    // MemberInfoAttendance(state, data) {
    //   state.MemberInfo.Attendance[data.key] = data.val
    // },

    // leaveAllType(state, data) {
    //   state.leaveAllType = data
    // },
    // userPermission(state, data) {
    //   state.userPermission = data
    // },
    // workProcess(state, data) {
    //   state.workProcess = data
    // },
    // workWait(state, data) {
    //   state.workWait = data
    // },
    // workOver(state, data) {
    //   state.workOver = data
    // },
    // workAll(state, data) {
    //   state.workAll = data
    // },
    // accessToken(state, data) {
    //   state.accessToken = data
    // },
    // userInfo(state, data) {
    //   state.userInfo = data
    // },
    // user(state, { id, data }) {
    //   User.map.set(id, data)
    //   state.user = User.map
    // },
    // userList(state, data) {
    //   state.userList = data
    // },
    // userDepartment(state, data) {
    //   state.userDepartment = data
    // },
    // departmentList(state, data) {
    //   state.departmentList = data
    // },
  },
  getters: {
    // departmentIdMap(state) {
    //   let map
    //   if (state.departmentList) {
    //     map = {}
    //     let returnData = function (list: any[]) {
    //       list.forEach(item => {
    //         if (item.children) {
    //           returnData(item.children)
    //         } else {
    //           map[item.id] = item
    //         }
    //       })
    //     }
    //     returnData(state.departmentList)
    //   }
    //   return map
    // },
    // MemberInfoAttendanceLg25(state, getters) {
    //   return state.MemberInfo.Attendance.CurDate >= 25
    // },
    // MemberInfoAttendanceIs1(state, getters) {
    //   return state.MemberInfo.Attendance.CurMonth === 1
    // },
    // MemberInfoAttendanceIs12(state, getters) {
    //   return state.MemberInfo.Attendance.CurMonth === 12
    // },
    // MemberInfoAttendanceData(state, getters) {
    //   return {
    //     StartDate: getters.MemberInfoAttendanceLg25 ? moment(new Date(`${state.MemberInfo.Attendance.CurYear}-${state.MemberInfo.Attendance.CurMonth}-25`)).format("YYYY-MM-DD") : moment(new Date(`${state.MemberInfo.Attendance.CurYear}-${state.MemberInfo.Attendance.CurMonth}-25`)).add(-1, 'month').format("YYYY-MM-DD"),
    //     EndDate: getters.MemberInfoAttendanceLg25 ? moment(new Date(`${state.MemberInfo.Attendance.CurYear}-${state.MemberInfo.Attendance.CurMonth}-24`)).add(1, 'month').format("YYYY-MM-DD") : moment(new Date(`${state.MemberInfo.Attendance.CurYear}-${state.MemberInfo.Attendance.CurMonth}-24`)).format("YYYY-MM-DD"),
    //     LastDate: getters.MemberInfoAttendanceLg25 ? new Date(state.MemberInfo.Attendance.CurYear, state.MemberInfo.Attendance.CurMonth, 0).getDate() : new Date(state.MemberInfo.Attendance.CurYear, getters.MemberInfoAttendanceIs1 ? 12 : state.MemberInfo.Attendance.CurMonth - 1, 0).getDate()
    //   }
    // },
    SystemConfigAttendance(state, getters) {
      let ret = {
        list: [],
        map: {}
      }, { query, start, offset } = state.SystemConfig.Attendance;
      if (query.length) {
        ret.list = query.slice(start, start + offset)
        query.forEach((item: any, index) => {
          item.index = index
          ret.map[item.id] = item
        })
      }
      return ret
    },
    SystemConfigSpecial(state, getters) {
      let ret = {
        list: [],
        map: {}
      }, { query, start, offset } = state.SystemConfig.Special;
      if (query.length) {
        ret.list = query.slice(start, start + offset)
        query.forEach((item: any, index) => {
          item.index = index
          ret.map[item.id] = item
        })
      }
      return ret
    }
  },
  actions: {
    // accessToken: function ({ commit, dispatch, getters, rootGetters, state }: any) {
    //   return AccessToken.instance({ commit }).promise
    // },
    // userInfo: async function ({ commit, dispatch, getters, rootGetters, state }: any) {
    //   return UserInfo.instance({ commit, state }).promise
    // },
    // user: async function (
    //   arg1: { commit, dispatch, getters, rootGetters, state },
    //   arg2: { id: number, user1: number } = { id: 0, user1: 0 }
    // ) {
    //   let args = Object.assign({}, arg1, arg2)
    //   let user = User.instance(args).promise
    //   return user
    // },
    // departmentList: async function ({ commit, dispatch, getters, rootGetters, state }: any, { id }: any = { id: 0 }) {
    //   return DepartmentList.instance({ commit, state, id }).promise
    // },
    // userList: async function ({ commit, dispatch, getters, rootGetters, state }: any, { department_id }: any) {
    //   return UserList.instance({ commit, state, department_id }).promise
    // },
    // /** 更新个人年假 */
    // update: async function ({ commit, dispatch, getters, rootGetters, state }: any, { action, ...rest }: any) {
    //   const { $http } = $instance
    //   return $http.post('/' + action + (action === 'leave' ? '/updateExtraInfo' : '/update'), rest).then(function (res) {
    //     return res.data
    //   })
    // },
    // fetchLeave: async function ({ commit, dispatch, getters, rootGetters, state }: any, { action, ...rest }: any) {
    //   const { $http } = $instance
    //   let url = '/leave/' + action
    //   return action === 'leaveInfoList' ? $http.post(url, rest).then(function (res) {
    //     return res.data
    //   }) : $http.get(url).then(function (res) {
    //     return res.data
    //   })
    // },
    // userPermission: async function ({ commit, dispatch, getters, rootGetters, state }: any, { userId }: any) {
    //   const { $http } = $instance
    //   return $http.post('/user/userPermission', {
    //     userId
    //   }).then(function (res) {
    //     commit('userPermission', res.data)
    //     return res.data
    //   })
    // },

    // /**
    //  * 获取用户年假明细
    //  * @param userId  用户id
    //  */
    // leaveAnnualLeaveDetailInfo: function (
    //   arg1: { commit, dispatch, getters, rootGetters, state },
    //   arg2: { userId: string }
    // ) {
    //   const { $http } = $instance
    //   return $http.post('/leave/annualLeaveDetailInfo', {
    //     userId: arg2.userId
    //   }).then(response => {
    //     return response.data
    //   })
    // },

    // /**
    //  * 获取所有假期类型
    //  */
    // leaveAllType: async function (arg1: { commit, dispatch, getters, rootGetters, state }) {
    //   const { $http } = $instance
    //   return $http.get('/leave/allType').then(function (res) {
    //     res = res.data
    //     if (res.code === 200) {
    //       arg1.commit("leaveAllType", res.data.LeaveTypeList)
    //     }
    //   })
    // },

    // /**
    //  * 获取用户加班与调休信息接口
    //  */
    // leaveOvertimeDetailInfo: async function ({ commit, dispatch, getters, rootGetters, state }: any, { userId }: any) {
    //   const { $http } = $instance
    //   return $http.post('/leave/overtimeDetailInfo', {
    //     userId
    //   }).then(function (res: { data: OA.RgServerRes<OA.LeaveOvertimeDetailInfo> }) {
    //     return res.data
    //   })
    // },

    // /**
    //  * data: 2019-02-12
    //  * by: shindousaigo
    //  * interface 提交请休假审批申请接口
    //  */
    // approvalLeaveApplication: async function ({ commit, dispatch, getters, rootGetters, state }: any, { data }: {
    //   data: { /** 请求参数 */
    //     userId: string // 用户ID（微信提供的用户ID）
    //     userName: string // 用户名称
    //     employeeNumber: string // 员工工号
    //     departmentId: number // 部门ID
    //     departmentName: string // 部门名称
    //     applicationDate: string // 申请日期 格式如：2019- 01 - 01
    //     leaveType: string // 假期类型 1：调休 2：年假 3：事假 4：病假 5：婚假 6：护理假 7：产假 8：丧假 9：计划生育假 10 孕期检查假
    //     startTime: string // 请假开始时间 格式如：2019-01 - 01 09: 30: 00
    //     endTime: string // 请假结束时间 格式如：2019-01 - 01 18: 30: 00
    //     duration: number, // 假期时长 如：0.5

    //     positionProxyId?: string // 职务代理人ID （申请时间超过两天，需传值）
    //     positionProxyName?: string // 职务代理人名称（申请时间超过两天，需传值）
    //     position?: string // 职务信息     
    //     reason?: string // 请假事由
    //     handover?: string // 交接事项
    //   }
    // }) {
    //   const { $http } = $instance
    //   return $http.post('/approval/leaveApplication', data).then(function (res: { data: OA.RgServerRes<undefined> }) {
    //     return res.data
    //   })
    // },

    // /**
    //  * data: 2019-02-13
    //  * by: shindousaigo
    //  * interface 根据用户id查询审批信息
    //  */
    // approvalApprovalInfo: async function ({ commit, dispatch, getters, rootGetters, state }: any, { userId }: {
    //   userId: string // 用户ID（微信提供的用户ID）
    // }) {
    //   const { $http } = $instance
    //   return $http.post('/approval/approvalInfo', { userId }).then(function (res: {
    //     data: OA.RgServerRes<{
    //       approvalInfo: {
    //         serialNumber: string // 流水号
    //         userId: string // 审批发起人ID
    //         userName: string // 审批发起人名称
    //         processType: number //	流程类型 1: 补签到 2：加班 3：请休假
    //         result: number //	审批结果 1: 同意 2：驳回 3：审批中 4：已撤回
    //         createTime: string // 创建时间 格式如：2019-01-01 18:30:00
    //       }[]
    //     }>
    //   }) {
    //     commit('workList', res.data.data.approvalInfo)
    //   })
    // },

    // /**
    //  * data: 2019-02-14
    //  * by: shindousaigo
    //  * interface 根据流水号查询审批详细信息
    //  */
    // approvalApprovalDetailInfo: async function ({ commit, dispatch, getters, rootGetters, state }: any, { serialNumber }: {
    //   serialNumber: string // 流水号
    // }) {
    //   const { $http } = $instance
    //   return $http.post('/approval/approvalDetailInfo', { serialNumber }).then(function (res: {
    //     data: OA.RgServerRes<{
    //       approvalDetailInfo: {
    //         serialNumber: string // 流水号
    //         order: number // 审批人排序 从0开始 数字越小，排序越靠前
    //         userId: string // 审批人ID
    //         userName: string // 审批人名称
    //         opinion: string // 审批人意见
    //         approvalResult: number // 审批结果 1：同意 2：驳回 3: 待审批 4：已转审 5：已撤回
    //         nextApproverId: string // 下一级审批人ID（没有下一级审批人则无此字段返回）
    //         nextApproverName: string // 下一级审批人名称（没有下一级审批人则无此字段返回）
    //         isNoticeNext: number // 是否通知下一级审批人 0：否 1：是
    //         createTime: string // 创建时间 格式如：2019-01-01 10:00:00
    //       }[]
    //     }>
    //   }) {
    //     return res.data.data.approvalDetailInfo
    //   })
    // },

    // /**
    //  * data: 2019-02-14
    //  * by: shindousaigo
    //  * interface 根据流水号查询申请详细信息
    //  */
    // approvalApplicationDetailInfo: async function ({ commit, dispatch, getters, rootGetters, state }: any, { serialNumber }: {
    //   serialNumber: string // 流水号
    // }) {
    //   const { $http } = $instance
    //   return $http.post('/approval/applicationDetailInfo', { serialNumber }).then(function (res: {
    //     data: OA.RgServerRes<{
    //       applicationDetailInfo: {
    //         serialNumber: string // 流水号
    //         employeeNumber: string // 员工工号
    //         userId: string // 用户ID
    //         userName: string // 用户名称
    //         departmentId: number // 部门ID
    //         departmentName: string // 部门名称
    //         position: string // 职务信息
    //         applicationDate: string // 申请日期 格式如：2019-01-01
    //         leaveType: string // 假期类型 1：调休 2：年假 3：事假 4：病假 5：婚假 6：护理假 7：产假 8：丧假 9：计划生育假 10 孕期检查假
    //         reason: string // 请假事由
    //         handover: string // 交接事项
    //         positionProxyId: string // 职务代理人ID
    //         positionProxyName: string // 职务代理人名称
    //         startTime: string // 请假开始时间 格式如：2019-01-01 15:30:00
    //         endTime: string // 请假结束时间 格式如：2019-01-01 15:30:00
    //         duration: number // 假期时长 如：0.5 单位h，最小单位0.5h（7.5h算一天）
    //         createTime: string // 创建时间 格式如：2019-01-01 15:30:00
    //       }[]
    //     }>
    //   }) {
    //     return res.data.data.applicationDetailInfo
    //   })
    // },

    // /**
    //  * data: 2019-02-14
    //  * by: shindousaigo
    //  * interface 根据用户id查询正在办理的审批
    //  */
    // approvalApprovalProcessingInfo: async function ({ commit, dispatch, getters, rootGetters, state }: any, { userId }: {
    //   userId: string // 流水号
    // }) {
    //   const { $http } = $instance
    //   return $http.post('/approval/approvalProcessingInfo', { userId }).then(function (res: {
    //     data: OA.RgServerRes<{
    //       approvalInfo: {
    //         serialNumber: string // 流水号
    //         userId: string // 审批发起人ID
    //         userName: string // 审批发起人名称
    //         processType: number // 流程类型 1: 补签到 2：加班 3：请休假
    //         result: number // 审批结果 1: 同意 2：驳回 3：审批中 4：已撤回
    //         createTime: string // 创建时间 格式如：2019-01-01 18:30:00
    //       }[]
    //     }>
    //   }) {
    //     commit('workProcess', res.data.data.approvalInfo)
    //   })
    // },

    // /**
    //  * data: 2019-02-14
    //  * by: shindousaigo
    //  * interface 根据用户id查询等待办理的审批
    //  */
    // approvalApprovalWaitInfo: async function ({ commit, dispatch, getters, rootGetters, state }: any, { userId }: {
    //   userId: string // 流水号
    // }) {
    //   const { $http } = $instance
    //   return $http.post('/approval/approvalWaitInfo', { userId }).then(function (res: {
    //     data: OA.RgServerRes<{
    //       approvalInfo: {
    //         serialNumber: string // 流水号
    //         userId: string // 审批发起人ID
    //         userName: string // 审批发起人名称
    //         processType: number // 流程类型 1: 补签到 2：加班 3：请休假
    //         result: number // 审批结果 1: 同意 2：驳回 3：审批中 4：已撤回
    //         createTime: string // 创建时间 格式如：2019-01-01 18:30:00
    //       }[]
    //     }>
    //   }) {
    //     commit('workWait', res.data.data.approvalInfo)
    //   })
    // },

    // /**
    //  * data: 2019-02-14
    //  * by: shindousaigo
    //  * interface 根据用户id查询完成办理的审批
    //  */
    // approvalApprovalCompletedInfo: async function ({ commit, dispatch, getters, rootGetters, state }: any, { userId }: {
    //   userId: string // 流水号
    // }) {
    //   const { $http } = $instance
    //   return $http.post('/approval/approvalCompletedInfo', { userId }).then(function (res: {
    //     data: OA.RgServerRes<{
    //       approvalInfo: {
    //         serialNumber: string // 流水号
    //         userId: string // 审批发起人ID
    //         userName: string // 审批发起人名称
    //         processType: number // 流程类型 1: 补签到 2：加班 3：请休假
    //         result: number // 审批结果 1: 同意 2：驳回 3：审批中 4：已撤回
    //         createTime: string // 创建时间 格式如：2019-01-01 18:30:00
    //       }[]
    //     }>
    //   }) {
    //     commit('workOver', res.data.data.approvalInfo)
    //   })
    // },

    // /**
    //  * data: 2019-02-14
    //  * by: shindousaigo
    //  * interface 根据用户id查询全部办理的审批
    //  */
    // approvalApprovalAllInfo: async function ({ commit, dispatch, getters, rootGetters, state }: any, { userId }: {
    //   userId: string // 流水号
    // }) {
    //   const { $http } = $instance
    //   return $http.post('/approval/approvalAllInfo', { userId }).then(function (res: {
    //     data: OA.RgServerRes<{
    //       approvalInfo: {
    //         serialNumber: string // 流水号
    //         userId: string // 审批发起人ID
    //         userName: string // 审批发起人名称
    //         processType: number // 流程类型 1: 补签到 2：加班 3：请休假
    //         result: number // 审批结果 1: 同意 2：驳回 3：审批中 4：已撤回
    //         createTime: string // 创建时间 格式如：2019-01-01 18:30:00
    //       }[]
    //     }>
    //   }) {
    //     commit('workAll', res.data.data.approvalInfo)
    //   })
    // },

    // /**
    //  * data: 2019-02-14
    //  * by: shindousaigo
    //  * interface 提交审批审批
    //  */
    // approvalConfirm: async function ({ commit, dispatch, getters, rootGetters, state }: any, data: {
    //   data: {
    //     serialNumber: string // 是	流水号
    //     order: number // 是	审批人排序 从0开始 数字越小，排序越靠前
    //     userId: string // 是	当前审批人ID
    //     userName: string // 是	当前审批人名称
    //     opinion: string // 否	当前审批人意见
    //     approvalResult: number // 是	审批结果 1：同意 2：驳回
    //     nextApproverId: string // 否	下一级审批人ID（没有下一级审批人则无此字段）
    //     nextApproverName: string // 否	下一级审批人名称（没有下一级审批人则无此字段）
    //   }
    // }) {
    //   const { $http } = $instance
    //   return $http.post('/approval/confirm', data).then(function (res: {
    //     data: OA.RgServerRes<undefined>
    //   }) {
    //     return res.data
    //   })
    // },

    // /**
    //  * 删除申请
    //  */
    // approvalDeleteApplication: async function ({ commit, dispatch, getters, rootGetters, state }: any, { serialNumber }: {
    //   serialNumber: string // 是	流水号
    // }) {
    //   const { $http } = $instance
    //   return $http.post('/approval/deleteApplication', { serialNumber }).then(function (res: {
    //     data: OA.RgServerRes<undefined>
    //   }) {
    //     return res.data
    //     // commit('workAll', res.data.data.approvalInfo)
    //   })
    // },

    // /**
    //  * 提交加班申请接口
    //  */
    // approvalOvertimeApplication: async function ({ commit, dispatch, getters, rootGetters, state }: any, data: {
    //   userId: string // 是	用户ID（微信提供的用户ID）
    //   departmentId: number // 是	部门ID
    //   applicationDate: string // 是	申请日期 格式如：2019- 01 - 01
    //   reason: string // 否	请假事由
    //   startTime: string // 是	请假开始时间 格式如：2019-01 - 01 09: 30: 00
    //   endTime: string // 是	请假结束时间 格式如：2019-01 - 01 18: 30: 00
    //   duration: number //	是	假期时长 如：0.5 单位h，最小单位0.5h（7.5h算一天）
    // }) {
    //   const { $http } = $instance
    //   return $http.post('/approval/overtimeApplication', data).then(function (res: {
    //     data: OA.RgServerRes<undefined>
    //   }) {
    //     return res.data
    //   })
    // },

    // /**
    //  * 查询所有审批流程模板接口
    //  */
    // approvalSelectAllConfig: async function ({ commit, dispatch, getters, rootGetters, state }: any) {
    //   const { $http } = $instance
    //   return $http.get('/approval/selectAllConfig').then(function (res: {
    //     data: OA.RgServerRes<{
    //       approvalTemplateInfo: {
    //         departmentId: number // 部门ID
    //         departmentName: string // 部门名称
    //         processType: number // 流程类型 1: 补签到 2：加班 3：请休假
    //         approvalRoleIds: string // 审批角色ID 每级以; 隔开，同一级多角色以, 隔开，审批顺序从左到右
    //         approvalRoleNames: string // 审批角色名称 每级以; 隔开，同一级多角色以, 隔开，审批顺序从左到右
    //       }
    //     }>
    //   }) {
    //     return res.data.data.approvalTemplateInfo
    //     // commit('workAll', res.data.data.approvalInfo)
    //   })
    // },

    // /**
    //  * 审批流程配置接口
    //  */
    // approvalApprovalConfig: async function ({ commit, dispatch, getters, rootGetters, state }: any, data: {
    //   departmentId: number //是	部门ID
    //   departmentName: string // 否	部门名称
    //   processType: number //是	流程类型 1: 补签到 2：加班 3：请休假
    //   approvalRoleIds: string // 是	审批角色ID 每级以; 隔开，同一级多角色以, 隔开
    //   approvalRoleNames: string // 是	审批角色名称 每级以; 隔开，同一级多角色以, 隔开
    // }) {
    //   const { $http } = $instance
    //   return $http.post('/approval/approvalConfig', data).then(function (res: {
    //     data: OA.RgServerRes<undefined>
    //   }) {
    //     return res.data
    //     // commit('workAll', res.data.data.approvalInfo)
    //   })
    // },

    // /**
    //  * 提交补签到申请接口
    //  */
    // approvalCheckInApplication: async function ({ commit, dispatch, getters, rootGetters, state }: any, data: {
    //   userId: string // 是	用户ID（微信提供的用户ID）
    //   departmentId: number //	是	部门ID
    //   checkInDate: string // 是	补签到日期 格式如：2019- 01 - 01 多个时间以逗号隔开
    //   checkInType: string // 否	补签到类型 1：忘记打卡 2：外出办事， 多个类型以逗号隔开
    //   timeSlot: string // 否	时段 1：上班 2：下班 3：全天， 多个时段以逗号隔开
    //   checkInTime: string // 是	补签到打卡时间 格式如：2019-01 - 01 18: 30: 00 多个时间以逗号隔开
    //   reason: string // 是	事由 多个事由以 | 隔开
    // }) {
    //   const { $http } = $instance
    //   return $http.post('/approval/checkInApplication', data).then(function (res: {
    //     data: OA.RgServerRes<undefined>
    //   }) {
    //     return res.data
    //     // commit('workAll', res.data.data.approvalInfo)
    //   })
    // },

    // /**
    // * 提交补签到申请接口
    // */
    // approvalCheckInRecord: async function ({ commit, dispatch, getters, rootGetters, state }: any, data: {
    //   userId: string //	是	用户id
    //   startTime: string //	是	开始时间
    //   endTime: string //	是	结束时间
    // }) {
    //   const { $http } = $instance
    //   return $http.post('/approval/checkInRecord', data).then(function (res: {
    //     data: OA.RgServerRes<{
    //       onInfo: {	//	已补签上班卡信息
    //         serialNumber: string//	流水号
    //         userId: string //	用户id
    //         checkInDate: string //	补签到日期 格式如：2019- 01 - 01
    //         checkInReason: number //	补签原因 1：迟到 2：早退 3：旷工
    //         isCheck: number  //	是否补签 0：否 1：是
    //       }[]
    //       offInfo: {	//	已补签下班卡信息
    //         serialNumber: string//	流水号
    //         userId: string //	用户id
    //         checkInDate: string //	补签到日期 格式如：2019- 01 - 01
    //         checkInReason: number //	补签原因 1：迟到 2：早退 3：旷工
    //         isCheck: number  //	是否补签 0：否 1：是
    //       }[]
    //       onInfoSize: number //	已补签上班卡次数
    //       offInfoSize: number //	已补签下班卡次数
    //     }>
    //   }) {
    //     return res.data
    //     // commit('workAll', res.data.data.approvalInfo)
    //   })
    // },

    /**
     * 根据条件查询休息日
     */
    attendanceQuery: async function ({ commit, dispatch, getters, rootGetters, state }: any, data: {
      id: number // 否	主键ID
      leaveInLieuDate: string //	否	休息日日期 格式如：2019- 01 - 01
      times: number // 否	工资倍数
      isNewYear: number // 否	是否是春节 0：不是 1：是
      remark: string //	否	备注
    }) {
      const { $http, $notify } = $instance
      return $http.post('/attendance/query', data).then(function (res: {
        data: OA.RgServerRes<{
          dataWeekWorkList: {
            id: number // 主键ID
            leaveInLieuDate: string // 休息日日期
            isNewYear: number // 是否是春节
            times: number // 工资倍数
            remark: string // 备注
          }[]
        }>
      }) {
        if (res.data.code === 200) {
          commit("SystemConfig", {
            child: "Attendance",
            key: "query",
            val: res.data.data.dataWeekWorkList.sort(function (a, b) {
              return new Date(a.leaveInLieuDate) > new Date(b.leaveInLieuDate) ? 1 : -1
            })
          })
        } else {
          $notify.error(res.data.message)
        }
      })
    },

    /**
     * 添加休息日接口
     */
    attendanceAdd: async function ({ commit, dispatch, getters, rootGetters, state }: any, data: {
      id?: number
      leaveInLieuDate: string //	否	休息日日期 格式如：2019- 01 - 01
      times: number // 否	工资倍数
      isNewYear: number // 否	是否是春节 0：不是 1：是
      remark: string //	否	备注
    }) {
      const { $http, $notify } = $instance

      return $http.post('/attendance/add', data).then(function (res: {
        data: OA.RgServerRes<{
          id: number
        }>
      }) {
        if (res.data.code === 200) {
          $notify.success(res.data.message)
          data.id = res.data.data.id
          commit("SystemConfig", {
            child: "Attendance",
            key: "query",
            val: Array.prototype.concat([], [data], state.SystemConfig.Attendance.query)
          })
          return res.data
        } else {
          $notify.error(res.data.message)
        }
      })
    },

    /**
     * 更新休息日信息
     */
    attendanceUpdate: async function ({ commit, dispatch, getters, rootGetters, state }: any, data: {
      index?: number
      id: number // 主键ID
      leaveInLieuDate: string //	否	休息日日期 格式如：2019- 01 - 01
      times: number // 否	工资倍数
      isNewYear: number // 否	是否是春节 0：不是 1：是
      remark: string //	否	备注
    }) {
      const { $http, $notify } = $instance
      return $http.post('/attendance/update', data).then(function (res: {
        data: OA.RgServerRes<undefined>
      }) {
        if (res.data.code === 200) {
          $notify.success(res.data.message)
          const id = data.id
          const { list, map } = getters.SystemConfigAttendance
          const index = map[id].index
          data.index = index
          const query = JSON.parse(JSON.stringify(state.SystemConfig.Attendance.query))
          query[index] = data
          commit("SystemConfig", {
            child: "Attendance",
            key: "query",
            val: query
          })
          return res.data
        } else {
          $notify.error(res.data.message)
        }
      })
    },

    /**
     * 删除休息日
     */
    attendanceDelete: async function ({ commit, dispatch, getters, rootGetters, state }: any, data: {
      index?: number
      id: number // 主键ID
    }) {
      const { $http, $notify } = $instance
      return $http.post('/attendance/deleteWeekWork', data).then(function (res: {
        data: OA.RgServerRes<undefined>
      }) {
        if (res.data.code === 200) {
          $notify.success(res.data.message)
          const id = data.id
          const { list, map } = getters.SystemConfigAttendance
          const index = map[id].index
          data.index = index
          state.SystemConfig.Attendance.query.splice(index, 1)
          return res.data
        } else {
          $notify.error(res.data.message)
        }
      })
    },

    /**
     * 查询所有特殊考勤信息
     */
    specialQuery: async function ({ commit, dispatch, getters, rootGetters, state }: any, data: {
      id: number // 否	主键ID
      leaveInLieuDate: string //	否	休息日日期 格式如：2019- 01 - 01
      times: number // 否	工资倍数
      isNewYear: number // 否	是否是春节 0：不是 1：是
      remark: string //	否	备注
    }) {
      const { $http, $notify } = $instance
      return $http.get('/special/allInfo').then(function (res: {
        data: OA.RgServerRes<{
          specialAttendanceList: {
            id: number	// 主键ID
            type: string	// 类型(work, off) work：上班 off：下班
            date: string	// 日期 格式如：2019 - 01 - 01
            remark: string	// 备注
            time: string	// 上、下班时间 格式如：10: 30: 00
          }[]
        }>
      }) {
        if (res.data.code === 200) {
          commit("SystemConfig", {
            child: "Special",
            key: "query",
            val: res.data.data.specialAttendanceList
          })
        } else {
          $notify.error(res.data.message)
        }
      })
    },

    /**
     * 新增特殊考勤信息
     */
    specialAdd: async function ({ commit, dispatch, getters, rootGetters, state }: any, data: {
      id?: number
      type: string //	否	类型(work,off) work：上班 off：下班
      date: string //	否	日期 格式如：2019-01-01
      remark: string //	否	备注
      time: string //	否	上、下班时间 格式如：10:30:00
    }) {
      const { $http, $notify } = $instance
      return $http.post('/special/add', data).then(function (res: {
        data: OA.RgServerRes<{
          id: number
        }>
      }) {
        if (res.data.code === 200) {
          $notify.success(res.data.message)
          data.id = res.data.data.id
          commit("SystemConfig", {
            child: "Special",
            key: "query",
            val: Array.prototype.concat([], state.SystemConfig.Special.query, [data])
          })
          return res.data
        } else {
          $notify.error(res.data.message)
        }
      })
    },

    /**
     * 更新特殊考勤信息
     */
    specialUpdate: async function ({ commit, dispatch, getters, rootGetters, state }: any, data: {
      index?: number
      id: number //	否	主键ID
      type: string //	否	类型(work,off) work：上班 off：下班
      date: string //	否	日期 格式如：2019-01-01
      remark: string //	否	备注
      time: string //	否	上、下班时间 格式如：10:30:00
    }) {
      const { $http, $notify } = $instance
      return $http.post('/special/update', data).then(function (res: {
        data: OA.RgServerRes<undefined>
      }) {
        if (res.data.code === 200) {
          $notify.success(res.data.message)
          const id = data.id
          const { list, map } = getters.SystemConfigSpecial
          const index = map[id].index
          data.index = index
          const query = JSON.parse(JSON.stringify(state.SystemConfig.Special.query))
          query[index] = data
          commit("SystemConfig", {
            child: "Special",
            key: "query",
            val: query
          })
          return res.data
        } else {
          $notify.error(res.data.message)
        }
      })
    },

    /**
     * 删除特殊考勤信息
     */
    specialDelete: async function ({ commit, dispatch, getters, rootGetters, state }: any, data: {
      index?: number
      id: number // 主键ID
    }) {
      const { $http, $notify } = $instance
      return $http.post('/special/delete', data).then(function (res: {
        data: OA.RgServerRes<undefined>
      }) {
        if (res.data.code === 200) {
          $notify.success(res.data.message)
          const id = data.id
          const { list, map } = getters.SystemConfigSpecial
          const index = map[id].index
          data.index = index
          state.SystemConfig.Special.query.splice(index, 1)
          return res.data
        } else {
          $notify.error(res.data.message)
        }
      })
    },



  }
}