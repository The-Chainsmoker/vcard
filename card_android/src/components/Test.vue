<template>
  <div class="Test">
    <input type="text" v-model="url" placeholder="请输入跳转的地址">

    <div class="btn" @click="openUrl">
      跳转
    </div>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data() {
    return {
      url: '',
      webview: '',
    }
  },
  mounted() {
    let _this = this
    plus.key.addEventListener('backbutton', function () {
      // plus.webview.close(_this.webview)
      var webview = plus.webview.getTopWebview()
      webview.canBack(function (e) {
        if (e.canBack) {
          webview.back()
        } else {
          plus.webview.close(webview)
        }
      })
      return
    })
  },
  methods: {
    openUrl() {
      let _this = this
      // var w = plus.webview.create(_this.url, 'test', {
      //   top: '100px',
      //   left: '10px',
      //   right: '10px',
      //   bottom: '100px',
      // })
      // w.show()

      _this.webview = plus.webview.open(_this.url, 'test', {
        top: '0px',
        // left: '10px',
        // right: '10px',
        bottom: '0px',
      })
    },
  },
}
</script>

<style scoped>
input {
  display: block;
  margin: 50px auto;
  height: 80px;
  width: 705px;
  border-radius: 25px;
  border: 1px solid #cccccc;
  text-align: center;
  font-size: 32px;
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
</style>
