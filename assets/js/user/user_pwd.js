$(function () {
    // 验证规则
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6~12位，不能有空格'
        ],
        samePwd: function (value) {
            if (value == $("[name=oldPwd]").val()) {
                return "新密码不能和旧密码相同";
            }
        },
        rePwd: function (value) {
            if (value !== $("[name=newPwd]").val()) {
                return "两次输入密码不一致";
            }
        },
    });

    // 修改密码
    $(".layui-form").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "post",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("修改密码成功");
                $(".layui-form")[0].reset();
            }
        });
    })
})