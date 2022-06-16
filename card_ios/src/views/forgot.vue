<template>
	<div class="login">
		<div class="tBox">
			<img class="bg" src="../assets/loginbg.png">
			<div class="logo"></div>
		</div>
		<div>
			<div class="navs">
				<div class="nav" :class="active==0?'active':''">
					忘记密码
				</div>
			</div>
			<!-- 手机号 -->
			<div>
				<div class="lists">
					<div class="list">
						<img class="phone" src="../assets/phone.png">
						<div class="listr">
							<input type="" name="" id="" value="" placeholder="输入手机号" />
						</div>
					</div>
					<div class="list">
						<img class="codeimg" src="../assets/code.png">
						<div class="listr">
							<input type="" name="" id="" value="" placeholder="输入验证码" />
							<span @click="getCode()" class="code" :class="issend?'send':''">{{codeText}}</span>
						</div>
					</div>
					<div class="list">
						<img class="codeimg" src="../assets/pass.png">
						<div class="listr">
							<input type="" name="" id="" value="" placeholder="新密码" />
						</div>
					</div>
					<div class="list">
						<img class="codeimg" src="../assets/pass.png">
						<div class="listr">
							<input type="" name="" id="" value="" placeholder="确认密码" />
						</div>
					</div>
				</div>
			</div>
			<div class="bom">
				<div class="btn">
					确认修改
				</div>
				<div class="tips" >
					<span @click="goLogin()">密码登录</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'forgot',
		components: {},
		data() {
			return {
				active: 0,
				issend: false,
				codeText: '发送验证码',
				timer: null,
				time: 60,
			}
		},
		async created() {},
		methods: {
			goLogin(){
				this.$router.push({
					path:'/login?nav=1'
				})
			},
			changeNav(e){
				this.active = e
				this.issend = false;
				this.codeText='发送验证码'
				clearInterval(this.timer)
				this.timer = null
				this.tim = 60
			},

			getCode() {
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
	
	.lists{
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
	.bom{
		margin-top: 90px;
	}
	.noacount{
		font-size: 24px;
		color: #D93025;
		text-align: center;
	}
	.btn{
		width: 640px;
		height: 88px;
		line-height: 88px;
		background: #D93025;
		border-radius: 44px;
		color: white;
		text-align: center;
		margin: 20px auto 0;
		font-size:36px ;
	}
	.btn:active{
		opacity: .8;
	}
	.tips{
		text-align: center;
		margin-top: 20px;
	}
	.tips span{
		font-size: 24px;
		color: #999999;
	}
	.tips .color{
		color: black;
	}
</style>
