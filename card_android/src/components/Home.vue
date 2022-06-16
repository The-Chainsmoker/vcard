<template>
  <div class="home">
    <div class="homehead">
      <span>首页</span>
    </div>
    <!-- <pheader :title="'首页'" :back="false" :bg="'#FFFFFF'"></pheader> -->
    <div class="card">
      <div class="cardc">
        <p class="tit">付款码</p>
        <div v-if="hascard" class="codeContain">
          <!-- <div class="lineimg">
            <img id="barcode" src="">
          </div> -->
          <div v-if="qrCode" class="code qrcodeImg" ref="qrCodeDiv" @click="getCode()">
          </div>
        </div>
        <div v-else class="nocard" @click="goopencard()">
          <img src="../assets/home/add.png">
          <h4>请添加</h4>
          <p>没有可用的卡片</p>
        </div>
      </div>
      <div class="logo">
        <img src="../assets/icon.png">
        <span>{{codeName ? codeName:'可配置'}}</span>
      </div>

    </div>
    <!-- <pfooter :active="1"></pfooter> -->

    <van-popup v-model="show" round :get-container="getContainer">
      <div class="container">
        <div class="vcard">
          <div class="msg">请先开卡！</div>
          <div class="btn btncolor" @click.prevent="goopencard()">
            银行卡支付
          </div>

        </div>
        <!-- <div class="btn" @click="wxlog()">
          校园轻松付
        </div> -->

        <div class="btn" @click="wxSign()">
          校园轻松付
        </div>
      </div>
    </van-popup>

    <!-- <div>
      <button @click="change()">跳转支付页面</button>
    </div> -->

    <!-- <button @click="testPost">点击</button> -->
  </div>
</template>

