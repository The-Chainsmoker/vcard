<template>
  <div class="wxsign">
    <pheader :title="'微信签约代扣'" :back="true"></pheader>

    <div class="remind">先保存二维码,再打开微信,如下操作</div>

    <div class="process">
      <div class="one">
        <span class="number">1</span>
        <img src="../assets/wxsign/saoyisao.png" alt="">
        <div class="text">在微信发现页打开'扫一扫'</div>
      </div>
      <div class="two">
        <span class="number">2</span>
        <img src="../assets/wxsign/erweima.png" alt="">
        <div class="text">点击右上相册选取二维码</div>
      </div>
      <div class="three">
        <span class="number">3</span>
        <img src="../assets/wxsign/success.png" alt="">
        <div class="text">进入微信签约</div>
      </div>
    </div>

    <div class="code qrcodeImg" ref="qrCodeDiv" @click="getCode()">
    </div>

    <div class="iconBox">
      <img class="icon" src="../assets/icon.png" alt="">
    </div>

    <div class="btn" @click="saveCode()">
      保存二维码
    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'wxsign',
  data() {
    return {
      QRCodeObj: null,
    }
  },
  created() {
    this.getcode()
  },
  methods: {
    //保存二维码
    saveCode() {
      //保存到本地
      //imgUrl 图片网络路径
      let _this = this
      var timestamp = new Date().valueOf()
      var downLoader = plus.downloader.createDownload(
        localStorage.getItem('contractImgUrl'),
        {
          method: 'GET',
          filename: '_downloads/image/' + timestamp + '.png',
        },
        function (download, status) {
          if (status == 200) {
            var fileName = download.filename
            /**
             * 保存至本地相册
             */
            plus.gallery.save(
              fileName,
              function () {
                _this.$toast('二维码保存至本地相册')
              },
              function () {
                _this.$toast('保存失败，请重试')
              }
            )
          } else {
            _this.$toast('下载失败，请重试')
          }
        }
      )
      downLoader.start()
    },

    getcode() {
      let contractAddr = localStorage.getItem('contractAddr')
      this.$nextTick(function () {
        this.bindQRCode(contractAddr)
      })
    },

    bindQRCode: function (eqCode) {
      console.log(eqCode)
      console.log(this.QRCodeObj)
      // if (this.QRCodeObj) {
      // 	this.QRCodeObj.clear()
      // }
      this.$refs.qrCodeDiv.innerHTML = '' //清除二维码方法一
      this.QRCodeObj = new QRCode(this.$refs.qrCodeDiv, {
        text: eqCode,
        width: 200,
        height: 200,
        colorDark: '#000000', //二维码颜色
        colorLight: '#f2f2f2', //二维码背景色
        correctLevel: QRCode.CorrectLevel.L, //容错率，L/M/H
      })
      // JsBarcode('#barcode', this.qrCode, {
      //   format: 'CODE39',
      //   lineColor: '#000',
      //   background: '#EBEEF5',
      //   width: 4,
      //   height: 40,
      //   displayValue: false,
      // })
    },
  },
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.wxsign {
  position: relative;
  margin-top: 128px;
}
.wxsign .remind {
  margin-bottom: 8%;
  text-align: center;
  font-size: 28px;
}

.code {
  position: relative;
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 480px;
  height: 480px;
}

/* 二维码画布可以转为rem与父盒子保持一样的大小 */
.code >>> canvas {
  width: 480px !important;
  height: 480px !important;
}

.iconBox {
  width: 480px;
  margin: 0 auto;
}

.iconBox .icon {
  width: 62px;
  height: 62px;
  transform: translate(240px, -240px);
  margin-left: -31px;
  margin-top: -31px;
}

.process {
  display: flex;
  justify-content: space-around;
}

.one,
.two,
.three {
  width: 160px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.process .three .text {
  width: 100px;
}

/* .process img {
  width: 85px;
  height: 85px;
} */

.process .number {
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  background-color: #d93025;
  color: #ffffff;
  margin-bottom: 15px;
  text-align: center;
}

.process .text {
  margin: 55% 0;
}

.btn {
  position: absolute;
  left: 50%;
  top: 1050px;
  transform: translate(-50%);
  width: 650px;
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
</style>