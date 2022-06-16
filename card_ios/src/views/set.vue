<template>
  <div class="set">
    <pheader :title="'设置'" :back="true"></pheader>
    <!--  -->
    <div class="navs">
      <div class="nav" @click="goSetpwdl()">
        <div class="navl">
          <span>密码设置</span>
        </div>
        <div>
          <img class="r" src="../assets/user/right.png">
        </div>
      </div>
      <!-- <div class="nav">
			  <div class="navl">
				  <span>指纹</span>
			  </div>
			  <div>
				  <img class="r" src="../assets/user/right.png" >
			  </div>
		  </div> -->

      <!-- <div class="nav" @click="golimit()">
			  <div class="navl">
				  <span>消费限额</span>
			  </div>
			  <div>
				  <img class="r" src="../assets/user/right.png" >
			  </div>
		  </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'set',
  components: {},
  data() {
    return {}
  },
  async created() {},
  methods: {
    goSetpwdl() {
      this.$router.push({
        path: '/setpwdl',
      })
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