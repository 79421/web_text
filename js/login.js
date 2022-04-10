$(function() {
    //点击"去注册账号"的链接,隐藏登录面板
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击"去登陆"的链接,隐藏注册面板
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui身上获取form对象
    var form = layui.form
    var layer = layui.layer
        //------自定义表单验证规则-------
        //通过form.verify()自定义pwd密码校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //校验密码是否一致
        repwd: function(value) {
            //形参的value是确认密码的value
            //还要在拿到密码的value
            //进行一次比较
            //若失败，return并提示 ‘密码不一致’
            var pwd = $(".reg-box [name=password]").val()
            if (pwd !== value)
                return '两次密码不一致'
        }
    })

    //----发起注册请求----
    $('#form_reg').on('submit', function(e) {
        //阻止默认提交行为 
        e.preventDefault()
            // 发起ajax请求
        $.ajax({
                method: 'post',
                url: '/api/reguser',
                data: {
                    username: $('.reg-box [name=username]').val(),
                    password: $('.reg-box [name=password]').val()
                },
                success: function(res) {
                    if (res.status == 1) {
                        return layer.msg('注册失败')
                    }
                    layer.msg('注册成功')
                    $('#link_login').click()
                }
            })
            //     var data = { username: $('.reg-box [name=username]').val(), password: $('.reg-box [name=password]').val() }

        //     $.post('/api/reguser', data, function(res) {
        //         if (res.status == 1) {
        //             return layer.msg('注册失败')
        //         }
        //         layer.msg('注册成功')
        //         $('#link_login').click()
        //     })
    })

    //----发起登录请求----
    $('#form_login').on("submit", function(e) {
        //阻止默认提交行为
        e.preventDefault()
            //发起psot请求
        var data = { username: $('.login-box [name=username]').val(), password: $('.login-box [name=password]').val() }
        $.post('/api/login', data, function(res) {
            if (res.status == 1) {
                return layer.msg('登陆失败')
            }
            console.log(res.message)
            layer.msg('登陆成功')
                //将登陆成功的token存储到localStorage中，进行保存
            localStorage.setItem('token', res.token)
                //跳转后台主页
            location.href = '/index.html'
        })
    })

})