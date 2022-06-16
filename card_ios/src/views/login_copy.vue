<template>
	<div class="login">
		<div class="tBox">
			<img class="bg" src="../assets/loginbg.png">
			<div class="logo"></div>
		</div>
		<div>
			<div class="navs">
				<div class="nav" @click="changeNav(0)" :class="active==0?'active':''">
					手机号登录
				</div>
				<div class="nav" @click="changeNav(1)" :class="active==1?'active':''">
					密码登录
				</div>
			</div>
			<!-- 手机号 -->
			<div>
				<div class="lists">
					<div class="list">
						<img class="phone" src="../assets/phone.png">
						<div class="listr">
							<input  v-model="phone" type="" name="" id="" value="" placeholder="输入手机号" />
						</div>
					</div>
					<div class="list" v-if="active == 0">
						<img class="codeimg" src="../assets/code.png">
						<div class="listr">
							<input v-model="code" type="" name="" id="" value="" placeholder="输入验证码" />
							<span @click="getCode()" class="code" :class="issend?'send':''">{{codeText}}</span>
						</div>
					</div>
					<div class="list" v-if="active ==1">
						<img class="codeimg" src="../assets/code.png">
						<div class="listr">
							<input v-model="pass" type="" name="" id="" value="" placeholder="输入密码" />
						</div>
					</div>
				</div>
			</div>
			<p class="forgot">
				<span @click="goforgot()">忘记密码？</span>
			</p>
			<div class="bom">
				<p class="noacount" @click="goRegisert()">没有账号？立即注册</p>
				<div class="btn" @click="loginFn()">
					登录
				</div>
				<div class="tips">
					<span>登录即代表同意</span>
					<span class="color">《用户协议》</span>
					<span>和</span>
					<span class="color">《隐私政策》</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'login',
		components: {},
		data() {
			return {
				active: 0,
				issend: false,
				codeText: '发送验证码',
				timer: null,
				time: 60,
				orderNo:'',//短信订单号
				phone:'',//手机号
				code:'',//手机验证码
				pass:'',//密码
				smsOrder:'',//
			}
		},
		async created() {
			if (this.$route.query.nav) {
				this.active = this.$route.query.nav
			}
		},
		methods: {
			async loginFn() {
				let _this = this;
				var data = {
					transCode:'USERLOGIN',
					mobileNo:_this.phone,
					smsOrder:_this.smsOrder,
					smsCode:_this.code
				};
				var ret = await _this.$api.reqFn(data);
				console.log(ret)
				if(ret.retCode == 'SUCCESS'){
					_this.$store.state.token = ret.token
					_this.$store.state.phone = _this.phone
					
					_this.$store.state.Sign = ret.Sign
					_this.$store.state.frontSeq = ret.frontSeq
					if(ret.userId){
						localStorage.setItem('userId',ret.userId)
					}
					if(ret.cardNo){
						localStorage.setItem('CardNo',ret.cardNo)
					}
					localStorage.setItem('token',ret.token)
					localStorage.setItem('phone',_this.phone)
					localStorage.setItem('Sign',ret.Sign)
					localStorage.setItem('Sign',ret.frontSeq)
				}else{
					this.$toast(ret.retMsg)
				}
				setTimeout(()=>{
					_this.$router.push({
						path:'/'
					})
				},1000)
				return
				setTimeout(function() {
					_this.$toast('登录成功，正在跳转');
					setTimeout(()=>{
						_this.$router.push({
							path:'/'
						})
					},1500)
				}, 2000)
				
			},
			goRegisert() {
				this.$router.push({
					path: '/register'
				})
			},
			goforgot() {
				this.$router.push({
					path: '/forgot'
				})
			},
			changeNav(e) {
				this.active = e
				this.issend = false;
				this.codeText = '发送验证码'
				clearInterval(this.timer)
				this.timer = null
				this.tim = 60
				// this.$router.push({
				// 	query: '',
				// 	path:'/login'
				// })
			},

			async getCode() {
				if(!this.phone){
					this.$toast('请输入正确的手机号')
					return
				}
				const smsOrder = 'sms'+ new Date().getTime();
				var data = {
					transCode:'SMSREQUEST',
					mobileNo:this.phone,
					smsOrder:smsOrder,
				};
				
				// console.log(this.$getSign(paramsObj))
				let ret = await this.$api.sendMs(data);
				console.log(ret)
				if(ret.retCode == 'SUCCESS'){
					this.$toast('发送成功');
					this.orderNo = ret.orderNo
					this.smsOrder = smsOrder
				}else{
					return
				}
				this.issend = true
				this.timer = setInterval(() => {
					this.time -= 1
					this.codeText = this.time + ' s 重新发送'
					if (this.time <= 0) {
						clearInterval(this.timer)
						this.issend = false
						this.codeText = '重新发送'
						this.time = 60
					}
				}, 1000)
			},

		}
	}
</script>
<style type="text/css" scoped>
	.login {
		min-height: 100vh;
		background: white;
	}

	.tBox {
		position: relative;
	}

	.bg {
		width: 750px;
		height: 453px;
	}

	.logo {
		position: absolute;
		bottom: -59px;
		width: 170px;
		height: 170px;
		border-radius: 45px;
		box-shadow: 0px 15px 29px 2px rgba(217, 48, 37, 0.15);
		z-index: 1;
		left: 0;
		right: 0;
		margin: auto;
		background: white;
	}

	/*  */
	.navs {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 100px;
	}

	.nav {
		width: 200px;
		text-align: center;
		padding-bottom: 20px;
		font-size: 32px;
		color: #CCCCCC;
		border-bottom: 4px solid #CCCCCC;
	}

	.active {
		font-weight: bold;
		color: #D93025;
		border-bottom: 4px solid #D93025;
	}

	.lists {
		margin-top: 50px;
	}

	.list {
		width: 540px;
		height: 86px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-left: 20px;
		box-sizing: border-box;
		margin: auto;
		border-bottom: 1px solid #DDDDDD;
	}

	.list .phone {
		width: 29px;
	}

	.list .codeimg {
		width: 33px;
	}

	.listr {
		flex: 1;
		margin-left: 30px;
		display: flex;
		align-items: center;
		padding-right: 10px;

	}

	.listr input {
		height: 60px;
		border: none;
		outline: none;
		font-size: 28px;
		flex: 1;
		display: block;
		width: 150px;
	}

	.code {
		min-width: 140px;
		padding: 0 10px;
		box-sizing: border-box;
		height: 44px;
		background: #D93025;
		border-radius: 10px;
		color: white;
		line-height: 44px;
		text-align: center;
		margin-left: 22px;
		color: #D93025;
		background: white;
		font-size: 28px;
	}

	.code.send {
		/* background: #999999; */
		color: #999999;
		width: max-content;
	}

	.forgot {

		margin-top: 20px;
		color: #999999;
		text-align: right;
		padding-right: 125px;
	}

	.forgot span {
		font-size: 24px;
	}

	.bom {
		margin-top: 180px;
	}

	.noacount {
		font-size: 24px;
		color: #D93025;
		text-align: center;
		padding: 10px 0;
	}

	.btn {
		width: 640px;
		height: 88px;
		line-height: 88px;
		background: #D93025;
		border-radius: 44px;
		color: white;
		text-align: center;
		margin: 10px auto 0;
		font-size: 36px;
	}

	.btn:active {
		opacity: .8;
	}

	.tips {
		text-align: center;
		margin-top: 20px;
	}

	.tips span {
		font-size: 24px;
		color: #999999;
	}

	.tips .color {
		color: black;
	}
</style>
