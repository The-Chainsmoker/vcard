function setRem() {
	let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
	let htmlDom = document.querySelector('html')
	if(htmlWidth >= 750){
		htmlWidth = 750
	}
	console.log(htmlWidth)
	htmlDom.style.fontSize = htmlWidth / 20 + 'px'
}
setRem();
window.onresize = function () {
	setRem()
}