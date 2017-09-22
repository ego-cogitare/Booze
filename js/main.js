jQuery(document).ready(function() {

    var SectionsHeight = function() {
        var Section = $('.sectionWrapper')
          , WinHeight = $(window).outerHeight();

        $(window).outerWidth() > 1023
            ? Section.css('height', WinHeight)
            : Section.css('height', 'auto');
    };

    var WidthCocktailSection = function() {
        if($(window).outerWidth() > 1023)
        {
            var totalWidth = 0;

            $('.cocktailBox.desktop .item').each(function () {
                totalWidth += $(this).outerWidth();
            });
            $('.sectionOne, .sectionThree, .sectionFour').css('width', $(window).outerWidth());
            $('.sectionTwo').css('width', totalWidth);
        }
        else
        {
            $('.sectionTwo').css('width', 100 + '%');
            $('.sectionOne, .sectionThree, .sectionFour').css('width', 100 + '%');
            $('.sectionWrapper').css('width', 100 + '%');
        }
    };

    var SectionHeight = function() {
        var SectionTop = $('.TopSection')
          , WinHeight = $(window).outerHeight()
          , Section = $('.sectionOne');

        $(window).outerWidth() >= 767
            ? SectionTop.css('height', WinHeight)
            : SectionTop.css('height', 'auto');
    };

    var MobileSlider = function() {
        if($(window).outerWidth() <= 1023)
        {
            if(!$('.cocktailBox').hasClass('slick-slider'))
            {
                $('.cocktailBox.mobile').slick({
                    speed: 500,
                    infinite: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true,
                    dots: true,
                    dotsClass: 'main-dots',
                    responsive:[
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1
                            }
                        }
                    ]
                });
            }
        }
        else
        {
            if($('.cocktailBox').hasClass('slick-slider')) {
                $('.cocktailBox.mobile').slick('unslick');
            }
        }
    };

    var historyPush = function (state) {
      window.history.pushState(
        state,
        state.title,
        state.href
      );
    };

    var MainMenuNavigation = function(caller) {
        $('.nav-trigger, A[rel="navigate"]').off('click');

        if($(window).outerWidth() > 1023)
        {
            if ($('#container').length > 0)
            {
                var animationSpeed = 750
                  , section1 = $('#dobro-pozhalovat').offset().left
                  , section2 = $('#vremya-vypit').offset().left
                  , section3 = $('#kak-eto-rabotaet').offset().left
                  , section4 = $('#skachat-prilozhenie').offset().left
                  , urlPath = window.location.pathname.split('/')[1].slice(0, -5);

                switch(urlPath) {
                    case 'dobro-pozhalovat':
                        $('#container').stop().animate({ scrollLeft: section1 }, 1500);
                        $('.mainMenu a[data-section="' + urlPath + '"]').addClass('selected');
                    break;

                    case 'vremya-vypit':
                        $('#container').stop().animate({ scrollLeft: section2 }, 1500);
                        $('.mainMenu a[data-section="' + urlPath + '"]').addClass('selected');
                    break;

                    case 'kak-eto-rabotaet':
                        $('#container').stop().animate({ scrollLeft: section3 }, 1500);
                        $('.mainMenu a[data-section="' + urlPath + '"]').addClass('selected');
                    break;

                    case 'skachat-prilozhenie':
                        $('#container').stop().animate({ scrollLeft: section4 }, 1500);
                        $('.mainMenu a[data-section="' + urlPath + '"]').addClass('selected');
                    break;

                    default:
                        $('.mainMenu a[data-section="dobro-pozhalovat"]').addClass('selected');
                    break;
                }

                // Navigate slide on menu item click
                $('A[rel="navigate"]').on('click', function(e) {
                    e.preventDefault();

                    historyPush({
                        title: $(this).text(),
                        href: $(this).attr('href')
                    });
                    $('.mainMenu a').removeClass('selected');
                    $(this).addClass('selected');
                    window.swiper.slideTo($(this).parent().index(), animationSpeed, true);
                });

                if (window.swiper) {
                    return ;
                }

                var WOWInit = function(slideIndex) {
                    switch (slideIndex) {
                        case 0:
                            if ($('.cocktailBox.desktop').find('.wow-0').length === 0) {
                                $('.cocktailBox.desktop').find('.item-0').addClass('wow-0');
                                $('#dobro-pozhalovat .BoxWrapper .drinkTime').addClass('wow-0');
                                new WOW({ boxClass: 'wow-0' }).init();
                            }
                        break;

                        case 1:
                            if ($('.cocktailBox.desktop').find('.wow-1').length === 0) {
                                $('.cocktailBox.desktop').find('.item-1, .item-2, .item-3, .item-4, .item-5, .item-6').addClass('wow-1');
                                $('.timeToDrink').addClass('wow-1');
                                new WOW({ boxClass: 'wow-1' }).init();
                            }
                        break;

                        case 2:
                            if ($('.cocktailBox.desktop').find('.wow-2').length === 0) {
                                $('.cocktailBox.desktop').find('.item-7').addClass('wow-2');
                                $('.WorkingWrap li, .howItWorks').addClass('wow-2');
                                new WOW({ boxClass: 'wow-2' }).init();
                            }
                        break;

                        case 3:
                            if ($('#skachat-prilozhenie .container.wow-3').length === 0) {
                                $('#skachat-prilozhenie').find('.container, .hand').addClass('wow-3');
                                new WOW({ boxClass: 'wow-3' }).init();
                            }
                        break;
                    }
                };

                window.swiper = new Swiper('.swiper-container', {
                    direction: 'horizontal',
                    slidesPerView: 1,
                    paginationClickable: true,
                    spaceBetween: 30,
                    mousewheelControl: true,
                    speed: animationSpeed,
                    initialSlide: $('.mainMenu A.selected').parent().index(),
                    mousewheelSensitivity: 0.1,
//                    mousewheelForceToAxis: true,

                    onInit: function(swiper) {
                        swiper.activeIndex === 0 && WOWInit(0);
                    },
                    onSlideChangeStart: function(swiper) {
                        $('.mainMenu A').removeClass('selected');
                        var $activeItem = $('.mainMenu UL LI:eq(' + swiper.activeIndex + ') A');
                        $activeItem.addClass('selected');

                        // Navigate browser URL to slide
                        historyPush({
                            title: $activeItem.text(),
                            href: $activeItem.attr('href')
                        });
                        $('.bgs > .bg').each(function() {
                            if ([swiper.previousIndex, swiper.activeIndex].indexOf($(this).index()) === -1) {
                                $(this).css('opacity', '0');
                            }
                            else if ($(this).index() === swiper.activeIndex && swiper.activeIndex > swiper.previousIndex) {
                                $(this).css('opacity', '0').animate({ opacity: 1.0 }, animationSpeed);
                            }
                            else if ($(this).index() === swiper.activeIndex && swiper.activeIndex < swiper.previousIndex) {
                                $(this).css('opacity', '1');
                                $('.bgs > .bg:eq(' + swiper.previousIndex + ')').animate({ opacity: 0.0 }, animationSpeed);
                            }
                        });
                        WOWInit(swiper.activeIndex);
                    }
                });
            }
        }
        else
        {
            // Delete old swipwer instanse
            window.swiper && window.swiper.destroy(true, true);
            window.swiper = null;

            if ($('#container').length > 0)
            {
                $('A[rel="navigate"]').on('click', function (e) {
                    e.preventDefault();

                    historyPush({
                        title: $(this).text(),
                        href: $(this).attr('href')
                    });
                    $('.mainMenu a').removeClass('selected');
                    $(this).addClass('selected');
                    var id  = $(this).data('section')
                      , top = $('#' + id).offset().top;
                    $('body, html').removeClass('show-nav').animate({ scrollTop: top }, 1000);
                });

                // Scroll to section on page loaded
                var $activeMenu = $('A[rel="navigate"][href="' + location.pathname + '"]');

                if (caller !== 'resize')
                {
                    $activeMenu.trigger('click');
                }
                /*else if ($activeMenu.length > 0)
                {
                    $('body, html').animate({
                        scrollTop: $('#' + $activeMenu.data('section')).offset().top
                    }, 0);
                }*/
            }
        }

        $('.nav-trigger').on('click', function() {
            $('body').toggleClass('show-nav');
            $('.mainMenu').css('display', 'block');
        });
    };

    $('.close').on('click', function() {
        $.fancybox.close();
    });

    // Animate to add restaurant form
    $(".AnchorButton").on("click", function(e) {
        var id  = $(this).attr('href')
          , top = $(id).offset().top;

        e.preventDefault();
        $('body,html').animate({ scrollTop: top }, 1500);
    });

    /*add restaurant page*/
    $('.TopSlider')
        .on('init', function() {
            $(this).find('.text-wrap').removeClass('hidden');
        })
        .slick({
            speed: 500,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            autoplaySpeed: 4000,
            dots: false,
            prevArrow: '<div class="custom-arrow custom-arrow-prev"><i class="ico ico-arrow"></i></div>',
            nextArrow: '<div class="custom-arrow custom-arrow-next"><i class="ico ico-arrow"></i></div>'
        });

    $('.AdvantagesBox .item').matchHeight();

    /*end add restaurant page*/
    $(window).resize(function() {
        SectionHeight();
        WidthCocktailSection();
        MobileSlider();
        SectionsHeight();
        MainMenuNavigation('resize');
    })
    .trigger('resize');

    // Telephone input pattern
    $('input[name="phone"]').mask("(000) 000-0000");

    // Form submit handling
    $('#addRestaurantForm').on('submit', function(e) {
        var $agreement = $(this).find('#agreement');
        e.preventDefault();

        if (!$agreement.is(':checked')) {
            $agreement.removeClass('bounce').addClass('bounceIn');
            new WOW({ boxClass: 'wow-add-restaurant' }).init();
            return ;
        }

        $(this).find('[type="submit"]').attr('disabled', 'disabled');

        $.post('/ajax/add-restaurant.php', $(this).serialize(), function(response) {

            $(this).find('input, textarea').removeClass('invalid');
            $(this).find('[type="submit"]').removeAttr('disabled');

            if (response.valid && response.emailSent) {
                $(this).get(0).reset();

                // If user email sent - show message to the user
                $.fancybox.open({
                    href: '#thanks-2',
                    closeBtn: false,
                    padding: 0
                });
            }
            else
            {
                for (var i = 0; i < response.errors.length; i++) {
                    var $input = $(this).find('*[name="' + response.errors[i] + '"]');
                    $input.addClass('invalid');
                    if (i === 0) {
                        // Scroll to first errored field (if it behind the screen)
                        if ($input.offset().top - $('body').scrollTop() < 80) {
                            $('body, html').animate({ scrollTop: $input.offset().top - 80 }, 500);
                        }
                        // Set cursor to the field
                        $input.focus();
                    }
                }
            }
        }.bind(this));
    });

    $('#subscribtionForm').on('submit', function(e) {
        e.preventDefault();

        var $email = $(this).find('[name="email"]')
          , $agreement = $(this).find('#agreement');

        $email.removeClass('invalid');

        if (!$email.val().trim()) {
            $email.addClass('invalid').focus();
            return ;
        }

        if (!$agreement.is(':checked')) {
            $agreement.removeClass('bounce').addClass('bounceIn');
            new WOW({ boxClass: 'wow-subscribe' }).init();
            return ;
        }

        $(this).find('[type="submit"]').attr('disabled', 'disabled');

        $.post('/ajax/subscribe.php', { email: $email.val() }, function(response) {
            $(this).find('[type="submit"]').removeAttr('disabled');
            if (response.valid) {
                // If user email sent - show message to the user
                if(response.emailSent) {
                   $(this).get(0).reset();
                   $.fancybox.close();
                   $.fancybox.open({
                       href: '#thanks-1',
                       closeBtn: false,
                       padding: 0
                   });
                }
            }
            else {
                for (var i = 0; i < response.errors.length; i++) {
                    var $input = $(this).find('*[name="' + response.errors[i] + '"]');
                    $input.addClass('invalid').focus();
                }
            }
        }.bind(this));
    });

    $('#agreement-label').on('click', function() {
        $('.fancybox-inner').css('height', 'auto');
        $('#agreement-text').slideToggle(300, function() {
            $.fancybox.update();
        });
    });

    $('#agreement-text .scrollContainer').scrollbar({
        disableBodyScroll: true
    });

    new WOW({ boxClass: 'wow' }).init();
    new WOW({ boxClass: 'wow-mobile' }).init();
});
