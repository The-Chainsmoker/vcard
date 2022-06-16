# card

## Project setup
```
npm install
```
```
iOS打包注意以下

```
```
1.查看manifest.json中是否有这个权限配置："XMLHttpRequest": { "description": "跨域网络连接" }

2.将axios原码的请求方式 var request = new XMLHttpRequest() 改为 var request = new plus.net.XMLHttpRequest()
此方法解决了axios无法发送网络请求的问题，但是也存在其他问题，比如上传图片等，(好在项目中是用的base64)
————————————————
版权声明：本文为CSDN博主「哈啰，小米」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/hcx_hcx/article/details/116084107
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
