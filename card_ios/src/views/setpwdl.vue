<template>
  <div class="set">
    <pheader :title="'密码设置'" :back="true"></pheader>
    <!--  -->
    <div class="navs">
      <!-- <div class="nav" @click="gosetpayPwd()">
        <div class="navl">
          <span>修改交易密码</span>
        </div>
        <div>
          <img class="r" src="../assets/user/right.png">
        </div>
      </div>
      <div class="nav" @click="goforgotpayPwd()">
        <div class="navl">
          <span>重置交易密码</span>
        </div>
        <div>
          <img class="r" src="../assets/user/right.png">
        </div>
      </div> -->
      <!-- <div class="nav" @click="gosetPwd()">
			  <div class="navl">
				  <span>设置开机密码</span>
			  </div>
			  <div>
				  <img class="r" src="../assets/user/right.png" >
			  </div>
		  </div> -->
      <div class="nav" @click="goStuSet()">
        <div class="navl">
          <span>设置学员密码</span>
        </div>
        <div>
          <img class="r" src="../assets/user/right.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'setpwdl',
  components: {},
  data() {
    return {}
  },
  async created() {},
  methods: {
    goStuSet() {
      this.$router.push({ name: 'stuset' })
    },
    gosetPwd() {
      this.$router.push({
        path: '/setpwd',
      })
    },
    goforgotpayPwd() {
      this.$router.push({
        path: '/forgotpaypwd',
      })
    },
    gosetpayPwd() {
      this.$router.push({
        path: '/setpaypwd',
      })
    },
  },
}
</script>
<style type="text/css" scoped>
.set {
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
  flex: 1;
  display: flex;
  align-content: center;
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
.nav .r {
  width: 15px;
  height: 25px;
}
</style>