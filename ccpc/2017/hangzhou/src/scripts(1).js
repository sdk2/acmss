//Menu dropdown animation
/* global WOW */
jQuery(function($) {
	'use strict';
	$('.sub-menu').hide();
	$('.main-navigation .children').hide();
	$('.menu-item').hover( 
		function() {
			$(this).children('.sub-menu').slideDown();
		}, 
		function() {
			$(this).children('.sub-menu').hide();
		}
	);
	$('.main-navigation li').hover( 
		function() {
			$(this).children('.main-navigation .children').slideDown();
		}, 
		function() {
			$(this).children('.main-navigation .children').hide();
		}
	);	
});


//Fit Vids
jQuery(function($) {
    'use strict';
	$('body').fitVids();
});

//Mobile menu
jQuery(function($) {
	'use strict';
	$('.main-navigation .menu').slicknav({
		label: '<i class="fa fa-bars"></i>',
		prependTo: '.mobile-nav',
		closedSymbol: '&#43;',
		openedSymbol: '&#45;'
	});
	$('.info-close').click(function(){
		$(this).parent().fadeOut();
		return false;
	});
});	

//Smooth scrolling
jQuery(function($) {
	'use strict';
	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
			$('html,body').animate({
			scrollTop: target.offset().top
			}, 800);
			return false;
			}
		}
	});
});

//Open social links in a new tab
jQuery(function($) {
    'use strict';
	$( '.social-navigation li a' ).attr( 'target','_blank' );
});

//Search form
jQuery(function($) {
	'use strict';
	$('.search-toggle').click(function() {
		$('.search-wrapper').addClass('search-visible');
	});
	$('.search-close').click(function() {
		$('.search-wrapper').removeClass('search-visible');
	});			
});

jQuery(function($) {
	'use strict';
	$('.news-ticker').easyTicker({
		direction: 'up',
		speed: 'slow',
		interval: 3000,
		height: 'auto',
		visible: 0,
		mousePause: 1,
	});
});

//WOW.js init
jQuery(function() {
	'use strict';
    if (typeof WOW !== 'undefined' && jQuery.isFunction(WOW)) {
		new WOW().init();
	}
});