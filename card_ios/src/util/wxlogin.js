var auths = null;

function authLogin() {
  var s = auths[0];
  if (!s.authResult) {
    s.authorize(function (e) {
      alert("授权成功：" + JSON.stringify(e));

    }, function (e) {
      alert("授权失败：" + JSON.stringify(e));
    },
      { scope: 'snsapi_userinfo', state: 'authorize test', appid: 'wxbd433e331b2fb2df' });
    s.login(function (e) {
      // 获取登录操作结果

      var result = e.target.authResult;
      alert("登录认证成功：" + JSON.stringify(result));
      authUserInfo()
    }, function (e) {
      alert("登录认证失败！");
    }, {});
  }
}

function authUserInfo() {
  var s = auths[0];
  if (!s.authResult) {
    alert("未登录授权！");
  } else {
    s.getUserInfo(function (e) {
      alert("获取用户信息成功：" + JSON.stringify(s.userInfo));

      //拿到用户信息，进行相关处理，ajax传用户数据到服务器等
      var prame = JSON.stringify(s.userInfo);

    }, function (e) {
      alert("获取用户信息失败：" + e.message + " - " + e.code);
    });
  }
}

function authLogout() {
  for (var i in auths) {
    var s = auths[i];
    if (s.authResult) {
      s.logout(function (e) {
        alert("注销登录认证成功！");
      }, function (e) {
        alert("注销登录认证失败！");
      });
    }
  }
}


function wxlog() {


  plus.oauth.getServices(function (services) {
    auths = services;
    authLogin();
  }, function (e) {
    alert("获取分享服务列表失败：" + e.message + " - " + e.code);
  });

}
export default {
  wxlog //该步骤重要
}
