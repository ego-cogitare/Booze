/*
 * jQuery SelectBox with ScrollBar
 *
 * Copyright 2015 Jigalag
 *
 *
 */
(function($, doc, win){
	'use strict';

	// init flags & variables
	var debug = false;
	var lmb = 1, px = "px";

	var browser = {
		"data": {},
		"macosx": win.navigator.platform.toLowerCase().indexOf('mac') !== -1,
		"mobile": /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(win.navigator.userAgent),
		"overlay": null,
		"scroll": null,
		"scrolls": [],
		"webkit": /WebKit/.test(win.navigator.userAgent),

		"log": debug ? function(data, toString){
			var output = data;
			if(toString && typeof data != "string"){
				output = [];
				$.each(data, function(i, v){
					output.push('"' + i + '": ' + v);
				});
				output = output.join(", ");
			}
			if(win.console && win.console.log){
				win.console.log(output);
			} else {
				alert(output);
			}
		} : function(){

		}
	};

	var defaults = {
		"autoScrollSize": true,     // automatically calculate scrollsize
		"autoUpdate": true,         // update scrollbar if content/container size changed
		"debug": false,             // debug mode
		"disableBodyScroll": false, // disable body scroll if mouse over container
		"duration": 200,            // scroll animate duration in ms
		"ignoreMobile": true,       // ignore mobile devices
		"ignoreOverlay": true,      // ignore browsers with overlay scrollbars (mobile, MacOS)
		"scrollStep": 30,           // scroll step for scrollbar arrows
		"showArrows": false,        // add class to show arrows
		"stepScrolling": true,      // when scrolling to scrollbar mousedown position
		"type":"simple",            // [advanced|simple] scrollbar html type

		"scrollx": null,            // horizontal scroll element
		"scrolly": null,            // vertical scroll element

		"onDestroy": null,          // callback function on destroy,
		"onInit": null,             // callback function on first initialization
		"onScroll": null,           // callback function on content scrolling
		"onUpdate": null            // callback function on init/resize (before scrollbar size calculation)
	};


	var customScrollbar = function(container, options){

		if(!browser.scroll){
			browser.log("Init jQuery Scrollbar v0.2.5");
			browser.overlay = isScrollOverlaysContent();
			browser.scroll = getBrowserScrollSize();
			updateScrollbars();

			$(win).resize(function(){
				var forceUpdate = false;
				if(browser.scroll && (browser.scroll.height || browser.scroll.width)){
					var scroll = getBrowserScrollSize();
					if(scroll.height != browser.scroll.height || scroll.width != browser.scroll.width){
						browser.scroll = scroll;
						forceUpdate = true; // handle page zoom
					}
				}
				updateScrollbars(forceUpdate);
			});
		}

		this.container = container;
		this.options = $.extend({}, defaults, win.jQueryScrollbarOptions || {});
		this.scrollTo = null;
		this.scrollx = {};
		this.scrolly = {};

		this.init(options);
	};

	customScrollbar.prototype = {

		destroy: function(){

			if(!this.wrapper){
				return;
			}

			// init variables
			var scrollLeft = this.container.scrollLeft();
			var scrollTop  = this.container.scrollTop();

			this.container.insertBefore(this.wrapper).css({
				"height":"",
				"margin":""
			})
				.removeClass("scroll-content")
				.removeClass("scroll-scrollx_visible")
				.removeClass("scroll-scrolly_visible")
				.off(".scrollbar")
				.scrollLeft(scrollLeft)
				.scrollTop(scrollTop);

			this.scrollx.scrollbar.removeClass("scroll-scrollx_visible").find("div").andSelf().off(".scrollbar");
			this.scrolly.scrollbar.removeClass("scroll-scrolly_visible").find("div").andSelf().off(".scrollbar");

			this.wrapper.remove();

			$(doc).add("body").off(".scrollbar");

			if($.isFunction(this.options.onDestroy))
				this.options.onDestroy.apply(this, [this.container]);
		},



		getScrollbar: function(d){

			var scrollbar = this.options["scroll" + d];
			var html = {
				"advanced":
				'<div class="scroll-element_corner"></div>' +
				'<div class="scroll-arrow scroll-arrow_less"></div>' +
				'<div class="scroll-arrow scroll-arrow_more"></div>' +
				'<div class="scroll-element_outer">' +
				'    <div class="scroll-element_size"></div>' + // required! used for scrollbar size calculation !
				'    <div class="scroll-element_inner-wrapper">' +
				'        <div class="scroll-element_inner scroll-element_track">'  + // used for handling scrollbar click
				'            <div class="scroll-element_inner-bottom"></div>' +
				'        </div>' +
				'    </div>' +
				'    <div class="scroll-bar">' +
				'        <div class="scroll-bar_body">' +
				'            <div class="scroll-bar_body-inner"></div>' +
				'        </div>' +
				'        <div class="scroll-bar_bottom"></div>' +
				'        <div class="scroll-bar_center"></div>' +
				'    </div>' +
				'</div>',

				"simple":
				'<div class="scroll-element_outer">' +
				'    <div class="scroll-element_size"></div>'  + // required! used for scrollbar size calculation !
				'    <div class="scroll-element_track"></div>' + // used for handling scrollbar click
				'    <div class="scroll-bar"></div>' +
				'</div>'
			};
			var type = html[this.options.type] ? this.options.type : "advanced";

			if(scrollbar){
				if(typeof(scrollbar) == "string"){
					scrollbar = $(scrollbar).appendTo(this.wrapper);
				} else {
					scrollbar = $(scrollbar);
				}
			} else {
				scrollbar = $("<div>").addClass("scroll-element").html(html[type]).appendTo(this.wrapper);
			}

			if(this.options.showArrows){
				scrollbar.addClass("scroll-element_arrows_visible");
			}

			return scrollbar.addClass("scroll-" + d);
		},



		init: function(options){

			// init variables
			var S = this;

			var c = this.container;
			var cw = this.containerWrapper || c;
			var o = $.extend(this.options, options || {});
			var s = {
				"x": this.scrollx,
				"y": this.scrolly
			};
			var w = this.wrapper;

			var initScroll = {
				"scrollLeft": c.scrollLeft(),
				"scrollTop": c.scrollTop()
			};

			// do not init if in ignorable browser
			//if ((browser.mobile && o.ignoreMobile)
			//	|| (browser.overlay && o.ignoreOverlay)
			//	|| (browser.macosx && !browser.webkit) // still required to ignore nonWebKit browsers on Mac
			//) {
			//	return false;
			//}

			// init scroll container
			if(!w){
				this.wrapper = w = $('<div>').addClass('scroll-wrapper').addClass(c.attr('class'))
					.css('position', c.css('position') == 'absolute' ? 'absolute' : 'relative')
					.insertBefore(c).append(c);

				if(c.is('textarea')){
					this.containerWrapper = cw = $('<div>').insertBefore(c).append(c);
					w.addClass('scroll-textarea');
				}

				cw.addClass("scroll-content").css({
					"height":"",
					"margin-bottom": browser.scroll.height * -1 + px,
					"margin-right":  browser.scroll.width  * -1 + px
				});

				c.on("scroll.scrollbar", function(event){
					if($.isFunction(o.onScroll)){
						o.onScroll.call(S, {
							"maxScroll": s.y.maxScrollOffset,
							"scroll": c.scrollTop(),
							"size": s.y.size,
							"visible": s.y.visible
						}, {
							"maxScroll": s.x.maxScrollOffset,
							"scroll": c.scrollLeft(),
							"size": s.x.size,
							"visible": s.x.visible
						});
					}
					s.x.isVisible && s.x.scroller.css("left", c.scrollLeft() * s.x.kx + px);
					s.y.isVisible && s.y.scroller.css("top",  c.scrollTop()  * s.y.kx + px);
				});

				/* prevent native scrollbars to be visible on #anchor click */
				w.on("scroll", function(){
					w.scrollTop(0).scrollLeft(0);
				});

				if(o.disableBodyScroll){
					var handleMouseScroll = function(event){
						isVerticalScroll(event) ?
						s.y.isVisible && s.y.mousewheel(event) :
						s.x.isVisible && s.x.mousewheel(event);
					};
					w.on({
						"MozMousePixelScroll.scrollbar": handleMouseScroll,
						"mousewheel.scrollbar": handleMouseScroll
					});

					if(browser.mobile){
						w.on("touchstart.scrollbar", function(event){
							var touch = event.originalEvent.touches && event.originalEvent.touches[0] || event;
							var originalTouch = {
								"pageX": touch.pageX,
								"pageY": touch.pageY
							};
							var originalScroll = {
								"left": c.scrollLeft(),
								"top": c.scrollTop()
							};
							$(doc).on({
								"touchmove.scrollbar": function(event){
									var touch = event.originalEvent.targetTouches && event.originalEvent.targetTouches[0] || event;
									c.scrollLeft(originalScroll.left + originalTouch.pageX - touch.pageX);
									c.scrollTop(originalScroll.top + originalTouch.pageY - touch.pageY);
									event.preventDefault();
								},
								"touchend.scrollbar": function(){
									$(doc).off(".scrollbar");
								}
							});
						});
					}
				}
				if($.isFunction(o.onInit))
					o.onInit.apply(this, [c]);
			} else {
				cw.css({
					"height":"",
					"margin-bottom": browser.scroll.height * -1 + px,
					"margin-right":  browser.scroll.width  * -1 + px
				});
			}

			// init scrollbars & recalculate sizes
			$.each(s, function(d, scrollx){

				var scrollCallback = null;
				var scrollForward = 1;
				var scrollOffset = (d == "x") ? "scrollLeft" : "scrollTop";
				var scrollStep = o.scrollStep;
				var scrollTo = function(){
					var currentOffset = c[scrollOffset]();
					c[scrollOffset](currentOffset + scrollStep);
					if(scrollForward == 1 && (currentOffset + scrollStep) >= scrollToValue)
						currentOffset = c[scrollOffset]();
					if(scrollForward == -1 && (currentOffset + scrollStep) <= scrollToValue)
						currentOffset = c[scrollOffset]();
					if(c[scrollOffset]() == currentOffset && scrollCallback){
						scrollCallback();
					}
				}
				var scrollToValue = 0;

				if(!scrollx.scrollbar){

					scrollx.scrollbar = S.getScrollbar(d);
					scrollx.scroller = scrollx.scrollbar.find(".scroll-bar");

					scrollx.mousewheel = function(event){

						if(!scrollx.isVisible || (d == 'x' && isVerticalScroll(event))){
							return true;
						}
						if(d == 'y' && !isVerticalScroll(event)){
							s.x.mousewheel(event);
							return true;
						}

						var delta = event.originalEvent.wheelDelta * -1 || event.originalEvent.detail;
						var maxScrollValue = scrollx.size - scrollx.visible - scrollx.offset;

						if(!((scrollToValue <= 0 && delta < 0) || (scrollToValue >= maxScrollValue && delta > 0))){
							scrollToValue = scrollToValue + delta;
							if(scrollToValue < 0)
								scrollToValue = 0;
							if(scrollToValue > maxScrollValue)
								scrollToValue = maxScrollValue;

							S.scrollTo = S.scrollTo || {};
							S.scrollTo[scrollOffset] = scrollToValue;
							setTimeout(function(){
								if(S.scrollTo){
									c.stop().animate(S.scrollTo, 240, 'linear', function(){
										scrollToValue = c[scrollOffset]();
									});
									S.scrollTo = null;
								}
							}, 1);
						}

						event.preventDefault();
						return false;
					};

					scrollx.scrollbar.on({
						"MozMousePixelScroll.scrollbar": scrollx.mousewheel,
						"mousewheel.scrollbar": scrollx.mousewheel,
						"mouseenter.scrollbar": function(){
							scrollToValue = c[scrollOffset]();
						}
					});

					// handle arrows & scroll inner mousedown event
					scrollx.scrollbar.find(".scroll-arrow, .scroll-element_track")
						.on("mousedown.scrollbar", function(event){

							if(event.which != lmb)
								return true;

							scrollForward = 1;

							var data = {
								"eventOffset": event[(d == "x") ? "pageX" : "pageY"],
								"maxScrollValue": scrollx.size - scrollx.visible - scrollx.offset,
								"scrollbarOffset": scrollx.scroller.offset()[(d == "x") ? "left" : "top"],
								"scrollbarSize": scrollx.scroller[(d == "x") ? "outerWidth" : "outerHeight"]()
							};
							var timeout = 0, timer = 0;

							if($(this).hasClass('scroll-arrow')){
								scrollForward = $(this).hasClass("scroll-arrow_more") ? 1 : -1;
								scrollStep = o.scrollStep * scrollForward;
								scrollToValue = scrollForward > 0 ? data.maxScrollValue : 0;
							} else {
								scrollForward = (data.eventOffset > (data.scrollbarOffset + data.scrollbarSize) ? 1
									: (data.eventOffset < data.scrollbarOffset ? -1 : 0));
								scrollStep = Math.round(scrollx.visible * 0.75) * scrollForward;
								scrollToValue = (data.eventOffset - data.scrollbarOffset -
								(o.stepScrolling ? (scrollForward == 1 ? data.scrollbarSize : 0)
									: Math.round(data.scrollbarSize / 2)));
								scrollToValue = c[scrollOffset]() + (scrollToValue / scrollx.kx);
							}

							S.scrollTo = S.scrollTo || {};
							S.scrollTo[scrollOffset] = o.stepScrolling ? c[scrollOffset]() + scrollStep : scrollToValue;

							if(o.stepScrolling){
								scrollCallback = function(){
									scrollToValue = c[scrollOffset]();
									clearInterval(timer);
									clearTimeout(timeout);
									timeout = 0;
									timer = 0;
								};
								timeout = setTimeout(function(){
									timer = setInterval(scrollTo, 40);
								}, o.duration + 100);
							}

							setTimeout(function(){
								if(S.scrollTo){
									c.animate(S.scrollTo, o.duration);
									S.scrollTo = null;
								}
							}, 1);

							return handleMouseDown(scrollCallback, event);
						});

					// handle scrollbar drag'n'drop
					scrollx.scroller.on("mousedown.scrollbar", function(event){

						if(event.which != lmb)
							return true;

						var eventPosition = event[(d == "x")? "pageX" : "pageY"];
						var initOffset = c[scrollOffset]();

						scrollx.scrollbar.addClass("scroll-draggable");

						$(doc).on("mousemove.scrollbar", function(event){
							var diff = parseInt((event[(d == "x")? "pageX" : "pageY"] - eventPosition) / scrollx.kx, 10);
							c[scrollOffset](initOffset + diff);
						});

						return handleMouseDown(function(){
							scrollx.scrollbar.removeClass("scroll-draggable");
							scrollToValue = c[scrollOffset]();
						}, event);
					});
				}
			});

			// remove classes & reset applied styles
			$.each(s, function(d, scrollx){
				var scrollClass = "scroll-scroll" + d + "_visible";
				var scrolly = (d == "x") ? s.y : s.x;

				scrollx.scrollbar.removeClass(scrollClass);
				scrolly.scrollbar.removeClass(scrollClass);
				cw.removeClass(scrollClass);
			});

			// calculate init sizes
			$.each(s, function(d, scrollx){
				$.extend(scrollx, (d == "x") ? {
					"offset": parseInt(c.css("left"), 10) || 0,
					"size": c.prop("scrollWidth"),
					"visible": w.width()
				} : {
					"offset": parseInt(c.css("top"), 10) || 0,
					"size": c.prop("scrollHeight"),
					"visible": w.height()
				});
			});


			var updateScroll = function(d, scrollx){

				var scrollClass = "scroll-scroll" + d + "_visible";
				var scrolly = (d == "x") ? s.y : s.x;
				var offset = parseInt(c.css((d == "x") ? "left" : "top"), 10) || 0;

				var AreaSize = scrollx.size;
				var AreaVisible = scrollx.visible + offset;

				scrollx.isVisible = (AreaSize - AreaVisible) > 1; // bug in IE9/11 with 1px diff
				if(scrollx.isVisible){
					scrollx.scrollbar.addClass(scrollClass);
					scrolly.scrollbar.addClass(scrollClass);
					cw.addClass(scrollClass);
				} else {
					scrollx.scrollbar.removeClass(scrollClass);
					scrolly.scrollbar.removeClass(scrollClass);
					cw.removeClass(scrollClass);
				}

				if(d == "y" && (scrollx.isVisible || scrollx.size < scrollx.visible)){
					cw.css("height", (AreaVisible + browser.scroll.height) + px);
				}

				if(s.x.size != c.prop("scrollWidth")
					|| s.y.size != c.prop("scrollHeight")
					|| s.x.visible != w.width()
					|| s.y.visible != w.height()
					|| s.x.offset  != (parseInt(c.css("left"), 10) || 0)
					|| s.y.offset  != (parseInt(c.css("top"), 10) || 0)
				){
					$.each(s, function(d, scrollx){
						$.extend(scrollx, (d == "x") ? {
							"offset": parseInt(c.css("left"), 10) || 0,
							"size": c.prop("scrollWidth"),
							"visible": w.width()
						} : {
							"offset": parseInt(c.css("top"), 10) || 0,
							"size": c.prop("scrollHeight"),
							"visible": w.height()
						});
					});
					updateScroll(d == "x" ? "y" : "x", scrolly);
				}
			};
			$.each(s, updateScroll);

			if($.isFunction(o.onUpdate))
				o.onUpdate.apply(this, [c]);

			// calculate scroll size
			$.each(s, function(d, scrollx){

				var cssOffset = (d == "x") ? "left" : "top";
				var cssFullSize = (d == "x") ? "outerWidth" : "outerHeight";
				var cssSize = (d == "x") ? "width" : "height";
				var offset = parseInt(c.css(cssOffset), 10) || 0;

				var AreaSize = scrollx.size;
				var AreaVisible = scrollx.visible + offset;

				var scrollSize = scrollx.scrollbar.find(".scroll-element_size");
				scrollSize = scrollSize[cssFullSize]() + (parseInt(scrollSize.css(cssOffset), 10) || 0);

				if(o.autoScrollSize){
					scrollx.scrollbarSize = parseInt(scrollSize * AreaVisible / AreaSize, 10);
					scrollx.scroller.css(cssSize, scrollx.scrollbarSize + px);
				}

				scrollx.scrollbarSize = scrollx.scroller[cssFullSize]();
				scrollx.kx = ((scrollSize - scrollx.scrollbarSize) / (AreaSize - AreaVisible)) || 1;
				scrollx.maxScrollOffset = AreaSize - AreaVisible;
			});

			c.scrollLeft(initScroll.scrollLeft).scrollTop(initScroll.scrollTop).trigger("scroll");
		}
	};

	/*
	 * Extend jQuery as plugin
	 *
	 * @param {object|string} options or command to execute
	 * @param {object|array} args additional arguments as array []
	 */
	$.fn.scrollbar = function(options, args){

		var toReturn = this;

		if(options === "get")
			toReturn = null;

		this.each(function() {

			var container = $(this);

			if(container.hasClass("scroll-wrapper")
				|| container.get(0).nodeName == "body"){
				return true;
			}

			var instance = container.data("scrollbar");
			if(instance){
				if(options === "get"){
					toReturn = instance;
					return false;
				}

				var func = (typeof options == "string" && instance[options]) ? options : "init";
				instance[func].apply(instance, $.isArray(args) ? args : []);

				if(options === "destroy"){
					container.removeData("scrollbar");
					while($.inArray(instance, browser.scrolls) >= 0)
						browser.scrolls.splice($.inArray(instance, browser.scrolls), 1);
				}
			} else {
				if(typeof options != "string"){
					instance = new customScrollbar(container, options);
					container.data("scrollbar", instance);
					browser.scrolls.push(instance);
				}
			}
			return true;
		});

		return toReturn;
	};

	/**
	 * Connect default options to global object
	 */
	$.fn.scrollbar.options = defaults;

	/**
	 * Extend AngularJS as UI directive
	 *
	 *
	 */
	if(win.angular){
		(function(angular){
			var app = angular.module('jQueryScrollbar', []);
			app.directive('jqueryScrollbar', function(){
				return {
					"link": function(scope, element){
						element.scrollbar(scope.options).on('$destroy', function(){
							element.scrollbar('destroy');
						});
					},
					"restring": "AC",
					"scope": {
						"options": "=jqueryScrollbar"
					}
				};
			});
		})(win.angular);
	}

	/**
	 * Check if scroll content/container size is changed
	 */
	var timer = 0, timerCounter = 0;
	var updateScrollbars = function(force){
		var i, c, o, s, w, x, y;
		for( i = 0; i < browser.scrolls.length; i++){
			s = browser.scrolls[i];
			c = s.container;
			o = s.options;
			w = s.wrapper;
			x = s.scrollx;
			y = s.scrolly;
			if(force || (o.autoUpdate && w && w.is(":visible") &&
				(c.prop("scrollWidth") != x.size
					|| c.prop("scrollHeight") != y.size
					|| w.width()  != x.visible
					|| w.height() != y.visible
				))){
				s.init();

				if(debug){
					browser.log({
						"scrollHeight":  c.prop("scrollHeight") + ":" + s.scrolly.size,
						"scrollWidth":   c.prop("scrollWidth") + ":" + s.scrollx.size,
						"visibleHeight": w.height() + ":" + s.scrolly.visible,
						"visibleWidth":  w.width() + ":" + s.scrollx.visible
					}, true);
					timerCounter++;
				}
			}
		}
		if(debug && timerCounter > 10){
			browser.log("Scroll updates exceed 10");
			updateScrollbars = function(){};
		} else {
			clearTimeout(timer);
			timer = setTimeout(updateScrollbars, 300);
		}
	};

	/* ADDITIONAL FUNCTIONS */
	/**
	 * Get native browser scrollbar size (height/width)
	 *
	 * @param {Boolean} actual size or CSS size, default - CSS size
	 * @returns {Object} with height, width
	 */
	function getBrowserScrollSize(actualSize){

		if(browser.webkit && !actualSize){
			return {
				"height": 0,
				"width": 0
			};
		}

		if(!browser.data.outer){
			var css = {
				"border":  "none",
				"box-sizing": "content-box",
				"height":  "200px",
				"margin":  "0",
				"padding": "0",
				"width":   "200px"
			};
			browser.data.inner = $("<div>").css($.extend({}, css));
			browser.data.outer = $("<div>").css($.extend({
				"left":       "-1000px",
				"overflow":   "scroll",
				"position":   "absolute",
				"top":        "-1000px"
			}, css)).append(browser.data.inner).appendTo("body");
		}

		browser.data.outer.scrollLeft(1000).scrollTop(1000);

		return {
			"height": Math.ceil((browser.data.outer.offset().top - browser.data.inner.offset().top) || 0),
			"width": Math.ceil((browser.data.outer.offset().left - browser.data.inner.offset().left) || 0)
		};
	}

	function handleMouseDown(callback, event){
		$(doc).on({
			"blur.scrollbar": function(){
				$(doc).add('body').off('.scrollbar');
				callback && callback();
			},
			"dragstart.scrollbar": function(event){
				event.preventDefault();
				return false;
			},
			"mouseup.scrollbar": function(){
				$(doc).add('body').off('.scrollbar');
				callback && callback();
			}
		});
		$("body").on({
			"selectstart.scrollbar": function(event){
				event.preventDefault();
				return false;
			}
		});
		event && event.preventDefault();
		return false;
	}

	/**
	 * Check if native browser scrollbars overlay content
	 *
	 * @returns {Boolean}
	 */
	function isScrollOverlaysContent(){
		var scrollSize = getBrowserScrollSize(true);
		return !(scrollSize.height || scrollSize.width);
	}

	function isVerticalScroll(event){
		var e = event.originalEvent;
		if (e.axis && e.axis === e.HORIZONTAL_AXIS)
			return false;
		if (e.wheelDeltaX)
			return false;
		return true;
	}

})(jQuery, document, window);

