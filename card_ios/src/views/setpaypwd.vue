<template>
	<div class="opencard" id="opencard">
		<pheader :title="title" :back="true"></pheader>
		<!--  -->
		<div class="count">
				<div>
					<div class="jhBox">
						<div class="list">
							<span class="listl">旧交易密码</span>
							<div class="listr" id="pas3">
								<div :id="'areaNumber3'+pwdid" style="width: 100%;text-align: right;">
									<div :id="'numberInput3'+pwdid" diasbled placeholder="请输入6位数字的交易密码" tabIndex="1"
										kbdtype="Number" action="/PasswordServlet"
										modulus-hex="a974e94429df917231eb905d71ec0386be6120c3132cebed6c932c55444d781b43f0616be8d19b9ad4e4e9e9762f384dd1fb4b81fee947a9b6c09966ee3d8f7efff035cb13528e0862641eb744a64aa91208ffa53c9f11df7293a50814c9e75c631604fe90caa91c78d8f2250ebd489451f3d20fdb8f6dc1e49e88555eb80fdd"
										readonly="readonly"
										style="width:100%;height:33px;line-height:33px;text-indent: 0.5em;font-family:微软雅黑,黑体;outline: none;">
									</div>
								</div>
							</div>
						</div>
						<div class="list">
							<span class="listl">新交易密码</span>
							<div class="listr" id="pas1">
								<div :id="'areaNumber'+pwdid" style="width: 100%;text-align: right;">
									<div :id="'numberInput'+pwdid" diasbled placeholder="请输入6位数字的交易密码" tabIndex="1"
										kbdtype="Number" action="/PasswordServlet"
										modulus-hex="a974e94429df917231eb905d71ec0386be6120c3132cebed6c932c55444d781b43f0616be8d19b9ad4e4e9e9762f384dd1fb4b81fee947a9b6c09966ee3d8f7efff035cb13528e0862641eb744a64aa91208ffa53c9f11df7293a50814c9e75c631604fe90caa91c78d8f2250ebd489451f3d20fdb8f6dc1e49e88555eb80fdd"
										readonly="readonly"
										style="width:100%;height:33px;line-height:33px;text-indent: 0.5em;font-family:微软雅黑,黑体;outline: none;">
									</div>
								</div>
								<!-- <input v-model="formData.password" placeholder="请输入6位数字的交易密码" type="text"> -->
							</div>
						</div>
						<div class="list">
							<span class="listl">确认新密码</span>
							<div class="listr" id="pas2">
								<div :id="'areaNumber2'+pwdid" style="width: 100%;text-align: right;">
									<div :id="'numberInput2'+pwdid" placeholder="请输入6位数字的交易密码" tabIndex="1" kbdtype="Number"
										action="/PasswordServlet"
										modulus-hex="a974e94429df917231eb905d71ec0386be6120c3132cebed6c932c55444d781b43f0616be8d19b9ad4e4e9e9762f384dd1fb4b81fee947a9b6c09966ee3d8f7efff035cb13528e0862641eb744a64aa91208ffa53c9f11df7293a50814c9e75c631604fe90caa91c78d8f2250ebd489451f3d20fdb8f6dc1e49e88555eb80fdd"
										readonly="readonly"
										style="width:100%;height:33px;line-height:33px;text-indent: 0.5em;font-family:微软雅黑,黑体;outline: none;">
									</div>
								</div>
								<!-- <input v-model="formData.passwordagain" placeholder="请输入6位数字的交易密码" type="text"> -->
							</div>
						</div>
						<div class="list">
							<span class="listl">手机号</span>
							<div class="listr">
								<input v-model="formData.phone" placeholder="请输入手机号" type="text">
							</div>
						</div>
						<!-- <div class="list">
							<span class="listl">验证码</span>
							<div class="listr">
								<input v-model="formData.code" placeholder="请输入验证码" type="text">
								<div @click="getCode()" class="code" :class="issend?'send':''">
									{{codeText}}
								</div>
							</div>
						</div> -->
					</div>
				</div>
			</div>
			
				<div class="btn" @click="sureSetPwd()">
					确认修改
				</div>
		</div>
	</div>
</template>

