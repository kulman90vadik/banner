// let timer;
// let left = 0;
// slider();

// function slider(){
//     timer = setTimeout(function(){
//         let track = document.querySelector('.banner-slider__row');
//         left = left - 374;
//         if(left > 1122) {
//             left = 0;
//             clearTimeout(timer);
//         }
//         track.style.marginLeft = -374 + 'px';
//         slider();
//     }, 2000)
// }



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


