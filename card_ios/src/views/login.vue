<template>
  <div class="login">
    <div class="tBox">
      <img class="bg" src="../assets/loginbg.png">
      <div class="logo">
        <img class="icon" src="../assets/icon.png">
      </div>
    </div>
    <div>
      <div class="navs">
        <div class="nav" @click="changeNav(0)" :class="active==0?'active':''">
          手机号登录
        </div>
      </div>
      <!-- 手机号 -->
      <div>
        <div class="lists">
          <div class="list">
            <img class="phone" src="../assets/phone.png">
            <div class="listr">
              <input v-model="phone" type="" name="" id="" value="" placeholder="输入手机号" />
            </div>
          </div>
          <div class="list" v-if="active == 0">
            <img class="codeimg" src="../assets/code.png">
            <div class="listr">
              <input v-model="code" type="" name="" id="" value="" placeholder="输入验证码" />
              <span @click="getCode()" class="code" :class="issend?'send':''">{{codeText}}</span>
            </div>
          </div>
          <div class="list" v-if="active ==1">
            <img class="codeimg" src="../assets/code.png">
            <div class="listr">
              <input v-model="pass" type="" name="" id="" value="" placeholder="输入密码" />
            </div>
          </div>
        </div>
      </div>
      <!-- <p class="forgot">
				<span @click="goforgot()">忘记密码？</span>
			</p> -->
      <div class="bom">
        <!-- <p class="noacount" @click="goRegisert()">没有账号？立即注册</p> -->
        <div class="btn" @click="loginFn()">
          登录
        </div>
        <div class="tips">
          <span>登录即代表同意</span>
          <span class="color">《用户协议》</span>
          <span>和</span>
          <span class="color">《隐私政策》</span>
        </div>
      </div>
    </div>

    <!-- <div class="btn" @click="wxlog()">
      wx登录
    </div> -->
    <!-- <div class="btn" @click="wxApp()">
      wx小程序
    </div> -->

    <!-- <div class="btn" @click="wxXhr()">
      ajax网络请求
    </div> -->

    <!-- <div class="btn" @click="quickLogin()">
      一键登录
    </div> -->

    <!-- <div>
      {{cid}}
    </div> -->
  </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'vant'
