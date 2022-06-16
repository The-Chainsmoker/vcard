<template>
	<div class="footerBox">
		<div></div>
		<div class="footer">
			<div @click="changeNav(0)" :class="active == 0?'active':''">
				<img v-if="active == 0" src="../assets/tabbar/ico1_1.png" >
				<img v-else src="../assets/tabbar/ico1.png" >
				<span>金融</span>
			</div>
			<div class="home" @click="changeNav(1)" :class="active == 1?'active':''">
				<img v-if="active == 1" src="../assets/tabbar/ico2_2.png" >
				<img v-else src="../assets/tabbar/ico2.png" >
				<span>首页</span>
			</div>
			<div class="user" @click="changeNav(2)" :class="active == 2?'active':''">
				<img v-if="active == 2" src="../assets/tabbar/ico3_3.png" >
				<img v-else src="../assets/tabbar/ico3.png" >
				<span>个人</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'pubfooter',
		props: {
			active:{
				value:Number,
				default:0
			}
		},
		data() {
			return{
				// active:0
			}
		},
		created() {
			
		},
		methods:{
			changeNav(a){
				this.$store.state.current = a
				// if(a == 0){
				// 	this.$router.push({
				// 		path:'/finance'
				// 	})
				// }else if(a == 1){
				// 	this.$router.push({
				// 		path:'/'
				// 	})
				// }else if(a == 2){
				// 	this.$router.push({
				// 		path:'/user'
				// 	})
				// }
			}
		}
	}
</script>

<style scoped>
	.footer{
		background: white;
		max-width: 750px;
		margin: auto;
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		align-items: center;
		height: 88px;
	}
	.footer div{
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
	}
	.footer div span{
		font-size: 20px;
		color: #999999;
	}
	.footer img{
		width: 45px;
		height: 45px;
	}
	.home img{
		width: 47px;
		height: 43px;
	}
	.user img{
		width: 42px;
		height: 43px;
	}
	.footer div.active span{
		color: #D53029;
	}
</style>
