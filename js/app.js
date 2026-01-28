$(document).ready(function(){
    //HERO SLIDER
    $('#hero-slider').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    items: 1,
    dots: false,
    smartSpeed: 1000,
    navText: ['<<', '>>'],
    responsive:{
        0:{
            nav: false,
        },
        768:{
            nav: true,
        },
        1000:{
            
        }
    }
})
});

