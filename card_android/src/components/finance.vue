<template>
  <div class="home financehome">
    <div class="financehead">
      <span>金融</span>
    </div>
    <!-- <pheader :title="'金融'" :back="false"></pheader> -->
    <div class="top"></div>
    <div class="card">
      <div class="cardcb">
        <div class="cardc" style="opacity: 0;">
          <img src="../assets/home/yl.png">
          <div>
            <h3>招商银行</h3>
            <p>储蓄卡</p>
          </div>
        </div>
        <div class="cardNum" v-if="cardNum">
          <span class="cnum">
            {{cardNum.slice(0,4)}}
          </span>
          <!-- <span class="dot">
						<i></i>
						<i></i>
						<i></i>
						<i></i>
					</span> -->
          <span class="dot">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </span>
          <span class="dot">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </span>
          <span class="cnum">
            {{cardNum.substr(-4)}}
          </span>
        </div>
      </div>
    </div>
    <!--  -->
    <!-- <div class="navs">
      <div class="nav" @click="showPwd()">
        <img src="../assets/home/nav/nav1.png">
        <h4>余额</h4>
      </div>
      <div class="nav" @click="goconsume()">
        <img src="../assets/home/nav/nav2.png">
        <h4>消费记录</h4>
      </div>
      <div class="nav" @click="gorecharge()">
        <img src="../assets/home/nav/nav3.png">
        <h4>充值</h4>
      </div>
      <div class="nav" @click="gorechargelist()">
        <img src="../assets/home/nav/nav4.png">
        <h4>充值记录</h4>
      </div>
      <div class="nav" @click="goset()">
        <img src="../assets/home/nav/nav5.png">
        <h4>设置</h4>
      </div>
    </div> -->

    <div class="navs">
      <div v-show="financeList[0]==='余额存在'" class="nav" @click="showPwd()">
        <img src="../assets/home/nav/nav1.png">
        <h4>余额</h4>
      </div>
      <div v-show="financeList[1]==='消费记录存在'" class="nav" @click="goconsume()">
        <img src="../assets/home/nav/nav2.png">
        <h4>消费记录</h4>
      </div>
      <div v-show="financeList[2]==='充值存在'" class="nav" @click="gorecharge()">
        <img src="../assets/home/nav/nav3.png">
        <h4>充值</h4>
      </div>
      <div v-show="financeList[3]==='充值记录存在'" class="nav" @click="gorechargelist()">
        <img src="../assets/home/nav/nav4.png">
        <h4>充值记录</h4>
      </div>
      <div v-show="financeList[4]==='设置存在'" class="nav" @click="goset()">
        <img src="../assets/home/nav/nav5.png">
        <h4>设置</h4>
      </div>

      <!-- 网络差时默认显示设置 -->
      <div v-show="financeData.show" class="nav" @click="goset()">
        <img src="../assets/home/nav/nav5.png">
        <h4>设置</h4>
      </div>
    </div>

    <div class="passBox" :class="show?'showpassBox':''">
      <div class="listr" style="width: 90vw;padding: 3vw 0 0 0;border-radius: 10px;border: 1px solid #8F8F8F;margin: 3vw;width: 80vw;background: white;" id="pas1">
        <h2 style="margin-bottom: 3vw;text-align: center;">请输入密码</h2>
        <div :id="'areaNumber'+pwdid" style="width: auto;text-align: left;border: 1px solid #a89b9b;margin: 3vw;">
          <div :id="'numberInput'+pwdid" diasbled placeholder="请输入6位数字的交易密码" tabIndex="1" kbdtype="Number" action="/PasswordServlet" modulus-hex="a974e94429df917231eb905d71ec0386be6120c3132cebed6c932c55444d781b43f0616be8d19b9ad4e4e9e9762f384dd1fb4b81fee947a9b6c09966ee3d8f7efff035cb13528e0862641eb744a64aa91208ffa53c9f11df7293a50814c9e75c631604fe90caa91c78d8f2250ebd489451f3d20fdb8f6dc1e49e88555eb80fdd" readonly="readonly" style="width:100%;height:33px;line-height:33px;text-indent: 0.5em;font-family:微软雅黑,黑体;outline: none;">
          </div>
        </div>
        <div style="display: flex;justify-content: space-around;">
          <span @click="show = false" style="padding: 3vw;flex: 1;text-align: center;border-top: 1px solid #c4c4c4;">取消</span>
          <span @click="GetPwd()" style="padding: 3vw;flex: 1;color: #D53029;text-align: center;border-left: 1px solid #c4c4c4;border-top: 1px solid #c4c4c4;">确定</span>
        </div>
        <!-- <input v-model="formData.password" placeholder="请输入6位数字的交易密码" type="text"> -->
      </div>
    </div>

    <pfooter :active="0"></pfooter>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      num: 1,
      data: 'abs',
      cardNum: '',
      show: false,
      encpwd: '',
      pwdid: new Date().getTime(),

      financeList: ['余额', '消费记录', '充值', '充值记录', '设置'],
      //请求数据
      financeData: { show: true },
    }
  },
  activated() {
    this.num += 1
    console.log('created', this.num)
  },
  mounted() {
    console.log('mounted')
    console.log(this.pwdid)
    if (this.$store.state.current == 0) {
      $(window).loadKBD()
      var _this = this
      var id = '#numberInput' + _this.pwdid
      var areaId = 'areaNumber' + _this.pwdid
      $(id).click(function () {
        $(id).showKBD({
          areaId: areaId,
          pageId: 'opencard',
          maxLen: 6,
          cursor: true,
          mask: true,
        })
      })
    }
  },
  async created() {
    var paramsObj = {
      xid: 123,
      pageSize: 20,
      type: 1,
      pageNo: '',
      obj: {
        id: 1,
      },
      arr: [2, 3, 5],
    }
    this.cardNum = localStorage.getItem('CardNo') ? localStorage.getItem('CardNo') : ''
    // console.log(this.cardNum)
    // // var sign = getSign(paramsObj, kAppKey, kAppSecret);
    // console.log(this.$getSign(paramsObj))
    // let ret = await this.$api.loginFn(paramsObj);
    // console.log(ret)

    console.log('finance')

    //金融功能显示
    this.getFinance()
  },
  watch: {
    '$store.state.current': function (newData, old) {
      if (document.getElementById('PWDKBD')) {
        let PWDKBDdom = document.getElementById('PWDKBD')
        console.log(PWDKBDdom)
        if (PWDKBDdom) {
          document.body.removeChild(PWDKBDdom)
          if (document.getElementById('PWDKBD')) {
            this.removeDom()
          }
        }
      }
      if (newData == 0) {
        //执行金融页面的方法/请求
        this.cardNum = localStorage.getItem('CardNo') ? localStorage.getItem('CardNo') : ''
        $(window).loadKBD()
        var _this = this
        var id = '#numberInput' + this.pwdid
        var areaId = 'areaNumber' + this.pwdid
        console.log(id)
        $(id).click(function () {
          $(id).showKBD({
            areaId: areaId,
            pageId: 'opencard',
            maxLen: 6,
            cursor: true,
            mask: true,
          })
        })

        //金融功能显示
        this.getFinance()
      }
    },
  },
  methods: {
    //金融功能显示
    async getFinance() {
      let result = await this.$api.sendMs({ transCode: 'PAGEITEMS', pageName: '金融' })
      console.log(result)
      this.financeData = result

      this.financeList = ['余额', '消费记录', '充值', '充值记录', '设置']

      // 选取有的数据
      if (this.financeData.retCode === 'SUCCESS') {
        this.financeData.show = false

        this.financeList.forEach((item, index, arr) => {
          if (this.financeData.items.length !== 0) {
            this.financeData.items.forEach((item1, index1, arr1) => {
              if (item == item1) {
                // arr[index] = item + '存在'

                this.$set(this.financeList, index, item + '存在')
              }
            })
          }
        })
      }
      console.log(this.financeData.items)
    },

    GetPwd() {
      var _this = this
      var pwd = $('#numberInput' + _this.pwdid).getKBD()
      console.log(pwd)
      if (!pwd) {
        this.$toast('请输入密码')
        return
      } else {
        $.ajax({
          type: 'POST',
          url: 'https://online.gzekt.com/vcard/pwd/ValidServlet',
          async: true,
          headers: {
            SESSIONID: localStorage.getItem('sessionid'),
            token: localStorage.getItem('sessionid'),
          },
          data: {
            Password: pwd,
          },
          dataType: 'json',
          crossDomain: true,
          success: function (ret) {
            console.log(ret)
            if (ret.retcode == 0) {
              _this.encpwd = ret.encpwd
              _this.goBal()
            } else {
              this.$toast(ret.retmsg)
            }
          },
        })
      }
    },
    showPwd() {
      if (!this.cardNum) {
        this.$toast('请先开卡')
        return
      }
      this.show = true
    },
    goBal() {
      if (!this.cardNum) {
        this.$toast('请先开卡')
        return
      }
      this.$router.push({
        path: '/balance',
        query: {
          pwd: this.encpwd,
        },
      })
    },
    goconsume() {
      // if (!this.cardNum) {
      //   this.$toast('请先开卡')
      //   return
      // }

      if (!localStorage.getItem('wxId')) {
        this.$toast('请先签约')
        return
      }
      this.$router.push({
        path: '/consume',
      })
    },
    gorechargelist() {
      if (!this.cardNum) {
        this.$toast('请先开卡')
        return
      }
      this.$router.push({
        path: '/rechargelist',
      })
    },
    gorecharge() {
      if (!this.cardNum) {
        this.$toast('请先开卡')
        return
      }
      this.$router.push({
        path: '/recharge',
      })
    },
    goset() {
      // if (!this.cardNum) {
      //   this.$toast('请先开卡')
      //   return
      // }
      if (!localStorage.getItem('wxId')) {
        this.$toast('请先签约')
        return
      }
      this.$router.push({
        path: '/set',
      })
    },
  },
}
</script>
<style type="text/css" scoped>
.financehome {
  position: relative;
}
.financehead {
  position: absolute;
  height: 88px;
  left: 0;
  right: 0;
  color: white;

  text-align: center;
  line-height: 88px;
}
.financehead span {
  font-size: 36px;
}
.top {
  height: 363px;
  background: #d93025;
  border-bottom-left-radius: 100px;
  border-bottom-right-radius: 100px;
}

