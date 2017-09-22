jQuery(document).ready(function() {

    var SectionsHeight = function() {
        var Section = $('.sectionWrapper')
          , WinHeight = $(window).outerHeight();

        $(window).outerWidth() > 1023
            ? Section.css('height', WinHeight)
            : Section.css('height', 'auto');
    };

    var ShowPopup = function() {
        if($(window).outerWidth() <= 1023) {
            $(".fancybox").fancybox({
                padding: 0,
                margin: 15,
                closeBtn: false
            });
            $('.btn-close-popup').off('click').on('click', function() {
                $.fancybox.close();
            });
        }
        else
        {
            $('.coctailImg').off('click').on('click', function() {
                $(this).find('.popupWrap').toggleClass('show');
            });
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

    $('.close').on('click', function() {
        $.fancybox.close();
    });

    $(".fancyPopup").fancybox({
        padding: 0,
        margin: 15,
        closeBtn: false
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
        ShowPopup();
        SectionHeight();
        MobileSlider();
        SectionsHeight();
    })
    .trigger('resize');

    // Telephone input pattern
    $('input[name="phone"]').mask("(000) 000-0000");

    // Form submit handling
    $('#addRestaurantForm').on('submit', function(e) {
        e.preventDefault();
        $(this).find('[type="submit"]').attr('disabled', 'disabled');
        $.post('https://booze.com.ua/ajax/add-restaurant.php', $(this).serialize(), function(response) {

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
        }.bind(this)
      );
    });
    new WOW({ boxClass: 'wow' }).init();
    new WOW({ boxClass: 'wow-mobile' }).init();
});
