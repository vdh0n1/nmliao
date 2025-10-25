//%--fancybox 开始--%>



//$(fancyimg());

function fancyimg() {

    $('.fancybox').fancybox();
    //$(".fancybox_img").fancybox({
    //    'cyclic': true,
    //    'transitionIn': 'elastic',
    //    'transitionOut': 'elastic',
    //    'titlePosition': 'outside',
    //    'enableEscapeButton': 'true',
    //});

    //$(".fancybox_p0").fancybox({
    //    'cyclic': true,
    //    'transitionIn': 'elastic',
    //    'transitionOut': 'elastic',
    //    'titlePosition': 'outside',
    //    'enableEscapeButton': 'true',
    //});

}

//  a 中 的 rel=group 将开启循环功能，并按此参数分组
//$(function () {
//    //$("a[rel=group]").fancybox({
//    $(".fancybox_a").fancybox({
//        'transitionIn': 'elastic',
//        'transitionOut': 'elastic',
//        'titlePosition': 'outside',
//        'cyclic': false,
//        'titleFormat': function (title, currentArray, currentIndex, currentOpts) {
//            return '<span id="fancybox-title-over">' + (currentIndex + 1) + ' / ' + currentArray.length + (title.length ? '   ' + title : '') + '</span>';
//        }
//    });
//});

//$(function () {
//    $(".fancybox_b").fancybox({
//        'transitionIn': 'elastic',
//        'transitionOut': 'elastic',
//        'titlePosition': 'over',
//        'cyclic': false,
//    });
//});

//// 涉及到跨域无法显示时用以下这个 iframe 类
//$(function () {
//    $(".iframe").fancybox({
//        'transitionIn': 'elastic',
//        'transitionOut': 'elastic',
//        'titlePosition': 'over',
//        'cyclic': false,
//        'width': 400,
//        'height': 400
//    });
//});


//<%--fancybox 结束--%>