.card {
  border-radius: 18px;
  width: 698px;
  height: 448px;
  /* background-image: url(../assets/home/bank.png); */
  /* background-image: url(../assets/home/guangZhouBank.png); */
  background-image: url(../assets/home/guangFaBank.png);
  background-size: 100% 100%;
  margin: -200px auto;
  padding: 50px;
  box-sizing: border-box;
}

.cardc {
  display: flex;
  align-items: center;
}

.cardc img {
  width: 74px;
  height: 46px;
  margin-right: 50px;
}

.cardc h3 {
  font-size: 36px;
}

.cardc p {
  font-size: 24px;
  margin-top: 37px;
  color: #333333;
}

.cardcb {
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cardNum {
  display: flex;
  align-items: center;
}

.cardNum i {
  display: block;
  width: 10px;
  height: 10px;
  background: black;
  border-radius: 50%;
  margin-right: 10px;
}

.cardNum .dot {
  display: flex;
  align-items: center;
  margin-right: 40px;
  margin: 0 20px;
}

.cnum {
  font-size: 60px;
}

.navs {
  padding: 25px;
  margin-top: 220px;
  display: flex;
  flex-wrap: wrap;
}

.nav {
  width: 220px;
  height: 220px;
  margin-right: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #333333;

  /* 注释掉 */
  /* background-color: #bfbfbf; */
}

/* 注释掉 */
/* .nav:nth-of-type(2) {
  background-color: #ffffff;
} */

.nav:nth-child(3n + 3) {
  margin-right: 0;
}

.nav h4 {
  font-size: 28px;
  margin-top: 20px;
}

.navs img {
  width: 80px;
  height: 80px;
}

.passBox {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  transform: scale(0);
  transform-origin: 20% 55%;
  transition: all 0.3s;
  padding-bottom: 50vw;
}

.showpassBox {
  transform: scale(1);
}
</style>
