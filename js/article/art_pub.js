$(function() {
    var layer = layui.layer
    var form = layui.form

    initCate()

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取失败')
                } else {
                    console.log(res);
                    var htmlStr = template('tpl-cate', res)
                    $('[name=cate_id]').html(htmlStr)
                    form.render()
                }
            }
        })
    }


})