<template>
  <div class="consume">
	  <pheader :title="'消费详情'" :back="true"></pheader>
	  <!--  -->
	 <div class="count">
		 <div class="ctop">
			 <p class="tit">消费-小卖部</p>
			 <h3 class="num">-0.99</h3>
		 </div>
		 <div>
			 <div class="lists">
				 <div class="list">
					 <span>交易类型</span>
					 <p>消费</p>
				 </div>
				 <div class="list">
					 <span>交易时间</span>
					 <p>2021-9-3 11:19:19</p>
				 </div>
				 <div class="list">
					 <span>交易单号</span>
					 <p>100008999887654654</p>
				 </div>
			 </div>
		 </div>
	 </div>
  </div>
</template>

<script>
export default {
  name: 'consumedetail',
  components: {
  },
  data() {
  	return{
	}
  },
  async created() {
	 
  },
  methods:{
	  golimit(){
		  this.$router.push({
		  	path: '/limit'
		  })
	  }
  }
}
</script>
<style type="text/css" scoped>
	.consume{
		padding-top: 108px;
	}
	.count{
		padding: 40px;
		box-sizing: border-box;
		width: 698px;
		min-height: 1166px;
		background: white;
		border-radius: 10px;
		margin: auto;
	}
	.ctop{
		text-align: center;
		padding-top: 80px;
		padding-bottom: 130px;
		border-bottom: 1px solid #EEEEEE;
	}
	.tit{
		color: #333333;
		font-size: 32px;
	}
	.num{
		font-size: 60px;
		color: black;
		margin-top: 39px;
		font-weight: bold;
	}
	.lists{
		padding-top: 50px;
	}
	.list{
		display: flex;
		margin-bottom: 30px;
	}
	.list span{
		color: #999999;
		margin-right: 38px;
		font-size: 28px;
	}
	.list p{
		font-size: 28px;
		color: #333333;
		flex: 1;
	}
	
</style>