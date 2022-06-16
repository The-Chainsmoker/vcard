<template>
  <div class=" userhome">
    <div class="userhead">
      <span>个人</span>
    </div>
    <!-- <pheader :title="'个人'" :back="false"></pheader> -->
    <div class="top"></div>
    <div class="card" :style="{backgroundImage:'url('+cardFace+')'}">
      <div class="cardl">

      </div>
      <!-- <div class="cardr">
			<p>姓名：关佳佳</p>
			<p>学号：88866999</p>
			<p>学校：海洋大学</p>
		</div> -->
    </div>
    <!--  -->
    <div class="navs">
      <div v-if="userList[0]==='教学楼存在'" :key="1" class="nav">
        <div class="navl">
          <img class="ico" src="../assets/user/nav1.png">
          <span>教学楼</span>
        </div>
        <div>
          <img class="r" src="../assets/user/right.png">
        </div>
      </div>
      <div v-show="userList[1]==='音乐馆存在'" :key="2" class="nav">
        <div class="navl">
          <img class="ico" src="../assets/user/nav2.png">
          <span>音乐馆</span>
        </div>
        <div>
          <img class="r" src="../assets/user/right.png">
        </div>
      </div>
      <div v-show="userList[2]==='体育场存在'" :key="3" class="nav">
        <div class="navl">
          <img class="ico" src="../assets/user/nav3.png">
          <span>体育场</span>
        </div>
        <div>
          <img class="r" src="../assets/user/right.png">
        </div>
      </div>
    </div>

    <div class="btn" @click="LoginOut()">
      退出登录
    </div>
    <p style="color: #999999;text-align: center;font-size: 12px;padding-top: 10px;">
      version:{{$store.state.version}}
    </p>

    <!-- <pfooter :active="2"></pfooter> -->
  </div>
</template>

<script>
export default {
  name: 'user',
  components: {},
  data() {
    return {
      num: 1,
      data: 'abs',
      version: '',
      cardFace: '',

      userList: ['教学楼', '音乐馆', '体育场'],
      userData: [],
    }
  },
  activated() {},
  async created() {
    this.cardFace = localStorage.getItem('cardFace')

    //学员注册
    if (!localStorage.getItem('campusId')) {
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
    }

    //个人信息功能显示
    this.getUser()
  },

  watch: {
    '$store.state.current': function (newData, old) {
      if (newData == 2) {
        console.log('user')
        this.cardFace = localStorage.getItem('cardFace')
        console.log(localStorage.getItem('cardFace'))
        //执行user页面的方法/请求

        //个人信息功能显示
        this.getUser()
      }
    },
  },
  methods: {
    //个人信息功能显示
    async getUser() {
      let result = await this.$api.sendMs({ transCode: 'PAGEITEMS', pageName: '个人' })
      console.log(result)
      this.userData = result

      this.userList = ['教学楼', '音乐馆', '体育场']

      //选取有的数据
      if (this.userData.retCode === 'SUCCESS') {
        this.userList.forEach((item, index, arr) => {
          if (this.userData.items.length !== 0) {
            this.userData.items.forEach((item1, index1, arr1) => {
              if (item === item1) {
                //对象数据嵌套太深，使用this.$set()方法重置属性
                this.$set(this.userList, index, item + '存在')
              }
            })
          }
        })
      }
      // this.$forceUpdate()
      console.log(this.userList)
    },

    LoginOut() {
      var openPass = localStorage.getItem('openPass') || ''
      console.log(openPass)
      localStorage.clear()
      this.$store.state.token = ''
      localStorage.setItem('openPass', openPass)
      this.$router.push({
        path: '/login',
      })
    },
  },
}
</script>
<style type="text/css" scoped>
/* .userhome {
  position: relative;
} */
.userhead {
  position: absolute;
  height: 88px;
  left: 0;
  right: 0;
  color: white;
  text-align: center;
  line-height: 88px;
}
.userhead span {
  font-size: 36px;
}
.top {
  height: 363px;
  background: #d93025;
  border-bottom-left-radius: 100px;
  border-bottom-right-radius: 100px;
}
.card {
  width: 705px;
  height: 449px;
  margin: -200px auto;
  padding: 50px;
  box-sizing: border-box;
  border-radius: 15px;
  background: #0e7eb2;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
}
.cardl {
  width: 266px;
  height: 348px;
  background: rgba(0, 0, 0, 0.3);
  margin-right: 17px;
}
.cardr p {
  margin-bottom: 29px;
  font-size: 32px;
}
.navs {
  margin: 20px;
  margin-top: 220px;
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
  height: 45px;
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

.btn {
  width: 600px;
  height: 80px;
  background: #d93025;
  color: white;
  line-height: 80px;
  text-align: center;
  margin: auto;
  border-radius: 40px;
  margin-top: 100px;
  font-size: 32px;
}
.btn:active {
  opacity: 0.8;
}
.card {
  position: relative;
}
.cardl {
  position: absolute;
  right: 0;
  opacity: 0;
}
.cardr {
  position: absolute;
  bottom: 0;
  right: 163px;
}
.cardr p {
  font-size: 20px;
  color: white;
}
</style>