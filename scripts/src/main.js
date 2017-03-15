/*-----------------------------------------Funciones de bloques-----------------------------------------*/

document.addEventListener('contextmenu', event => event.preventDefault()); //Prevenir click derecho
$(document).keydown(function(event){ // previene f12
	if(event.keyCode==123){
		return false;
	}
	else if(event.ctrlKey && event.shiftKey && event.keyCode==73){        
		return false;  //previene ctrl+shift+i
	}
	else if(event.ctrlKey && event.keyCode==85){        
		return false;  //previene control u
	}
	else if(event.ctrlKey && event.keyCode==67){        
		return false;  //previene control c
	}
	else if(event.ctrlKey && event.keyCode==74){        
		return false;  //previene control j
	}
	else if(event.shiftKey && event.keyCode==123){        
		return false;  //previene shift+f12 (firefox)
	}
	else if(event.ctrlKey && event.shiftKey && event.keyCode==81){        
		return false;  //previene contro+shift+q (firefox)
	}
	else if(event.shiftKey && event.keyCode==118){        
		return false;  //previene shift+f7 (firefox)
	}	
	else if(event.ctrlKey && event.shiftKey && event.keyCode==75){        
		return false;  //previene ctrl+shift+k (firefox)
	}	
	else if(event.ctrlKey && event.shiftKey && event.keyCode==74){        
		return false;  //previene ctrl+shift+j (firefox)
	}	
	else if(event.ctrlKey && event.shiftKey && event.keyCode==83){        
		return false;  //previene ctrl+shift+s (firefox)
	}	
	else if(event.ctrlKey && event.shiftKey && event.keyCode==67){        
		return false;  //previene ctrl+shift+c (firefox)
	}		
	else if(event.keyCode==27){        
		return false;  //previene escape(Opera)
	}									
});

/*-----------------------------------------Fin funciones de bloqueos-----------------------------------------*/	

