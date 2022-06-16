<template>
  <div class="error">
	 <div>
		 <span>404</span>
		 <p>请求错误</p>
		 <div class="btn" @click="goHome()">
			 返回首页
		 </div>
	 </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {
  },
  data() {
  	return{
		num:1
	}
  },
  async created() {
	// let ret = await this.$api.getShop();
	// console.log(ret)
  },
  methods:{
	  goHome(){
		  window.location.href = '/'
	  }
  }
}
</script>
<style type="text/css" scoped>
	.error{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80vh;
		text-align: center;
	}
	.error span{
		font-size: 60px;
	}
	.error p{
		font-size: 50px;
	}
	.btn {
		width: 640px;
		height: 88px;
		line-height: 88px;
		background: #D93025;
		border-radius: 44px;
		color: white;
		text-align: center;
		margin: 100px auto 0;
		font-size: 36px;
		
	}
	
	.btn:active {
		opacity: .8;
	}
	
</style>
