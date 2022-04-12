$(function() {
    var layer = layui.layer
    var form = layui.form

    initArtCateList()
        // 获取表单数据
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    // 定义一个关闭弹出层的索引号
    var indexadd = null
        // 绑定‘添加类别’的事件
    $('#btnAddCate').on('click', function() {
        indexadd = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })

    // 通过代理的形式为form-add绑定submit事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault();

        $.ajax({
            method: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('失败')
                }
                initArtCateList()
                layer.msg('成功')
                    // 根据索引关闭对应的弹出层
                layer.close(indexadd)
            }
        })
    })



    // 为修改窗口添加一个索引号
    var indexedit = null
        // 通过代理形式为btn-edit阿牛绑定点击事件
    $('tbody').on('click', '#btn-edit', function() {
        // 弹出文章修改分类信息
        indexedit = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })


        // 获取id
        var id = $(this).attr('data-id')
            // console.log(id);
            // 根据id获取数据
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('form-edit', res.data)
                    // layer.close(indexedit)
            }
        })
    })


    // 通过代理的形式为form-edit绑定submit事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('失败');
                }
                layer.msg('修改成功');
                // 重新加载页面数据
                initArtCateList()
                    // 关闭弹窗
                layer.close(indexedit)
            }
        })
    })


    // 通过代理的形式为btn-delet绑定click事件
    $('tbody').on('click', '.btn-delete', function() {
        console.log('1');
        var id = $(this).attr('data-id')
            //提示用户是否删除
        layer.confirm('是否删除?', { icon: 3, title: '确认删除' }, function(index) {
            $.ajax({
                method: 'get',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    } else layer.msg('删除成功')
                    layer.close(index);
                    initArtCateList()
                    console.log(res);
                }
            })

        });
    })
})