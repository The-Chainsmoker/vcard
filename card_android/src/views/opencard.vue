<template>
  <div class="opencard" id="opencard">
    <pheader :title="'开卡'" :back="true"></pheader>
    <!--  -->
    <div class="count">
      <div class="temps">
        <div class="temp">
          <div class="tempt" :class="temp==0?'active':''">
            <span v-if="temp > 0">
              <img src="../assets/dui.png">
            </span>
            <span class="circle" v-if="temp == 0"></span>
          </div>
          <span class="text" :class="{textold:temp > 0,textac:temp ==0}">信息录入</span>
        </div>
        <div class="line" v-show="formDataYL.type == 'idcard'">
          <div></div>
        </div>
        <div class="temp" v-show="formDataYL.type == 'idcard'">
          <div class="tempt" :class="temp==1?'active':''">
            <span v-if="temp > 1">
              <img src="../assets/dui.png">
            </span>
            <span class="circle" v-if="temp == 1"></span>
            <span class="next" v-if="temp == 0"></span>
          </div>
          <span class="text" :class="{textold:temp > 1,textac:temp ==1}">证件上传</span>
        </div>
        <div class="line">
          <div></div>
        </div>
        <div class="temp">
          <div class="tempt" :class="temp==2?'active':''">
            <span v-if="temp > 2">
              <img src="../assets/dui.png">
            </span>
            <span class="circle" v-if="temp == 2"></span>
            <span class="next" v-if="temp < 2"></span>
          </div>
          <span class="text" :class="{textold:temp > 2,textac:temp ==2}">开卡</span>
        </div>
        <div class="line">
          <div></div>
        </div>
        <div class="temp">
          <div class="tempt" :class="temp==3?'active':''">
            <span v-if="temp > 3">
              <img src="../assets/dui.png">
            </span>
            <span class="circle" v-if="temp == 3"></span>
            <span class="next" v-if="temp < 3"></span>
          </div>
          <span class="text" :class="{textold:temp > 3,textac:temp ==3}">完成</span>
        </div>
      </div>
      <!--  -->
      <div class="cBox">
        <!-- 信息录入 -->
        <div class="" v-if="temp == 0">
          <div class="lists">
            <div class="list">
              <span class="listl">手机号</span>
              <div class="listr">
                <input v-model="formDataYL.mapEncrypt.phoneNo" placeholder="请输入手机号" type="tel" @input="checkFull">
              </div>
            </div>
            <div class="list">
              <span class="listl">姓名</span>
              <div class="listr">
                <input v-model="formDataYL.mapEncrypt.customerNm" placeholder="请输入姓名" type="text" @input="checkFull">
              </div>
            </div>
            <!-- <div class="list">
              <span class="listl">性别</span>
              <div class="listr">
                <van-radio-group v-model="formData.gender" direction="horizontal">
                  <van-radio checked-color="#ee0a24" name="M">男</van-radio>
                  <van-radio checked-color="#ee0a24" name="F">女</van-radio>
                </van-radio-group>
              </div>
            </div> -->
            <!-- <div class="list">
              <span class="listl">职业</span>
              <div class="listr">
                <select name="userOccupation" v-model="formData.userOccupation">
                  <option value="24">教学人员</option>
                  <option value="Y1">学生</option>
                  <option value="Y9">其他从业</option>
                </select>
              </div>
            </div> -->
            <!-- <div class="list">
              <span class="listl">国籍</span>
              <div class="listr">
                <select name="countryCode" v-model="formData.countryCode">
                  <option value="156">中国</option>
                </select>
              </div>
            </div> -->
            <div class="list" @click="showcardnum = true">
              <span class="listl">身份证号</span>
              <div class="listr">
                <input readonly="readonly" v-model="formDataYL.mapEncrypt.certifId" placeholder="请输入身份证号" type="text">
                <!-- <img class="cama" src="../assets/camara.png"> -->
              </div>
            </div>
            <van-number-keyboard v-model="formDataYL.mapEncrypt.certifId" :show="showcardnum" :maxlength="18" extra-key="X" close-button-text="完成" @blur="showcardnum = false" @input="onInput" @delete="onDelete" @hide="checkFull" />

            <div class="list" @click="show = true">
              <span class="listl">银行卡号</span>
              <div class="listr">
                <input readonly="readonly" v-model="formDataYL.mapEncrypt.priAccNo" placeholder="请输入银行卡号" type="text">
                <!-- <img class="cama" src="../assets/camara.png"> -->
              </div>
            </div>
            <van-number-keyboard v-model="formDataYL.mapEncrypt.priAccNo" :maxlength="19" :show="show" close-button-text="完成" @blur="show = false" @input="onInput" @delete="onDelete" @hide="checkFull" />

            <!-- <div class="list">
              <span class="listl">身份证是否长期</span>
              <div class="listr">
                <vswitch :value="value" :FId="FId" :index="index" class="vswitch" :handle="true" @changeSwitch="changeSwitch"></vswitch>
              </div>
            </div> -->
            <!-- <div class="list" @click="showTimerFN('idCardIssueDate')">
              <span class="listl">证件签发日</span>
              <div class="listr" style="position: relative;">
                <input readonly="readonly" style="width: 50vw;display: block;background: none;line-height: 40px;" v-model="formData.idCardIssueDate" placeholder="请选择证件签发日" type="">
              </div>
            </div> -->
            <!-- <div class="list" @click="showTimerFN('idCardExpDate')" v-if="formData.idNeverExpired != '1'">
              <span class="listl">证件到期日</span>
              <div class="listr" style="position: relative;">
                <input readonly="readonly" style="width: 50vw;display: block;background: none;line-height: 40px;" v-model="formData.idCardExpDate" placeholder="请选择证件到期日" type="">
              </div>
            </div> -->
            <div class="list" @click="formDataYL.type = 'idcard'">
              <span class="listl">凭身份证开卡</span>
              <div class="listr">
                <span class="circle" :class="formDataYL.type == 'idcard'?'circleac':''">
                  <img v-if="formDataYL.type == 'idcard'" src="../assets/dui.png">
                </span>
              </div>
            </div>
            <div class="list" @click="formDataYL.type = 'one'">
              <span class="listl">凭本人一类卡开卡</span>
              <div class="listr">
                <span class="circle" :class="formDataYL.type == 'idcard'?'':'circleac'">
                  <img v-if="formDataYL.type != 'idcard'" src="../assets/dui.png">
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- 证件上传 -->
        <div v-if="temp == 1">
          <div class="zjBox" v-if="formData.type == 'idcard'">
            <div class="idcardBox" style="position: relative;">
              <img v-if="formDataYL.idCardPicP" style="width: 95%;height:90%;border-radius: 10px;" :src="formDataYL.idCardPicP">
              <img v-else class="cam" src="../assets/cam.png">
              <!-- <van-uploader :after-read="afterRead" v-model="fileList" multiple :max-count="2" /> -->

              <div style="position: absolute;left: 0;right: 0;top: 0;bottom: 0;display: flex;align-items: center;justify-content: center;opacity: 0;">
                <van-uploader name="file" :after-read="afterRead" style="width: 100%;height: 100%;" :max-size="6000 * 1024" @oversize="onOversize">
                </van-uploader>

                <!-- <input @change="tirggerFile($event)" type="file" name="file"
									accept="image/*"> -->
              </div>
            </div>
            <div class="idcardBox idcardBoxf" style="position: relative;">
              <img v-if="formDataYL.idCardPicN" style="width: 95%;height:90%;border-radius: 10px;" :src="formDataYL.idCardPicN">
              <img v-else class="cam" src="../assets/cam.png">
              <div style="position: absolute;left: 0;right: 0;top: 0;bottom: 0;display: flex;align-items: center;justify-content: center;opacity: 0;">
                <van-uploader :after-read="afterRead1" style="width: 100%;height: 100%;" :max-size="6000 * 1024" @oversize="onOversize">
                </van-uploader>
              </div>
            </div>
          </div>

          <div v-else>
            <div class="idcardBox firstcard">
              <div class="firstcardBox">
                <img class="cam" src="../assets/cam.png">
                <p class="firstcardText">上传本人一类卡</p>
              </div>
            </div>
            <div>
              <div class="list">
                <span class="listl">银行卡号</span>
                <div class="listr">
                  <input v-model="formData.onecardnum" placeholder="请输入一类卡卡号" type="text">
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 激活 -->
        <div v-show="temp == 2">
          <div class="jhBox">
            <!-- <div class="list">
              <span class="listl">设置交易密码</span>
              <div class="listr" id="pas1">
                <div :id="'areaNumber'+pwdid" style="width: 100%;text-align: right;">
                  <div :id="'numberInput'+pwdid" diasbled placeholder="请输入6位数字的交易密码" tabIndex="1" kbdtype="Number" action="/PasswordServlet" modulus-hex="a974e94429df917231eb905d71ec0386be6120c3132cebed6c932c55444d781b43f0616be8d19b9ad4e4e9e9762f384dd1fb4b81fee947a9b6c09966ee3d8f7efff035cb13528e0862641eb744a64aa91208ffa53c9f11df7293a50814c9e75c631604fe90caa91c78d8f2250ebd489451f3d20fdb8f6dc1e49e88555eb80fdd" readonly="readonly" style="width:100%;height:33px;line-height:33px;text-indent: 0.5em;font-family:微软雅黑,黑体;outline: none;">
                  </div>
                </div>
              </div>
            </div> -->
            <!-- <div class="list">
              <span class="listl">确认密码</span>
              <div class="listr" id="pas2">
                <div :id="'areaNumber2'+pwdid" style="width: 100%;text-align: right;">
                  <div :id="'numberInput2'+pwdid" placeholder="请输入6位数字的交易密码" tabIndex="1" kbdtype="Number" action="/PasswordServlet" modulus-hex="a974e94429df917231eb905d71ec0386be6120c3132cebed6c932c55444d781b43f0616be8d19b9ad4e4e9e9762f384dd1fb4b81fee947a9b6c09966ee3d8f7efff035cb13528e0862641eb744a64aa91208ffa53c9f11df7293a50814c9e75c631604fe90caa91c78d8f2250ebd489451f3d20fdb8f6dc1e49e88555eb80fdd" readonly="readonly" style="width:100%;height:33px;line-height:33px;text-indent: 0.5em;font-family:微软雅黑,黑体;outline: none;">
                  </div>
                </div>
              </div>
            </div> -->
            <div class="list">
              <span class="listl">手机号</span>
              <div class="listr">
                <input v-model="formDataYL.mapEncrypt.phoneNo" placeholder="请输入手机号" type="text">
              </div>
            </div>
            <div class="list">
              <span class="listl">验证码</span>
              <div class="listr">
                <input v-model="formDataYL.mapEncrypt.msgCode" placeholder="请输入验证码" type="text">
                <div @click="getCode()" class="code" :class="issend?'send':''">
                  {{codeText}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 完成 -->
        <div v-if="temp == 3" class="kkBox">
          <div v-if="iserror" class="error">
            <img src="../assets/kkerror.png">
            <p>很遗憾！激活失败!</p>
          </div>
          <div v-else>
            <img src="../assets/kksuccess.png">
            <p>恭喜！已成功激活!</p>
          </div>
        </div>
      </div>
      <!--  -->
      <div v-if="iserror && temp == 3">
        <div class="btn" @click="againFn()">
          再次激活
        </div>
        <div @click="backhome()" class="btn" style="margin-top: 20px;background: white;color: #D93025;border: 1px solid #D93025;">
          返回首页
        </div>
      </div>
      <div v-else>
        <div class="btn" :class="canClick?'canClick':'noclick'" @click="nextFn()">
          {{temp == 0?'下一步':''}}
          {{temp == 1?'下一步':''}}
          {{temp == 2?'完成':''}}
          {{temp == 3?'完成':''}}
        </div>

        <div class="agreement" v-show="ylAgreement">
          <div class="select" @click="agreeSelect">
            <img v-show="agree" src="../assets/dui.png" alt="">
            <span v-show="!agree"></span>
          </div>
          <span>已阅读并同意一下协议：<a href="javascript:(0)">《隐私政策》</a> <a href="javascript:(0)">《银联服务协议》</a></span>
        </div>

      </div>
    </div>
    <div>
      <van-popup v-model="showTimer" position="bottom">
        <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" :formatter="formatter" @cancel="showTimer = false" @confirm="confirmTime" />
      </van-popup>

    </div>
    <div>
      <!-- <van-popup v-model="showImg" position="center"> -->
      <div v-if="showImg" style="height: 100vh;width: 100vw;position: fixed;top: 0;bottom: 0;right: 0;z-index: 999999;background: white;">
        <croptep @cancelCut="cancelCut" @sureCut="sureCut" :imgSrc="imgSrc"></croptep>
      </div>
      <!-- </van-popup> -->
    </div>
  </div>
</template>

<script>
// import Compressor from 'compressorjs';
import croptep from '@/components/croptep.vue'
import Exif from 'exif-js'
export default {
  name: 'opencard',
  components: {
    croptep, //裁剪插件
  },
  data() {
    return {
      curtType: '',
      imgSrc: '',
      showImg: false,
      showTimer: false,
      idcardDatetype: 'idCardIssueDate', //idCardIssueDate,idCardExpDate
      minDate: new Date(1800, 0, 1),
      maxDate: new Date(2100, 10, 1),
      currentDate: new Date(),

      temp: 0, //0证件上传，1身份验证, 2 激活
      iserror: true,
      photoType: '',
      showcardnum: false, //身份证键盘
      show: false, //银行卡键盘
      formData: {
        phone: '', //手机号
        name: '', //姓名
        cardnum: '', //身份证号
        idNeverExpired: '', //身份证是否长期
        idCardIssueDate: '', //证件签发日
        idCardExpDate: '', //证件到期日
        userOccupation: '', //用户职业，24教学人员 Y1学生 Y9不便分类的其他从业
        gender: '', //用户性别，M-男 F-女
        countryCode: '156', //用户国籍
        type: 'idcard', //开卡类型idcard,card
        idPhotoFront: '', //正面
        idPhotoBack: '', //反面
        onecardnum: '', //一类卡卡号
        password: '',
        passwordagain: '',
        code: '',
      },
      issend: false,
      codeText: '发送验证码',
      timer: null,
      time: 60,
      //
      value: false,
      FId: '123',
      index: 0,
      userInfo: null, //用户信息
      encpwd: '', //加密之后的密码报文
      smsOrder: '', //
      orderNo: '', //短信订单号
      cardNo: '', //卡号
      pwdid: new Date().getTime(),
      canClick: false,

      //银联
      formDataYL: {
        // queryId: '', //请求id(唯一性)，其格式固定为： 交易发起方机构代码（8 位）+交易发起方系统的交易日期时间（14位）+交易发起方系 统流水号（6 位）。该流水号由交易发起方平 台生成，取值从 000001-999999 循环使用。 查询流水号是交易的唯一主键
        md5: '',
        /*选填参数;  交易类型为影印件采集传字段*/
        idCardPicP: '', //身份证照片正面
        idCardPicN: '', //身份证照片反面
        facePic: '', //人脸影像照片
        /*动态参数;  根据交易类型封装*/
        mapEncrypt: {
          bussTp: '', //新开立Ⅲ类账户
          issInsCode: '', //II/III 类账户开户行机 构代码'
          priAccNo: '', //绑定账户卡号
          certifId: '', //身份证号码
          customerNm: '', //姓名
          phoneNo: '', //手机号
          msgCode: '', //短信验证码
        },

        type: 'idcard', //开卡的类型
      },
      agree: false, //同意协议
      ylAgreement: true, //协议在显隐
    }
  },
  watch: {
    formData: {
      handler: function (a) {
        if (a.phone) {
          if (a.phone.length > 11) {
          }
          a.phone = parseInt(a.phone)
        } else {
          a.phone = ''
        }
        console.log(a)
      },
      deep: true,
    },
  },
  async created() {
    this.userInfo = {
      userId: localStorage.getItem('userId') || '',
    }
    this.formData.phone = this.$store.state.phone || localStorage.getItem('phone') || ''
    this.cardNo = localStorage.getItem('CardNo') || ''
    this.formData.cardnum = localStorage.getItem('idcardnum') || ''
    this.formData.name = localStorage.getItem('userName') || ''

    //银联
    this.formDataYL.mapEncrypt.phoneNo =
      this.$store.state.phone || localStorage.getItem('phone') || ''
  },
  async mounted() {
    // $("window").loadKBD("https://online.gzekt.com/vcard/pwd/PasswordServlet");
    var id = '#numberInput' + this.pwdid
    var areaId = 'areaNumber' + this.pwdid
    var id2 = '#numberInput2' + this.pwdid
    var areaId2 = 'areaNumber2' + this.pwdid
    $(window).loadKBD()
    $(id).click(function () {
      $(id).showKBD({
        areaId: areaId,
        pageId: 'opencard',
        maxLen: 6,
        cursor: true,
        mask: true,
      })
    })
    $(id2).click(function () {
      $(id2).showKBD({
        areaId: areaId2,
        pageId: 'opencard',
        maxLen: 6,
        cursor: true,
        mask: true,
      })
    })
    // $(window).loadKBD("https://online.gzekt.com/vcard/pwd/PasswordServlet");
    // $("#pas1").showKBD({
    // 	"areaId": "areaGraph",
    // 	"pageId": "page",
    // 	"maxLen": 10,
    // 	"cursor": true,
    // 	"mask": true,
    // 	"exponent_hex": "10001",
    // });
  },
  methods: {
    //同意协议
    agreeSelect() {
      this.agree = !this.agree
      this.checkFull()
      // console.log(this.agree)
    },

    //检查信息录入
    checkFull() {
      // console.log(213)
      console.log(this.formDataYL.mapEncrypt.priAccNo)
      if (
        this.formDataYL.mapEncrypt.phoneNo &&
        this.formDataYL.mapEncrypt.customerNm &&
        this.formDataYL.mapEncrypt.certifId &&
        this.formDataYL.mapEncrypt.priAccNo &&
        this.agree
      ) {
        this.canClick = true
      } else {
        this.canClick = false
      }
    },

    //14位时间数格式
    formatData() {
      function p(s) {
        return s < 10 ? '0' + s : s
      }

      let myDate = new Date()
      //获取当前年
      let year = myDate.getFullYear()
      //获取当前月
      let month = myDate.getMonth() + 1
      //获取当前日
      let date = myDate.getDate()

      let Hours = myDate.getHours()

      let Minutes = myDate.getMinutes()

      let Seconds = myDate.getSeconds()

      return year + p(month) + p(date) + p(Hours) + p(Minutes) + p(Seconds)
    },

    formatter(type, val) {
      if (type === 'year') {
        return val + '年'
      }
      if (type === 'month') {
        return val + '月'
      }
      if (type === 'day') {
        return val + '日'
      }
      return val
    },
    confirmTime(val) {
      let year = val.getFullYear()
      let month = val.getMonth() + 1
      let day = val.getDate()
      let hour = val.getHours()
      let minute = val.getMinutes()
      if (month >= 1 && month <= 9) {
        month = `0${month}`
      }
      if (day >= 1 && day <= 9) {
        day = `0${day}`
      }
      if (hour >= 0 && hour <= 9) {
        hour = `0${hour}`
      }
      if (minute >= 0 && minute <= 9) {
        minute = `0${minute}`
      }

      var timeValue = `${year}-${month}-${day}`

      if (this.idcardDatetype == 'idCardIssueDate') {
        this.formData.idCardIssueDate = timeValue
      } else if (this.idcardDatetype == 'idCardExpDate') {
        this.formData.idCardExpDate = timeValue
      }
      this.showTimer = false
      console.log(val)
    },
    showTimerFN(e) {
      this.idcardDatetype = e
      this.showTimer = true
    },
    //获取售卡
    async getsalCard() {
      var _this = this
      _this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      var data = {
        transCode: 'SALECARD1',
        mobileNo: this.formData.phone ? JSON.stringify(this.formData.phone) : '', //手机号
        userId: this.userInfo.userId,
        userName: this.formData.name, //姓名
        idCardNo: this.formData.cardnum, //身份证号
        idCardIssueDate: this.formData.idCardIssueDate.replace(/-/g, ''), //证件签发日
        idCardExpDate:
          this.formData.idNeverExpired == '1' ? '' : this.formData.idCardExpDate.replace(/-/g, ''), //证件到期日,YYYYMMDD(有效期非长期时填写)
        idNeverExpired: this.formData.idNeverExpired, //证件是否长期有效,1-长期有效（与证件到期日二选一必填）
        userOccupation: this.formData.userOccupation, //用户职业,24	教学人员 Y1	学生Y9	不便分类的其他从业
        gender: this.formData.gender, //用户性别M-男 F-女
      }
      console.log(data)
      // return
      let ret = await this.$api.reqFn(data)
      this.$toast.clear()
      console.log(ret)
      if (ret.retCode == 'SUCCESS') {
        this.temp += 1
        this.cardNo = ret.CardNo
        localStorage.setItem('CardNo', ret.CardNo)
      } else {
        this.$dialog.alert({
          title: ret.retMsg,
        })
      }
    },
    async register() {
      var data = {}
      let ret = this.$api.reqFn(data)
    },
    reset() {
      this.temp = 0
      this.temp = 2
      this.issend = false
      this.iserror = true
      this.codeText = '发送验证码'
      clearInterval(this.timer)
      this.timer = null
      this.tim = 60
      this.formData = {
        phone: '', //手机号
        name: '', //姓名
        cardnum: '', //身份证号
        idNeverExpired: '', //身份证是否长期
        idCardIssueDate: '', //证件签发日
        idCardExpDate: '', //证件到期日
        userOccupation: '', //用户职业，24教学人员 Y1学生 Y9不便分类的其他从业
        gender: '', //用户性别，M-男 F-女
        countryCode: '156', //用户国籍
        type: 'idcard', //开卡类型
        onecardnum: '', //一类卡卡号
        password: '',
        passwordagain: '',
        code: '',
      }
      this.formData.phone = this.$store.state.phone || localStorage.getItem('phone') || ''
      this.cardNo = localStorage.getItem('CardNo') || ''
      this.formData.cardnum = localStorage.getItem('idcardnum') || ''
      this.formData.name = localStorage.getItem('userName') || ''
    },
    changeSwitch(e) {
      console.log(e)
      if (e) {
        this.formData.idNeverExpired = 1
      } else {
        this.formData.idNeverExpired = ''
      }
    },
    async getCode() {
      var _this = this
      if (!this.formData.phone) {
        this.$toast('请输入手机号')
        // return
      }

      //格式化queryId(流水号)
      let num = (Math.random() * 1000000).toFixed(0)
      let numFormat = num.length < 6 ? '0' + num : num
      let queryId = 11111111 + this.formatData() + numFormat
      localStorage.setItem('queryId', queryId)
      console.log(queryId)

      //身份验证(验证码)
      var data = {
        transCode: 'REALAUTH',
        txnType: 'SA001',
        queryId,
        md5: '',
        mapEncrypt: {
          issInsCode: 'II/III类账户开户行机构代码',
          bussTp: this.formDataYL.mapEncrypt.bussTp, //03-新开立III类账户
          priAccNo: this.formDataYL.mapEncrypt.priAccNo, //绑定账户卡号
          certifId: this.formDataYL.mapEncrypt.certifId, //身份证号码
          customerNm: this.formDataYL.mapEncrypt.customerNm, //姓名
          phoneNo: localStorage.getItem('phone'), //手机号
        },
      }
      console.log(data)

      let ret = await this.$api.reqFn(data)
      console.log(ret)

      if (ret.data.respCode === '00') {
        this.canClick = true
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
      }

      // var id = '#numberInput' + this.pwdid
      // var id1 = 'numberInput' + this.pwdid
      // var areaId = 'areaNumber' + this.pwdid
      // var id2 = '#numberInput2' + this.pwdid
      // var areaId2 = 'areaNumber2' + this.pwdid
      // var val = $(id2).checkPWD(id1)
      // switch (val) {
      //   case 1:
      //     // alert("输入一致");
      //     // this.$toast('')
      //     break
      //   case 2:
      //     this.$toast('密码输入不一致')
      //     // alert("输入不一致");
      //     return
      //   case 3:
      //     this.$toast('请输入确认密码')
      //     // alert("请输入确认密码");
      //     return
      //   case 4:
      //     this.$toast('请输入密码')
      //     // alert("请输入密码");
      //     return
      //   case 5:
      //     this.$toast('请输入密码和确认密码')
      //     // alert("请输入密码和确认密码");
      //     return
      // }
      // var pwd = $(id).getKBD()
      // if (!pwd) {
      //   this.$toast('请输入密码')
      // } else {
      //   $.ajax({
      //     type: 'POST',
      //     url: 'https://online.gzekt.com/vcard/pwd/ValidServlet',
      //     async: true,
      //     headers: {
      //       SESSIONID: localStorage.getItem('sessionid'),
      //       token: localStorage.getItem('sessionid'),
      //     },
      //     data: {
      //       Password: pwd,
      //     },
      //     dataType: 'json',
      //     crossDomain: true,
      //     success: function (ret) {
      //       console.log(ret)
      //       if (ret.retcode == 0) {
      //         _this.encpwd = ret.encpwd
      //         _this.sendCode()
      //       } else {
      //         this.$toast(ret.retmsg)
      //       }
      //     },
      //   })
      // }
      // return
      // var pwd2 = $(id2).getKBD()
      // if (!pwd2) {
      //   this.$toast('请输入确认密码')
      // } else {
      // }
    },
    async sendCode() {
      const smsOrder = 'sms' + new Date().getTime()
      var data = {
        transCode: 'RESETPASSWD1',
        smsOrder: smsOrder,
        mobileNo: JSON.stringify(this.formData.phone),
        userName: this.formData.name,
        idCardNo: this.formData.cardnum,
        cardNo: this.cardNo,
      }
      localStorage.setItem('idcardnum', this.formData.cardnum)
      localStorage.setItem('userName', this.formData.name)

      // console.log(this.$getSign(paramsObj))
      let ret = await this.$api.sendMs(data)
      console.log(ret)
      if (ret.retCode == 'SUCCESS') {
        this.canClick = true
        this.orderNo = ret.orderNo
        this.smsOrder = smsOrder
      } else {
        this.$toast(ret.retMsg)
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
    backhome() {
      this.$router.push({
        path: '/',
      })
      // window.open('/')
    },
    againFn() {
      this.reset()
    },
    async setPwd() {
      this.$toast.loading({
        message: '开卡中...',
        forbidClick: true,
      })

      if (!this.formDataYL.mapEncrypt.msgCode) {
        this.$toast('短信码不能为空！')
        return
      }

      // var data = {
      //   transCode: 'RESETPASSWD2',
      //   mobileNo: this.formData.phone ? JSON.stringify(this.formData.phone) : '', //手机号
      //   cardNo: this.cardNo,
      //   smsOrder: this.smsOrder,
      //   smsCode: this.formData.code,
      //   newCardPin: this.encpwd,
      // }

      //格式化queryId(流水号)
      let num = (Math.random() * 1000000).toFixed(0)
      let numFormat = num.length < 6 ? '0' + num : num
      let queryId = 11111111 + this.formatData() + numFormat
      localStorage.setItem('queryId', queryId)
      console.log(queryId)

      var data = {
        transCode: 'RESETPASSWD2',
        txnType: 'SA002',
        queryId,
        md5: '',
        mapEncrypt: {
          issInsCode: 'II/III类账户开户行机构代码',
          bussTp: this.formDataYL.mapEncrypt.bussTp, //03-新开立III类账户
          priAccNo: this.formDataYL.mapEncrypt.priAccNo, //绑定账户卡号
          customerNm: this.formDataYL.mapEncrypt.customerNm, //姓名
          certifId: this.formDataYL.mapEncrypt.certifId, //身份证号码,
          phoneNo: localStorage.getItem('phone'), //手机号,
          msgCode: this.formDataYL.mapEncrypt.msgCode, //短信验证码,
        },
      }
      console.log(data)
      // return
      let ret = await this.$api.reqFn(data)
      this.$toast.clear()
      console.log(ret)

      if (ret.data.respCode === '00') {
        this.$toast('开卡成功')
        this.iserror = false
        this.temp += 1
        // var _this = this
        // this.$dialog
        //   .confirm({
        //     title: '绑定云闪付',
        //     message: '成功绑定后，可在云闪付APP中查看并使用该卡。',
        //   })
        //   .then(() => {
        //     // on confirm
        //     _this.bdysf()
        //   })
        //   .catch(() => {
        //     // on cancel
        //   })
      } else {
        // this.$toast(ret.retMsg)
        this.$toast('开卡失败!')
        this.iserror = true
        this.temp += 1
      }

      // if (ret.retCode == 'SUCCESS') {
      //   this.$toast('激活成功')
      //   this.iserror = false
      //   this.temp += 1
      //   var _this = this
      //   this.$dialog
      //     .confirm({
      //       title: '绑定云闪付',
      //       message: '成功绑定后，可在云闪付APP中查看并使用该卡。',
      //     })
      //     .then(() => {
      //       // on confirm
      //       _this.bdysf()
      //     })
      //     .catch(() => {
      //       // on cancel
      //     })
      // } else {
      //   this.$toast(ret.retMsg)
      //   this.iserror = true
      //   this.temp += 1
      // }
    },
    async bdysf() {
      var data = {
        transCode: 'BINDYSF',
        mobileNo: this.formData.phone ? JSON.stringify(this.formData.phone) : '', //手机号
        cardNo: this.cardNo,
      }
      console.log(data)
      // return
      let ret = await this.$api.reqFn(data)
      if (ret.retCode == 'SUCCESS') {
        this.$toast('绑定成功')
      }
    },
    nextFn() {
      console.log(this.temp)
      if (this.temp == 0) {
        //信息录入
        this.enterInfo()
      } else if (this.temp == 1) {
        //证件上传
        this.upImgFn()
      } else if (this.temp == 2) {
        //激活
        this.setPwd()
      } else if (this.temp == 3) {
        //完成
        this.backhome()
      }
      return
      if (this.temp >= 3) {
        this.backhome()
        return
      }
      this.temp += 1
      console.log(this.formData)
    },
    async upImgFn() {
      // var idPhotoFront = this.formData.idPhotoFront
      // var idPhotoBack = this.formData.idPhotoBack
      // console.log(this.formData.idPhotoFront)
      // console.log(this.formData.idPhotoBack)
      // idPhotoFront = idPhotoFront.substring(idPhotoFront.indexOf('base64') + 1, idPhotoFront.length)
      // idPhotoBack = idPhotoBack.substring(idPhotoBack.indexOf('base64') + 1, idPhotoBack.length)
      // var data = {
      //   transCode: 'UPLOADPHOTO',
      //   mobileNo: this.formData.phone ? JSON.stringify(this.formData.phone) : '',
      //   userId: this.userInfo.userId,
      //   userName: this.formData.name, //姓名
      //   idCardNo: this.formData.cardnum,
      //   photoType: this.photoType, //影印件类型01-jpg,02-png,03-jpeg ,04-bmp
      //   idPhotoFront: idPhotoFront.slice(6),
      //   idPhotoBack: idPhotoBack.slice(6),
      // }
      // console.log(data)
      // // return
      // this.$toast.loading({
      //   message: '证件处理中',
      //   forbidClick: true,
      // })
      // let ret = await this.$api.reqFn(data)
      // console.log(ret)

      if (!this.formDataYL.idCardPicP || !this.formDataYL.idCardPicN) {
        this.$toast('请上传完整的身份证件！')
        return
      }

      //格式化queryId(流水号)
      let num = (Math.random() * 1000000).toFixed(0)
      let numFormat = num.length < 6 ? '0' + num : num
      let queryId = 11111111 + this.formatData() + numFormat
      // localStorage.setItem('queryId', queryId)
      console.log(queryId)

      let data = {
        transCode: 'UPLOADPHOTO',
        txnType: 'SA029',
        queryId,
        md5: '',
        idCardPicP: this.formDataYL.idCardPicP,
        idCardPicN: this.formDataYL.idCardPicN,
        facePic: '人脸影像照片',
        mapEncrypt: {
          bussTp: this.formDataYL.mapEncrypt.bussTp, //03-新开立III类账户 '新开立Ⅲ类账户',
          issInsCode: 'II/III 类账户开户行机 构代码',
        },
      }

      let ret = await this.$api.reqFn(data)
      console.log(ret)

      if (ret.data.respCode === '00') {
        // $(window).loadKBD();
        // $("#numberInput").click(function() {
        // 	$("#numberInput").showKBD({
        // 		areaId: "areaNumber",
        // 		pageId: "opencard",
        // 		maxLen: 6,
        // 		cursor: true,
        // 		mask: true,
        // 	});
        // });
        // $("#numberInput2").click(function() {
        // 	$("#numberInput2").showKBD({
        // 		areaId: "areaNumber2",
        // 		pageId: "opencard",
        // 		maxLen: 6,
        // 		cursor: true,
        // 		mask: true,
        // 	});
        // });

        //销售卡
        // this.getsalCard()

        this.$toast('身份证上传成功')
        this.temp++
        this.canClick = false
      } else {
        // this.$dialog
        //   .alert({
        //     message: ret.respMsg,
        //   })
        //   .then(() => {
        //     // on close
        //   })
        this.$toast('身份证上传失败，请重新上传')
      }
    },
    //根据身份证获取年龄
    getIdentifyAge(UUserCard) {
      var myDate = new Date()
      var month = myDate.getMonth() + 1
      var day = myDate.getDate()
      var age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1 //减去的一年用来对下面的条件判读
      if (
        //判断月份和天数和出生日期比较
        UUserCard.substring(10, 12) < month ||
        (UUserCard.substring(10, 12) == month && UUserCard.substring(12, 14) <= day)
      ) {
        age++
      }
      return age
    },

    //信息录入
    async enterInfo() {
      if (
        !this.formDataYL.mapEncrypt.phoneNo ||
        !this.formDataYL.mapEncrypt.customerNm ||
        !this.formDataYL.mapEncrypt.certifId ||
        !this.formDataYL.mapEncrypt.priAccNo
      ) {
        this.$toast('请完善信息！')
        return
      }

      // var data = {
      //   transCode: 'REALAUTH',
      //   mobileNo: this.formData.phone ? JSON.stringify(this.formData.phone) : '', //手机号
      //   userName: this.formData.name, //姓名
      //   idCardNo: this.formData.cardnum, //身份证号
      //   idCardIssueDate: this.formData.idCardIssueDate.replace(/-/g, ''), //证件签发日
      //   idCardExpDate:
      //     this.formData.idNeverExpired == '1' ? '' : this.formData.idCardExpDate.replace(/-/g, ''), //证件到期日,YYYYMMDD(有效期非长期时填写)
      //   idNeverExpired: this.formData.idNeverExpired, //证件是否长期有效,1-长期有效（与证件到期日二选一必填）
      //   userOccupation: this.formData.userOccupation, //用户职业,24	教学人员 Y1	学生Y9	不便分类的其他从业
      //   gender: this.formData.gender, //用户性别M-男 F-女
      // }
      // console.log(data)

      //格式化queryId(流水号)
      // let num = (Math.random() * 1000000).toFixed(0)
      // let numFormat = num.length < 6 ? '0' + num : num
      // let queryId = 11111111 + this.formatData() + numFormat
      // localStorage.setItem('queryId', queryId)
      // console.log(queryId)

      // var data = {
      //   transCode: 'REALAUTH',
      //   txnType: 'SA001',
      //   queryId,
      //   md5: '',
      //   mapEncrypt: {
      //     issInsCode: 'II/III类账户开户行机构代码',
      //     bussTp: this.formDataYL.type === 'idcard' ? '02' : '03', //03-新开立III类账户
      //     priAccNo: this.formDataYL.mapEncrypt.priAccNo, //绑定账户卡号
      //     certifId: this.formDataYL.mapEncrypt.certifId, //身份证号码
      //     customerNm: this.formDataYL.mapEncrypt.customerNm, //姓名
      //     phoneNo: localStorage.getItem('phone'), //手机号
      //   },
      // }
      // console.log(data)

      //根据身份证获取年龄
      let age = this.getIdentifyAge(this.formDataYL.mapEncrypt.certifId)
      console.log(age)

      let check = /(^\d{18}$)/ //18位身份数字
      if (!check.test(this.formDataYL.mapEncrypt.certifId) && age > 46) {
        this.$toast('身份证信息有误！')
        return
      }

      if (this.formDataYL.mapEncrypt.priAccNo.length !== 19) {
        this.$toast('银行卡号有误！')
        return
      }

      //选择的二三类库
      this.formDataYL.mapEncrypt.bussTp = this.formDataYL.type === 'idcard' ? '02' : '03'

      console.log(this.formDataYL)

      if (!this.agree) {
        this.$dialog
          .confirm({
            title: '服务协议及隐私保护',
            message: '为了更好保障您的合法权益，请您阅读并同意一下协议《隐私政策》《银联服务政策》',
          })
          .then(() => {
            this.agree = true
            // this.checkFull()
            this.ylAgreement = false
            this.enterInfo() //继续执行
          })
          .catch(() => {
            // on cancel
          })
      } else {
        if (this.formDataYL.type == 'idcard') {
          this.$toast('信息录入成功')
          this.temp++
          this.canClick = false
          this.ylAgreement = false
        } else {
          this.temp += 2
          this.canClick = false
        }
      }
      // let ret = await this.$api.reqFn(data)
      // console.log(ret)

      // if (ret.data.respCode === '00') {
      // this.$toast('信息录入成功')

      // if (this.formDataYL.type == 'idcard') {
      //   this.temp++
      // } else {
      //   this.temp += 2
      // }
      // } else {
      //   console.log(ret.retMsg)
      //   this.$toast('信息录入失败，请检查！')
      // }

      // if (ret.retCode == 'SUCCESS') {
      //   this.temp += 1
      //   this.userInfo = ret
      //   // localStorage.setItem('openCardTemp', 1)
      //   localStorage.setItem('userId', ret.userId)
      //   localStorage.setItem('realAuthLevel', ret.realAuthLevel)
      //   localStorage.setItem('orderNo', ret.orderNo)
      //   localStorage.setItem('frontSeq', ret.frontSeq)
      // } else {
      //   this.$toast(ret.retMsg)
      // }
    },

    beforeRead(file) {
      // this.$toast(file);
      // if (file.file.type.indexOf('png') >= 0) {
      // 	this.photoType = '02'
      // } else if (file.file.type.indexOf('jpg') >= 0) {
      // 	this.photoType = '01'
      // } else if (file.file.type.indexOf('jpeg') >= 0) {
      // 	this.photoType = '03'
      // } else if (file.file.type.indexOf('bmp') >= 0) {
      // 	this.photoType = '04'
      // }
      // this.imgPreview('front', file.file)
    },

    tirggerFile(event) {
      let self = this
      let file = event.target.files[0]

      let fileUrl = URL.createObjectURL(file)
      console.log(file)
      // this.formData.idPhotoFront = fileUrl
      // alert(fileUrl)
      console.log(fileUrl)
      // alert(JSON.stringify(file))
      this.imgPreview('front', file)
    },
    blobToBase64(blob) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = (e) => {
          resolve(e.target.result)
        }
        // readAsDataURL
        fileReader.readAsDataURL(blob)
        fileReader.onerror = () => {
          reject(new Error('blobToBase64 error'))
        }
      })
    },
    afterRead(file) {
      console.log(file)
      // this.formData.idPhotoBack = file.content
      // this.$toast(JSON.stringify(this.fileList[0].content));
      // 此时可以自行将文件上传至服务器
      if (file.file.type.indexOf('png') >= 0) {
        this.photoType = '02'
      } else if (file.file.type.indexOf('jpg') >= 0) {
        this.photoType = '01'
      } else if (file.file.type.indexOf('jpeg') >= 0) {
        this.photoType = '03'
      } else if (file.file.type.indexOf('bmp') >= 0) {
        this.photoType = '04'
      }

      this.cutImg('front', file.content)
      // this.imgPreview('front', file.file)
      // this.formData.idPhotoBack = file.content
      // this.$toast(this.photoType);
    },
    afterRead1(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      this.cutImg('back', file.content)
      // this.cutImg('back', file.content)
      // this.imgPreview('back', file.file)
    },
    cutImg(type, result) {
      if (type == 'front') {
        this.curtType = type
        this.imgSrc = result
        this.showImg = true
      } else if (type == 'back') {
        this.curtType = type
        this.imgSrc = result
        this.showImg = true
      }
    },
    cancelCut() {
      this.showImg = false
    },
    sureCut(result) {
      this.canClick = false

      console.log(result)
      var self = this
      var type = this.curtType
      this.showImg = false
      let Orientation
      if (result.length <= 1024 * 1024) {
        // 上传图片
        // self.postImg(this.result);
        if (type == 'front') {
          // self.formData.idPhotoFront = result
          self.formDataYL.idCardPicP = result
          // alert(result)
        } else if (type == 'back') {
          self.formDataYL.idCardPicN = result
          // self.formData.idPhotoBack = result
          // alert(result)
        }
      } else {
        let img = new Image()
        img.src = result
        img.onload = function () {
          let data = self.compress(img, Orientation)
          // 上传图片
          if (type == 'front') {
            self.formDataYL.idCardPicP = data
          } else if (type == 'back') {
            self.formDataYL.idCardPicN = data
          }
        }
      }

      if (this.formDataYL.idCardPicP && this.formDataYL.idCardPicN) {
        //可点击
        this.canClick = true
      }
    },
    // 处理图片
    imgPreview(type, file) {
      let self = this
      let Orientation
      //去获取拍照时的信息，解决拍出来的照片旋转问题   npm install exif-js --save   这里需要安装一下包
      // Exif.getData(file, function() {
      // 	Orientation = Exif.getTag(this, 'Orientation')
      // })
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return
      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader()
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file)
        // 读取成功后的回调

        reader.onloadend = function () {
          let result = this.result
          let img = new Image()
          img.src = result
          //判断图片是否小于80K,是就直接上传，反之压缩图片
          if (this.result.length <= 80 * 1024) {
            // 上传图片
            // self.postImg(this.result);
            if (type == 'front') {
              self.formData.idPhotoFront = result
            } else if (type == 'back') {
              self.formData.idPhotoBack = result
            }
          } else {
            img.onload = function () {
              let data = self.compress(img, Orientation)
              // 上传图片
              if (type == 'front') {
                self.formData.idPhotoFront = data
                self.imgSrc = data
                self.showImg = true
              } else if (type == 'back') {
                self.formData.idPhotoBack = data
              }
            }
          }
        }
      }
    },
    // 压缩图片
    compress(img, Orientation) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      //瓦片canvas
      let tCanvas = document.createElement('canvas')
      let tctx = tCanvas.getContext('2d')
      // let initSize = img.src.length;
      let width = img.width
      let height = img.height
      //如果图片大于四百万像素，计算压缩比并将大小压至50万以下
      let ratio
      if ((ratio = (width * height) / 1000000) > 1) {
        // console.log("大于50万像素");
        ratio = Math.sqrt(ratio)
        console.log(ratio)
        width /= ratio
        height /= ratio
      } else {
        ratio = 1
      }
      width = 684.8
      height = 432
      canvas.width = width
      canvas.height = height
      console.log(width)
      // this.$toast(width);

      //    铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      //如果图片像素大于100万则使用瓦片绘制
      let count
      if ((count = (width * height) / 1000000) > 1) {
        // console.log("超过100W像素");
        count = ~~(Math.sqrt(count) + 1) //计算要分成多少块瓦片
        //      计算每块瓦片的宽和高
        let nw = ~~(width / count)
        let nh = ~~(height / count)
        tCanvas.width = nw
        tCanvas.height = nh
        console.log(nw)
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(
              img,
              i * nw * ratio,
              j * nh * ratio,
              nw * ratio,
              nh * ratio,
              0,
              0,
              nw,
              nh
            )
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
          }
        }
      } else {
        console.log('直接绘制')
        ctx.drawImage(img, 0, 0, width, height)
      }
      // this.$toast(Orientation);
      //处理ios手机旋转角度问题
      // if (navigator.userAgent.match(/iphone/i)) {
      // 	if (Orientation != "" && Orientation != 1) {
      // 		switch (Orientation) {
      // 			case 6:
      // 				this.rotateImg(img, 'left', canvas);
      // 				break;
      // 			case 8:
      // 				this.rotateImg(img, 'right', canvas);
      // 				break;
      // 			case 3:
      // 				this.rotateImg(img, 'right', canvas); //转两次
      // 				this.rotateImg(img, 'right', canvas);
      // 				break;
      // 		}
      // 	}
      // } else {
      // 	//处理其安卓类手机图片旋转的问题
      // 	if (Orientation != "" && Orientation != 1) {
      // 		switch (Orientation) {
      // 			case 6:
      // 				this.rotateImg(img, 'left', canvas);
      // 				break;
      // 			case 8:
      // 				this.rotateImg(img, 'right', canvas);
      // 				break;
      // 			case 3:
      // 				this.rotateImg(img, 'right', canvas);
      // 				this.rotateImg(img, 'right', canvas);
      // 				break;
      // 		}
      // 	}
      // }
      //修复ios上传图片的时候 被旋转的问题
      // if (Orientation != '' && Orientation != 1) {
      // 	switch (Orientation) {
      // 		case 6: //需要顺时针（向左）90度旋转
      // 			this.rotateImg(img, 'left', canvas)
      // 			break
      // 		case 8: //需要逆时针（向右）90度旋转
      // 			this.rotateImg(img, 'right', canvas)
      // 			break
      // 		case 3: //需要180度旋转
      // 			this.rotateImg(img, 'right', canvas) //转两次
      // 			this.rotateImg(img, 'right', canvas)
      // 			break
      // 	}
      // }
      //进行最小压缩
      var bl = 1
      var ndata = this.downBl(bl, canvas)
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
      // console.log(ndata)
      console.log('end:', ndata.length / 1000, 'kb')
      this.$toast(ndata.length / 1000, 'kb')

      return ndata
    },
    downBl(bl, canvas) {
      var ndata = canvas.toDataURL('image/jpeg', bl)
      // console.log(ndata)
      if (ndata.length >= 80000) {
        bl -= 0.1
        return this.downBl(bl, canvas)
        // ndata = canvas.toDataURL('image/jpeg', bl)
      }
      return ndata
    },
    onOversize(file) {
      console.log(file)
      this.$toast('文件大小不能超过 6M')
    },
    onInput(e) {
      console.log(e)
    },
    onDelete(e) {
      console.log(e)
    },
  },
}
</script>
<style type="text/css" scoped>
.opencard {
  padding-top: 108px;
  padding-bottom: 20px;
}

