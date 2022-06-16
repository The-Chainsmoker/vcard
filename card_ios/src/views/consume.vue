<template>
  <div class="consume">
    <pheader :title="'消费明细'" :back="true"></pheader>
    <!--  -->
    <div class="count">
      <div class="navs">
        <div class="navsl">
          <div :class="navac==2?'active':''" class="nav" @click="changeType(2)">消费</div>
          <div :class="navac==1?'active':''" class="nav" @click="changeType(1)">充值</div>
          <div :class="navac==0?'active':''" class="nav" @click="changeType(0)">所有</div>
        </div>
        <div class="timesel" @click="showsheet()">
          <span>{{actitleFind ? actitleFind : '近三个月'}}</span>
          <img src="../assets/down.png">
        </div>
      </div>

      <!-- <div class="lists">
        <div class="list" v-for="(item,index) in list" :key="index">
          <div class="listl">
            <p>{{item.TranDesc}}</p>
            <span>{{item.TranDate}}----{{item.TranTime}}</span>
          </div>
          <div class="listr" :class="item.AmtTrans.indexOf('+') >= 0?'color':''">
            {{item.AmtTrans.indexOf('+') >= 0?'+':'-'}}{{item.AmtTrans / 100}}
          </div>
        </div>

       <div class="list" @click="goDetaiil()">
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
		 		  </div>
        <div style="padding: 20px;text-align: center;">
          <span v-if="morePage == '1'" @click="getLists()">查看更多</span>
          <span v-else>暂无更多</span>
        </div>
      </div>-->

      <div class="lists">
        <div class="list" v-for="(item,index) in list" :key="index">
          <div class="listl">
            <p>交易类型：{{item.transType}}</p>
            <p>金额：{{ parseFloat(item.payAmount).toFixed(2)}}</p>
            <p>商家：{{item.merchName}}</p>
            <p>订单号：{{item.orderNo}}</p>
            <span>{{item.transTime}}</span>
          </div>
          <!-- <div class="listr" :class="item.AmtTrans.indexOf('+') >= 0?'color':''">
            {{item.AmtTrans.indexOf('+') >= 0?'+':'-'}}{{item.AmtTrans / 100}}
          </div> -->
        </div>
        <div style="padding: 20px;text-align: center;">
          <span v-if="detailTotal>0" @click="getmorelist()">查看更多</span>
          <span v-else>暂无更多</span>
        </div>
      </div>

    </div>
    <van-action-sheet v-model="showdateType" :actions="actions" cancel-text="取消" round @cancel="toCancel" @select="onSelect" />
    <van-calendar :min-date="minDate" :max-date="maxDate" v-model="show" type="range" @confirm="onConfirm" />
  </div>
</template>