<script>
import axios from 'axios'
import QRCode from 'qrcodejs2'
import JsBarcode from 'jsbarcode'
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      hascard: true,
      cardNo: '',
      qrCode: '',
      QRCodeObj: null,
      setTimeoutFN: null,

      show: false, //显示弹出层

      codetoken: '', //微信code
      auths: null, //微信授权
      alsoLogin: true,

      shares: null, //分享对象
      preList: '', //预签约对象

      codeName: '', //二维码名称

      codeTime: '', //二维码定时器
      qrCodeBottom: 0, //二维码尾部数
      startDate: '', //当前开始的日期
      scendSum: 0, //秒总数
    }
  },
  created() {
    // var paramsObj = { xid: 123, pageSize: 20,sign:'', type: 1, pageNo: '',obj:{id:1},arr:[2,3,5] };
    // var sign = getSign(paramsObj, kAppKey, kAppSecret);
    // console.log(this.$getSign(paramsObj))
    // let ret = await this.$api.loginFn(paramsObj);

    console.log('rettt')
    console.log(this.$store.state.current)
    if (this.$store.state.current == 1) {
      //学员登录

      if (localStorage.getItem('campusId')) {
        // this.show = true

        //获取二维码
        this.getCode()
        //开卡
        // this.getCard()
      } else {
        this.stuReg()
      }
    }
  },
  mounted() {
    // this.testPost()

    //推送消息
    let _this = this
    plus.push.addEventListener(
      'receive',
      function (msg) {
        let data = msg.payload
        if (data.status == 'SUCCESS') {
          _this.$router.push({ name: 'message', params: { data } })
        }
      },
      false
    )
  },
  beforeDestroy() {
    clearTimeout(this.setTimeoutFN)
    clearInterval(this.codeTime)
  },
  watch: {
    '$store.state.current': function (newData, old) {
      if (newData == 1) {
        //学员登录
        if (localStorage.getItem('campusId')) {
          // this.show = true

          //获取二维码
          this.getCode()
          //开卡
          // this.getCard()
        } else {
          this.stuReg()
        }
      } else {
        clearTimeout(this.setTimeoutFN)
      }
    },
  },
  methods: {
    //测试接口
    // async testPost() {
    //   //影印件采集
    //   // var date = {
    //   //   transCode: 'UPLOADPHOTO',
    //   //   /*必传参数*/
    //   //   txnType: 'SA029', //交易类型，参考银联交易类型
    //   //   queryId: '0001000020170701161543655233', //请求id(唯一性)，其格式固定为： 交易发起方机构代码（8 位）+交易发起方系 统的交易日期时间（14 位）+交易发起方系 统流水号（6 位）。该流水号由交易发起方平 台生成，取值从 000001-999999 循环使用。 查询流水号是交易的唯一主键
    //   //   md5: '',

    //   //   /*选填参数;  交易类型为影印件采集传字段*/
    //   //   idCardPicP: '身份证照片正面',
    //   //   idCardPicN: '身份证照片反面',
    //   //   facePic: '人脸影像照片',

    //   //   /*动态参数;  根据交易类型封装*/
    //   //   mapEncrypt: {
    //   //     bussTp: '新开立Ⅲ类账户',
    //   //     issInsCode: 'II/III 类账户开户行机 构代码',
    //   //   },
    //   // }

    //   //身份验证
    //   // var date = {
    //   //   transCode: 'REALAUTH',
    //   //   txnType: 'SA001',
    //   //   queryId: '0001000020170701161543655233',
    //   //   md5: '',
    //   //   mapEncrypt: {
    //   //     issInsCode: 'II/III类账户开户行机构代码',
    //   //     priAccNo: '绑定账户卡号',
    //   //     certifId: '身份证号码',
    //   //     customerNm: '姓名',
    //   //     phoneNo: '手机号',
    //   //     bussTp: '03-新开立III类账户',
    //   //   },
    //   // }
    //   //开卡
    //   // var date = {
    //   //   transCode: 'RESETPASSWD2',
    //   //   txnType: 'SA002',
    //   //   queryId: '0001000020170701161543655233',
    //   //   md5: '',
    //   //   mapEncrypt: {
    //   //     issInsCode: 'II/III类账户开户行机构代码',
    //   //     priAccNo: '绑定账户卡号',
    //   //     customerNm: '姓名',
    //   //     certifId: '身份证号码',
    //   //     phoneNo: '手机号',
    //   //     msgCode: '短信验证码',
    //   //     bussTp: '03-新开立III类账户',
    //   //   },
    //   // }

    //   // var ret = await this.$api.reqFn(date)
    //   // console.log('ret', ret)

    //   // plus.geolocation.getCurrentPosition(
    //   //   function (p) {
    //   //     alert(
    //   //       'Geolocation\nLatitude:' +
    //   //         p.coords.latitude +
    //   //         '\nLongitude:' +
    //   //         p.coords.longitude +
    //   //         '\nAltitude:' +
    //   //         p.coords.altitude
    //   //     )
    //   //   },
    //   //   function (e) {
    //   //     alert('Geolocation error: ' + e.message)
    //   //   }
    //   // )

    //   plus.geolocation.getCurrentPosition(
    //     function (p) {
    //       if (p.addresses) {
    //         alert(JSON.stringify(p))
    //         alert(p.addresses)
    //         alert(p.coords.longitude)
    //         alert(p.coords.latitude)
    //       } else {
    //         alert('请授权手机位置信息！')
    //       }

    //       // var gpsPoint = new plus.maps.Point(p.coords.longitude, p.coords.latitude)
    //       // map.centerAndZoom(gpsPoint, 19)
    //     },
    //     function (e) {},
    //     {
    //       provider: 'baidu',
    //       coordsType: 'bd09ll',
    //     }
    //   )
    // },

    //跳转到开通公众号指示页面
    wxSign() {
      this.$router.push({ name: 'wxsign' })
    },
    //测试支付成功页面
    // change() {
    //   this.$router.push({ name: 'message', params: { amount: '200' } })
    // },

    //定时刷新二维码 unused!!!
    codeInterbal() {
      //开始的毫秒
      this.startDate = new Date().getTime()

      this.codeTime = setInterval(() => {
        if (localStorage.getItem('wxId')) {
          let durationDate = new Date().getTime()
          //相隔的毫秒
          let intervalTime = durationDate - this.startDate
          this.scendSum = Math.round(intervalTime / 1000)

          console.log(this.scendSum)
          if (this.scendSum > 120) {
            //清除定时器
            this.scendSum = 0
            clearInterval(this.codeTime)
            this.codeTime = ''
            this.getCode()
            return
          }

          let qrCodeTop = this.qrCode.slice(0, -6)
          let qrCodeBottom = parseInt(this.qrCode.slice(-6)) + this.scendSum
          let changeQrCode = qrCodeTop + '00' + qrCodeBottom
          // console.log(qrCodeBottom)
          this.$nextTick(function () {
            this.bindQRCode(changeQrCode)
          })
        }
      }, 2000)
    },

    //生成二维码  unused!!!
    async getCode() {
      var localTime = ''
      Date.prototype.Format = function (fmt) {
        // author: meizz
        var o = {
          'M+': this.getMonth() + 1, // 月份
          'd+': this.getDate(), // 日
          'h+': this.getHours(), // 小时
          'm+': this.getMinutes(), // 分
          's+': this.getSeconds(), // 秒
          'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
          S: this.getMilliseconds(), // 毫秒
        }
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
        for (var k in o)
          if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            )
        return fmt
      }
      localTime = new Date().Format('yyyy-MM-dd hh:mm:ss')
      var data = {
        transCode: 'QRCODE',
        mobileNo: localStorage.getItem('phone') || '',
        localTime: localTime,
        member: localStorage.getItem('campusId') || '',
      }
      // console.log(this.$getSign(paramsObj))

      let ret = await this.$api.sendMs(data)

      this.codeName = ret.codeName

      console.log('哈哈哈', ret)

      if (ret.retCode == 'SUCCESS') {
        //清除二维码定时器
        clearInterval(this.codeTime)
        this.codeTime = ''
        //开始二维码定时器
        this.codeInterbal()

        localStorage.setItem('wxId', ret.token)
        this.show = false

        this.hascard = true
        this.qrCode = ''
        this.qrCode = ret.qrCode
        // console.log(this.qrCode)
        this.$nextTick(function () {
          this.bindQRCode(this.qrCode)
        })
      } else if (ret.retCode === 'E1') {
        //签约的地址
        localStorage.setItem('contractAddr', ret.contractAddr)
        //签约的二维码
        localStorage.setItem('contractImgUrl', ret.contractImgUrl)

        // this.$toast('请签约')
        this.show = true
      }
    },

    //拉起小程序  unused!!!
    async wxApp() {
      await axios({
        method: 'post',
        url: 'https://online.gzekt.com/vcardserver/user/wxauth',
        data: {
          code: this.codetoken,
          mobileNo: localStorage.getItem('phone'),
        },
      }).then((res) => {
        this.preList = res.data
        // alert('预签约：' + JSON.stringify(this.preList))
      })

      if (this.preList.errcode !== 0) {
        this.$toast.clear() //关闭提示加载
        alert('网络故障，请重试！')
        return
      }

      let _this = this
      // 获取分享服务
      plus.share.getServices(
        function (s) {
          var shares = {}
          for (var i in s) {
            var t = s[i]
            shares[t.id] = t
          }
          // alert('获取分享服务列表成功： ' + JSON.stringify(shares))
          var sweixin = shares['weixin']

          _this.$toast.clear() //关闭提示加载

          sweixin.launchMiniProgram(
            {
              id: 'gh_30b13ed85235', //要跳转小程序的原始ID
              path: `pages/index/index?presign_token=${_this.preList.presign_token}`,
              type: 0,
            },
            (res) => {
              _this.getCode()
            },
            (err) => {
              // alert('调用小程序失败！： ' + JSON.stringify(err))
              alert('调用小程序失败,请重试！')
            }
          )
          _this.$toast.clear() //关闭提示加载
        },
        function (e) {
          // alert('获取分享服务列表失败： ' + JSON.stringify(e))
          alert('获取分享服务列表失败,请重试！')
        }
      )
    },

    //微信服务  unused!!!
    async wxlog() {
      let _this = this
      await plus.oauth.getServices(
        function (services) {
          // alert(JSON.stringify(services))
          let serve = {}
          for (var i in services) {
            serve[services[i].id] = services[i]
          }
          // alert(JSON.stringify(serve))
          _this.auths = serve['weixin']
          _this.authLogin()
        },
        function (e) {
          // alert('获取微信服务列表失败：' + e.message + ' - ' + e.code)
          alert('获取微信服务列表失败,请重试！')
        }
      )
      //解决首次微信授权要点击两次的bus
      if (this.alsoLogin) {
        this.alsoLogin = false
        this.wxlog()
      }
    },

    //微信授权  unused!!!
    authLogin() {
      let _this = this
      var s = _this.auths
      if (!s) {
        alert('当前环境不支持微信登录')
        return
      }
      s.authorize(
        function (e) {
          //提示加载
          _this.$toast.loading({
            duration: 0,
            message: '加载中...',
            forbidClick: true,
          })

          // alert('授权成功：' + JSON.stringify(e))
          _this.codetoken = e.code
          _this.wxApp()
        },
        function (e) {
          // alert('授权失败：' + JSON.stringify(e))
          alert('授权失败：' + ' 请先安装微信APP !')
        },
        { scope: 'snsapi_userinfo', state: 'authorize test', appid: 'wxbd433e331b2fb2df' }
      )
    },

    //绑定弹出层的dom节点
    getContainer() {
      return document.querySelector('.my-container')
    },

    stuReg() {
      console.log('返回')
      setTimeout(() => {
        this.$dialog
          .alert({
            title: '提示',
            message: '请先进行学员注册',
          })
          .then(() => {
            this.$router.push({
              path: '/stureg',
            })
          })
          .catch(() => {})
      }, 100)
    },
    bindQRCode: function (eqCode) {
      console.log(eqCode)
      console.log(this.QRCodeObj)
      // if (this.QRCodeObj) {
      // 	this.QRCodeObj.clear()
      // }
      this.$refs.qrCodeDiv.innerHTML = '' //清除二维码方法一
      this.QRCodeObj = new QRCode(this.$refs.qrCodeDiv, {
        text: eqCode,
        width: 200,
        height: 200,
        colorDark: '#333333', //二维码颜色
        colorLight: '#ffffff', //二维码背景色
        correctLevel: QRCode.CorrectLevel.L, //容错率，L/M/H
      })
      // JsBarcode('#barcode', this.qrCode, {
      //   format: 'CODE39',
      //   lineColor: '#000',
      //   background: '#EBEEF5',
      //   width: 4,
      //   height: 40,
      //   displayValue: false,
      // })
    },
    async getCard() {
      var localTime = ''
      Date.prototype.Format = function (fmt) {
        // author: meizz
        var o = {
          'M+': this.getMonth() + 1, // 月份
          'd+': this.getDate(), // 日
          'h+': this.getHours(), // 小时
          'm+': this.getMinutes(), // 分
          's+': this.getSeconds(), // 秒
          'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
          S: this.getMilliseconds(), // 毫秒
        }
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
        for (var k in o)
          if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            )
        return fmt
      }
      var myDate = new Date()
      localTime = new Date().Format('yyyy-MM-dd hh:mm:ss')
      var data = {
        transCode: 'QRCODE',
        mobileNo: localStorage.getItem('phone') || '',
        localTime: localTime,
        member: localStorage.getItem('campusId') || '',
      }
      // console.log(this.$getSign(paramsObj))
      let ret = await this.$api.sendMs(data)
      console.log(ret)
      if (ret.retCode == 'SUCCESS') {
        this.hascard = true
        this.qrCode = ''
        this.qrCode = ret.qrCode
        this.$nextTick(function () {
          this.bindQRCode()
        })
        this.setTimeoutFN = setTimeout(() => {
          this.getCard()
        }, (ret.expireSecond - 2) * 1000)
      } else {
        if (ret.retCode == 'E3') {
          this.$dialog
            .alert({
              title: ret.retMsg + '，前往激活',
            })
            .then(() => {
              // on close
              this.$router.push({
                path: '/forgotpaypwd',
                query: {
                  type: 'activation',
                },
              })
            })
        }
        this.hascard = false
      }
    },
    //TODO
    goopencard() {
      return

      // window.open('/#/opencard')
      this.$router.push({
        path: '/opencard',
      })
    },
  },
}
</script>
<style type="text/css" scoped>
.btn {
  width: 435px;
  height: 80px;
  line-height: 80px;
  background: #db332a;
  border-radius: 40px;
  color: white;
  text-align: center;
  margin: 0 auto;
  font-size: 34px;
}
.btn:active {
  opacity: 0.8;
}
.btncolor {
  background-color: #a4a4a4;
}
.vcard {
  position: relative;
}
.vcard .msg {
  position: absolute;
  color: #a4a4a4;
  top: -43px;
  left: 69px;
}

