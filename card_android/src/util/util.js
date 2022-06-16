function getBeforeDate(day, str) {
	var now = new Date().getTime(); //获取毫秒数
	var before = new Date(now - ((day > 0 && day ? day : 0) * 86400 * 1000));
	var year = before.getFullYear();
	var month = before.getMonth() + 1;
	var date = before.getDate();
	console.log(date)
	let dayAgo = year + (str ? str : '') + (month < 10 ? '0' + month : month) + (str ? str : '') + (date < 10 ? '0' +
		date : date)
		console.log(dayAgo)
	return dayAgo
}
export default{
	getBeforeDate
}