(function($) {
	$.fn.selectbox = function(options) {
		var settings = $.extend({}, options),
			max_height = settings.maxHeight,
			unit = settings.unit,
			trackColor = settings.trackColor,
			lineColor = settings.lineColor;
		$(this).each(function() {
			var select = $(this);
			var select_id = this.id;
			if (select.prev('span.selectbox').length < 1) {
				function doSelect() {
					var option = select.find('option');
					var optionSelected = option.filter(':selected');
					var optionText = option.filter(':first').text();
					if (optionSelected.length) optionText = optionSelected.text();
					var ddlist = '';
					for (i = 0; i < option.length; i++) {
						var optionValue = option.eq(i).val();
						var optionId = option.eq(i).attr('id');
						var selected = '';
						var disabled = ' class="disabled"';
						if (option.eq(i).is(':selected')) selected = ' class="selected sel"';
						if (option.eq(i).is(':disabled')) selected = disabled;
						ddlist += '<li' + selected + '  data-value="'+optionValue+'" data-id="'+optionId+'">'+ option.eq(i).text() +'</li>';
					}
					var selectbox =
						$('<span class="selectbox" id="'+select_id+'_id" style="display:block;position:relative">'+
							'<div class="select" style="float:left;position:relative;z-index:99"><div class="text">' + optionText + '</div>'+
							'<b class="trigger"><i class="fa fa-caret-down" aria-hidden="true"></i></b>'+
							'</div>'+
							'<div class="dropdown" style="position:absolute;z-index:98;overflow:hidden;list-style:none">'+
							'<ul class="scrollbar-dynamic">' + ddlist + '</ul>'+
							'</div>'+
							'</span>');
					select.before(selectbox).css({position: 'absolute', top: -9999, width: 0});
					var divSelect = selectbox.find('div.select');
					var divText = selectbox.find('div.text');
					var dropdown = selectbox.find('div.dropdown');
					var li = dropdown.find('li');
					var selectHeight = selectbox.outerHeight();
					dropdown.css({left: 0});
					dropdown.css({top: selectHeight * 0.9 + 'px'});
					var liHeight = li.outerHeight();
					var position = dropdown.css('top');
					dropdown.hide();
					/* при клике на псевдоселекте */
					divSelect.click(function() {
						/* умное позиционирование */
						var topOffset = selectbox.offset().top;
						var bottomOffset = $(window).height() - selectHeight - (topOffset - $(window).scrollTop());
						if (bottomOffset < 0 || bottomOffset < liHeight * 6)	{
							dropdown.css({top: 'auto', bottom: position, 'height': max_height + unit});
							if (dropdown.outerHeight() > topOffset - $(window).scrollTop() - 20 ) {
								dropdown.height(Math.floor((topOffset - $(window).scrollTop() - 20) / liHeight) * liHeight);
							}
							if (dropdown.find('ul').find('li').first().hasClass('selected')){
								dropdown.find('ul').find('li').first().addClass('first').next().addClass('none-border');
							}
							else{
								dropdown.find('ul').find('li').first().addClass('first').next().removeClass('none-border');
							}
						} else if (bottomOffset > liHeight * 6) {
							dropdown.css({bottom: 'auto', top: position,  'height': max_height + unit});
							if (dropdown.outerHeight() > bottomOffset - 20 ) {
								dropdown.height(Math.floor((bottomOffset - 20) / liHeight) * liHeight);
							}
							if (dropdown.find('ul').find('li').first().hasClass('selected')){
								dropdown.find('ul').find('li').first().addClass('first').next().addClass('none-border');
							}
							else{
								dropdown.find('ul').find('li').first().addClass('first').next().removeClass('none-border');
							}
						}
						$('span.selectbox').css({zIndex: 1}).removeClass('focused');
						selectbox.css({zIndex: 10});
						if (dropdown.is(':hidden')) {
							$('div.dropdown:visible').slideUp('fast');
							$('.select.active').removeClass('active');
							dropdown.slideDown('fast');
							dropdown.find('ul').scrollbar();
							$('.scrollbar-dynamic > .scroll-element .scroll-element_track').css('background', trackColor);
							$('.scrollbar-dynamic > .scroll-element .scroll-bar').css('background', lineColor);
							$(this).addClass('active');
							$(this).next().find('li').on('click', function(){
								$(this).parents('.dropdown').prev().removeClass('active');
							});


						} else {
							dropdown.slideUp('fast');
							$(this).removeClass('active');
						}

						return false;

					});
					/* при наведении курсора на пункт списка
					 li.hover(function() {
					 $(this).siblings().removeClass('selected');
					 });*/
					var selectedText = li.filter('.selected').text();
					/* при клике на пункт списка */
					li.filter(':not(.disabled)').click(function() {
						var liText = $(this).text();
						var index_new = $(this).index();
						if ( selectedText != liText ) {
							$(this).addClass('selected sel').siblings().removeClass('selected sel');
							option.removeAttr('selected');
							option.eq(index_new).attr('selected', 'selected');
							selectedText = liText;
							divText.text(liText);
							var liValue = $(this).data('value');
							select.val(liValue);
							select.change();
						}
						dropdown.slideUp('fast');
					});
					dropdown.mouseout(function() {
						dropdown.find('li.sel').addClass('selected');
					});
					/* фокус на селекте */
					select.focus(function() {
						$('span.selectbox').removeClass('focused');
						selectbox.addClass('focused');
					})
					/* меняем селект с клавиатуры */
						.keyup(function() {
							divText.text(option.filter(':selected').text());
							li.removeClass('selected sel').eq(option.filter(':selected').index()).addClass('selected sel');
						});
					/* прячем выпадающий список при клике за пределами селекта */
					$(document).on('click', function(e) {
						if (!$(e.target).parents().hasClass('selectbox')) {
							dropdown.slideUp('fast').find('li.sel').addClass('selected');
							selectbox.removeClass('focused');
							$('.select.active').removeClass('active');
						}
					});
				}
				doSelect();
				// обновление при динамическом изменении
				select.on('refresh', function() {
					select.prev().remove();
					doSelect();
				})
			}
		});
	}
})(jQuery)