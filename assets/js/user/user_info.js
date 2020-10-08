$(function () {
    var form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度在1~6位之间";
            }
        }
    });

    initUserInfo();
    var layer = layui.layer;

    function initUserInfo() {
        $.ajax({
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                console.log(res);
                form.val("formUserInfo", res.data);
            }
        })
    }

    $("#reset").on("click", function (e) {
        e.preventDefault();
        initUserInfo()
    })

    $(".layui-form").on("submit",function(e){
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg(res.message);
                }
                layer.msg("修改用户信息成功");
                window.parent.getUserInfo()
            }
        })
    })
})