$(function() {
    // 从layui身上获取form对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return ('用户名必须在1-6个字符之间')
            }
        }
    })

    // 初始化用户的基本信息
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('失败')
                }
                // console.log(res)
                var form = layui.form

                // 调用form.val（）快速为表单赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置表单事件
    $('#btnReset').on('click', function(e) {
        // 阻止表单默认重置行为
        e.preventDefault();
        initUserInfo()
    })

    //提交用户信息
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                console.log('成功')
                    // 调用父页面的‘渲染头像和名称’的方法
                window.parent.getUserInfo()

            }
        })
    })
})