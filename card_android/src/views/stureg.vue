<template>
  <div class="login">
    <pheader :back="true" :title="''" :bg="'#d9302500'" :color="'white'"></pheader>
    <div class="tBox">
      <img class="bg" src="../assets/loginbg.png">
      <div class="logo">
        <img src="../assets/icon.png" alt="">
      </div>
    </div>
    <div>
      <div class="navs">
        <div class="nav" @click="changeNav(0)" :class="active==0?'active':''">
          学员注册
        </div>
      </div>
      <!-- 手机号 -->
      <div>
        <div class="lists">
          <div class="list" @click="showSchool = true">
            <img class="phone" src="../assets/school.png">
            <div class="listr">
              <input readonly="readonly" v-model="areaText" type="" name="" id="" value="" placeholder="所在校区" />
            </div>
          </div>
          <div class="list">
            <img class="codeimg" src="../assets/number.png">
            <div class="listr">
              <input v-model="member" type="" name="" id="" value="" placeholder="学生学号" />
            </div>
          </div>
          <div class="list">
            <img class="codeimg" src="../assets/pass.png">
            <div class="listr">
              <input v-model="pass" type="password" name="" id="" value="" placeholder="密码" />
            </div>
          </div>
          <div class="list">
            <img class="codeimg" src="../assets/pass.png">
            <div class="listr">
              <input v-model="pass1" type="password" name="" id="" value="" placeholder="确认密码" />
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
          注册
        </div>
      </div>
    </div>
    <van-popup v-model="showSchool" round position="bottom">
      <van-cascader v-model="cascaderValue" title="请选择所在校区" :options="options" @close="show = false" @finish="onFinish" :field-names="fieldNames" />
    </van-popup>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  name: 'login',
  components: {},
  data() {
    return {
      showSchool: false,
      active: 0,
      issend: false,
      codeText: '发送验证码',
      timer: null,
      time: 60,
      orderNo: '', //短信订单号
      phone: '', //手机号
      code: '', //手机验证码
      pass: '', //密码
      pass1: '',
      smsOrder: '', //
      areaText: '',
      schoolId: '',
      areaNo: '',

      cascaderValue: '',
      options: [],
      fieldNames: {
        text: 'schoolArea',
        value: 'schoolAreaNo',
        children: 'schoolAreas',
      },
      member: '',
    }
  },
  async created() {
    // console.log(111, this.$md5('test2123456HYT'))
    if (this.$route.query.nav) {
      this.active = this.$route.query.nav
    }
    this.getschool()
  },
  methods: {
    onFinish(e) {
      console.log(e)
      this.areaText = e.selectedOptions[0].schoolName + ' ' + e.selectedOptions[1].schoolArea
      this.schoolId = e.selectedOptions[0].schoolId
      this.areaNo = e.selectedOptions[1].schoolAreaNo
      this.showSchool = false
    },
    async getschool() {
      var data = {
        transCode: 'SCHOOLAREA',
        mobileNo: localStorage.getItem('phone'),
      }
      let ret = await this.$api.reqFn(data)
      if (ret.retCode == 'SUCCESS') {
        for (var i = 0; i < ret.schoolInfo.length; i++) {
          ret.schoolInfo[i].schoolAreaNo = ret.schoolInfo[i].schoolId
          ret.schoolInfo[i].schoolAreas = ret.schoolInfo[i].schoolArea
          ret.schoolInfo[i].schoolArea = ret.schoolInfo[i].schoolName
        }
        this.options = ret.schoolInfo
      }
    },
    async loginFn() {
      if (!this.schoolId || !this.areaNo) {
        this.$toast('请先选择校区')
        return
      }

      if (!this.pass) {
        this.$toast('请输入密码')
        return
      }
      if (!this.pass1) {
        this.$toast('请输入确认密码')
        return
      }
      if (this.pass1 != this.pass) {
        this.$toast('密码不一致，请重新输入')
        return
      }
      console.log(this.pass)
      console.log(this.$store.state.token)
      let _this = this
      var data = {
        transCode: 'MANLOGIN',
        mobileNo: localStorage.getItem('phone'),
        areaNo: this.areaNo,
        schoolId: this.schoolId,
        member: this.member,
        memberPasswd: md5(md5(this.member + this.pass + 'HYT') + this.$store.state.token),
      }
      console.log(data)
      var ret = await _this.$api.reqFn(data)
      console.log(ret)
      if (ret.retCode == 'SUCCESS') {
        localStorage.setItem('campusId', this.member)
        localStorage.setItem('cardFace', ret.cardFace)
        this.$dialog
          .alert({
            title: 'SUCCESS',
            message: '学员注册成功',
          })
          .then(() => {
            if (this.pass === '123456') {
              this.$dialog
                .alert({
                  message: '密码安全性过低，请修改密码!',
                })
                .then(() => {
                  this.$router.push({ name: 'stuset' })
                })
            } else {
              this.$router.go(-1)
            }
          })
          .catch(() => {})
      } else {
        //提示错误
        this.$toast(ret.retMsg)
      }
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
  background: white;
}

.logo img {
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
