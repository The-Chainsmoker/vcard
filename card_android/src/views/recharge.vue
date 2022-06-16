<template>
  <div class="recharge">
    <pheader :back="true" :title="'充值'" :right="'充值记录'" @rightFn="righFn"></pheader>
    <div class="count">
      <p class="tit">充值金额</p>
      <div class="ipt">
        <span>¥</span>
        <input v-model="num" type="tel" name="" id="" value="" />
      </div>
      <div class="btns">
        <div class="btn" :class="btnac==index?'active':''" @click="numFn(item,index)" v-for="(item,index) in btns" :key="index">
          {{item.num}}元
        </div>
      </div>
    </div>
    <p class="tit" style="color: #999999;">请选择充值方式</p>
    <div class="lists">
      <div class="list" @click="payth = 0">
        <div class="listl">
          <img src="../assets/we.png">
          <span>微信充值</span>
        </div>
        <div class="listr" :class="payth==0?'listrac':''">
          <img v-if="payth==0" src="../assets/dui.png">
        </div>
      </div>
      <!-- <div class="list" @click="payth = 1">
				<div class="listl">
					<img src="../assets/ali.png">
					<span>支付宝充值</span>
				</div>
				<div class="listr" :class="payth==1?'listrac':''">
					<img v-if="payth==1" src="../assets/dui.png">
				</div>
			</div> -->
    </div>
    <div class="bom" @click="rechargeFn()">
      下一步
    </div>
    <van-dialog :showConfirmButton="false" :closeOnClickOverlay="true" v-model="show" title="需要微信代扣签约" :showCancelButton="false">
      <div style="padding: 3vw;">
        <div style="text-align: center;font-size: 20px;padding: 3vw 0;">
          <p>您需要先进行微信代扣签约，才能进行充值，</p>
          <p>请截屏保存二维码，在微信内扫码识别进行签约</p>
        </div>
        <div style="margin: auto;" v-if="ContractCode" class="code qrcodeImg" ref="qrCodeDiv"> </div>
      </div>
    </van-dialog>

  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'recharge',
  components: {},
  data() {
    return {
      num: 50,
      btnac: 0,
      btns: [
        {
          num: '50',
        },
        {
          num: '100',
        },
        {
          num: '200',
        },
        {
          num: '500',
        },
        {
          num: '1000',
        },
        {
          num: '2000',
        },
      ],
      payth: 0,
      phone: '',
      cardNo: '',
      ContractCode: '',
      show: false,
    }
  },
  async created() {
    this.phone = this.$store.state.phone || localStorage.getItem('phone') || ''
    this.phone = Number(this.phone)
    this.cardNo = localStorage.getItem('CardNo') || ''
    // let ret = await this.$api.getShop();
    // console.log(ret)
  },
  watch: {
    num(a, b) {
      this.btnac = -1
      if (this.num) {
        this.num = this.num.replace(/[^\d.]/g, '') //清除"数字"和"."以外的字符
        this.num = this.num.replace(/^\./g, '') //验证第一个字符是数字
        this.num = this.num.replace(/\.{2,}/g, '.') //只保留第一个, 清除多余的
        this.num = this.num.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
        this.num = this.num.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') //只能输入两个小数
        // this.num = parseInt(this.num)
        for (var i = 0; i < this.btns.length; i++) {
          if (this.num == this.btns[i].num) {
            this.btnac = i
          }
        }
      } else {
        this.num = ''
      }
    },
  },
  methods: {
    async rechargeFn() {
      this.$toast.loading({
        message: '充值中,请稍后...',
        forbidClick: true,
        duration: 0, // 持续展示 toast
      })
      var data = {
        transCode: 'CARDREFUND',
        mobileNo: this.phone ? JSON.stringify(this.phone) : '', //手机号
        cardNo: this.cardNo,
        amount: JSON.stringify(this.num * 100), //JSON.stringify(this.num * 100)
      }
      console.log(data)
      let ret = await this.$api.reqFn(data)
      console.log(ret)
      if (ret.retCode == 'NEEDCONTRACT') {
        this.ContractCode = ret.ContractCode
        this.show = true
        this.$nextTick(function () {
          this.bindQRCode()
        })
      } else if (ret.retCode == 'SUCCESS') {
        var balance = (ret.balance / 100).toFixed(2)
        this.$dialog
          .alert({
            title: '充值成功',
            message: '充值成功，当前卡号余额：' + balance + ' 元',
          })
          .then(() => {
            // on close
          })
      } else {
        this.$dialog
          .alert({
            title: '充值错误',
            message: 'retCode：' + ret.retCode + ' <br/>,retMsg：' + ret.retMsg,
          })
          .then(() => {
            // on close
          })
      }
    },
    bindQRCode() {
      this.$refs.qrCodeDiv.innerHTML = '' //清除二维码方法一
      this.QRCodeObj = new QRCode(this.$refs.qrCodeDiv, {
        text: this.ContractCode,
        width: 160,
        height: 160,
        colorDark: '#333333', //二维码颜色
        colorLight: '#ffffff', //二维码背景色
        correctLevel: QRCode.CorrectLevel.L, //容错率，L/M/H
      })
    },
    //单选颜色变化
    numFn(item, index) {
      this.num = item.num
      this.btnac = index
    },
    righFn() {
      this.$router.push({
        path: '/rechargelist',
      })
    },
  },
}
</script>
<style type="text/css" scoped>
.recharge {
  padding-top: 108px;
}

.count {
  background: white;
  width: 698px;
  height: 468px;
  margin: auto;
  border-radius: 10px;
  padding: 0 20px;
  box-sizing: border-box;
}

.tit {
  font-size: 24px;
  color: #333333;
  padding: 30px;
}

.ipt {
  width: 658px;
  overflow: hidden;
  display: flex;
  border-bottom: 1px solid #eeeeee;
  align-items: center;
}

.ipt span,
.ipt input {
  font-size: 72px;
}

.ipt input {
  margin-left: 10px;
  width: 200px;
  display: block;
  border: none;
  outline: none;
  flex: 1;
}

.btns {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}

.btn {
  width: 206px;
  height: 100px;
  background: #eeeeee;
  border-radius: 10px;
  color: #999999;
  margin-bottom: 20px;
  margin-right: 20px;
  font-size: 32px;
  text-align: center;
  line-height: 100px;
}

.btn:nth-child(3n + 3) {
  margin-right: 0;
}

.active {
  background: #ffd5d2;
  color: #d93025;
}

.lists {
  background: white;
  width: 698px;
  padding: 0 20px;
  margin: auto;
  border-radius: 10px;
  box-sizing: border-box;
}

.list {
  height: 100px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  justify-content: space-between;
}

.listl {
  display: flex;
  align-items: center;
}

.listl span {
  font-size: 32px;
  color: #333333;
}

.list img {
  width: 60px;
  height: 60px;
  margin: 20px;
}

.listr {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #8f8f8f;
  display: flex;
  align-items: center;
  justify-content: center;
}

.listr img {
  width: 90%;
  height: 90%;
  margin: 0;
}

.listrac {
  border: 1px solid #d93025;
  background: #d93025;
}

.bom {
  width: 600px;
  height: 80px;
  background: #d93025;
  color: white;
  font-size: 32px;
  border-radius: 40px;
  text-align: center;
  line-height: 80px;
  margin: 284px auto 0;
}

.bom:active {
  opacity: 0.8;
}
</style>