export default {
  name: 'login',
  components: {},
  data() {
    return {
      active: 0,
      issend: false,
      codeText: '发送验证码',
      timer: null,
      time: 60,
      orderNo: '', //短信订单号
      phone: '', //手机号
      code: '', //手机验证码
      pass: '', //密码
      smsOrder: '', //

      codetoken: '', //微信code
      auths: null, //微信授权
      alsoLogin: true,

      shares: null, //分享对象
      preList: '', //预签约对象

      // cid: '',
    }
  },
  async created() {
    if (this.$route.query.nav) {
      this.active = this.$route.query.nav
    }
  },
  mounted() {},

  methods: {
    //一键登录
    // async quickLogin() {
    //   var auth = {}
    //   await plus.oauth.getServices(function (services) {
    //     alert('预签约：' + JSON.stringify(services))
    //     for (var i in services) {
    //       var t = services[i]
    //       auth[t.id] = t
    //     }
    //     auth['univerify'].login(
    //       function (event) {
    //         //登录成功
    //         var openid = auth.authResult.openid
    //         var access_tolen = auth.authResult.access_token
    //       },
    //       function (error) {
    //         //登录失败
    //       },
    //       {
    //         // 自定义页面参数
    //         univerifyStyle: {
    //           // 自定义登录框样式
    //           //参考`univerifyStyle 数据结构`
    //         },
    //       }
    //     )
    //   })
    // },

    // 获取cid,推送通知
    getCid() {
      return new Promise((reslove, reject) => {
        plus.push.getClientInfoAsync((info) => {
          let cid = info['clientid']
          reslove(cid)
        })
      })
    },

    wxXhr() {
      let promise = new Promise((resolve, reject) => {
        let _this = this
        var xhr = null
        xhr = new plus.net.XMLHttpRequest()
        xhr.open('POST', 'https://online.gzekt.net/vcardserver/user/wxauth')
        xhr.onreadystatechange = function () {
          // 当异步请求状态为4时，并且返回的状态码为200，接收响应成功。
          if (xhr.readyState == '4' && xhr.status == '200') {
            alert(xhr.responseText)
            let data = JSON.parse(xhr.responseText)
            resolve(data)
          }
        }
        var data = { code: _this.codetoken, mobileNo: '13725737343' }
        //网络数据传输是以字符串传输
        xhr.send(JSON.stringify(data))
      })

      return promise
    },

    //拉起小程序
    async wxApp() {
      await axios({
        method: 'post',
        url: 'https://online.gzekt.net/vcardserver/user/wxauth',
        data: {
          code: this.codetoken,
          mobileNo: '13725737343',
        },
      }).then((res) => {
        this.preList = res.data
        alert('预签约：' + JSON.stringify(this.preList))
      })

      let data = await this.wxXhr()
      this.preList = data

      if (this.preList.errcode !== 0) {
        alert('预签约失败！')
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
          alert('获取分享服务列表成功： ' + JSON.stringify(shares))
          var sweixin = shares['weixin']
          sweixin.launchMiniProgram({
            id: 'gh_30b13ed85235', //要跳转小程序的原始ID
            path: `pages/index/index?presign_token=${_this.preList.presign_token}`,
            type: 0,
          })
        },
        function (e) {
          alert('获取分享服务列表失败： ' + JSON.stringify(e))
        }
      )
    },

    //微信服务
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
          alert('获取分享服务列表失败：' + e.message + ' - ' + e.code)
        }
      ) //解决首次微信授权要点击两次的bus
      if (this.alsoLogin) {
        this.alsoLogin = false
        this.wxlog()
      }
    },
    //微信授权
    authLogin() {
      let _this = this
      var s = _this.auths
      if (!s) {
        alert('当前环境不支持微信登录')
        return
      }
      s.authorize(
        function (e) {
          alert('授权成功：' + JSON.stringify(e))
          _this.codetoken = e.code
        },
        function (e) {
          alert('授权失败：' + JSON.stringify(e))
        },
        { scope: 'snsapi_userinfo', state: 'authorize test', appid: 'wxbd433e331b2fb2df' }
      )
    },

    async loginFn() {
      if (!this.phone) {
        this.$toast('请先输入手机号')
        return
      }
      if (!this.smsOrder) {
        this.$toast('请先获取短信')
        return
      }
      if (!this.code) {
        this.$toast('请输入短信验证码')
        return
      }
      let _this = this

      Toast.loading({
        message: '',
        forbidClick: true,
        duration: 0,
      })
      //获取cid
      let cid = await this.getCid()
      // this.cid = cid

      var data = {
        transCode: 'USERLOGIN',
        mobileNo: _this.phone,
        smsOrder: _this.smsOrder,
        smsCode: _this.code,
        cid,
      }
      var ret = await _this.$api.reqFn(data)

      if (ret.retCode == 'SUCCESS') {
        _this.$store.state.token = ret.token
        _this.$store.state.phone = _this.phone

        _this.$store.state.Sign = ret.Sign
        _this.$store.state.frontSeq = ret.frontSeq

        if (ret.campusId) {
          localStorage.setItem('campusId', ret.campusId)
        }
        if (ret.cardFace) {
          localStorage.setItem('cardFace', ret.cardFace)
        }

        if (ret.userId) {
          localStorage.setItem('userId', ret.userId)
        }
        if (ret.cardNo) {
          localStorage.setItem('CardNo', ret.cardNo)
        }
        if (ret.userName) {
          localStorage.setItem('userName', ret.userName)
        }
        if (ret.idCardNo) {
          localStorage.setItem('idcardnum', ret.idCardNo)
        }
        localStorage.setItem('token', ret.token)
        localStorage.setItem('phone', _this.phone)
        localStorage.setItem('Sign', ret.Sign)
        localStorage.setItem('Sign', ret.frontSeq)
      } else {
        this.$toast(ret.retMsg)
      }
      setTimeout(() => {
        _this.$router.push({
          path: '/',
        })
      }, 1000)
      return
      setTimeout(function () {
        _this.$toast('登录成功，正在跳转')
        setTimeout(() => {
          _this.$router.push({
            path: '/',
          })
        }, 1500)
      }, 2000)
    },
    goRegisert() {
      this.$router.push({
        path: '/register',
      })
    },
    goforgot() {
      this.$router.push({
        path: '/forgot',
      })
    },
    changeNav(e) {
      this.active = e
      this.issend = false
      this.codeText = '发送验证码'
      clearInterval(this.timer)
      this.timer = null
      this.tim = 60
      // this.$router.push({
      // 	query: '',
      // 	path:'/login'
      // })
    },

    async getCode() {
      if (!this.phone) {
        this.$toast('请输入正确的手机号')
        return
      }
      const smsOrder = 'sms' + new Date().getTime()
      var data = {
        transCode: 'SMSREQUEST',
        mobileNo: this.phone,
        smsOrder: smsOrder,
      }

      // console.log(this.$getSign(paramsObj))
      let ret = await this.$api.sendMs(data)
      console.log(ret)
      if (ret.retCode == 'SUCCESS') {
        this.$toast('发送成功')
        this.orderNo = ret.orderNo
        this.smsOrder = smsOrder
      } else {
        return
      }
      this.issend = true
      this.timer = setInterval(() => {
        this.time -= 1
        this.codeText = this.time + ' s 重新发送'
        if (this.time <= 0) {
          clearInterval(this.timer)
          this.issend = false
          this.codeText = '重新发送'
          this.time = 60
        }
      }, 1000)
    },
  },
}
</script>
<style type="text/css" scoped>
.login {
  min-height: 100vh;
  background: white;
}

