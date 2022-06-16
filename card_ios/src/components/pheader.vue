<template>
	<div class="headerBox" :style="{background:bg?bg:'',color:color}">
		<div class="header">
			<div v-if="back" @click="backFn()" class="back">
				<img src="../assets/back.png" >
			</div>
			<div v-else></div>
			<div class="tit">{{title}}</div>
			<div v-if="right" class="right" @click="rightFn()">
				{{right}}
			</div>
			<div v-else class="right">
				
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'pubheader',
		props: {
			title: String,
			back: {
				value:Boolean,
				default:true
			},
			right: {
				value:String,
				default:''
			},
			bg: {
				value:String,
				default:''
			},
			color: {
				value:String,
				default:'white'
			},
		},
		data() {
			return{
				
			}
		},
		created() {
			
		},
		methods:{
			backFn(){
				this.$router.go(-1)
			},
			rightFn(){
				this.$emit('rightFn','')
			}
		}
	}
</script>

<style scoped>
	.headerBox{
		max-width: 750px;
		margin: auto;
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
		background: #D93025;
		height: 88px;
		align-items: center;
		color: white;
		z-index: 10;
	}
	.header{
		display: flex;
		align-items: center;
		height: 100%;
	}
	.header div{
		flex: 1;
		text-align: center;
	}
	.tit{
		font-size: 36px;
	}
	.headerBox img{
		width: 40px;
	}
	.header .back{
		text-align: left;
		padding-left: 26px;
	}
	.header .right{
		text-align: right!important;
		padding-right: 26px;
		font-size: 28px;
		
	}
</style>
