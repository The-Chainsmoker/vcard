/**
 * 工具类
 */
 import Vue from 'vue'
import store from '../store'
import md5 from 'js-md5';
 // import CryptoJS from 'crypto-js'
 export default {//加密
  getSign(params) {
	  const kAppKey='key'
	  const OldkAppSecret = '9d101c97133837e13dde2d32a5054abb'
	  var newkAppSecret = ''
	  // console.log(store.state.token)
	  // console.log(localStorage.getItem('token'))
	  if(store.state.token){
		  // newkAppSecret = store.state.signkey
		  newkAppSecret =  md5(OldkAppSecret+store.state.token)
		  // console.log('new')
	  }else{
		  newkAppSecret = OldkAppSecret
	  }
	  // console.log(newkAppSecret)
     if (typeof params == "string") {
         return paramsStrSort(params,kAppKey,newkAppSecret);
     } else if (typeof params == "object") {
         var arr = [];
         for (var i in params) {
			 if(typeof(params[i]) != 'object' && params[i] != ''){
				  arr.push((i + "=" + params[i]));
			 }
            
         }
         return paramsStrSort(arr.join(("&")),kAppKey,newkAppSecret);
     }
 },
 
 
 
   // encrypt(word, keyStr){ 
   //   keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
   //   var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
   //   var srcs = CryptoJS.enc.Utf8.parse(word);
   //   var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
   //   return encrypted.toString();
   // },
   // //解密
   // decrypt(word, keyStr){  
   //   keyStr = keyStr ? keyStr : 'abcdefgabcdefg12';
   //   var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
   //   var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
   //   return CryptoJS.enc.Utf8.stringify(decrypt).toString();
   // }
 }
 function  paramsStrSort(paramsStr,kAppKey,kAppSecret) {
     // var url = paramsStr + "&appKey=" + kAppKey;
     var url = paramsStr;
     var urlStr = url.split("&").sort().join("&");
     var newUrl = urlStr + '&key=' + kAppSecret;
	 // console.log(newUrl)
	 // newUrl = 'appName=汇码付APP&deviceIP=192.168.2.114&deviceId=DeviceNumTEST&deviceLocation=+37.12/-121.23&deviceOsType=Android&deviceType=ATH-AL00&mobileNo=18037316313&orderNo=DeviceNumTEST1632304972220&smsOrder=sms1632304972218&transCode=SMSREQUEST&version=1.0.0&key=9d101c97133837e13dde2d32a5054abb'
	 let sign = md5(newUrl).toUpperCase()
     return sign;
 }