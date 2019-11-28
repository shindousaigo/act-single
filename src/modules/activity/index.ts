export default  {
	"_id": "5cfdd720b5cb671494df0ce3",
	"className": "com.activity.logic.entitys.ActivityGroupBase",
	"title": "韩国2周年活动页",
	"url": "",
	"ips": "",
	"appId": 10096,
	"createTime": "2019-06-10T04:09:00.431Z",
	"createUser": "timi.liu",
	"activityList": [
		{
			"_id": "5cfdd7d7b5cb671494df0ce4",
			"className": "com.activity.logic.entitys.ActivityBase",
			"activityName": " 이벤트 1: 누적 보상",
			"startTime": "2019-07-08T03:00:00.000Z",
			"endTime": "2019-07-10T03:00:00.000Z",
			"index": 0,
			"andList": [
				"5cfdf360b5cb671494df0d06",
				"5cff1dbcb5cb671494df0d11"
			],
			"rewards": [
				{
					"_id": "5cfdd912b5cb671494df0ce7",
					"className": "com.activity.logic.entitys.rewards.MailReward",
					"rewardList": [
						{
							"rewardName": "돌파카드*20",
							"type": 0,
							"rewardId": "41",
							"count": 1
						}
					],
					"rewardName": "누적 보상 1 접속",
					"goodsType": 3,
					"sumCount": 5000,
					"currentCount": 0,
					"image": "",
					"index": 0,
					"contentList": [
						{
							"name": "돌파카드",
							"count": 20,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0
				},
				{
					"_id": "5cfdd999b5cb671494df0cea",
					"className": "com.activity.logic.entitys.rewards.MailReward",
					"rewardList": [
						{
							"rewardName": "자질 제련석*20",
							"type": 0,
							"rewardId": "42",
							"count": 1
						}
					],
					"rewardName": "누적 보상 2 접속",
					"goodsType": 3,
					"sumCount": 5000,
					"currentCount": 0,
					"image": "",
					"index": 1,
					"contentList": [
						{
							"name": "자질 제련석",
							"count": 20,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0
				},
				{
					"_id": "5cfdd9d0b5cb671494df0ced",
					"className": "com.activity.logic.entitys.rewards.MailReward",
					"rewardList": [
						{
							"rewardName": "2주년 프로필 조각*1",
							"type": 0,
							"rewardId": "43",
							"count": 1
						}
					],
					"rewardName": "누적 보상 3 접속",
					"goodsType": 3,
					"sumCount": 5000,
					"currentCount": 0,
					"image": "",
					"index": 2,
					"contentList": [
						{
							"name": "2주년 프로필 조각",
							"count": 1,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0
				}
			],
			"rewardType": 2,
			"activityDescription": "",
			"state": 0,
			"conditionMap": {
				"JoinTimeCondition": {
					"_id": "5cfdf360b5cb671494df0d06",
					"className": "com.activity.logic.entitys.conditions.JoinTimeCondition",
					"sumTimePerson": 3,
					"dayTimePersion": 3,
					"conditionType": 0
				},
				"GameLoginCondition": {
					"_id": "5cff1dbcb5cb671494df0d11",
					"className": "com.activity.logic.entitys.conditions.GameLoginCondition",
					"loginType": 2,
					"activeLoginType": 1,
					"LoginCount": 3,
					"start": "2019-07-02T03:00:00.000Z",
					"end": "2019-07-04T03:00:00.000Z",
					"conditionType": 0
				}
			},
			"rewardMap": {
				"5cfdd912b5cb671494df0ce7": {
					"_id": "5cfdd912b5cb671494df0ce7",
					"className": "com.activity.logic.entitys.rewards.MailReward",
					"rewardList": [
						{
							"rewardName": "돌파카드*20",
							"type": 0,
							"rewardId": "41",
							"count": 1
						}
					],
					"rewardName": "누적 보상 1 접속",
					"goodsType": 3,
					"sumCount": 5000,
					"currentCount": 0,
					"image": "",
					"index": 0,
					"contentList": [
						{
							"name": "돌파카드",
							"count": 20,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0
				},
				"5cfdd999b5cb671494df0cea": {
					"_id": "5cfdd999b5cb671494df0cea",
					"className": "com.activity.logic.entitys.rewards.MailReward",
					"rewardList": [
						{
							"rewardName": "자질 제련석*20",
							"type": 0,
							"rewardId": "42",
							"count": 1
						}
					],
					"rewardName": "누적 보상 2 접속",
					"goodsType": 3,
					"sumCount": 5000,
					"currentCount": 0,
					"image": "",
					"index": 1,
					"contentList": [
						{
							"name": "자질 제련석",
							"count": 20,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0
				},
				"5cfdd9d0b5cb671494df0ced": {
					"_id": "5cfdd9d0b5cb671494df0ced",
					"className": "com.activity.logic.entitys.rewards.MailReward",
					"rewardList": [
						{
							"rewardName": "2주년 프로필 조각*1",
							"type": 0,
							"rewardId": "43",
							"count": 1
						}
					],
					"rewardName": "누적 보상 3 접속",
					"goodsType": 3,
					"sumCount": 5000,
					"currentCount": 0,
					"image": "",
					"index": 2,
					"contentList": [
						{
							"name": "2주년 프로필 조각",
							"count": 1,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0
				}
			}
		},
		{
			"_id": "5cfddbe3b5cb671494df0cf0",
			"className": "com.activity.logic.entitys.ActivityBase",
			"activityName": "이벤트 2: 생일 축하 메시지 남기기",
			"startTime": "2019-07-02T03:00:00.000Z",
			"endTime": "2019-08-03T03:00:00.000Z",
			"index": 1,
			"rewards": [
				{
					"_id": "5cfdf2c1b5cb671494df0d03",
					"className": "com.activity.logic.entitys.RewardBase",
					"rewardName": "행운의 선물",
					"goodsType": 4,
					"conditionList": [
						"5d22c24ab5cb6728ec081a9e"
					],
					"sumCount": 9999,
					"currentCount": 1,
					"image": "",
					"index": 0,
					"rate": 0,
					"conditionMap": {
						"JoinTimeCondition": {
							"_id": "5d22c24ab5cb6728ec081a9e",
							"className": "com.activity.logic.entitys.conditions.JoinTimeCondition",
							"sumTimePerson": 1,
							"dayTimePersion": 1,
							"conditionType": 0
						}
					}
				},
				{
					"_id": "5d00aca2b5cb671494df0d14",
					"className": "com.activity.logic.entitys.rewards.MailReward",
					"rewardName": "2주년 생일의 메시지 선물",
					"goodsType": 3,
					"conditionList": [
						"5d1abab5b5cb671494df0d27"
					],
					"sumCount": 5000,
					"currentCount": 0,
					"image": "",
					"index": 1,
					"contentList": [
						{
							"name": "이상해씨 인형",
							"count": 1,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0,
					"conditionMap": {
						"JoinTimeCondition": {
							"_id": "5d1abab5b5cb671494df0d27",
							"className": "com.activity.logic.entitys.conditions.JoinTimeCondition",
							"sumTimePerson": 1,
							"dayTimePersion": 1,
							"conditionType": 0
						}
					}
				}
			],
			"rewardType": 2,
			"activityDescription": "",
			"state": 1,
			"rewardMap": {
				"5cfdf2c1b5cb671494df0d03": {
					"_id": "5cfdf2c1b5cb671494df0d03",
					"className": "com.activity.logic.entitys.RewardBase",
					"rewardName": "행운의 선물",
					"goodsType": 4,
					"conditionList": [
						"5d22c24ab5cb6728ec081a9e"
					],
					"sumCount": 9999,
					"currentCount": 1,
					"image": "",
					"index": 0,
					"rate": 0,
					"conditionMap": {
						"JoinTimeCondition": {
							"_id": "5d22c24ab5cb6728ec081a9e",
							"className": "com.activity.logic.entitys.conditions.JoinTimeCondition",
							"sumTimePerson": 1,
							"dayTimePersion": 1,
							"conditionType": 0
						}
					}
				},
				"5d00aca2b5cb671494df0d14": {
					"_id": "5d00aca2b5cb671494df0d14",
					"className": "com.activity.logic.entitys.rewards.MailReward",
					"rewardName": "2주년 생일의 메시지 선물",
					"goodsType": 3,
					"conditionList": [
						"5d1abab5b5cb671494df0d27"
					],
					"sumCount": 5000,
					"currentCount": 0,
					"image": "",
					"index": 1,
					"contentList": [
						{
							"name": "이상해씨 인형",
							"count": 1,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0,
					"conditionMap": {
						"JoinTimeCondition": {
							"_id": "5d1abab5b5cb671494df0d27",
							"className": "com.activity.logic.entitys.conditions.JoinTimeCondition",
							"sumTimePerson": 1,
							"dayTimePersion": 1,
							"conditionType": 0
						}
					}
				}
			}
		},
		{
			"_id": "5cfdda21b5cb671494df0cee",
			"className": "com.activity.logic.entitys.ActivityBase",
			"activityName": " 이벤트 3: 다이아소모 룰렛",
			"startTime": "2019-07-02T03:00:00.000Z",
			"endTime": "2019-07-03T03:00:00.000Z",
			"index": 2,
			"andList": [
				"5cfdf44cb5cb671494df0d08",
				"5cfdf44cb5cb671494df0d09"
			],
			"rewards": [
				{
					"_id": "5cfddb9fb5cb671494df0cef",
					"className": "com.activity.logic.entitys.rewards.LotteryMailReward",
					"percent": 25,
					"rewardList": [
						{
							"rewardName": "자질 제련석*20",
							"type": 0,
							"rewardId": "44",
							"count": 1
						}
					],
					"rewardName": "자질 제련석*20",
					"goodsType": 3,
					"sumCount": 5000,
					"currentCount": 0,
					"image": "",
					"index": 0,
					"contentList": [
						{
							"name": "자질 제련석",
							"count": 20,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0.25
				},
				{
					"_id": "5cfdddd4b5cb671494df0cf3",
					"className": "com.activity.logic.entitys.rewards.LotteryMailReward",
					"percent": 25,
					"rewardList": [
						{
							"rewardName": "돌파카드*50",
							"type": 0,
							"rewardId": "45",
							"count": 1
						}
					],
					"rewardName": "돌파카드*50",
					"goodsType": 3,
					"sumCount": 5000,
					"currentCount": 0,
					"image": "",
					"index": 1,
					"contentList": [
						{
							"name": "돌파카드",
							"count": 50,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0.25
				},
				{
					"_id": "5cfdddf4b5cb671494df0cf4",
					"className": "com.activity.logic.entitys.rewards.LotteryMailReward",
					"percent": 21,
					"rewardList": [
						{
							"rewardName": "통용 조각*50",
							"type": 0,
							"rewardId": "46",
							"count": 1
						}
					],
					"rewardName": "통용 조각*50",
					"goodsType": 3,
					"sumCount": 5000,
					"currentCount": 0,
					"image": "",
					"index": 2,
					"contentList": [
						{
							"name": "통용 조각",
							"count": 50,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0.20999999344348907
				},
				{
					"_id": "5cfdde0ab5cb671494df0cf5",
					"className": "com.activity.logic.entitys.rewards.LotteryMailReward",
					"percent": 15,
					"rewardList": [
						{
							"rewardName": "서사 휴대 보물상자*1",
							"type": 0,
							"rewardId": "47",
							"count": 1
						}
					],
					"rewardName": "서사 휴대 보물상자*1",
					"goodsType": 3,
					"sumCount": 5000,
					"currentCount": 0,
					"image": "",
					"index": 3,
					"contentList": [
						{
							"name": "서사 휴대 보물상자",
							"count": 1,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0.15000000596046448
				},
				{
					"_id": "5cfdde24b5cb671494df0cf6",
					"className": "com.activity.logic.entitys.rewards.LotteryMailReward",
					"percent": 9,
					"rewardList": [
						{
							"rewardName": "만월석*20",
							"type": 0,
							"rewardId": "48",
							"count": 1
						}
					],
					"rewardName": "만월석*20",
					"goodsType": 3,
					"sumCount": 5000,
					"currentCount": 0,
					"image": "",
					"index": 4,
					"contentList": [
						{
							"name": "만월석",
							"count": 20,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0.09000000357627869
				},
				{
					"_id": "5cfdde50b5cb671494df0cf7",
					"className": "com.activity.logic.entitys.rewards.LotteryMailReward",
					"percent": 3,
					"rewardList": [
						{
							"rewardName": "고급 계승 보물상자*1",
							"type": 0,
							"rewardId": "49",
							"count": 1
						}
					],
					"rewardName": "고급 계승 보물상자*1",
					"goodsType": 3,
					"sumCount": 3000,
					"currentCount": 0,
					"image": "",
					"index": 5,
					"contentList": [
						{
							"name": "고급 계승 보물상자",
							"count": 1,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0.029999999329447746
				},
				{
					"_id": "5cfdde6ab5cb671494df0cf8",
					"className": "com.activity.logic.entitys.rewards.LotteryMailReward",
					"percent": 1,
					"rewardList": [
						{
							"rewardName": "대사 비전기*30",
							"type": 0,
							"rewardId": "50",
							"count": 1
						}
					],
					"rewardName": "대사 비전기*30",
					"goodsType": 3,
					"sumCount": 3000,
					"currentCount": 0,
					"image": "",
					"index": 6,
					"contentList": [
						{
							"name": "대사 비전기",
							"count": 30,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0.009999999776482582
				},
				{
					"_id": "5cfdde89b5cb671494df0cf9",
					"className": "com.activity.logic.entitys.rewards.LotteryMailReward",
					"percent": 1,
					"rewardList": [
						{
							"rewardName": "맹주 뮤즈X*1",
							"type": 1,
							"rewardId": "51",
							"count": 1
						}
					],
					"rewardName": "맹주 뮤즈X*1",
					"goodsType": 3,
					"sumCount": 1,
					"currentCount": 0,
					"image": "",
					"index": 7,
					"contentList": [
						{
							"name": "맹주 뮤즈X",
							"count": 1,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0.009999999776482582
				}
			],
			"rewardType": 1,
			"activityDescription": "",
			"state": 1,
			"conditionMap": {
				"JoinTimeCondition": {
					"_id": "5cfdf44cb5cb671494df0d08",
					"className": "com.activity.logic.entitys.conditions.JoinTimeCondition",
					"sumTimePerson": 30,
					"dayTimePersion": 30,
					"conditionType": 0
				},
				"ConsumeCondition": {
					"_id": "5cfdf44cb5cb671494df0d09",
					"className": "com.activity.logic.entitys.conditions.ConsumeCondition",
					"chargeMoney": 200,
					"changeType": 4,
					"conditionType": 0
				}
			},
			"rewardMap": {
				"5cfddb9fb5cb671494df0cef": {
					"_id": "5cfddb9fb5cb671494df0cef",
					"className": "com.activity.logic.entitys.rewards.LotteryMailReward",
					"percent": 25,
					"rewardList": [
						{
							"rewardName": "자질 제련석*20",
							"type": 0,
							"rewardId": "44",
							"count": 1
						}
					],
					"rewardName": "자질 제련석*20",
					"goodsType": 3,
					"sumCount": 5000,
					"currentCount": 0,
					"image": "",
					"index": 0,
					"contentList": [
						{
							"name": "자질 제련석",
							"count": 20,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0.25
				},
				"5cfdddd4b5cb671494df0cf3": {
					"_id": "5cfdddd4b5cb671494df0cf3",
					"className": "com.activity.logic.entitys.rewards.LotteryMailReward",
					"percent": 25,
					"rewardList": [
						{
							"rewardName": "돌파카드*50",
							"type": 0,
							"rewardId": "45",
							"count": 1
						}
					],
					"rewardName": "돌파카드*50",
					"goodsType": 3,
					"sumCount": 5000,
					"currentCount": 0,
					"image": "",
					"index": 1,
					"contentList": [
						{
							"name": "돌파카드",
							"count": 50,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0.25
				},
				"5cfdddf4b5cb671494df0cf4": {
					"_id": "5cfdddf4b5cb671494df0cf4",
					"className": "com.activity.logic.entitys.rewards.LotteryMailReward",
					"percent": 21,
					"rewardList": [
						{
							"rewardName": "통용 조각*50",
							"type": 0,
							"rewardId": "46",
							"count": 1
						}
					],
					"rewardName": "통용 조각*50",
					"goodsType": 3,
					"sumCount": 5000,
					"currentCount": 0,
					"image": "",
					"index": 2,
					"contentList": [
						{
							"name": "통용 조각",
							"count": 50,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0.20999999344348907
				},
				"5cfdde0ab5cb671494df0cf5": {
					"_id": "5cfdde0ab5cb671494df0cf5",
					"className": "com.activity.logic.entitys.rewards.LotteryMailReward",
					"percent": 15,
					"rewardList": [
						{
							"rewardName": "서사 휴대 보물상자*1",
							"type": 0,
							"rewardId": "47",
							"count": 1
						}
					],
					"rewardName": "서사 휴대 보물상자*1",
					"goodsType": 3,
					"sumCount": 5000,
					"currentCount": 0,
					"image": "",
					"index": 3,
					"contentList": [
						{
							"name": "서사 휴대 보물상자",
							"count": 1,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0.15000000596046448
				},
				"5cfdde24b5cb671494df0cf6": {
					"_id": "5cfdde24b5cb671494df0cf6",
					"className": "com.activity.logic.entitys.rewards.LotteryMailReward",
					"percent": 9,
					"rewardList": [
						{
							"rewardName": "만월석*20",
							"type": 0,
							"rewardId": "48",
							"count": 1
						}
					],
					"rewardName": "만월석*20",
					"goodsType": 3,
					"sumCount": 5000,
					"currentCount": 0,
					"image": "",
					"index": 4,
					"contentList": [
						{
							"name": "만월석",
							"count": 20,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0.09000000357627869
				},
				"5cfdde50b5cb671494df0cf7": {
					"_id": "5cfdde50b5cb671494df0cf7",
					"className": "com.activity.logic.entitys.rewards.LotteryMailReward",
					"percent": 3,
					"rewardList": [
						{
							"rewardName": "고급 계승 보물상자*1",
							"type": 0,
							"rewardId": "49",
							"count": 1
						}
					],
					"rewardName": "고급 계승 보물상자*1",
					"goodsType": 3,
					"sumCount": 3000,
					"currentCount": 0,
					"image": "",
					"index": 5,
					"contentList": [
						{
							"name": "고급 계승 보물상자",
							"count": 1,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0.029999999329447746
				},
				"5cfdde6ab5cb671494df0cf8": {
					"_id": "5cfdde6ab5cb671494df0cf8",
					"className": "com.activity.logic.entitys.rewards.LotteryMailReward",
					"percent": 1,
					"rewardList": [
						{
							"rewardName": "대사 비전기*30",
							"type": 0,
							"rewardId": "50",
							"count": 1
						}
					],
					"rewardName": "대사 비전기*30",
					"goodsType": 3,
					"sumCount": 3000,
					"currentCount": 0,
					"image": "",
					"index": 6,
					"contentList": [
						{
							"name": "대사 비전기",
							"count": 30,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0.009999999776482582
				},
				"5cfdde89b5cb671494df0cf9": {
					"_id": "5cfdde89b5cb671494df0cf9",
					"className": "com.activity.logic.entitys.rewards.LotteryMailReward",
					"percent": 1,
					"rewardList": [
						{
							"rewardName": "맹주 뮤즈X*1",
							"type": 1,
							"rewardId": "51",
							"count": 1
						}
					],
					"rewardName": "맹주 뮤즈X*1",
					"goodsType": 3,
					"sumCount": 1,
					"currentCount": 0,
					"image": "",
					"index": 7,
					"contentList": [
						{
							"name": "맹주 뮤즈X",
							"count": 1,
							"limit": -1,
							"diamondPercent": 0,
							"initCount": 0,
							"diamondIncrease": 0,
							"maxCount": 0
						}
					],
					"rate": 0.009999999776482582
				}
			}
		}
	]
}