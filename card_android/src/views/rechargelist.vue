<template>
  <div class="balance">
	  <pheader :back="true" :title="'充值记录'" ></pheader>
	  <div class="lists">
		  <h3>充值记录</h3>
		  <div class="list">
			  <div class="listlb">
				  <img src="../assets/we.png" >
				  <div class="listl">
				  				  <p>微信充值</p>
				  				  <span>11月5日11:20</span>
				  </div>
			  </div>
			  <div class="listr">
				  -15
			  </div>
		  </div>
		  <div class="list">
			  <div class="listlb">
				  <img src="../assets/we.png" >
				  <div class="listl">
				  				  <p>微信充值</p>
				  				  <span>11月5日11:20</span>
				  </div>
			  </div>
			  <div class="listr">
				  -15
			  </div>
		  </div>
		  <div class="list">
			  <div class="listlb">
				  <img src="../assets/ali.png" >
				  <div class="listl">
				  				  <p>支付宝充值</p>
				  				  <span>11月5日11:20</span>
				  </div>
			  </div>
			  <div class="listr color">
				  +15
			  </div>
		  </div>
	  </div>
  </div>
</template>

<script>
export default {
  name: 'balance',
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
	  
  }
}
</script>
<style type="text/css" scoped>
	.balance{
		padding-top: 108px;
	}
	.lists{
		background: white;
		border-radius: 10px;
		width: 700px;
		margin: auto;
		padding:0 20px;
		box-sizing: border-box;
	}
	.lists h3{
		font-weight: 400;
		color: #333333;
		font-size: 32px;
		padding: 30px 0;
	}
	.listlb{
		display: flex;
		align-items: center;
	}
	.listlb img{
		width: 70px;
		height: 70px;
		margin-right: 20px;
	}
	.list{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: 29px;
		border-bottom: 1px solid #EEEEEE;
		margin-bottom: 29px;
	}
	.list:last-child{
		border-bottom: 0;
	}
	.listl p{
		font-size: 28px;
		margin-bottom: 10px;
		color: #333333;
	}
	.listl span{
		color: #999999;
		font-size: 24px;
	}
	.listr{
		font-size: 32px;
		color: #333333;
	}
	.color{
		color: #F51111;
	}
</style>