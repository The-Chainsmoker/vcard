<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      isFromApp: false,
    }
  },
  mounted() {
    // $(window).loadKBD();
    this.isFromApp = this.$route.query.isFromApp ? this.$route.query.isFromApp : false
    localStorage.setItem('isFromApp', this.isFromApp)
    if (this.isFromApp) {
      this.$nextTick(() => {
        document.addEventListener('UniAppJSBridgeReady', function () {
          console.log('APP created 执行 UniAppJSBridgeReady')
          // alert("jsbridge")
          uni.getEnv(function (res) {
            console.log('当前环境：' + JSON.stringify(res))
          })
          uni.postMessage({
            data: {
              type: 'router',
              isQuitApp: true,
            },
          })
        })
      })
    }
  },
  watch: {
    $route(a, b) {
      // console.log('to:',a)
      // console.log('来自:',b)
      if (b.name == 'Login') {
        this.autoUpdate()
      }
      this.removeDom()
      var data = a.path
      if (a.path == '/') {
        //首页
        uni.postMessage({
          data: data,
        })
      } else {
        uni.postMessage({
          data: data,
        })
      }
    },
  },
  created() {
    if (window.plus) {
      this.getSys()
    } else {
      document.addEventListener('plusready', this.getSys, false)
    }
    //自动更新
    // this.autoUpdate()

    this.updateData()
    if (localStorage.getItem('token')) {
      this.$store.state.token = localStorage.getItem('token')
      // this.checkVersion('1.1.0')
      this.autoUpdate()
    }
  },
  methods: {
    getSys() {
      this.$store.state.deviceOsType = plus.os.name
    },
    // 自动更新
    autoUpdate() {
      if (window.plus) {
        this.plusReady()
      } else {
        document.addEventListener('plusready', this.plusReady, false)
      }
    },
    plusReady() {
      // 获取本地应用资源版本号
      this.$store.state.DeviceNum = plus.device.imei
      plus.runtime.getProperty(plus.runtime.appid, (inf) => {
        this.$store.state.version = inf.version
        this.checkVersion(inf.version)
      })
    },
    // 检查版本
    async checkVersion(currentV) {
      var _this = this
      // 这里是你获取版本号的方式
      var data = {
        transCode: 'VERCHECK',
        myVersion: currentV,
        mobileNo: localStorage.getItem('phone'),
      }
      let res = await this.$api.sendMs(data)
      console.log('新版本')
      console.log(res)
      if (res.retCode === 'SUCCESS') {
        if (res.download) {
          this.$dialog
            .confirm({
              title: '更新提示',
              message:
                '检测到有新版本,当前版本:' +
                currentV +
                ',新版本：' +
                res.newVersion +
                ', 是否更新?',
            })
            .then(() => {
              if (plus.os.name == 'Android') {
                this.downloadApp(res.download)
              } else {
                plus.runtime.openURL(res.download)
              }
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
            })
            .catch(() => {
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
            })
          // this.$dialog.alert({
          // 	title: '更新提示',
          // 	message: '检测到有新版本,当前版本:'+currentV+',新版本：'+res.newVersion+', 是否更新?',
          // }).then(() => {
          // 	this.downloadApp(res.download)
          // });
        }
      }
    },
    downloadApp(appUrl) {
      var dtask = plus.downloader.createDownload(appUrl, {}, function (d, status) {
        if (status == 200) {
          // 下载成功
          var path = d.filename
          plus.runtime.install(path) // 安装下载的apk文件
        } else {
          //下载失败
          alert('Download failed: ' + status)
        }
      })
      dtask.start()
      let prg = 0
      let showLoading = plus.nativeUI.showWaiting('正在下载')
      dtask.addEventListener('statechanged', function (task, status) {
        // 给下载任务设置一个监听 并根据状态  做操作
        switch (task.state) {
          case 1:
            showLoading.setTitle('正在下载')
            break
          case 3:
            prg = parseInt((parseFloat(task.downloadedSize) / parseFloat(task.totalSize)) * 100)
            showLoading.setTitle('  正在下载' + prg + '%  ')
            break
          case 4:
            plus.nativeUI.closeWaiting()
            //下载完成
            break
        }
      })
    },
    // 下载wgt包
    downloadWgt(wgtUrl) {
      plus.nativeUI.showWaiting('下载更新文件中...')
      plus.downloader
        .createDownload(
          wgtUrl,
          {
            filename: '_doc/update/',
          },
          (d, status) => {
            if (status === 200) {
              this.installWgt(d.filename) // 安装wgt包
            } else {
              plus.nativeUI.alert('下载更新文件失败！')
            }
            plus.nativeUI.closeWaiting()
          }
        )
        .start()
    },
    // 安装wgt包
    installWgt(path) {
      plus.nativeUI.showWaiting('安装更新文件...')
      plus.runtime.install(
        path,
        {
          force: true, //是否强制安装
        },
        function () {
          plus.nativeUI.closeWaiting()
          plus.nativeUI.alert('应用资源更新完成！', function () {
            plus.runtime.restart()
          })
        },
        function (e) {
          plus.nativeUI.closeWaiting()
          plus.nativeUI.alert('安装更新文件失败[' + e.code + ']：' + e.message)
        }
      )
    },
    updateData() {
      var _this = this
      document.addEventListener('visibilitychange', function () {
        console.log(document.visibilityState)
        //页面显示时document.visibilityState值为visible，隐藏显示时document.visibilityState值为hidden，
        //或者
        if (document.hidden) {
          if (localStorage.getItem('openPass')) {
            localStorage.setItem('openPassok', '')
            _this.$router.push({
              path: '/resume',
            })
          }
        } else {
          if (localStorage.getItem('openPass')) {
            localStorage.setItem('openPassok', '')
            _this.$router.push({
              path: '/resume',
            })
          }
        }
        // document.title = document.hidden ? '离开这个页面了' : '又回到这个页面了';
        //这个是判断document.hidden，页面的隐藏状态
      })
    },
    adlisten() {
      document.addEventListener('plusready', onPlusReady, false)

      function onPlusReady() {
        document.addEventListener('resume', onAppReume, false)
      }

      function onAppReume() {
        if (localStorage.getItem('openPass')) {
          localStorage.setItem('openPassok', '')
          this.$router.push({
            path: '/resume',
          })
        }
        // alert("Application resumed!");
      }
    },
    removeDom() {
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
    },
  },
}
</script>
<style>
html {
  background: #f2f2f2;
}

* {
  margin: 0;
  padding: 0;
  font-size: 24px;
}

/* 重写插件样式 */
.lx-toast,
.lx-load-content {
  font-size: 28px !important;
}

.lx-toast {
  height: auto !important;
  line-height: 30px !important;
}

.lx-load-box {
  top: 500px !important;
}

.qrcodeImg img {
  height: 100%;
  width: 100%;
}

.kbd-mask {
  opacity: 0.5 !important;
}
</style>
