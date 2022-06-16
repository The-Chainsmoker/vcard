<template>
	<div style="height: 100%;display: flex;flex-direction: column;overflow: hidden;">
		<div style="padding: 5vw 3vw;text-align: center;">
			<p style="font-size: 20px;">请拖动或旋转裁图片至剪框选定证件边缘大小（裁剪框长宽比已固定）</p>
		</div>
		<div style="flex: 1;">
			<vue-cropper style="width: 100vw;height: 100%;"
			              ref="cropper"
						  mode="100% auto"
			              :img="option.img"
			              :outputSize="option.size"
			              :outputType="option.outputType"
						  :fixedNumber="option.fixedNumber"
						  :fixed="option.fixed"
			              :info="true"
			              :full="option.full"
			              :canMove="option.canMove"
			              :canMoveBox="option.canMoveBox"
			              :original="option.original"
			              :autoCrop="option.autoCrop"
			              :autoCropWidth="option.autoCropWidth"
			              :autoCropHeight="option.autoCropHeight"
			              :fixedBox="option.fixedBox"
						   :infoTrue="option.infoTrue"
						   :centerBox="option.centerBox"
			              @realTime="realTime"
			              @imgLoad="imgLoad"
						  @imgMoving="imgMoving"
			            ></vue-cropper>
		</div>
					<div style="display: flex;align-items: center;padding: 3vw;justify-content: space-around;padding-bottom: 15vw;">
						<input type="button" class="oper" style="height:auto;width:auto;margin:3px 5px;padding: 0 5px;" value="放大" title="放大" @click="changeScale(1)">
						      <input type="button" class="oper" style="height:auto;width:auto;margin:3px 5px;padding: 0 5px;" value="缩小" title="缩小" @click="changeScale(-1)">
						      <!-- <input type="button" class="oper" style="height:auto;width:auto;margin:3px 5px;padding: 0 5px;" value="左旋转" title="左旋转" @click="rotateLeft"> -->
						      <input type="button" class="oper" style="height:auto;width:auto;margin:3px 5px;padding: 0 5px;" value="旋转" title="旋转" @click="rotateRight">
							  <!-- ↺↻ -->
						      <!-- <input type="button" class="oper" style="height:20px;width:23px;font-size:20px;margin:3px 5px;" value="↓" title="下载" @click="down('blob')"> -->
							  <div @click="cancelCut()" style="font-size: 16px;">
							  								  取消
							  </div>
							  <div @click="sureCut()" style="font-size: 16px;">
							  								  确定裁剪
							  </div>
					</div>
	</div>
</template>

<script>
	// https://www.jianshu.com/p/85a52da879bb
	  export default {
		  name: 'croptep',
		  props:{
			  imgSrc:{
				  value:String,
				  default:''
			  }
		  },
	    data() {
	      return {
	        headImg:'',
	        //剪切图片上传
	        crap: false,
	        previews: {},
	        option: {
	          img: "",
	          outputSize:1, //剪切后的图片质量（0.1-1）
	          full: false,//输出原图比例截图 props名full
	          outputType: 'png',
	          canMove: true, 
	          original: false, 
	          canMoveBox: false, // 截图框能否拖动
	          autoCrop: true, 
	          // autoCropWidth:250, 
	          // autoCropHeight: 200, 
			  fixedNumber: [85.6, 54], // 截图框的宽高比例
			  fixed: true, // 是否开启截图框宽高固定比例
	          fixedBox: true ,//固定截图框大小 不允许改变
			  infoTrue:false,//为展示真实输出图片宽高 false 展示看到的截图框宽高
			  centerBox:true,
			  
	        }, 
	        fileName:'',  //本机文件地址
	        downImg: '#',
	        imgFile:'',
	        uploadImgRelaPath:'', //上传后的图片的地址（不带服务器域名）
	      }
	    },
		created() {
		},
		mounted() {
			this.option.img = this.imgSrc
			// console.log(this.imgSrc)
			this.$nextTick(function() {})
			
			this.$refs.cropper.startCrop()
		},
	    methods: {
	      //放大/缩小
	      changeScale(num) { 
	        console.log('changeScale')
	        num = num || 1; 
	        this.$refs.cropper.changeScale(num); 
	      }, 
	      //坐旋转
	      rotateLeft() { 
	        console.log('rotateLeft')
	        this.$refs.cropper.rotateLeft(); 
	      }, 
	      //右旋转
	      rotateRight() { 
	        console.log('rotateRight')
	        this.$refs.cropper.rotateRight(); 
	      }, 
	      //上传图片（点击上传按钮）
	      finish(type) {}, 
	      // 实时预览函数 
	      realTime(data) { 
	        // console.log('realTime')
	        this.previews = data 
			// console.log(data)
	      }, 
		  cancelCut(){
			  this.$emit('cancelCut','')
		  },
		  sureCut(){
			  this.$refs.cropper.getCropData((data) => {
					// console.log(data)
					this.$emit('sureCut',data)
			  }) 
		  },
	      //下载图片
	      down(type) { 
	        console.log('down')
	        var aLink = document.createElement('a') 
	        aLink.download = 'author-img' 
	        if (type === 'blob') { 
	          this.$refs.cropper.getCropBlob((data) => { 
	            this.downImg = window.URL.createObjectURL(data)
	            aLink.href = window.URL.createObjectURL(data) 
	            aLink.click() 
	          }) 
	        } else { 
	          this.$refs.cropper.getCropData((data) => { 
				  console.log(data)
	            this.downImg = data;
	            aLink.href = data; 
	            aLink.click() 
	          }) 
	        } 
	      }, 
	      //选择本地图片
	      uploadImg(e, num) { 
	        console.log('uploadImg');
	        var _this = this;
	        //上传图片 
	        var file = e.target.files[0] 
	        _this.fileName = file.name;
	        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) { 
	          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种') 
	          return false 
	        } 
	        var reader = new FileReader(); 
	        reader.onload =(e) => { 
	          let data; 
	          if (typeof e.target.result === 'object') { 
	            // 把Array Buffer转化为blob 如果是base64不需要 
	            data = window.URL.createObjectURL(new Blob([e.target.result])) 
	          } 
	          else { 
	            data = e.target.result 
	          }
	          if (num === 1) { 
	            _this.option.img = data 
	          } else if (num === 2) { 
	            _this.example2.img = data 
	          } 
	        } 
	        // 转化为base64 
	        // reader.readAsDataURL(file) 
	        // 转化为blob 
	        reader.readAsArrayBuffer(file);
	        
	      }, 
		  imgMoving(e){
			  console.log(e)
		  },
	      imgLoad (msg) { 
	        console.log('imgLoad')
	        console.log(msg) 
	      }
	    }, 
	    
	  }
</script>

<style>
	.cropper-face{
		/* background-color:transparent!important;
		background-image: url(../assets/cardface.png);
		background-size: 100% 100%;
		opacity: .5; */
	}
</style>