.tBox {
  position: relative;
}

.bg {
  width: 750px;
  height: 453px;
}

.logo {
  position: absolute;
  bottom: -59px;
  width: 170px;
  height: 170px;
  border-radius: 45px;
  box-shadow: 0px 15px 29px 2px rgba(217, 48, 37, 0.15);
  z-index: 1;
  left: 0;
  right: 0;
  margin: auto;
  background: #f27249;
}

.logo .icon {
  width: 100%;
  height: 100%;
  border-radius: 45px;
}

/*  */
.navs {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
}

.nav {
  width: 200px;
  text-align: center;
  padding-bottom: 20px;
  font-size: 32px;
  color: #cccccc;
  border-bottom: 4px solid #cccccc;
}

.active {
  font-weight: bold;
  color: #d93025;
  border-bottom: 4px solid #d93025;
}

.lists {
  margin-top: 50px;
}

.list {
  width: 540px;
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 20px;
  box-sizing: border-box;
  margin: auto;
  border-bottom: 1px solid #dddddd;
}

.list .phone {
  width: 29px;
}

.list .codeimg {
  width: 33px;
}

.listr {
  flex: 1;
  margin-left: 30px;
  display: flex;
  align-items: center;
  padding-right: 10px;
}

.listr input {
  height: 60px;
  border: none;
  outline: none;
  font-size: 28px;
  flex: 1;
  display: block;
  width: 150px;
}

.code {
  min-width: 140px;
  padding: 0 10px;
  box-sizing: border-box;
  height: 44px;
  background: #d93025;
  border-radius: 10px;
  color: white;
  line-height: 44px;
  text-align: center;
  margin-left: 22px;
  color: #d93025;
  background: white;
  font-size: 28px;
}

.code.send {
  /* background: #999999; */
  color: #999999;
  width: max-content;
}

.forgot {
  margin-top: 20px;
  color: #999999;
  text-align: right;
  padding-right: 125px;
}

.forgot span {
  font-size: 24px;
}

.bom {
  margin-top: 180px;
}

.noacount {
  font-size: 24px;
  color: #d93025;
  text-align: center;
  padding: 10px 0;
}

.btn {
  width: 640px;
  height: 88px;
  line-height: 88px;
  background: #d93025;
  border-radius: 44px;
  color: white;
  text-align: center;
  margin: 10px auto 0;
  font-size: 36px;
}

.btn:active {
  opacity: 0.8;
}

.tips {
  text-align: center;
  margin-top: 20px;
}

.tips span {
  font-size: 24px;
  color: #999999;
}

.tips .color {
  color: black;
}
</style>
