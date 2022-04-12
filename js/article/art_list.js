$(function() {
    var layer = layui.layer
    var form = layui.form
        // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
        var dt = new Date(date)

        var y = dt.getFullYear()
        var m = dt.padZero(getMonth() + 1)

        var d = dt.padZero(getDate())

        var hh = dt.padZero(getHours())
        var mm = dt.padZero(getMinutes())
        var ss = dt.padZero(getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    //定义补“0”的方法
    function padZero(n) {
        if (n < 10 && n >= 0) {
            return '0' + n
        }
    }
    var q = {
        pagenum: 1, //页面值
        pagesize: 1, //每页显示几条数据
        cate_id: '', //文章分类ID
        state: '', //文章状态
    }

    initTable()
    initCate()


    // 获取文章列表数据方法
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {
                if (res.status !== 0) {

                    return layer.msg('获取失败')
                }

                console.log(res.data);
                layer.msg('获取成功')
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }


    //初始化文章分类
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {

                    return layer.msg('获取失败')
                }

                console.log(res.data);
                layer.msg('获取成功')
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                    //通知layui重新渲染表单区域的UI结构
                form.render()

            }
        })
    }


    //为筛选表单绑定submit事件
    $('#form-search').on('submit', function(e) {
        e.preventDefault()
            //获取表单中选中的的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
            //把获取表单中选中的的值赋值到q中
        q.cate_id = cate_id
        q.state = state
            //根据最新的表单数据重新渲染表格中数据
        initTable()
    })
})