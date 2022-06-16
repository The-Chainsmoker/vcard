<template>
  <div class="homebox">
    <van-swipe :initial-swipe="current" class="my-swipe" :show-indicators="false" @change="onChange">
      <van-swipe-item>
        <div style="height: 100vh;">
          <finance></finance>
          <!-- <div style="min-height: 100vh;background: white;" v-else>
					<van-skeleton title :row="13" />
				</div> -->
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div style="height: 100vh;">
          <home ref="home"></home>
          <!-- <div style="min-height: 100vh;background: white;" v-else>
					<van-skeleton title :row="13" />
				</div> -->
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div style="height: 100vh;">
          <user></user>
          <!-- <div style="min-height: 100vh;background: white;" v-else>
					<van-skeleton title :row="13" />
				</div> -->
        </div>
      </van-swipe-item>
    </van-swipe>
    <pfooter :active="current"></pfooter>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import finance from '@/components/finance.vue'
import home from '@/components/Home.vue'
import user from '@/components/user.vue'
export default {
  name: 'homebox',
  components: {
    finance,
    home,
    user,
  },
  data() {
    return {
      // current:1
    }
  },
  computed: {
    ...mapState(['current']),
  },

  created() {
    // let ret = await this.$api.getShop();
    console.log('ret')
  },
  watch: {
    '$store.state.current': function (newData, old) {
      //除了home页面其他的弹窗
      if (newData !== 1) {
        this.$refs.home.show = false

        //清除二维码刷新
        clearInterval(this.$refs.home.codeTime)
        this.$refs.home.codeTime = '' //定时器有返回值需要清空
      }
    },
  },
  methods: {
    onChange(e) {
      this.$store.state.current = e
    },
  },
}
</script>
