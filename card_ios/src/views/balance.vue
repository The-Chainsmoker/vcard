<template>
	<div class="balance">
		<pheader :back="true" :title="'余额'" :bg="'#d9302500'" :color="'white'"></pheader>
		<div class="bg">
			<p>当前余额</p>
			<h3>{{Number(cardBalance) / 100}}</h3>
		</div>
		<div class="btn">
			充值
		</div>
		<div class="lists">
			<h3>金额变动记录</h3>
			<div class="list" v-for="(item,index) in list">
				<div class="listl">
					<p>{{item.TranDesc}}</p>
					<span>{{item.TranDate}}----{{item.TranTime}}</span>
				</div>
				<div class="listr" :class="item.AmtTrans.indexOf('+') >= 0?'color':''">
					{{item.AmtTrans.indexOf('+') >= 0?'+':'-'}}{{item.AmtTrans / 100}}
				</div>
			</div>
			<!-- <div class="list">
				<div class="listl">
					<p>消费</p>
					<span>11月5日11:20</span>
				</div>
				<div class="listr">
					-15
				</div>
			</div>
			<div class="list">
				<div class="listl">
					<p>充值</p>
					<span>11月5日11:20</span>
				</div>
				<div class="listr color">
					+15
				</div>
			</div> -->
		</div>
		<div style="padding: 20px;text-align: center;">
			<span v-if="morePage == '1'" @click="getLists()">查看更多</span>
			<span v-else>暂无更多</span>
		</div>

		<van-calendar v-model="show" type="range" @confirm="onConfirm" />
	</div>
</template>

<script>
	export default {
		name: 'balance',
		components: {},
		data() {
			return {
				show: false,
				pwd: '',
				num: 1,
				cardBalance: '0.00',
				startDate:'',//开始日期
				endDate:'',//结束日期
				morePage:'',//0无记录，1有记录
				lastSysDate:'',//翻页控制时使用： 首次查询上送空；后续翻页查询时上送上页返回的最后一笔交易的交易日期（对应的是返回的SYSDATE这个字段的值）YYYYMMDD
				lastSysTime:'',//
				lastTransSeq:'',//
				list:[]
			}
		},
		async mounted() {
			
		},
		created() {
			this.startDate = this.getBeforeDate(30)
			this.endDate = this.getBeforeDate(0)
			if (this.$route.query.pwd) {
				this.pwd = this.$route.query.pwd
				this.getBalance()
			} else {
				// this.$router.push({
				// 	path: '/finance'
				// })
				this.$router.go(-1)
			}
		},
		methods: {
			async getLists(){
				var _this = this;
				var data = {
					transCode: 'ACCOUNTDETAIL',
					mobileNo: localStorage.getItem('phone') || '',
					cardNo: localStorage.getItem('CardNo') || '',
					startDate: this.startDate,
					endDate:this.endDate,
					morePage:this.morePage,
					lastSysDate:this.lastSysDate,
					lastSysTime:this.lastSysTime,
					lastTransSeq:this.lastTransSeq,//  --翻页控制时使用： 首次查询上送空；后续翻页查询时上送上页返回的最后一笔交易的系统跟踪号
				};
				// console.log(this.$getSign(paramsObj))
				let ret = await this.$api.sendMs(data);
				console.log(ret)
				if (ret.retCode == 'SUCCESS') {
					this.list = ret.details
					this.morePage = ret.morePage
					this.lastSysDate = ret.details[ret.details.length-1].SysDate
					this.lastSysTime = ret.details[ret.details.length-1].SysTime
					this.lastTransSeq = ret.details[ret.details.length-1].TranSeq
					console.log(this.lastSysDate)
					console.log(this.lastSysTime)
					console.log(this.lastTransSeq)
					this.count = ret.count // 条数
					this.$toast(ret.retMsg)
				}else{
					this.$toast(ret.retMsg)
				}
			},
			//确定日期范围
			onConfirm(date) {
				const [start, end] = date;
				this.show = false;
				this.startDate = this.formatDate(start)
				this.endDate = this.formatDate(end)
			},
			 formatDate(date) {
			      return `${date.getMonth() + 1}-${date.getMonth() + 1}-${date.getDate()}`;
			    },
			async getBalance() {
				var _this = this;
				var data = {
					transCode: 'ACCOUNTINFO',
					mobileNo: localStorage.getItem('phone') || '',
					cardNo: localStorage.getItem('CardNo') || '',
					cardPin: this.pwd
				};
				// console.log(this.$getSign(paramsObj))
				let ret = await this.$api.sendMs(data);
				this.getLists()
				console.log(ret)
				if (ret.retCode == 'SUCCESS') {
					this.cardBalance = ret.CardBalance
					console.log(this.cardBalance)
				}else{
					this.$dialog.alert({
					  title: '错误',
					  message: ret.retMsg,
					}).then(() => {
					  // on close
					  this.$router.go(-1)
					});
				}
			}
		}
	}
</script>
<style type="text/css" scoped>
	.bg {
		width: 750px;
		height: 400px;
		padding-top: 181px;
		box-sizing: border-box;
		background-image: url(../assets/bal.png);
		background-size: 100%;
		text-align: center;
		color: white;
	}

	.bg p {
		font-size: 28px;
	}

	.bg h3 {
		font-size: 60px;
	}

	.btn {
		background: #D93025;
		height: 80px;
		width: 680px;
		margin: 50px auto 30px;
		text-align: center;
		line-height: 80px;
		color: white;
		font-size: 32px;
		border-radius: 40px;
	}

	.btn:active {
		opacity: .8;
	}

	.lists {
		background: white;
		border-radius: 10px;
		width: 700px;
		margin: auto;
		padding: 0 20px;
		box-sizing: border-box;
	}

	.lists h3 {
		font-weight: 400;
		color: #333333;
		font-size: 32px;
		padding: 30px 0;
	}

	.list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 29px;
		border-bottom: 1px solid #EEEEEE;
		margin-bottom: 29px;
	}

	.list:last-child {
		border-bottom: 0;
	}

	.listl p {
		font-size: 28px;
		color: #333333;
	}

	.listl span {
		color: #999999;
		font-size: 24px;
	}

	.listr {
		font-size: 32px;
		color: #333333;
	}

	.color {
		color: #F51111;
	}
</style>
