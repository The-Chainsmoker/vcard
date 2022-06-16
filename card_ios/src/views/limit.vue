<template>
  <div class="set">
	  <pheader :title="'消费限额'" :back="true"></pheader>
	  <!--  -->
	  <div class="navs">
		  <div class="nav">
			  <div class="navl">
				  <span>消费限额</span>
			  </div>
			  <div class="navr">
				  <input v-model="num" type="" name="" id="" value="" placeholder="请输入消费限制金额" />
			  </div>
		  </div>
	  </div>
	  <div class="btn">
		  完成
	  </div>
  </div>
</template>

<script>
export default {
  name: 'limit',
  components: {
  },
  data() {
  	return{
		num:'',
		data:'abs'
	}
  },
  watch:{
  	  num(a,b){
		  console.log(this.num)
  		  if(this.num){
  			  this.num = parseInt(this.num)
  		  }else{
			  this.num = ''
		  }
  		  
  	  }
  },
  async created() {
	  var paramsObj = { xid: 123, pageSize: 20, type: 1, pageNo: '',obj:{id:1},arr:[2,3,5] };
	  // // var sign = getSign(paramsObj, kAppKey, kAppSecret);
	  // console.log(this.$getSign(paramsObj))
	// let ret = await this.$api.loginFn(paramsObj);
	// console.log(ret)
  },
  methods:{
	  
  }
}
</script>
<style type="text/css" scoped>
	.set{
		padding-top: 108px;
	}
	.navs{
		margin: 20px;
		background: white;
		border-radius: 10px;
		padding:0 20px;
	}
	.nav{
		display: flex;
		height: 90px;
		align-items: center;
		border-bottom: 1px solid #EEEEEE;
	}
	.navl{
		display: flex;
		align-content: center;
	}
	.nav .ico{
		margin-right: 29px;
		width: 45px;
	}
	.nav span{
		font-size: 32px;
		color: #333333;
	}
	.nav:last-child{
		border-bottom: 0;
	}
	.nav .navr{
		flex: 1;
		margin-left: 50px;
	}
	.navr input{
		height: 60px;
		text-align: right;
		width: 100%;
		border: none;
		outline: none;
		font-size: 28px;
	}
	.btn{
		width: 600px;
		height: 80px;
		background: #D93025;
		color: white;
		line-height: 80px;
		text-align: center;
		margin: auto;
		border-radius: 40px;
		margin-top: 900px;
		font-size: 32px;
	}
	.btn:active{
		opacity: .8;
	}
</style>