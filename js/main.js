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
});

/* Carrusel */

// JavaScript para clonar logos y hacer el carrusel infinito

document.addEventListener('DOMContentLoaded', function() {
    const carousels = document.querySelectorAll('.carousel_logos');

    carousels.forEach(carousel => {
        const clone = carousel.cloneNode(true); // Clona el carrusel completo
        carousel.parentNode.appendChild(clone); // Agrega el clon al final del contenedor
    });
});

document.addEventListener('DOMContentLoaded', function () {
	const navHeight = document.querySelector('.main-nav').offsetHeight;

	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();

			const targetId = this.getAttribute('href');
			const targetElement = document.querySelector(targetId);

			if (targetElement) {
				const targetPosition = targetElement.offsetTop;
				const adjustedPosition = targetPosition - navHeight;

				window.scrollTo({
					top: adjustedPosition,
					behavior: 'smooth' // Optional: Smooth scrolling animation
				});
			}
		});
	});
});