.count {
  width: 698px;
  min-height: 1166px;
  background: white;
  border-radius: 10px;
  margin: auto;
  padding-bottom: 20px;
  box-sizing: border-box;
}

.btn {
  width: 600px;
  height: 80px;
  background: #d93025;
  color: white;
  line-height: 80px;
  text-align: center;
  margin: auto;
  border-radius: 40px;
  font-size: 32px;
}
.noclick {
  background: #999999;
}
.canClick {
  background: #d93025;
}

.temps {
  display: flex;
  padding: 0 49px;
  padding-top: 80px;
}

.tempt {
  width: 50px;
  height: 50px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tempt span {
  background: #f68b84;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tempt img {
  width: 21px;
}

.tempt.active {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d93025;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
}

.tempt .circle {
  width: 34px;
  height: 34px;
  display: block;
  background: none;
  background: #d93025;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tempt .circle::after {
  background: white;
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  content: '';
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  top: 0;
}

.line {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 28px;
}

.line div {
  width: 92px;
  border-bottom: 1px dashed #999999;
}

.tempt .next {
  width: 34px;
  height: 34px;
  border: 1px solid #999999;
  border-radius: 50%;
  background: none;
}

.cBox {
  min-height: 603px;
}

.text {
  color: #999999;
  font-size: 24px;
}

.text.textold {
  color: #f68b84;
}

.text.textac {
  color: #d93025;
}

/*  */
.lists {
  margin-top: 109px;
}

.list {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 29px;
  border-bottom: 1px solid #eeeeee;
}

.listl {
  font-size: 32px;
  color: #333333;
}

.listr {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.listr input {
  flex: 1;
  height: 60px;
  outline: none;
  text-align: right;
  font-size: 28px;
  border: none;
}

.listr .cama {
  width: 35px;
  height: 30px;
  margin-left: 10px;
}

.listr .circle {
  width: 40px;
  height: 40px;
  border: 1px solid #aeaeae;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.listr .circle img {
  width: 30px;
}

.listr .circle.circleac {
  background: #d93025;
  border: 1px solid #d93025;
}

/*  */
.zjBox {
  margin-top: 79px;
}

.idcardBox {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 600px;
  height: 354px;
  background-image: url(../assets/cardface.png);
  background-size: 100%;
  margin-bottom: 20px;
}

.idcardBox >>> .van-uploader__wrapper {
  height: 100%;
}

.idcardBox >>> .van-uploader__upload {
  width: 100%;
  height: 100%;
}

.idcardBoxf {
  background-image: url(../assets/cardf.png);
}

.firstcard {
  margin-top: 79px;
  background-image: url(../assets/firstcard.png);
}

.cam {
  width: 120px;
  height: 120px;
  background: #999999;
  border-radius: 50%;
  display: flex;
  align-items: center;
  margin: auto;
}

.firstcardBox {
  text-align: center;
}

.firstcardText {
  font-size: 28px;
  color: #333333;
}

.jhBox {
  margin-top: 109px;
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
}

.code.send {
  background: #999999;
  color: white;
}

.kkBox {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #d93025;
  margin-top: 100px;
}

.kkBox p {
  font-size: 36px;
  margin-top: 56px;
}

.kkBox img {
  width: 283px;
}

.kkBox .error {
  color: #999999;
}

input[type='date'] {
  background-color: transparent;
  color: black;
  filter: alpha(opacity=1);
  /*androd*/
  appearance: none;
  /*下拉框去掉右侧图标*/
  -moz-appearance: none;
  -webkit-appearance: none;
}

.agreement {
  margin-top: 15px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.agreement .select {
  margin: 5px 12px 0 0;
}

.agreement .select img {
  background-color: #d93025;
  width: 34px;
  height: 34px;
  border-radius: 17px;
}

.agreement .select span {
  display: inline-block;
  width: 26px;
  height: 26px;
  border-radius: 16px;
  border: 4px solid #999999;
}

.agreement span {
  color: #999999;
}

.agreement span a {
  color: #000000;
}

/* .agreement span a:active {
  color: red;
} */
</style>