.container {
  width: 530px;
  height: 340px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.home {
  position: relative;
}

.homehead {
  /* position: absolute; */
  height: 88px;
  left: 0;
  right: 0;
  color: black;
  text-align: center;
  line-height: 88px;
}

.homehead span {
  font-size: 36px;
}

.card {
  width: 698px;
  height: 842px;
  background: linear-gradient(0deg, #d93025 0%, #ed5062 99%);
  border-radius: 10px;
  margin: auto;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
}

.home {
  /* padding-top: 108px; */
  box-sizing: border-box;
  background: linear-gradient(180deg, #ffffff 30%, #f2f2f2 70%);
  height: 100vh;
}

.cardc {
  width: 658px;
  height: 714px;
  background-image: url(../assets/home/cardc.png);
  background-size: 100%;
}

.tit {
  font-size: 32px;
  padding-top: 50px;
  text-align: center;
  margin-bottom: 39px;
}

.lineimg {
  width: 600px;
  height: 156px;
  background: rgba(0, 0, 0, 0.3);
  margin: auto;
}

.codeContain .code {
  display: flex;
  justify-content: center;
  margin: 75px auto;
}

.code {
  /* width: 290px;
  height: 290px;
  background: rgba(0, 0, 0, 0.3);
  margin: 50px auto; */
  width: 440px;
  height: 440px;
}

/* 二维码画布可以转为rem与父盒子保持一样的大小 */
.code >>> canvas {
  width: 440px !important;
  height: 440px !important;
}

.lineimg img,
.code img {
  width: 100%;
  height: 100%;
}

.logo {
  position: absolute;
  left: 30px;
  bottom: 34px;
  font-size: 32px;
  color: white;
  display: flex;
  align-items: center;
}

.logo img {
  width: 50px;
  height: 50px;
  margin-right: 21px;
  border-radius: 10px;
}

.nocard {
  width: 600px;
  height: 354px;
  background-image: url(../assets/home/nocard.png);
  background-size: 100%;
  margin: auto;
  margin-top: 107px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nocard h4 {
  font-size: 36px;
  margin: 29px 0 20px;
}

.nocard p {
  font-size: 24px;
}

.nocard img {
  width: 100px;
  height: 100px;
}

.code img {
  width: 100% !important;
}
</style>
