<template>
  <div class="stuset">
    <pheader :title="'修改学员密码'" :back="true"></pheader>
    <div class="navs">
      <div class="nav">
        <div class="navl">
          <span>旧学员密码</span>
          <div @click="iconChange1()">
            <img v-show="type1==='password'" src="../assets/stuset/backeye.png" alt="">
            <img v-show="type1==='text'" src="../assets/stuset/openeye.png" alt="">
          </div>
        </div>
        <div class="navr">
          <input v-model="oldPad" :type="type1" name="" value="" placeholder="请输入旧学员密码" />
        </div>
      </div>
    </div>
    <div class="navs">
      <div class="nav">
        <div class="navl">
          <span>新学员密码</span>
          <div @click="iconChange2()">
            <img v-show="type2==='password'" src="../assets/stuset/backeye.png" alt="">
            <img v-show="type2==='text'" src="../assets/stuset/openeye.png" alt="">
          </div>
        </div>
        <div class="navr">
          <input v-model="newPad" :type="type2" name="" value="" placeholder="请输入新学员密码" />
        </div>
      </div>
    </div>
    <div class="navs">
      <div class="nav">
        <div class="navl">
          <span>确认新密码</span>
          <div @click="iconChange3()">
            <img v-show="type3==='password'" src="../assets/stuset/backeye.png" alt="">
            <img v-show="type3==='text'" src="../assets/stuset/openeye.png" alt="">
          </div>
        </div>
        <div class="navr">
          <input v-model="agNewPad" :type="type3" name="" value="" placeholder="请再次输入新密码" />
        </div>
      </div>
    </div>
    <div class="btn" @click="getPass()">
      完成
    </div>
  </div>
</template>

<script>
export default {
  name: 'stuset',
  data() {
    return {
      oldPad: '',
      newPad: '',
      agNewPad: '',

      type1: 'password',
      type2: 'password',
      type3: 'password',
    }
  },
  async created() {
    // let data = {
    //   transCode: 'CHGCAMPUSPASSWD',
    //   mobileNo: '13725737343',
    //   oldCardPin: this.$md5('test2123456HYT'),
    //   newCardPin: this.$md5('test2111111HYT'),
    // }
    // let res = await this.$api.sendMs(data)
    // console.log(res)
    // console.log(this.$md5('123456hyt'))
  },
  methods: {
    //图标控制输入框类型
    iconChange1() {
      if (this.type1 === 'password') {
        this.type1 = 'text'
      } else {
        this.type1 = 'password'
      }
    },
    iconChange2() {
      if (this.type2 === 'password') {
        this.type2 = 'text'
      } else {
        this.type2 = 'password'
      }
    },
    iconChange3() {
      if (this.type3 === 'password') {
        this.type3 = 'text'
      } else {
        this.type3 = 'password'
      }
    },

    async getPass() {
      if (!this.oldPad || !this.newPad || !this.agNewPad) {
        this.$toast('密码不能为空！')
        return
      } else if (this.newPad !== this.agNewPad) {
        this.$toast('密码不一致,请重新输入！')
        return
      }

      let data = {
        transCode: 'CHGCAMPUSPASSWD',
        mobileNo: localStorage.getItem('phone'),
        oldCardPin: this.$md5(localStorage.getItem('campusId') + this.oldPad + 'HYT'),
        newCardPin: this.$md5(localStorage.getItem('campusId') + this.newPad + 'HYT'),
      }
      console.log(1111, data)
      let res = await this.$api.sendMs(data)
      console.log(res)
      if (res.result === '密码修改成功') {
        this.$dialog
          .alert({
            title: '',
            message: res.result,
          })
          .then(() => {
            // this.oldPad = ''
            // this.newPad = ''
            // this.agNewPad = ''
            this.$router.push({ name: 'Home' })
          })
          .catch(() => {})
      } else {
        this.$dialog
          .alert({
            title: '',
            message: res.result,
          })
          .then(() => {
            // this.$router.go(-1)
          })
          .catch(() => {})
      }
    },
  },
}
</script>

<style type="text/css" scoped>
.stuset {
  padding-top: 108px;
}
.navs {
  margin: 20px;
  background: white;
  border-radius: 10px;
  padding: 0 20px;
}
.nav {
  display: flex;
  height: 90px;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
}
.navl {
  display: flex;
  justify-content: center;
  align-items: center;
}
.navl img {
  position: relative;
  left: 40px;
  top: 4px;
  width: 58px;
  height: 58px;
}

.nav .ico {
  margin-right: 29px;
  width: 45px;
}
.nav span {
  font-size: 32px;
  color: #333333;
}
.nav:last-child {
  border-bottom: 0;
}
.nav .navr {
  flex: 1;
  margin-left: 50px;
}
.navr input {
  height: 60px;
  text-align: right;
  width: 100%;
  border: none;
  outline: none;
  font-size: 28px;
}
.btn {
  position: fixed;
  width: 600px;
  height: 80px;
  background: #d93025;
  color: white;
  line-height: 80px;
  text-align: center;
  margin: auto;
  border-radius: 40px;
  font-size: 32px;
  bottom: 10%;
  left: 50%;
  transform: translate(-50%, 0);
}
.btn:active {
  opacity: 0.8;
}
</style>