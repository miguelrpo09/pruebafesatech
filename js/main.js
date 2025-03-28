jQuery(function($) {

	//Preloader
	var preloader = $('.preloader');
	$(window).on('load', function(){ // Use 'on' for better event handling
		preloader.remove();
	});

	//#main-slider
	var slideHeight = $(window).height();
	$('#home-slider .item').css('height',slideHeight);

	$(window).on('resize', function(){ // Use 'on' for better event handling
		$('#home-slider .item').css('height',slideHeight);
	});
	
	//Scroll Menu
	$(window).on('scroll', function(){
		if( $(window).scrollTop() > slideHeight ){
			$('.main-nav').addClass('navbar-fixed-top');
		} else {
			$('.main-nav').removeClass('navbar-fixed-top');
		}
	});
	
	// Navigation Scroll
	$(window).on('scroll', function(event) { // Use 'on' for better event handling
		Scroll();
	});

	$('.navbar-collapse ul li a').on('click', function() {  
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
		return false;
	});

	// User define function
	function Scroll() {
		var contentTop      =   [];
		var contentBottom   =   [];
		var winTop      =   $(window).scrollTop();
		var rangeTop    =   200;
		var rangeBottom =   500;
		$('.navbar-collapse').find('.scroll a').each(function(){
			var target = $(this).attr('href');
			contentTop.push( $(target).offset().top);
			contentBottom.push( $(target).offset().top + $(target).height() );
		});
		$.each( contentTop, function(i){
			if ( winTop > contentTop[i] - rangeTop ){
				$('.navbar-collapse li.scroll')
				.removeClass('active')
				.eq(i).addClass('active');			
			}
		});
	}

	$('#tohash').on('click', function(){
		$('html, body').animate({scrollTop: $(this.hash).offset().top - 5}, 1000);
		return false;
	});
	
	//Initiat WOW JS
	new WOW().init();
	//smoothScroll
	smoothScroll.init();
	
	// Progress Bar
	$('#about-us').on('inview', function(event, visible, visiblePartX, visiblePartY) { // Use 'on' for better event handling
		if (visible) {
			$('div.progress-bar').each(function(){
				$(this).css('width', $(this).attr('aria-valuetransitiongoal')+'%');
			});
			$(this).off('inview'); // Use 'off' instead of 'unbind'
		}
	});

	//Countdown
	$('#features').on('inview', function(event, visible, visiblePartX, visiblePartY) { // Use 'on' for better event handling
		if (visible) {
			$(this).find('.timer').each(function () {
				var $this = $(this);
				$({ Counter: 0 }).animate({ Counter: $this.text() }, {
					duration: 2000,
					easing: 'swing',
					step: function () {
						$this.text(Math.ceil(this.Counter));
					}
				});
			});
			$(this).off('inview'); // Use 'off' instead of 'unbind'
		}
	});

	// Portfolio Single View
	$('#portfolio').on('click','.folio-read-more',function(event){
		event.preventDefault();
		var link = $(this).data('single_url');
		var full_url = '#portfolio-single-wrap';
		var parts = full_url.split("#");
		var trgt = parts[1];
		var target_top = $("#"+trgt).offset().top;

		$('html, body').animate({scrollTop:target_top}, 600);
		$('#portfolio-single').slideUp(500, function(){
			$(this).load(link,function(){
				$(this).slideDown(500);
			});
		});
	});

	// Close Portfolio Single View
	$('#portfolio-single-wrap').on('click', '.close-folio-item',function(event) {
		event.preventDefault();
		var full_url = '#portfolio';
		var parts = full_url.split("#");
		var trgt = parts[1];
		var target_offset = $("#"+trgt).offset();
		var target_top = target_offset.top;
		$('html, body').animate({scrollTop:target_top}, 600);
		$("#portfolio-single").slideUp(500);
	});

	// Contact form
	var form = $('#main-contact-form');
	form.on('submit', function(event){ // Use 'on' for better event handling
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),
			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email se está enviando...</p>').fadeIn() );
			}
		}).done(function(data){
			form_status.html('<p class="text-success">Gracias por contactarnos. Nos pondremos en contacto con usted lo antes posible.</p>').delay(3000).fadeOut();
		});
	});

	
/* Carrusel */

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider-track');
    const container = document.querySelector('.slider-container');
    let isDragging = false;
    let startPosition = 0;
    let currentTranslate = 0;
    let previousTranslate = 0;
    let animationID = 0;
    let currentPosition = 0;

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function setSliderPosition() {
        slider.style.transform = `translateX(${currentTranslate}px)`;
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function touchStart(event) {
        isDragging = true;
        startPosition = getPositionX(event);
        currentPosition = startPosition;
        
        slider.classList.add('dragging');
        slider.style.animation = 'none';
        
        cancelAnimationFrame(animationID);
        
        container.style.cursor = 'grabbing';
    }

    function touchMove(event) {
        if (!isDragging) return;
        
        const currentPosition = getPositionX(event);
        const diff = currentPosition - startPosition;
        
        currentTranslate = previousTranslate + diff;
        
        // Limitar el arrastre
        const maxTranslate = 0;
        const minTranslate = -(slider.offsetWidth / 2);
        
        if (currentTranslate > maxTranslate) {
            currentTranslate = maxTranslate;
        } else if (currentTranslate < minTranslate) {
            currentTranslate = minTranslate;
        }
        
        animationID = requestAnimationFrame(animation);
    }

    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        
        previousTranslate = currentTranslate;
        
        // Reiniciar posición si llega a los extremos
        if (currentTranslate === 0 || currentTranslate <= -(slider.offsetWidth / 2)) {
            previousTranslate = 0;
            currentTranslate = 0;
            slider.style.transform = 'translateX(0)';
        }
        
        slider.classList.remove('dragging');
        slider.style.animation = '';
        container.style.cursor = 'grab';
    }

    // Event Listeners
    container.addEventListener('mousedown', touchStart);
    container.addEventListener('touchstart', touchStart);

    container.addEventListener('mousemove', touchMove);
    container.addEventListener('touchmove', touchMove);

    container.addEventListener('mouseup', touchEnd);
    container.addEventListener('touchend', touchEnd);
    container.addEventListener('mouseleave', touchEnd);

    // Prevenir el comportamiento por defecto del arrastre
    container.addEventListener('dragstart', (e) => e.preventDefault());
});
});