<script>
export default {
  name: 'consume',
  components: {},
  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2100, 0, 31),

      showdateType: false, //弹窗
      show: false,
      actions: [
        {
          name: '近三个月',
          type: '',
          startDate: this.getBeforeDate(90),
          endDate: this.getBeforeDate(0),
        },
        {
          name: '近半年',
          type: '',
          startDate: this.getBeforeDate(180),
          endDate: this.getBeforeDate(0),
        },
        {
          name: '近一年',
          type: '',
          startDate: this.getBeforeDate(360),
          endDate: this.getBeforeDate(0),
        },
        {
          name: '范围查询',
          type: 'diy',
          subname: '手动选择日期范围',
        },
      ],

      navac: 2,
      startDate: '',
      endDate: '',
      morePage: '',
      lastSysDate: '',
      lastSysTime: '',
      lastTransSeq: '',
      list: [],

      detailTotal: 0, //下一页的数据
      page: 0, //页数
      actitleFind: '', //查询记录标题
    }
  },
  async created() {
    this.startDate = this.getBeforeDate(30)
    this.endDate = this.getBeforeDate(0)
    this.getLists()
  },
  methods: {
    showsheet() {
      this.showdateType = true
    },
    //van的弹窗选择触发
    onSelect(item) {
      console.log(item)
      this.actitleFind = item.name

      //关闭弹窗
      this.showdateType = false
      if (item.type == 'diy') {
        this.show = true
      } else {
        this.startDate = item.startDate
        this.endDate = item.endDate
        this.lastSysDate = ''
        this.lastSysTime = ''
        this.lastTransSeq = ''
        this.morePage = ''
        this.list = []
        this.getLists()
      }
      this.$toast({
        message: item.name,
        duration: 500,
      })
    },
    toCancel() {},
    //确定日期范围
    onConfirm(date) {
      console.log(111, date)
      const [start, end] = date
      console.log(1, start)
      console.log(2, end)
      this.show = false
      this.startDate = this.formatDate(start)
      this.endDate = this.formatDate(end)
      this.list = []
      this.getLists()
    },
    //格式化日期
    formatDate(date) {
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var date = date.getDate()
      console.log(year, month, date)
      var dat = `${year}${month < 10 ? '0' + month : month}${date < 10 ? '0' + date : date}`
      return dat
    },
    async getLists() {
      this.getwxlist(1)
      // var data = {
      //   transCode: 'ACCOUNTDETAIL',
      //   mobileNo: localStorage.getItem('phone') || '',
      //   cardNo: localStorage.getItem('CardNo') || '',
      //   startDate: this.startDate,
      //   endDate: this.endDate,
      //   morePage: this.morePage,
      //   lastSysDate: this.lastSysDate,
      //   lastSysTime: this.lastSysTime,
      //   lastTransSeq: this.lastTransSeq, //  --翻页控制时使用： 首次查询上送空；后续翻页查询时上送上页返回的最后一笔交易的系统跟踪号
      // }

      // // console.log(this.$getSign(paramsObj))
      // let ret = await this.$api.sendMs(data)

      // console.log(ret)
      // if (ret.retCode == 'SUCCESS') {
      //   if (ret.details) {
      //     this.list = this.list.concat(ret.details)
      //     this.lastSysDate = ret.details[ret.details.length - 1].SysDate
      //     this.lastSysTime = ret.details[ret.details.length - 1].SysTime
      //     this.lastTransSeq = ret.details[ret.details.length - 1].TranSeq
      //   }
      //   this.morePage = ret.morePage
      //   console.log(this.lastSysDate)
      //   console.log(this.lastSysTime)
      //   console.log(this.lastTransSeq)
      //   this.count = ret.count // 条数
      //   this.$toast(ret.retMsg)
      // } else {
      //   this.$toast(ret.retMsg)
      // }
    },
    //微信支付账单
    async getwxlist(page) {
      //保留或者清空页数
      this.page = page
      var wxdata = {
        transCode: 'ACCOUNTDETAIL',
        merchId: '',
        mobileNo: localStorage.getItem('phone'),
        // cardNo: '',
        startDate: this.startDate,
        endDate: this.endDate,
        page: page,
        row: '10',
      }
      let ret = await this.$api.sendMs(wxdata)
      console.log(ret)

      if (ret.detailTotal > 0) {
        this.list.push(...ret.transDetail)
      }

      //拿到下页结果做判断
      wxdata.page += 1
      let pre = await this.$api.sendMs(wxdata)
      //下一页的数据
      this.detailTotal = pre.transDetail.length
    },
    //加载更多
    getmorelist() {
      this.getwxlist(++this.page)
      console.log(this.page)
    },

    goDetaiil() {
      this.$router.push({
        path: '/consumedetail',
      })
    },
    changeType(e) {
      this.navac = e
    },
    golimit() {
      this.$router.push({
        path: '/limit',
      })
    },
  },
}
</script>
<style type="text/css" scoped>
.consume {
  padding-top: 108px;
}

.count {
  width: 698px;
  height: 1166px;
  margin: auto;
  background: white;
}

.navs {
  padding: 63px 0;
}

.navs,
.navsl {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navsl {
  flex: 1;
  padding-left: 59px;
  justify-content: space-between;
}

.nav {
  font-size: 32px;
  color: #999999;
}

.nav.active {
  color: #d93025;
  position: relative;
}

.nav.active::after {
  content: '';
  display: block;
  width: 32px;
  height: 4px;
  background: #d93025;
  border-radius: 4px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: -9px;
  margin: auto;
}

.timesel {
  padding-right: 29px;
  margin-left: 139px;
  display: flex;
  align-items: center;
}

.timesel img {
  width: 30px;
  margin-left: 10px;
}

.lists {
  height: calc(100vh - 295px);
  overflow: scroll;
  background: white;
  border-radius: 10px;
  width: 700px;
  margin: auto;
  padding: 0 20px;
  box-sizing: border-box;
}

.list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 29px;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 29px;
}

.list:last-child {
  border-bottom: 0;
}

.listl p {
  font-size: 28px;
  color: #333333;
  margin-bottom: 20px;
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
  color: #f51111;
}
</style>