<script>
	import Exif from 'exif-js'
	export default {
		name: 'setpaypwd',
		components: {},
		data() {
			return {
				title:'修改交易密码',
				temp: 0,
				iserror: true,
				formData: {
					phone: '', //手机号
					name: '', //姓名
					cardnum: '', //身份证号
					idNeverExpired: '', //身份证是否长期
					idCardIssueDate: '', //证件签发日
					idCardExpDate: '', //证件到期日
					userOccupation: '', //用户职业，24教学人员 Y1学生 Y9不便分类的其他从业
					gender: '', //用户性别，M-男 F-女
					countryCode: '156', //用户国籍
					type: 'idcard', //开卡类型idcard,card
					idPhotoFront: '', //正面
					idPhotoBack: '', //反面
					onecardnum: '', //一类卡卡号
					password: '',
					passwordagain: '',
					code: '',
				},
				issend: false,
				codeText: '发送验证码',
				timer: null,
				time: 60,
				// 
				value: false,
				FId: '123',
				index: 0,
				userInfo: null, //用户信息
				encpwd: '', //加密之后的密码报文
				encpwd3: '', //加密之后的旧密码报文
				smsOrder: '', //
				orderNo: '', //短信订单号
				cardNo: '', //卡号
				pwdid:new Date().getTime(),
			}
		},
		watch: {
			formData: {
				handler: function(a) {
					if (a.phone) {
						if (a.phone.length > 11) {

						}
						a.phone = parseInt(a.phone)
					} else {
						a.phone = ''
					}
					// console.log(a)
				},
				deep: true
			}

		},
		async created() {
			console.log(this.pwdid)
			this.cardNo =  localStorage.getItem('CardNo') || ''
			this.formData.phone = this.$store.state.phone || localStorage.getItem('phone') || ''
		},
		async mounted() {
			console.log(this.pwdid)
			var _this = this;
			var id = "#numberInput"+this.pwdid;
			var areaId =  "areaNumber"+this.pwdid;
			var id2 = "#numberInput2"+this.pwdid;
			var areaId2 =  "areaNumber2"+this.pwdid;
			var id3 = "#numberInput3"+this.pwdid;
			var areaId3 =  "areaNumber3"+this.pwdid;
			// $("window").loadKBD("https://online.gzekt.com/vcard/pwd/PasswordServlet");
			$(window).loadKBD();
			$(id).click(function() {
				$(id).showKBD({
					areaId: areaId,
					pageId: "opencard",
					maxLen: 6,
					cursor: true,
					mask: true,
				});
			});
			$(id2).click(function() {
				$(id2).showKBD({
					areaId: areaId2,
					pageId: "opencard",
					maxLen: 6,
					cursor: true,
					mask: true,
				});
			});
			$(id3).click(function() {
				$(id3).showKBD({
					areaId: areaId3,
					pageId: "opencard",
					maxLen: 6,
					cursor: true,
					mask: true,
				});
			});
			// $(window).loadKBD("https://online.gzekt.com/vcard/pwd/PasswordServlet");
			// $("#pas1").showKBD({
			// 	"areaId": "areaGraph",
			// 	"pageId": "page",
			// 	"maxLen": 10,
			// 	"cursor": true,
			// 	"mask": true,
			// 	"exponent_hex": "10001",
			// });
		},
		methods: {
			async sureSetpayPwd(){
				
				var data = {
					transCode: 'CHGPASSWD',
					mobileNo: this.formData.phone ? JSON.stringify(this.formData.phone) : '', //手机号
					cardNo:this.cardNo,
					oldCardPin:this.encpwd3,
					newCardPin:this.encpwd,
				};
				console.log(data)
				// return
				let ret = await this.$api.reqFn(data)
				console.log(ret)
				if(ret.retCode == 'SUCCESS'){
					this.$toast('修改成功')
					setTimeout(()=>{
						this.$router.go(-1)
					},1500)
				}else{
					this.$toast(ret.retMsg)
				}
			},
			async sureSetPwd(){
				this.getCode()
			},
			openKBD() {
				console.log(222)
				$("#numberInput").showKBD({
					"areaId": "areaNumber",
					"pageId": "page",
					"maxLen": 6,
					"cursor": true,
					"mask": false
				});
			},
			async getCode() {
				var _this = this;
				if (!this.formData.phone) {
					this.$toast('请输入手机号')
					// return
				}
				var id = "#numberInput"+this.pwdid;
				var id1 = "numberInput"+this.pwdid;
				var areaId =  "areaNumber"+this.pwdid;
				var id2 = "#numberInput2"+this.pwdid;
				var areaId2 =  "areaNumber2"+this.pwdid;
				var id3 = "#numberInput3"+this.pwdid;
				var areaId3 =  "areaNumber3"+this.pwdid;
				var val = $(id2).checkPWD(id1);
				switch (val) {
					case 1:
						// alert("输入一致");
						// this.$toast('')
						break;
					case 2:
						this.$toast('密码输入不一致')
						// alert("输入不一致");
						return;
					case 3:
						this.$toast('请输入确认密码')
						// alert("请输入确认密码");
						return;
					case 4:
						this.$toast('请输入密码')
						// alert("请输入密码");
						return;
					case 5:
						this.$toast('请输入密码和确认密码')
						// alert("请输入密码和确认密码");
						return;
				}
				var pwd = $(id).getKBD();
				var pwd3 = $(id3).getKBD();
				if (!pwd) {
					this.$toast('请输入密码')
				} else {
					
						$.ajax({
							type: "POST",
							url: "https://online.gzekt.com/vcard/pwd/ValidServlet",
							async: true,
							headers: {
								SESSIONID: localStorage.getItem('sessionid'),
								token: localStorage.getItem('sessionid')
							},
							data: {
								Password: pwd3,
							},
							dataType: "json",
							crossDomain: true,
							success: function(ret) {
								console.log(ret)
								if (ret.retcode == 0) {
									_this.encpwd3 = ret.encpwd
									$.ajax({
										type: "POST",
										url: "https://online.gzekt.com/vcard/pwd/ValidServlet",
										async: true,
										headers: {
											SESSIONID: localStorage.getItem('sessionid'),
											token: localStorage.getItem('sessionid')
										},
										data: {
											Password: pwd,
										},
										dataType: "json",
										crossDomain: true,
										success: function(ret) {
											console.log(ret)
											if (ret.retcode == 0) {
												_this.encpwd = ret.encpwd
												console.log('旧密码')
												console.log(_this.encpwd3)
												console.log('新密码')
												console.log(_this.encpwd)
												// _this.sendCode()
												_this.sureSetpayPwd()
											} else {
												this.$toast(ret.retmsg)
											}
									
										}
									});
								} else {
									this.$toast(ret.retmsg)
								}
					
							}
						});
					
				}
				return
				var pwd2 = $('#numberInput2').getKBD();
				if (!pwd2) {
					this.$toast('请输入确认密码')
				} else {
				}
			},
			async sendCode() {
				const smsOrder = 'sms' + new Date().getTime();
				var data = {
					transCode: 'RESETPASSWD1',
					smsOrder: smsOrder,
					mobileNo: JSON.stringify(this.formData.phone),
					userName:this.formData.name,
					idCardNo:this.formData.cardnum,
					cardNo:this.cardNo
				};

				// console.log(this.$getSign(paramsObj))
				let ret = await this.$api.sendMs(data);
				console.log(ret)
				if (ret.retCode == 'SUCCESS') {
					this.orderNo = ret.orderNo
					this.smsOrder = smsOrder
				} else {
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
	.opencard {
		padding-top: 108px;
		padding-bottom: 20px;
	}

	.count {
		width: 698px;
		/* min-height: 1166px; */
		background: white;
		border-radius: 10px;
		margin: auto;
		/* padding-bottom: 20px; */
		box-sizing: border-box;
		margin-bottom: 20px;
	}

	.btn {
		width: 600px;
		height: 80px;
		background: #D93025;
		color: white;
		line-height: 80px;
		text-align: center;
		margin: auto;
		border-radius: 40px;
		font-size: 32px;
	}

	.temps {
		display: flex;
		padding: 0 49px;
		padding-top: 80px;
	}

	.tempt {
		width: 50px;
		height: 50px;
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tempt span {
		background: #F68B84;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tempt img {
		width: 21px;
	}

	.tempt.active {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #D93025;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		box-sizing: border-box;
	}

	.tempt .circle {
		width: 34px;
		height: 34px;
		display: block;
		background: none;
		background: #D93025;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tempt .circle::after {
		background: white;
		display: block;
		width: 20px;
		height: 20px;
		border-radius: 50%;
		content: '';
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		top: 0;
	}

	.line {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-bottom: 28px;
	}

	.line div {
		width: 92px;
		border-bottom: 1px dashed #999999;
	}

	.tempt .next {
		width: 34px;
		height: 34px;
		border: 1px solid #999999;
		border-radius: 50%;
		background: none;
	}

	.cBox {
		min-height: 603px;
	}

	.text {
		color: #999999;
		font-size: 24px;
	}

	.text.textold {
		color: #F68B84;
	}

	.text.textac {
		color: #D93025;
	}

	/*  */
	.lists {
		margin-top: 109px;
	}

	.list {
		height: 90px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 29px;
		border-bottom: 1px solid #EEEEEE;
	}

	.listl {
		font-size: 32px;
		color: #333333;
	}

	.listr {
		flex: 1;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.listr input {
		flex: 1;
		height: 60px;
		outline: none;
		text-align: right;
		font-size: 28px;
		border: none;
	}

	.listr .cama {
		width: 35px;
		height: 30px;
		margin-left: 10px;
	}

	.listr .circle {
		width: 40px;
		height: 40px;
		border: 1px solid #aeaeae;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.listr .circle img {
		width: 30px;
	}

	.listr .circle.circleac {
		background: #D93025;
		border: 1px solid #D93025;
	}

	/*  */
	.zjBox {
		margin-top: 79px;
	}

	.idcardBox {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: auto;
		width: 600px;
		height: 354px;
		background-image: url(../assets/cardface.png);
		background-size: 100%;
		margin-bottom: 20px;

	}

	.idcardBoxf {
		background-image: url(../assets/cardf.png);
	}

	.firstcard {
		margin-top: 79px;
		background-image: url(../assets/firstcard.png);
	}

	.cam {
		width: 120px;
		height: 120px;
		background: #999999;
		border-radius: 50%;
		display: flex;
		align-items: center;
		margin: auto;
	}

	.firstcardBox {
		text-align: center;
	}

	.firstcardText {
		font-size: 28px;
		color: #333333;
	}

	.jhBox {
		margin-top:30px;
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
	}

	.code.send {
		background: #999999;
		color: white;
	}
</style>
