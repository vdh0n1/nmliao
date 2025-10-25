
// 解决运营商流量劫持的方法开始

//document.createElement_1 = document.createElement;

//document.createElement = function (elementName) {
//    if (elementName === 'script' || elementName === "iframe") {
//        return;
//    }
//    return document.createElement_1(elementName);
//}


// 解决运营商流量劫持的方法结束

// 百度链接提交开始

// www.deskry.com
//(function () {
//    var bp = document.createElement('script');
//    var curProtocol = window.location.protocol.split(':')[0];
//    if (curProtocol === 'https') {
//        bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
//    }
//    else {
//        bp.src = 'http://push.zhanzhang.baidu.com/push.js';
//    }
//    var s = document.getElementsByTagName("script")[0];
//    s.parentNode.insertBefore(bp, s);
//})();


// nmchat.cn
//var _hmt = _hmt || [];
//(function () {
//    var hm = document.createElement("script");
//    hm.src = "https://hm.baidu.com/hm.js?04c1884866c81fed570e86f927bfd78f";
//    var s = document.getElementsByTagName("script")[0];
//    s.parentNode.insertBefore(hm, s);
//})();

// 百度链接提交结束

//判断是否为微信内打开开始
var wx = (function () {
    return navigator.userAgent.toLowerCase().indexOf('micromessenger') != -1;
}
)();
//判断是否为微信内打开结束


// 获取访客来源开始

//$(function () { get_referrer(); })


function get_referrer() {

    $.ajax(
        {
            type: 'post',
            url: '/asmx/method.asmx/referrer_record',
            async: true,
            dataType: "html",
            cache: false,
            timeout: 5000,
            data:
            {
                referrer_url: encodeURI(document.referrer),
                curr_url: encodeURI(window.location.href),
                userid: encodeURI($.cookie('user_id'))
            },
            success: function (data) {
                //console.log("获取访客来源成功！" + data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //setTimeout(get_referrer(),2000);
                if (textStatus == "timeout") {
                    console.log("获取访客来源延迟" + errorThrown);
                }
            },
            complete: function () {

            }

        })

}

// 获取访客来源结束

// 获取url参数 
function GetUrltipsid() {
    var url = document.location.toString();

    if (url.indexOf('weixin') > -1) {
        return 1;
    }
    else {
        return 0;
    }
}


// 去除运营商挟持开始
//setTimeout(function () { $("*").each(function () { if ($(this).css("position") == "fixed") { $(this).remove(); } }); }, 600);
//$(function () {
//    setTimeout(function () { $("div").each(function () { if ($(this).attr("sn")) { $(this).remove(); } }); }, 300);
//})
// 去除运营商挟持结束


// cnzz统计开始

//var cnzz_protocol = (("https:" == document.location.protocol) ? "https://" : "http://");
//document.write(unescape("%3Cspan id='cnzz_stat_icon_1276742680'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s23.cnzz.com/z_stat.php%3Fid%3D1276742680' type='text/javascript'%3E%3C/script%3E"));

// cnzz统计结束


// 百度统计开始

//var _hmt = _hmt || [];
//(function () {
//    var hm = document.createElement("script");
//    hm.src = "https://hm.baidu.com/hm.js?229ee7c81c972472ceffbc07d24e8d6f";
//    var s = document.getElementsByTagName("script")[0];
//    s.parentNode.insertBefore(hm, s);
//})();

// 百度统计结束

// 通用 ajax 开始

// var url = '/Act/WebService.asmx/randomVIPGetHistoryUserList';
// var method = 'post';
// var ifAsync = false;
// var tempdd = '{"myUserID":"' + (typeof ($.cookie('user_id')) == "undefined" ? "" : $.cookie('user_id')) + '"}';
// var sendJsonData = $.parseJSON(tempdd);
// var resultData = ZQLAjaxJson(url, method, ifAsync, sendJsonData);
function ZQLAjaxJson(url, method, ifAsync, sendJsonData) {

    // $.parseJSON(sting);   字符串 转化为 json对象
    // JSON.stringify(jsonObj); json对象 转化为 字符串

    var resultData;

    $.ajax(
    {
        type: method,
        url: url,
        async: ifAsync,  // 是否多线程异步处理
        dataType: "json",
        cache: false,
        timeout: 5000,
        data: sendJsonData,
        success: function (data) {

            //resultData = $.parseJSON('{"code":"0","msg":"成功","data":' + JSON.stringify(data) + '}');
            resultData = $.parseJSON(JSON.stringify(data));

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

            if (textStatus == "timeout") {

                resultData = $.parseJSON('{"code":"-1","msg":"网络延迟：' + errorThrown + '","data":{}}');

            }
            else {

                resultData = $.parseJSON('{"code":"-2","msg":"失败：' + textStatus + errorThrown + '","data":{}}');

            }

        },
        complete: function () {

        }

    })

    return resultData;

}
// 通用 ajax 结束





