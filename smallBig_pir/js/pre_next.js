//点击左右翻页
$(function () {
    $('body').append('<div>' +
        ' <div class="sha_pre"></div>' +
        ' <img class="sha_img_close shadow_hidden" src="./images/sha_img_close.png" alt=""> ' +
        '<img class="sha_img shadow_hidden" src="" alt=""> ' +
        '<div class="sha_next"></div>' +
        ' </div><div class="shadow shadow_hidden hidden"></div>');
    var pt = {
        'len'          :  $('.det_base_img>ul>li').length,
        'indexNum'    :  null,
        'screenHeight': document.body.clientHeight,
        'screenWidth' : document.body.clientWidth,
        'imgWidth'    :  $('.det_base_img').css('width'),
    };
    $(window).resize(function () {
        pt.screenHeight = document.body.clientHeight;
        pt.screenWidth = document.body.clientWidth;
    })
    photo(pt);
//点击放大
    $('.det_base_img>ul>li').click(function () {
        var imgUrl = $(this).children('img').attr('src');
        $('.shadow').show();
        $('.sha_img').attr('src',imgUrl).show();
        $('.sha_pre').show();
        $('.sha_next').show();
        $('.sha_img_close').show();
        pt.indexNum = $(this).index();
        if(pt.indexNum == 0){
            $('.sha_pre').hide();
            $('.sha_next').show();
        }
        if(pt.indexNum == (pt.len-1)){
            $('.sha_pre').show();
            $('.sha_next').hide();
        }
        sha_img(pt);
    })
    $('.sha_img_close').click(function () {
        $('.shadow').hide();
        $('.sha_img').hide();
        $('.sha_pre').hide();
        $('.sha_next').hide();
        $(this).hide();
    })
//放大后左右切换
    $('.sha_pre').click(function () {
        pt.indexNum--;
        var imgUrl = $('.det_base_img>ul>li').eq(pt.indexNum).children('img').attr('src');
        if(pt.indexNum<=0){
            $(this).hide();
            pt.indexNum = 0;
        }else {
            $(this).show();
            $('.sha_next').show();
        }
        $('.sha_img').attr('src',imgUrl).show();
        sha_img(pt)
    })
    $('.sha_next').click(function () {
        pt.indexNum++;
        var imgUrl = $('.det_base_img>ul>li').eq(pt.indexNum).children('img').attr('src');
        if(pt.indexNum>=(pt.len-1)){
            $(this).hide();
            pt.indexNum = (pt.len-1);
        }else {
            $(this).show();
            $('.sha_pre').show();
        }
        $('.sha_img').attr('src',imgUrl).show();
        sha_img(pt)
    })
})
//关闭按钮位置
function sha_img(pt) {
    var topHeight = positionImgHeight($('.sha_img').css('height'),pt.screenHeight)
    $('.sha_img').css('top',topHeight+"px");
    var leftWidth = positionImgWidth($('.sha_img').css('width'),pt.screenWidth);
    $('.sha_img_close').css({'top':(topHeight-16)+"px",'left':(leftWidth)+"px"});
}
//左右翻页效果具体实现
function photo(pt){
    var i = pt.len-3, n = 0;
    $('.det_base_img').children('ul').css('width',(pt.len*parseInt(pt.imgWidth))+'px');
    $('.det_base_pre').css('visibility','hidden');
    if(i>0){
        $('.det_base_next>img').click(function(){
            if(n < i){
                n++;
                anim(n,parseInt(pt.imgWidth)/3);
                $('.det_base_pre').css('visibility','visible');
                if(n == i){
                    $('.det_base_next').css('visibility','hidden');
                }
            }
        })
        $('.det_base_pre>img').click(function(){
            if(n > 0){
                n--;
                anim(n,parseInt(pt.imgWidth)/3);
                $('.det_base_next').css('visibility','visible');
                if(n == 0){
                    $('.det_base_pre').css('visibility','hidden');
                }
            }
        })
    }
}
//小图动画执行
function anim(n,imgWidth){
    $('.det_base_img>ul>li').animate({
        'left':- n * imgWidth + 'px',
    },500)
}
//获取高度定位中间
function positionImgHeight(imgHeight,screenHeight) {
    return (screenHeight-parseInt(imgHeight))/2;
}
//获取宽度定位中间
function positionImgWidth(imgWidth,screenWidth) {
    return (screenWidth+parseInt(imgWidth))/2-16;
}