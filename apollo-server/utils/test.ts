const MongoClient = require('mongodb').MongoClient
import Path from "path"
import Write from "write"
import JsonFormat from "json-format"
import * as fs from "fs"

const content = fs.readFileSync(Path.resolve("./.env.local"), { encoding: 'utf8' })
const VUE_APPS = {}
content.trim().split(/\n/).forEach(item => {
  const arr = item.split("=")
  VUE_APPS[arr[0]] = JSON.parse(arr[1])
})
const config = require(
  Path.resolve("./public/assets/" + VUE_APPS["VUE_APP_PATH"] + "/config.js")
)

export default class Test {

  static get instance() {
    return this.ins || new Test
  }
  static ins: Test
  constructor() {
    Test.ins = this
  }

  express
  app
  db
  data: {
    activity_group: {
      "_id": string
      "className": string
      "title": string
      "url": string
      "ips": string
      "appId": number
      "createTime": string
      "createUser": string
      "activityList": string[]
    }
  } = {} as any

  init(express, app) {
    this.express = express
    this.app = app
    MongoClient.connect("mongodb://172.16.3.171:27017", async (err, client) => {
      if (!err) {
        this.db = client.db("test")

        this.data.activity_group = (await this.db.collection("activity_group").find({
          _id: config["ACTIVITY_GROUP_ID"]
        }).toArray())[0] as any

        console.log("this.data.activity_group", this.data.activity_group)

        const activityList = (await Promise.all(this.data.activity_group.activityList.map(activityId => {
          return new Promise(async (resolve) => {
            const activity = (await this.db.collection("activities").find({
              _id: activityId
            }).toArray())[0]

            if (activity.andList) {
              activity.conditionMap = {}
              await Promise.all(
                activity.andList.map(async (conditionId) => {
                  const condition = (await this.db.collection("conditions").find({
                    _id: conditionId
                  }).toArray())[0]
                  activity.conditionMap[condition.className.split(".").slice(-1).join()] = condition
                })
              )
            }

            if (Object.prototype.toString.call(activity.rewards) === "[object Array]") {
              activity.rewards = await Promise.all(activity.rewards.map(rewardId => {
                return new Promise(async (resolve) => {
                  const reward = (await this.db.collection("rewards").find({
                    _id: rewardId
                  }).toArray())[0]
                  if (reward.conditionList) {
                    reward.conditionMap = {}
                    await Promise.all(
                      reward.conditionList.map(async (conditionId) => {
                        const condition = (await this.db.collection("conditions").find({
                          _id: conditionId
                        }).toArray())[0]
                        reward.conditionMap[condition.className.split(".").slice(-1).join()] = condition
                      })
                    )
                  }
                  resolve(reward)
                })
              }))
              activity.rewardMap = {}
              activity.rewards.forEach(item => {
                activity.rewardMap[item._id] = item
              })
            }
            resolve(activity)
          })
        })) as any)

        console.log("activityList", activityList)

        this.data.activity_group.activityList = activityList.sort(function (a, b) {
          return a.index - b.index
        })
        Write(
          Path.resolve('src/modules/activity/index.ts'),
          'export default  ' + JsonFormat(this.data.activity_group),
          function (err) {
            if (err) console.log(err);
          }, null)
      } else {
        console.error(err)
      }
    })
    // this.app.get("/activity_group", (req, res) => {
    //   res.status(200).end(
    //     JSON.stringify(this.data.activity_group)
    //   )
    // })
  }
}
