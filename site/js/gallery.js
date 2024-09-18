/*
*Version: 2.2;
*Author: Behaart and Smart;
*Option:
	autoPlayState: false / trur (default:false),
	autoPlayTime: seconds (default:4),
	alignIMG: center / top / bottom / left / right / top_left / top_right / bottom_left / bottom_right (default:center),
*/
(function($){
	$.fn.gallerySplash = function(method){
		return this.each(function(){
			var object = $(this),
				data = object.data('gallerySplash'),
				getObject = {
					autoPlayState: false,
					autoPlayTime: 4,
					alignIMG:"center",
					controlDisplay:false,
					paginationDisplay: false,
					animationSpeed:'0.7',

					constructor: function (params) {
						var imageHolder = $(".imageHolder",object),
				 		image = $(".imageHolder > img",object),
				 		imageSRCLink = $(".inner>ul>li>a",object),
				 		discription = $(".galleryDiscription>li",object),
				 		imageDeltaX,
						imageDeltaY,
						currImg = 0,
						prevImg = 0,
						allImg = imageSRCLink.length,
						clickButton=1,
						loadComplete = true,
						autoPlayTimer,
						MSIE8 = ($.browser.msie) && ($.browser.version <= 8),
						doc=$(window), 
						dragDirection=1,
						usedDevice;
						
						init();

						function init(){
							object
							.on('autoPlayStop',function(e){
								getObject.autoPlayState = false;
							})
							.on('autoPlay',function(e){
								getObject.autoPlayState = true;
								autoPlayHandler();
							})

							getObject.animationSpeed = getObject.animationSpeed.replace(",", ".");
							
							$("#imgSpinner").stop().animate({opacity:0}, 0);
							object.css({"position":"absolute", width:"100%", height:"100%", "z-index":"0"});
							imageHolder.css({"position":"absolute", width:"100%", height:"100%", "z-index":0, "top":0});
					
							if(window.orientation==undefined){
								usedDevice = "desktop"
							}else{
								usedDevice = "fixedOptions"
							}
							if(usedDevice != "desktop"){
								window.addEventListener("orientationchange", function(){
									resizeImageHandler();
								}, true);
								resizeImageHandler();
								$(window).resize(resizeImageHandler).trigger('resize');
							}else{
								$(window).resize(resizeImageHandler).trigger('resize');
							}
							
							if(getObject.controlDisplay != true){
								$("#nextButton").css({display:"none"});
								$("#prevButton").css({display:"none"});
							}else{
								$("#nextButton").css({display:"block"});
								$("#prevButton").css({display:"block"});
							}
							$("#nextButton").live("click", clickNext);
							$("#prevButton").live("click", clickPrev);
							
							if(getObject.paginationDisplay == true){
								$(".inner ul>li>a",object).click(clickPagination).parent().eq(currImg).addClass("active");
							}else{
								$(".inner",object).css({display:"none"});
							}

							if(!MSIE8){
								var pointAx,
									pointBx,
									pointAy,
									pointBy;

								object[0].addEventListener('touchstart', function(event) {
									pointAx = event.touches[0].pageX;
									pointAy = event.touches[0].pageY;
									object[0].addEventListener('touchmove', function(event){
										var scrollTopP = $("body, html").scrollTop();
										pointBx = event.touches[0].pageX;
										pointBy = event.touches[0].pageY;
										if(Math.abs(pointAy-pointBy)<Math.abs(pointAx-pointBx)){
											event.preventDefault();
											if(Math.abs(pointBx-pointAx)>100){
												if(pointBx<pointAx){
													clickNext();
												}else{
													clickPrev();
												}
											}
										}						
									}, false);
								}, false);
								object[0].addEventListener('touchend', function(event) {
									object[0].removeEventListener('touchmove')
								}, false);
							}

							$(document).bind('keydown', function(event) {
								if (event.keyCode == 37) {
									clickPrev();
								}
								else if (event.keyCode == 39) {
									clickNext();
								}
							});
							discription.not(0).css({left:$(document).width(), display:"none"});
							discription.eq(currImg).css({left:0, display:"block"});
							
							autoPlayHandler();
						}

						function clickNext(){
							if(loadComplete){
								getObject.autoPlayState = false;
								prevImg = currImg;
								currImg++;
								if(currImg>allImg-1){
									currImg = 0;
								}
								dragDirection=1;
								changeImageHandler();
							}
							return false;
						}
						function clickPrev(){
							if(loadComplete){
								getObject.autoPlayState = false;
								prevImg = currImg;
								currImg--;
								if(currImg<0){
									currImg = allImg-1;
								}
								dragDirection=-1;
								changeImageHandler();
							}
							return false;		
						}
						function clickPagination(){
							if($(this).parent().index()!=currImg && loadComplete){
								prevImg = currImg;
								currImg=$(this).parent().index();
				                clearTimeout(autoPlayTimer);
								getObject.autoPlayState = false;
								if(prevImg<currImg){
									dragDirection=1;
								}else{
									dragDirection=-1;
								}
								changeImageHandler();
							}
							return false;			
						}
						
						function autoPlayHandler(){
							autoPlayTimer = setTimeout(function(){
								if(getObject.autoPlayState == true){
									prevImg = currImg;
									currImg++;
									if(currImg>=allImg){
										currImg = 0;
									}
									changeImageHandler();
								}
							}, getObject.autoPlayTime*1000);
							
						}
				        
				        function windowH() {
				        	return (($(window).height()>=parseInt($('body').css('minHeight')))?$(window).height():parseInt($('body').css('minHeight')));
				        }
				        function windowW() {
				        	return (($(window).width()>=parseInt($('body').css('minWidth')))?$(window).width():parseInt($('body').css('minWidth')));
				        }
				        
						function resizeImageHandler(){
							image = $(".imageHolder > img",object);
							var imageWidth = image.width(),
								imageHeight = image.height(),
								screenWidth = windowW(),
								screenHeight = windowH()+41,
								imageK,
								holderK;
								
							image.css({position:"relative", background:"#000000", "max-width":"none"});
							switch(usedDevice){
								case "fixedOptions":			
									if(window.orientation == 0 || window.orientation == 180){
										screenWidth = $(window).outerWidth()
										screenHeight = $(window).outerHeight()+80;
									}else{
										screenWidth = $(window).outerHeight()+200;
										screenHeight = $(window).outerWidth();
									}
									image.css({height:screenHeight, width:"auto"});
									imageWidth = image.width();
					
									imageDeltaX=-(imageWidth-screenWidth)/2;
									imageDeltaY=0;		
								break;
								default:
								
									imageK = imageHeight/imageWidth;
									holderK = screenHeight/screenWidth;
									
									if(holderK>imageK){
										image.css({height:screenHeight, width:"auto"});
									}else{
										image.css({width:screenWidth, height:"auto"});
									}
									
									imageWidth = image.width();
									imageHeight = image.height();
									
									switch(getObject.alignIMG){
										case "top":
											imageDeltaX=-(imageWidth-screenWidth)/2;
											imageDeltaY=0;
										break;
										case "bottom":
											imageDeltaX=-(imageWidth-screenWidth)/2;
											imageDeltaY=-(imageHeight-screenHeight);
										break;
										case "right":
											imageDeltaX=-(imageWidth-screenWidth);
											imageDeltaY=-(imageHeight-screenHeight)/2;
										break;
										case "left":
											imageDeltaX=0;
											imageDeltaY=-(imageHeight-screenHeight)/2;
										break;
										case "top_left":
											imageDeltaX=0;
											imageDeltaY=0;
										break;
										case "top_right":
											imageDeltaX=-(imageWidth-screenWidth);
											imageDeltaY=0;
										break;
										case "bottom_right":
											imageDeltaX=-(imageWidth-screenWidth);
											imageDeltaY=-(imageWidth-screenHeight);
										break;
										case "bottom_left":
											imageDeltaX=0;
											imageDeltaY=-(imageHeight-screenHeight);
										break;
										default:
											imageDeltaX=-(imageWidth-screenWidth)/2;
											imageDeltaY=-(imageHeight-screenHeight)/2;
									}
							}
							image.css({left:imageDeltaX, top:imageDeltaY});
						}
						function changeImageHandler(){
							var imgSRC;
							$(".inner ul>li",object).eq(currImg).addClass("active");
							$(".inner ul>li",object).eq(prevImg).removeClass("active");
							loadComplete = false;
							image.addClass("topImg").css({"z-index":1});
							imgSRC = imageSRCLink.eq(currImg).attr("href");
							
							imageHolder.append("<img class='bottomImg' src="+imgSRC+" alt=''>");
							$(".bottomImg",object).css({display:"none", "z-index":0}).bind("load", loadImageHandler);
							$("#imgSpinner").css({display:"block"}).stop().animate({opacity:.5}, 500, "easeOutCubic");
							
							discription.eq(currImg).css({left:$(document).width()*dragDirection, display:"block"}).animate({left:0}, 1000, "easeInOutCubic");
							discription.eq(prevImg).animate({left:$(document).width()*dragDirection*-1}, 1000, "easeInOutCubic", function(){
								discription.eq(prevImg).css({display:"none"})
							});
						}
						function loadImageHandler(){
							setTimeout(function(){
								resizeImageHandler();
								$(".bottomImg",object).unbind("load", loadImageHandler).css({display:"block", position:"absolute", top:imageDeltaY});				
								$("#imgSpinner").stop().animate({opacity:0}, 1000, "easeOutCubic", function(){$("#imgSpinner").css({display:"none"});})
								$(".topImg",object).stop(true, true).animate({opacity:0}, getObject.animationSpeed*1000, "easeInOutCubic", function(){
									$(".topImg",object).remove();
									image.removeClass("bottomImg");
									loadComplete = true;
									autoPlayHandler()
								})
							}, 1000)
						}
					}
				}	
			
			data?object=data:object.data({gallerySplash: getObject});
    		typeof method=='object'&&$.extend(getObject,method);
    		getObject.me||getObject.constructor(getObject.me=object);
		})
	}
})(jQuery);