<template>
  <div class="weui-div" @click.stop="toggle">
    <span class="weui-switch" :class="{'weui-switch-on' : me_checked}" :value="value" ></span>
    <div v-if='!me_checked' class="weui-div-2">否</div>
    <div v-if='me_checked' class="weui-div-1">是</div>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Boolean,
        default: true
      },
      FId: {
        type: String,
        default: '',
      },
      index: {
        type: Number,
        default:11090,
      },
      handle: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        me_checked: this.value
      }
    },
    watch: {
      value(){
        this.me_checked = this.value;
      }
    },
    methods: {
      toggle() {
        // 是否可点击
        if(this.handle === true){
          this.me_checked = !this.me_checked;
          this.$emit('changeSwitch', this.me_checked,this.FId,this.index);
        }

      }
    }
  }
</script>
<style>
  .weui-div{
    position:relative;
    font-weight: bold;
    cursor:pointer;
    width: 120px;
    height: 64px;
  }
  .weui-div-1{
    position:absolute;
    left:20px;
    top:0;
    line-height:64px;
    font-size:24px;
    color:white;
  }
  .weui-div-2{
    position:absolute;
    right:22px;
    top:0;
    line-height:64px;
    font-size:24px;
    color:#999999;
  }
  .weui-switch {
    display: block;
    position: relative;
    width: 120px;
    height:64px;
    border: 1px solid #DFDFDF;
    outline: 0;
    border-radius: 326px;
    box-sizing: border-box;
    background-color: #DFDFDF;
    transition: background-color 0.1s, border 0.1s;
    cursor: pointer;
  }
  .weui-switch:before {
   /* content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 30px;
    border-radius: 15px;
    background-color: #E6E6E6;
    transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1); */
  }
  .weui-switch:after {
    content: " ";
    position: absolute;
    top: 0;
    left: 0;
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: #FFFFFF;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
    transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
  }
  .weui-switch-on {
    border-color: #d93025;
    background-color: #d93025;
  }
  .weui-switch-on:before {
    border-color: #d93025;
    background-color: #d93025;
  }
  .weui-switch-on:after {
    transform: translateX(55px);
  }
</style>

