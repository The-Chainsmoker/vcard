<template>
  <div class="home">
	  {{num}}
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
	  
  }
}
</script>
