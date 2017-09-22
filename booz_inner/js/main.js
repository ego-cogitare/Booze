$(document).ready(function () {

    /*animation*/
    $('.anLeft').addClass('hidden').viewportChecker({
        classToAdd: 'visible animated fadeInLeftBig',
        offset: 100
    });
    $('.anRight').addClass('hidden').viewportChecker({
        classToAdd: 'visible animated fadeInRightBig',
        offset: 100
    });
    $('.anUp').addClass('hidden').viewportChecker({
        classToAdd: 'visible animated fadeInUp',
        offset: 100
    });
    /*end animation*/

    $('.cocktails-slider').slick({
        speed: 400,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    dots: true
                }
            },
            {
                breakpoint: 481,
                settings: {
                    slidesToShow: 1,
                    dots: true
                }
            }
        ]
    });
    $('.cocktails-slider-arrows .arrow-right').on('click', function () {
        $(this).parents('.cocktails-slider-wrapper').find('.cocktails-slider').slick('slickNext');
    });
    $('.cocktails-slider-arrows .arrow-left').on('click', function () {
        $(this).parents('.cocktails-slider-wrapper').find('.cocktails-slider').slick('slickPrev');
    });

    $('.gallery-slider').slick({
        speed: 400,
        variableWidth: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        responsive: [
            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 3,
                    variableWidth: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    variableWidth: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    variableWidth: false,
                    adaptiveHeight: true
                }
            }
        ]
    });
    $('.gallery-slider-arrows .arrow-right').on('click', function () {
        $(this).parents('.gallery-slider-wrapper').find('.gallery-slider').slick('slickNext');
    });
    $('.gallery-slider-arrows .arrow-left').on('click', function () {
        $(this).parents('.gallery-slider-wrapper').find('.gallery-slider').slick('slickPrev');
    });

    /*anchors link*/
    $(document).on("click", ".section-anchor", function (e) {
        e.preventDefault();
        var id = $(this).attr('href'),
            top = $(id).offset().top;
        console.log(top);
        $('body,html').animate({scrollTop: top}, 600);
    });


    /*clock function*/
    var secondHand = document.querySelector('.second');
    var minuteHand = document.querySelector('.minute');
    var hourHand = document.querySelector('.hour');

    function setDate() {
        const now = new Date();

        const seconds = now.getSeconds();
        // 90 is the offset we stated with
        const secondsDegree = ((seconds / 60) * 360) - 90;
        secondHand.style.transform = `rotate(${secondsDegree}deg)`;


        const minute = now.getMinutes();
        // 90 is the offset we stated with
        const minuteDegree = ((minute / 60) * 360) - 90;
        minuteHand.style.transform = `rotate(${minuteDegree}deg)`;


        const hour = now.getHours();
        // 90 is the offset we stated with
        const hourDegree = ((hour / 12) * 360) - 90;
        hourHand.style.transform = `rotate(${hourDegree}deg)`;
    }

    setDate();
    setInterval(setDate, 1000);
    /**/

});