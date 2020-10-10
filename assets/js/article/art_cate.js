$(function () {
    initArtCateList()

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                //基于模板名渲染模板  template(filename, data);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    // 添加
    $("#btnAdd").on("click", function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            content: $("#dialog-add").html(),

        });
    })
    let indexAdd = null;
    $("body").on("submit", '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg("fail");
                }
                // alert(res.data);
                console.log(res);
                initArtCateList();
                layer.msg("pass");
                layer.close(indexAdd);
            }
        })
    })

    let indexEdit = null;

    $("tbody").on("click", ".btn-edit", function (e) {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            content: $("#dialog-edit").html(),
        });

        let id = $(this).attr("data-id")
        $.ajax({
            method: 'GET',
            url: "/my/article/cates/" + id,
            success: function (res) {

                /* 语法：form.val('filter', object);
                用于给指定表单集合的元素赋值和取值。如果 object 参数存在，则为赋值；如果 object 参数不存在，则为取值。 */
                layui.form.val("form-Edit", res.data)
            }
        })
    })

    $('body').on("submit", "#form-edit", function (e) {

        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    console.log(res);
                    return layer.msg('fail');
                }
                layer.msg('pass')
                layer.close(indexEdit)
                initArtCateList()

            }

        })
    })


    $('tbody').on('click', '.btn-delete', function () {
        let id = $(this).attr("data-id");
        // layer.confirm(content, options, yes, cancel) - 询问框
        layer.confirm("Are you sure?", {
                icon: 3,
                title: '提示'
            },
            function (index) {
                $.ajax({
                    method: 'GET',
                    url: "/my/article/deletecate/" + id,
                    success: function (res) {
                        if (res.status !== 0) {
                            return layer.msg('fail');
                        }
                        layer.msg('pass');

                        layer.close(index);
                        initArtCateList();
                    }
                })
            })
    })

})