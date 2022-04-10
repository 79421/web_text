//每次调用$.post()   $.get()    $.ajax()的时候会先调用这个ajaxPrefilter函数
//在这个函数中会拿到给Ajax提供的配置对象
// options接收$.post()   $.get()    $.ajax()中的url地址
$.ajaxPrefilter(function(options) {
    //再发起真正的Ajax请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url

    // 统一为有权限的接口设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
})