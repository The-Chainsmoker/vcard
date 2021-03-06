const imageDown = function (base64, success, error) {

	var bitmap = new window.plus.nativeObj.Bitmap('image')

	bitmap.loadBase64Data(base64, function (i) {

		bigmapToSave(bitmap, success, error)

	}, function (err) {

		window.plus.nativeUI(err.message)

	})

}

const bigmapToSave = function (bitmap, success, error) {

	var name = randomString(10)

	bitmap.save(`_doc/${name}.jpg`, { overwrite: false }, function (event) {

		console.log(event.target)

		imageSaveByGallery(event.target, success, error)

	}, function (err) {

		window.plus.nativeUI(err.message)

	})

}

const imageSaveByGallery = function (url, success, error) {

	window.plus.gallery.save(url, function (event) {

		const tarbitmap = window.plus.nativeObj.Bitmap.getBitmapById('image')

		tarbitmap.clear()

		success()

	}, function (err) {

		window.plus.nativeUI(err.message)

		error()

	})

}

const randomString = function randomString(e) {

	e = e || 32

	var t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'

	var a = t.length

	var n = ''

	for (var i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))

	return n

}

export default {
	imageDown
}