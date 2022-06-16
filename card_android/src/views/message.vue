<template>
  <div class="message">
    <div class="backIcon" @click="back()">
      <img src="../assets/message/back.png" alt="">
    </div>
    <div class="top">
      <div class="left">
      </div>
      <div class="content">
        <div>
          <img src="../assets/message/ok.png" alt="">
          <span>支付成功</span>
        </div>
      </div>
      <div class="right">
      </div>

    </div>

    <div class="merch">
      <span class="merchName">{{messData.merchName}}</span>
      <span class="termName">{{messData.termName}}</span>
      <span class="moneyTitle">￥{{messData.amount | showPrice}}</span>
    </div>

    <!-- <div class="merch">
      <span class="termName">48a90049c57394277fe7cd622c95c--yydusdu</span>
      <span class="merchName">国网恩施供电公司</span>
      <span class="moneyTitle">￥{{100.09}}</span>
    </div> -->

    <div class="finish" @click="finish()">
      完成
    </div>
  </div>
</template>

<script>
export default {
  name: 'message',

  data() {
    return {
      messData: this.$route.params.data,
    }
  },
  filters: {
    showPrice(val) {
      return parseFloat(val).toFixed(2)
    },
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    finish() {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped>
.top {
  margin-top: 170px;
  display: flex;
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.left,
.right {
  text-align: center;
  width: 130px;
  font-size: 30px;
  color: #0f3d7a;
}

.content {
  flex: 1;
  display: flex;
  color: #16cc5e;
  justify-content: center;
  align-items: center;
}
.content img {
  width: 46px;
  height: 46px;
}

.content span {
  font-size: 48px;
  position: relative;
  bottom: 6px;
  left: 15px;
}

.merch {
  margin-top: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
.merchName,
.termName {
  margin-bottom: 30px;
  font-size: 35px;
}

.merch .moneyTitle {
  margin-top: 50px;
  font-size: 95px;
  font-weight: bolder;
}

.backIcon {
  position: fixed;
  width: 38px;
  height: 38px;
  top: 0;
  right: 0;
  margin-right: 20px;
  margin-top: 23px;
  color: #cccccc;
}

.backIcon img {
  width: 100%;
  height: 100%;
}

.finish {
  position: fixed;
  top: 85%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 480px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 38px;
  background-color: #43b21b;
  border-radius: 45px;
  box-shadow: 0px 15px 29px 2px rgba(131, 219, 182, 0.15);
  color: #ffffff;
}

.finish:active {
  opacity: 0.8;
}
</style>