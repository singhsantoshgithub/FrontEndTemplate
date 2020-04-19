// An object literal
var app = {
    init: function () {
        app.functionOne();
    },
    functionOne: function () {}
};

$("document").ready(function () {

    app.init();

    $('.nav-logo').on('click', function (e) {
        if ($('.nav-logo').hasClass("change")) {
            $(".nav-logo").removeClass("change");
            $("body").removeClass("no-scroll");
            $("#myNav").fadeOut(100);
        } else {
            $(".nav-logo").addClass("change");
            $("body").addClass("no-scroll");
            $("#myNav").fadeIn(100);
        }
        e.preventDefault();
    });


});


$(window).on('load', function () {

    $('#myNav').find('a').removeClass('active');
    $('#myNav').find('.' + menu_item ).addClass('active');

    //$('#loader_spinner_2').fadeIn( 1000 );

    setTimeout(function(){
        $('.loader_overlay').fadeOut(500);
    }, 500);

    $('#homepageslider').carousel({
        interval : 30000,
        keyboard : false,
        pause : false,
        ride : 'carousel'
    });

    const player = new Plyr('#player', {
        controls: [
            'play-large', 
            'play', 
            'progress', 
            'current-time', 
            'mute', 
            'volume', 
            'captions', 
            'settings', 
            'pip', 
            'airplay', 
            'fullscreen'
        ]
    });

    $('.gallery-images').slick({
        accessibility: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        variableWidth: true,
        prevArrow : '<div class="prev-arrow-bg"><div class="prev-arrow"></div></div>',
        nextArrow : '<div class="next-arrow-bg"><div class="next-arrow"></div></div>',
        responsive: [
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1
              }
            }
        ]
    });

    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        arrows: true,
        prevArrow : '<div class="prev-arrow"></div>',
        nextArrow : '<div class="next-arrow"></div>',
        fade: true,
        asNavFor: '.slider-nav',
        infinite: false
    });

    $('.slider-nav').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: true,
        centerMode: true,
        focusOnSelect: true,
        infinite: false,
        variableWidth: true,

        responsive: [
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                dots: false,
                arrows: false,
                infinite: true,
                variableWidth: true,
              }
            }
        ]
    });

    // slider code
    $('.press-inernal-slider').slick({
        arrows: true
    });

    $('.project-inernal-slider').slick({
        arrows: true
    });

    $(".gallery-images").lightGallery({
        counter: false,
        selector : '.unit-image',
        download : false
    }); 

    $(".scroll-to-top").on('click', function() {
        $("html, body").animate({ 
            scrollTop: 0 
        }, "slow");
        return false;
    });

});
