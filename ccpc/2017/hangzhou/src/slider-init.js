/* global sliderOptions */
jQuery(function($) {
    'use strict';
	$('.fly-slider .slider-inner').owlCarousel({
        items : 3,
        itemsCustom : false,
        singleItem: false,
        itemsDesktop : [1199,3],
        itemsDesktopSmall : [980,3],
        itemsTablet: [768,2],
        itemsTabletSmall: false,
        itemsMobile : [479,1],
        autoPlay : +sliderOptions.slideshowspeed,
        stopOnHover : true,
        navigation : true,
        navigationText : ['<i class="fa fa-long-arrow-left"></i>','<i class="fa fa-long-arrow-right"></i>'],
        rewindNav : true,
        pagination : false,
        autoHeight : true
	});
});

jQuery(function($) {
    'use strict';
    $('.posts-slider .posts-slider-inner').owlCarousel({
        itemsCustom : false,
        singleItem: true,
        autoPlay : true,
        stopOnHover : true,
        navigation : true,
        navigationText : ['<i class="fa fa-long-arrow-left"></i>','<i class="fa fa-long-arrow-right"></i>'],
        rewindNav : true,
        pagination : false,
        autoHeight : true
    });
});


jQuery(function($) {
    'use strict';
    $(window).bind('load', function() {
        $('.fly-slider .slider-inner').fadeIn();
        $('.posts-slider .posts-slider-inner').fadeIn();
    }); 
});
