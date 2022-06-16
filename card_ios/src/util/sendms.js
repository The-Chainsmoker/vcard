export const sendAppMessage = (flag,type) => {
  uni.postMessage({
    data: {
		type:type?type:'router',
      isQuitApp: flag ? true : false
    }
  });
}