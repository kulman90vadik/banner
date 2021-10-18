

let buttons = document.querySelectorAll('.banner-card');
let continueLink = document.querySelector('.banner-bottom__link');

for(let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function(){
        for(let k = 0; k < buttons.length; k++) {
            buttons[k].classList.remove('banner-card--active');
        }
        buttons[i].classList.add('banner-card--active');
    });
    
}

continueLink.addEventListener('click', function(){
    for(let i = 0; i < buttons.length; i++) {
        if(buttons[i].classList.contains('banner-card--active')) {
            let data = buttons[i].getAttribute('data-href');
            continueLink.setAttribute('href', data);
            break;
        }
    }
});


$('.banner-slider__row').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '19px',
    autoplay: true,
    autoplaySpeed: 5000,
    rows: 0,
    arrows: false,
    pauseOnHover: true
});
