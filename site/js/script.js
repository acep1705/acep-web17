$(document).ready(function(){
    MSIE8 = ($.browser.msie) && ($.browser.version == 8),
	$.fn.ajaxJSSwitch({
		topMargin: 297,//mandatory property for decktop
		bottomMargin: 140,//mandatory property for decktop
		topMarginMobileDevices: 297,//mandatory property for mobile devices
		bottomMarginMobileDevices: 140,//mandatory property for mobile devices
        delaySubMenuHide: 300,
        bodyMinHeight: 900,
		menuInit:function (classMenu, classSubMenu){
		},
		buttonOver:function (item){
		},
		buttonOut:function (item){
		},
		subMenuButtonOver:function (item){
		},
		subMenuButtonOut:function (item){
		},
		subMenuShow:function(subMenu){
        	subMenu.stop(true,true).animate({"opacity":"show"}, 400, "easeOutCubic");
		},
		subMenuHide:function(subMenu){
        	subMenu.stop(true,true).animate({"opacity":"hide"}, 500, "easeOutCubic");
		},
		pageInit:function (pages){
		},
		currPageAnimate:function (page){
			$('header').addClass('pages')
				.stop(true).animate({'margin-top':'0px'}, 600, "easeOutExpo")
				.find('h1.brand').stop(true).animate({'top':'61px'}, 600, "easeOutExpo");

			$('footer').stop().animate({'margin-top':'0px'}, 600, "easeOutExpo");

			$('.galleryHolder').addClass('opacity');
			$('.galleryHolder, .galleryHolder2').trigger('autoPlayStop');

            page.css({"left":$(window).width()}).stop(true).delay(300).animate({"left":0}, 600, "easeOutExpo");
		},
		prevPageAnimate:function (page){
            page.stop(true).animate({"display":"block", "left":-$(window).outerWidth()*2}, 700, "easeInExpo");
		},
		backToSplash:function (){
			$('header').removeClass('pages')
				.stop(true).delay(500).animate({'margin-top':'272px'}, 600, "easeOutExpo")
				.find('h1.brand').stop(true).delay(500).animate({'top':'333px'}, 600, "easeOutExpo");

			$('footer').stop().animate({'margin-top':'175px'}, 600, "easeOutExpo");

			$('.galleryHolder').removeClass('opacity');
			$('.galleryHolder, .galleryHolder2').trigger('autoPlay');
		},
		pageLoadComplete:function (){
			setTimeout(function (){
                if ($('.scroll>div').height()>$('.scroll').height()) {
                    $('.scroll')
                	.uScroll({			
                		mousewheel:true,
                        step: 100,
                        lay:'outside'
                	});
                } else {
                    $('.scroll-btns').css('display','none')
                }
            },500);

            $('.list3>li>a')
	            .attr('rel','appendix')
	            .prepend('<span class="sitem_over"><strong></strong></span>')
	            .fancybox();
        }
	});
})
$(window).load(function(){
    setTimeout(function (){ $(window).trigger('resize') },600)

    $(".galleryHolder, .galleryHolder2").gallerySplash({
        autoPlayState: true,
        paginationDisplay: true,
        autoPlayTime: 20,
        alignIMG: 'center'
    }); 

	$("#webSiteLoader").delay(500).animate({opacity:0}, 600, "easeInCubic", function(){$("#webSiteLoader").remove()});
});