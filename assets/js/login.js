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

  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function(e) {
    // 1. 阻止默认的提交行为
    e.preventDefault()
    // 2. 发起Ajax的POST请求
    var data = {
      username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
    }
    $.post('/api/reguser', data, function(res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录！')
      // 模拟人的点击行为
      $('#link-login').click()
    })
  })
  /* $("#form_reg").on("submit", function (e) {
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
  }) */

  $("#form_login").submit(function(e){
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/login",
      // 将一组表单元素编码为字符串以便提交，每个表单元素都必须有name属性
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