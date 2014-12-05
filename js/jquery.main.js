$(document).ready(function() {
	maskInput();
	initService();
	initMapHeight();
	initPopup();
	initServiceList();
	//$(window).trigger('resize');
	$(window).load(function() {
		setTimeout(function() {
			$("body").addClass('visible-block');
		}, 300);
		if (device.mobile() || device.tablet()) {
			$('#wrapper').addClass('mobile');
			if (device.mobile()) {
				$('#wrapper').addClass('mobile-device');
			}
		} else {
			setTimeout(function() {
				$(".customScrollbar").each(function() {
					$(this).mCustomScrollbar({
						theme: "rounded",
						scrollInertia: 0
					});
				});
			}, 50);

		}
			//initImgBg();
		if ($('.bg').size()) initSly();
		setTimeout(function() {
			if ($('.isotope').size()) initIsotope();
		}, 80);
		initdotdotdot();
	});
	if (device.mobile() || device.tablet()) {
		$(window).on("orientationchange", function(event) {
			setTimeout(function() {
				initSly();
				initMapHeight();
				if ($('.bg').size()) initSly();
				$(".main-description").trigger("update");
			}, 100);
		});
		if (screen.width <= 350) {
			$('head').find('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=0.416');
		} else {
			if (screen.width <= 767) {
				$('head').find('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=0.42');
			}
		}
	} else {
		$(window).resize(function() {
			initSly();
			initMapHeight();
			initBg();
			initPopup();
			$(".main-description").trigger("update");
		});
	}

	function initServiceList() {
		$('.side-opener-service').mouseenter(function() {
			$('.service-hover-block').addClass('hover');
			setTimeout(function() {
				$('.service-hover-block').addClass('hover');
			}, 300);
		}).mouseleave(function() {
			setTimeout(function() {
				if (!$('.service-hover-block').hasClass('active-b')) {
					$('.service-hover-block').removeClass('hover').removeClass('active-b');
				}
			}, 300);
		});
		$('.service-hover-block').mouseenter(function() {
			$('.service-hover-block').addClass('active-b');
		}).mouseleave(function() {
			setTimeout(function() {
				$('.service-hover-block').removeClass('hover').removeClass('active-b');
			}, 300);
		});;
	}

	function maskInput() {
		if ($(".input-tel").size()) $(".input-tel").mask("+7 (999) 999-99-99", {
			placeholder: "_"
		});
	}

	function initdotdotdot() {
		if ($('.main-description').size()) {
			$('.main-description').dotdotdot({
				watch: "window",
				after: 'a.more-dot'
			});
		}
	}
	if ('validate' in $.fn) {
		$('.popup-form').each(function() {
			$(this).validate({
				onfocusout: false,
				onkeyup: false,
				onclick: false,
				rules: {
					name: {
						required: true,
						minlength: 3,
						messages: false
					},
					name_company: {
						required: true,
						minlength: 3
					},
					name_product: {
						required: true,
						minlength: 3
					},
					address: {
						required: true,
						email: true,
						minlength: 3
					},
					code: {
						required: true,
						minlength: 1,
						maxlength: 8,
						number: true
					},
					phone: {
						required: true,
						minlength: 18,
						maxlength: 18
					},
					text: {
						required: true,
						minlength: 3
					}
				}
			});
		})
		$('.file-btn input:file').change(function() {
			initBg();
			if ($(this).closest('.row').find('.doc-list li').length > 9) {
				$(this).closest('.row').addClass('error');
			} else {
				$(this).closest('.row').find('.doc-list').append('<li><span>' + $(this).val() + '</span><i class="close-row"></i></li>');
			}
		});
		$(document).on('click', '.mail-btn', function() {
			initBg();
		});
		$(document).on('click', '.doc-list .close-row', function() {
			$(this).closest('.row').removeClass('error');
			$(this).parent().remove();
			initBg();
		});
	}

	function initMapHeight() {
		$('.map-wrap').height($(window).height() - $('.contact-wrap').outerHeight() - 80)
	}

	function initService() {
		$('.opener-service-list').click(function() {
			var _this = $(this);
			if ($(this).parent().hasClass('active')) {
				$(this).parent().find('.service-list').slideUp(600, function() {
					_this.parent().removeClass('active');
				});
			} else {
				$(this).parent().find('.service-list').slideDown(600, function() {
					_this.parent().parent().find('.active .service-list').slideUp(600, function() {
						$(this).parent().removeClass('active');
					});
					_this.parent().addClass('active');
				});
			}
			return false;
		});
		$('.opener-description').click(function() {
			var _this = $(this);
			if ($(this).parent().parent().hasClass('active')) {
				$(this).parent().parent().find('.description-box').slideUp(300, function() {
					_this.parent().parent().removeClass('active');
				});
			} else {
				$(this).parent().parent().find('.description-box').slideDown(300, function() {
					_this.parent().parent().parent().find('.active .description-box').slideUp(300, function() {
						$(this).parent().parent().removeClass('active');
					});
					_this.parent().parent().addClass('active');
				});
			}
			return false;
		});
	}

	function initIsotope() {
		$('.reviews-list').isotope({
			itemSelector: 'li'
		});
		$('.portfolio-list').isotope({
			itemSelector: 'li',
			masonry: {
				columnWidth: 'li:last-child'
			}
		});
	}

	function initImgBg() {
		$('.gallery').each(function() {
			if (!$(this).parent().hasClass('reviews-gallery')) {
				$(this).find('li').each(function() {
					var _src = $(this).find('img').attr('src');
					$(this).css({
						'background-image': 'url(' + _src + ')'
					}).find('img').hide();
				});
			}
		});
	}

	function initPopup() {
		$('.popup .close,.bg').click(function() {
			$(this).closest('.popup-holder').fadeOut();
		});
		$('.opener-oredr').click(function() {
			$('#order-popup').fadeIn();
			initBg();
			if ($(window).width() < 860) {
				$('#order-popup .arrow').css({
					'left': $(this).offset().left,
					'top': 0
				});
			} else {
				$('#order-popup .arrow').css({
					'top': $(this).offset().top,
					'left': 0
				});
			}
			return false;
		});
		$('.opener-callback').click(function() {
			$('#callback-popup').fadeIn();
			initBg();
			if ($(window).width() < 860) {

			} else {
				$('#callback-popup .popup').css({
					'top': $(this).offset().top - 100
				});
			}
			return false;
		});
	}

	function initBg() {
		setTimeout(function() {
			if ($(window).height() < $('.popup:visible').outerHeight(true)) {
				$('.bg').height($('.popup:visible').outerHeight(true));
			} else {
				$('.bg').attr('style', '');
			}
		}, 20);
	}

	function initSly() {
		var $frame1 = $('.gallery');
		$frame1.each(function() {
			var $wrap1 = $(this).parent();
			$(this).sly({
				horizontal: 1,
				itemNav: 'forceCentered',
				activateMiddle: 1,
				smart: 1,
				itemSelector: 1,
				mouseDragging: 1,
				touchDragging: 1,
				releaseSwing: 1,
				scrollBy: 0,
				speed: 600,
				elasticBounds: 1,
				easing: 'swing',
				dragHandle: 1,
				dynamicHandle: 1,
				clickBar: 1,
				pagesBar: $wrap1.find('.switcher'),
				activatePageOn: 'click',
				pageBuilder: function(index) {
					return '<li>' + (index + 1) + '</li>';
				},
				cycleBy: 'items',
				cycleInterval: 6000,
				pauseOnHover: 0,
				prev: $wrap1.find('.prev'),
				next: $wrap1.find('.next')
			});
			$(this).find('li').width($(this).width());
			if ($(this).parent().hasClass('reviews-gallery') && $(window).width() < 1200) {
				var _this = $(this);
				$(this).sly('destroy');
				_this.find('.reviews-list').css('width', 'auto');
				return false;
			}
		});
		$frame1.sly('reload');
	}
});
/*! device.js 0.1.58 */
(function() {
	var a, b, c, d, e, f, g, h, i, j;
	a = window.device, window.device = {}, c = window.document.documentElement, j = window.navigator.userAgent.toLowerCase(), device.ios = function() {
		return device.iphone() || device.ipod() || device.ipad()
	}, device.iphone = function() {
		return d("iphone")
	}, device.ipod = function() {
		return d("ipod")
	}, device.ipad = function() {
		return d("ipad")
	}, device.android = function() {
		return d("android")
	}, device.androidPhone = function() {
		return device.android() && d("mobile")
	}, device.androidTablet = function() {
		return device.android() && !d("mobile")
	}, device.blackberry = function() {
		return d("blackberry") || d("bb10") || d("rim")
	}, device.blackberryPhone = function() {
		return device.blackberry() && !d("tablet")
	}, device.blackberryTablet = function() {
		return device.blackberry() && d("tablet")
	}, device.windows = function() {
		return d("windows")
	}, device.windowsPhone = function() {
		return device.windows() && d("phone")
	}, device.windowsTablet = function() {
		return device.windows() && d("touch")
	}, device.fxos = function() {
		return d("(mobile; rv:") || d("(tablet; rv:")
	}, device.fxosPhone = function() {
		return device.fxos() && d("mobile")
	}, device.fxosTablet = function() {
		return device.fxos() && d("tablet")
	}, device.mobile = function() {
		return device.androidPhone() || device.iphone() || device.ipod() || device.windowsPhone() || device.blackberryPhone() || device.fxosPhone()
	}, device.tablet = function() {
		return device.ipad() || device.androidTablet() || device.blackberryTablet() || device.windowsTablet() || device.fxosTablet()
	}, device.portrait = function() {
		return 90 !== Math.abs(window.orientation)
	}, device.landscape = function() {
		return 90 === Math.abs(window.orientation)
	}, device.noConflict = function() {
		return window.device = a, this
	}, d = function(a) {
		return -1 !== j.indexOf(a)
	}, f = function(a) {
		var b;
		return b = new RegExp(a, "i"), c.className.match(b)
	}, b = function(a) {
		return f(a) ? void 0 : c.className += " " + a
	}, h = function(a) {
		return f(a) ? c.className = c.className.replace(a, "") : void 0
	}, device.ios() ? device.ipad() ? b("ios ipad tablet") : device.iphone() ? b("ios iphone mobile") : device.ipod() && b("ios ipod mobile") : device.android() ? device.androidTablet() ? b("android tablet") : b("android mobile") : device.blackberry() ? device.blackberryTablet() ? b("blackberry tablet") : b("blackberry mobile") : device.windows() ? device.windowsTablet() ? b("windows tablet") : device.windowsPhone() ? b("windows mobile") : b("desktop") : device.fxos() ? device.fxosTablet() ? b("fxos tablet") : b("fxos mobile") : b("desktop"), e = function() {
		return device.landscape() ? (h("portrait"), b("landscape")) : (h("landscape"), b("portrait"))
	}, i = "onorientationchange" in window, g = i ? "orientationchange" : "resize", window.addEventListener ? window.addEventListener(g, e, !1) : window.attachEvent ? window.attachEvent(g, e) : window[g] = e, e()
}).call(this);