(function(window, document, $){
	"use strict";

	var App = function(){};
	App.prototype = {
		onReady : function(){
			this.setRoles();
			this.setTouchNav();
			this.setSliders();
			this.setForms();
		},
		setTouchNav : function(){
			if( !Modernizr.touchevents ){ return; }

			$('.secondary-nav__item--has-children > a').on('click', function( ev ){
				ev.preventDefault();
				$(ev.currentTarget).parent().toggleClass('deployed');
			});

			$('.inner-nav .current').on('click', function(e){
				e.preventDefault();

				$(e.currentTarget).parent().toggleClass('deployed');
			});
		},
		setRoles : function(){
			$('[data-role="mobile-nav-deployer"]').on('click.adpatativamente', function( event ){
				event.preventDefault();

				// se identifica al boton
				var $button = $(this);

				// se revisa si es que esta "deployed"
				if( $button.hasClass('deployed') ){
					$('body').removeClass('nav-deployed');
					$button.removeClass('deployed');
					$('.mobile-menu-background').remove();
				}
				else {
					// se crean los contenidos del menu
					var $background = $('<div />').addClass('mobile-menu-background'),
						$content = $('<div />').addClass('mobile-menu-body'),
						$primaryNav = $('[data-role="primary-nav"]').clone(),
						$secondaryNav = $('[data-role="secondary-nav"]').clone();

					// se indica al body
					$('body').addClass('nav-deployed');

					// se comienza a meter cosas al DOM
					$button.addClass('deployed');
					$button.after( $background );

					setTimeout(function(){
						$background.addClass('deployed');
						$content.append( $primaryNav ).append( $secondaryNav ).appendTo( $background );

						setTimeout(function(){
							$content.addClass('deployed');
						}, 500);					
					}, 10);
				}
			});

			$('[data-role="form-control"]').on('click.adpatativamente', function( event ){
				var $control = $(this);
				$control.addClass('form-control--filled');
			});

			$('[data-role="form-control"] .form-control__select').on('change.adpatativamente', function( event ){
				var $select = $(this);

				if( !!$select.val() ){
					$select.addClass('filled');
				}
				else {
					$select.removeClass('filled');
				}				
			});

			$('[data-role="video-lightbox"]').on('click.adpatativamente', function( event ){
				event.preventDefault();

				var $lightbox = $('<div />').addClass('lightbox');
				var $content = $('<div />').addClass('lightbox__content').appendTo( $lightbox );

				var videoframe = event.currentTarget.href.replace(/(?:http?s:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g, '<iframe width="800" height="600" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>');

				console.log(videoframe);
				var $iframe = $(videoframe).appendTo( $content );

				$lightbox.appendTo('body').animate({ opacity: 1 }, 1000);

				// delegaciones
				$content.on('click.lightbox', function( e ){ e.stopPropagation() });
				$lightbox.on('click.lightbox', function(){ $lightbox.remove(); });
			});

			if( $('[data-role="fancy-header"]').length ){
				this.fancyHeaderSlider( $('[data-role="fancy-header"]') );
			}
		},
		setSliders : function(){
			var $modules = $('[data-module="slider"]');

			$modules.each(function(index, el){
				var $container = $(el),
					$slides = $container.find('[data-role="slider-slide"]'),
					$arrows = $container.find('[data-role="slider-arrow"]'),
					$bullets = $container.find('[data-role="slider-bullet"]');

				var animating = false;

				// methods
				var slide = function( target_index ){
						var $current = $slides.filter('.current'),
							$target = $slides.filter('[data-index="'+ target_index +'"]');

						animating = true;

						$current.animate({opacity: 0}, 500);
						$target.animate({opacity: 1}, 500, function(){
							// se confima el nuevo current
							$current.removeClass('current');
							$target.addClass('current');

							// se muestra en lso bullets
							$bullets.removeClass('current');
							$bullets.filter('[data-target="'+ target_index +'"]').addClass('current');

							animating = false;
						});
					};

				var next = function(){
						var current_index = $slides.filter('.current').data('index'),
							target_index = current_index + 1;

						if( target_index === $slides.length ){
							target_index = 0;
						}

						if( animating ){ return; }

						slide( target_index );
					};

				var prev = function(){
						var current_index = $slides.filter('.current').data('index'),
							target_index = current_index - 1;

						if( target_index < 0 ){
							target_index = $slides.length - 1;
						}

						if( animating ){ return; }

						slide( target_index );
					};

				var interval = setInterval(next, 2000);

				$arrows.on('click', function( e ){
					e.preventDefault();

					var direction = $(this).data('direction');

					clearInterval(interval);

					if( direction === 'next' ){ next(); }
					else { prev(); }
				});

				$bullets.on('click', function( e ){
					e.preventDefault();

					var target = $(this).data('target');

					clearInterval(interval);
					slide(target);
				});
			});
		},
		setForms : function(){
			var validInputAction = function( input ){
				$(input).parents('.form-control').removeClass('form-control--invalid');
			};

			var invalidInputAction = function( input ){
				$(input).parents('.form-control').addClass('form-control--invalid');
			};

			var customValidations = {
					onlyNumbers : function( input, validizr, event ){
						var $input = $(input),
							value = $input.val(),
							cleanValue = value.replace(/\D/g, ''),
							minLength = $input.data('minlength') || false,
							maxLength = $input.data('maxlength') || false;

						// force clean value to input
						$input.val(cleanValue);

						// only act on required fields
						// if no value and not required
						if( !cleanValue && !$input.prop('required') ){ return true; }

						// value validation
						
						// if no value after cleaning
						if( !cleanValue ){ return false; }

						// if less than specified minimun length
						if( minLength && cleanValue.length < minLength ){ return false; }

						// if more than specified maximum length
						if( maxLength && cleanValue.length > maxLength ){ return false; }

						// return value based boolean
						return !!cleanValue;
					},

					onlyString : function( input, validizr, event ){
						var $input = $(input),
							value = $input.val(),
							cleanValue = value.replace(/\d/g, ''),
							minLength = $input.data('minlength') || false,
							maxLength = $input.data('maxlength') || false;

						// force clean value to input
						$input.val(cleanValue);

						// only act on required fields
						// if no value and not required
						if( !cleanValue && !$input.prop('required') ){ return true; }

						// value validation
						
						// if no value after cleaning
						if( !cleanValue ){ return false; }

						// if less than specified minimun length
						if( minLength && cleanValue.length < minLength ){ return false; }

						// if more than specified maximum length
						if( maxLength && cleanValue.length > maxLength ){ return false; }

						// return value based boolean
						return !!cleanValue;
					},

					equalTo : function( input, validizr, event ){
						var $input = $(input),
							inputType = validizr.getInputType( input ),
							value = $input.val(),
							sample = $('#' + $input.data('sample')).val();

						// value validation
						
						// check if any is empty
						if( !value || !sample ){ return false; }

						// check if is email depending on input type
						if( inputType === 'email' ){
							//if email input and any of the values isnt an email
							if( !validizr.emailRegEx.test( value ) || !validizr.emailRegEx.test( sample ) ){
								return false;
							}
						}

						// check if both values are equal
						if( value !== sample ){ return false; }

						// return value based boolean
						return !!value;
					},

					matchPattern : function( input, validizr, event ){
						var $input = $(input),
							value = $input.val(),
							protoPattern = $input.data('pattern'),
							pattern = new RegExp(protoPattern);

						// value validation
						
						// if no value
						if( !value ){ return false; }

						// return regexp based boolean
						return pattern.test( value );
					}
				};


			$('form').each(function(index, form){
				var validizr = new Validizr(form, {
					validInputCallback : validInputAction,
					notValidInputCallback : invalidInputAction,
					customValidations : customValidations
				});
			});
		},



		fancyHeaderSlider : function( $container ){
			var $images = $container.find('img');

			var next = function(){
				var $current = $images.filter('.current'),
					$next = $current.next().length ? $current.next() : $images.first();

				$current.animate({opacity: 0}, 1000);
				$next.animate({opacity: 1}, 1000, function(){
					// se confima el nuevo current
					$current.removeClass('current');
					$next.addClass('current');
				});
			};

			setInterval( next, 10000 );
		}
	};



	var app = new App();

	$(document).ready(function(){
		app.onReady();
	});
}(window, document, jQuery));