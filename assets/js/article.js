$(function () {
    initArtCateList();

    function initArtCateList() {}

    var layer = layui.layer;
    $("#btnAdd").on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '260px'],
            content: $("#dialog-add").html(),
        });
    })

    var indexAdd = null;
    $("body").on("submit", "#form-add", function (e) {
        e.preventDefault()
        $.ajax({
            method: "post",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList();
                layer.msg('文章类别添加成功');
                layer.close(indexAdd);
            }
        })
    })
    // 修改展示表单
    $("tbody").on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $("#dialog-edit").html()
        });
    })
    /* $("body").on("submit","#

        
    }) */

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList();
                layer.msg("更新成功");
                layer.close(indexEdit);
            }
        })
    })
})