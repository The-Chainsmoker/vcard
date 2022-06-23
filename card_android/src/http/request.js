import axios from "axios"
// import Cookies from "js-cookie"
import config from "../config/config.base"
import store from '../store'
import router from '../router'
import {
	Toast, Dialog
} from "vant";
import qs from 'qs'

import signFn from '../util/aesEncryption'
// axios.defaults.withCredentials = true; // 允许携带cookie
let instance = axios.create({
	headers: {
		'content-type': 'application/json'
	},
	// headers: {'Authorization': Cookies.get("Authorization")}
})
instance.defaults.baseURL = config.baseURL
instance.defaults.baseURL = process.env.NODE_ENV === 'development' ? '/api' : config.baseURL
instance.defaults.withCredentials = true

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
	var tips = '';
	if (config.data.transCode == 'UPLOADPHOTO') {
		tips = '证件处理中'
	}
	Toast.loading({
		message: tips,
		forbidClick: true,
		duration: 0
	});
	// 在发送请求之前做些什么
	var dataPub = {
		version: '1.0.0', //版本号，默认值是1.00
		orderNo: 'DeviceNumTEST' + new Date()
			.getTime(), //APP系统内部的流水号 ,5到32个字符、 只能包含字母数字或者下划线，区分大小写，每次下单请求确保在系统唯一
		deviceId: 'DeviceNumTEST', //安卓IMEI \IOS IDFV \PC 硬盘序列号
		deviceOsType: store.state.deviceOsType || 'Android', //iOS\Anroid\其他
		deviceIP: '192.168.2.103', //设备所在的公网ip
		appName: 'HMFAPP', //格式如：汇码付APP
		deviceType: 'ATH-AL00', //手机型号 -- 非必填，格式如：ATH-AL00
		deviceLocation: '+37.12/-121.23', //格式为纬度/经度 -- 非必填，+表示北纬、东经，-表示南纬、西经。举例：+37.12/-121.23
		deviceSimNumber: '', //设备SIM卡数量  -- 非必填
		deviceFullSimCardNo: '', //设备SIM卡号 -- 非必填
		Sign: '', //
		token: store.state.token || '',
	};
	Object.assign(config.data, dataPub, config.data)//合并对象属性
	config.data.Sign = signFn.getSign(config.data)
	if (config.url == '/vcard/pwd/ValidServlet') {
		var dataPwd = {
			Password: config.data.Password
		}
		config.headers = {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'sessionid': localStorage.getItem('sessionid'),
			'token': localStorage.getItem('sessionid')
		}
		config.data = qs.stringify(dataPwd)
	}
	// config.Sign
	// config.headers.channelToken = Cookies.get('channelToken')
	return config
}, function (error) {
	Toast.clear()
	// 对请求错误做些什么
	return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
	Toast.clear()
	// 对响应数据做点什么  

	// console.log(response)
	if (response.status == 200) {
		if (response.data.retCode == "TOKENEXP" || response.data.retCode == "NEEDREG") {
			store.state.token = ''
			store.state.Sign = ''
			store.state.frontSeq = ''
			localStorage.setItem('token', '')
			localStorage.setItem('Sign', '')
			localStorage.setItem('Sign', '')
			setTimeout(() => {
				router.push('/login')
			}, 2000)
			return response.data
		} else if (response.data.retCode == "SUCCESS") {
			return response.data
		}
		// Toast(response.data.retMsg)//未开卡
		console.log(response.data.retMsg)
		if (response.data.retMsg === '验签错误') {
			Dialog.alert({
				message: '该账号已在其他手机登录,请重新登录!',
			}).then(() => {
				// localStorage.setItem('token', '')
			});
		}
		return response.data
	} else {
		Toast(response.data.retMsg)
	}

}, function (error) {
	Toast.clear()
	// 对响应错误做点什么
	Toast('请求错误')
	console.log('--- 401 res error response ---')
	return error
	if (error && error.response && error.response.status == '401') {
		// const loginUrl = Cookies.get("sysUrl")
		// Cookies.remove("userName", { domain: "abc.com" })
		// Cookies.remove("token", { domain: "abc.com" })
		localStorage.clear()
		// window.location.href = loginUrl
	}
	return Promise.reject(error)
})

export default instance
