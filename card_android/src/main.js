import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import VueCropper from 'vue-cropper'
import md5 from 'js-md5'

Vue.prototype.$md5 = md5

Vue.use(VueCropper)
// Vue.use(window['vue-cropper'])
//安装上vant框架的时候，$dialog会自动挂载到Vue的prototype上
import {
	Dialog
} from 'vant';
import { sendAppMessage } from './util/sendms.js'

import {
	Toast,
	Popup
} from "vant";

Vue.use(Dialog);
Vue.use(Popup)
// Vue.use(Toast);

Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog

Vue.use(Vant);



import './util/rem.js'
import utilFn from './util/util.js'
Vue.prototype.getBeforeDate = utilFn.getBeforeDate
import imageDown from './util/imageDown.js'
Vue.prototype.$imageDown = imageDown.imageDown
//提示组件git 地址 https://github.com/lin-xin/vue-toast
// import 'vue2-toast/lib/toast.css';
// import Toast from 'vue2-toast';
// // Vue.use(Toast);
// Vue.use(Toast, {
// 	type: 'center',
// 	duration: 1500,
// 	wordWrap: true
// });

//公共组件
import pheader from '@/components/pheader.vue'
import pfooter from '@/components/pfooter.vue'
import vswitch from '@/components/switch.vue'

Vue.component('pheader', pheader)
Vue.component('pfooter', pfooter)
Vue.component('vswitch', vswitch)

// console.log = function (){}

import api from './http/api'

// import md5 from 'js-md5';
// Vue.prototype.$MD5 = md5;
import signFn from './util/aesEncryption'
Vue.prototype.$getSign = signFn.getSign;
Vue.prototype.$api = api;
Vue.config.productionTip = false

//微信授权
import utils from '@/util/wxlogin';  // 引入刚才新建的js文件
Vue.prototype.$utils = utils


router.beforeEach((to, from, next) => {
	if (to.path == '/login' || to.path == '/register' || to.path == '/forgot') {
		if (store.state.token || localStorage.getItem('token')) {
			next('/');
		} else {
			next();
		}
	} else {
		// alert('您还没有登录，请先登录');
		// this.$toast('您还没有登录，请先登录')
		if (store.state.token || localStorage.getItem('token')) {
			next();
		} else {
			next('/login');
		}

	}

})

router.afterEach(to => {
	console.log("to.name:" + to.name)
	// 与APP互通消息
	// if(to.name != 'resume' && to.name != 'login'){
	//  if(localStorage.getItem('openPass')){
	//  	  if(localStorage.getItem('openPassok') == 'success'){

	//   }else{
	// 	  router.push('/resume')
	//   }
	//  }else{

	//  }
	// }
	console.log(localStorage.getItem('openPass'))

	if (localStorage.getItem("isFromApp") && JSON.parse(localStorage.getItem("isFromApp"))) {
		if (to.name == 'home') {
			sendAppMessage(true)
		} else {
			sendAppMessage(false)
		}
	}
	// console.log("afterEach to:"+JSON.stringify(to))
	// window.scrollTo(0, 0)
})


window.vm = new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

