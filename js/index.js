$(function() {
        var layer = layui.layer
            //调用函数 获取用户信息
        getUserInfo()
            // 右上角退出功能
        $('#btnLogout').on('click', function() {
            layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
                //点击‘确定’后的事件
                // 1清空本地token
                localStorage.removeItem('token')
                    // 2重新跳转至登陆页面
                location.href = '/login.html'

                // 关闭confirm询问框
                layer.close(index);

            });
        })
    })
    // 获取用户信息并渲染头像
function getUserInfo() {
    // 发起ajax请求
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',

        success: function(res) {

            // 调用渲染头像的方法
            renderAvatar(res.data)
        }
    })

    // 渲染用户头像和名称
    function renderAvatar(user) {
        // 渲染昵称
        var name = user.nickname || user.username
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
            // 渲染头像
        if (user.user_pic == null) {
            // 未上传头像
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
            $('.layui-nav-img').hide()
        } else {
            // 已上传头像
            $('.text-avatar').attr('src', user.user_pic)
            $('.layui-nav-img').hide()
        }
    }
}