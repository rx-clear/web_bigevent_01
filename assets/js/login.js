$(function () {
  $("#link-reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  })
  $("#link-login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  })

  // 自定义验证规则
  var form = layui.form;
  // console.log(form);
  form.verify({
    pwd: [
      /^[\S]{6,10}$/,
      "密码必须6-10位，且不能是空格"
    ],
    repwd: function (val) {
      var pwd = $(".reg-box input[name=password]").val()
      console.log(val);
      console.log(pwd);
      
      if (val !== pwd) {
        return "两次密码输入不一致";
      }
    }
  });

  // 注册功能
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: 'http://ajax.frontend.itheima.net/api/reguser',
      data: {
        username: $(".reg-box [name=username]").val(),
        password: $(".reg-box [name=password]").val(),
      },
      success: function (res) {
        if (res.status != 0) {
          return alert(res.message);
        }
        alert(res.message);
      }
    });
  })

  $("#form_login").submit(function(e){
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/login",
      data: $(this).serialize(),
      success: function(res){
        if(res.status !== 0 ){
          return layer.msg(res.message);
        }
        layer.msg("恭喜您，登录成功");
        localStorage.setItem("token",res.token);
        location.href = "/index.html";
      }
    })
  })
})