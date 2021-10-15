

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


class Slider {
    constructor(selector = '.banner', timeout = 5000) {
        const container = document.querySelector(selector);

        if (!container) return;

        this._els = {
            container,
            slides: Array.from(container.querySelectorAll('.banner-slider__item')),
            row: container.querySelector('.banner-slider__row'),
        }

        this._drag = {
            isDragging: false,
            scroll: 0,
            x: 0,
        };

        this._currentSlide = 0;

        this._userIdle = true;

        this._timeout = timeout;

        this._timer = 0;

        this._els.row.addEventListener('mouseenter', () => {
            this._userIdle = false;
        });

        this._els.row.addEventListener('mouseleave', () => {
            this._userIdle = true;
            this._drag.isDragging = false;
            this._defineActiveSlide();
        });

        this._els.row.addEventListener('mouseup', this._onUpHandler.bind(this));
        this._els.row.addEventListener('touchend', this._onUpHandler.bind(this));

        this._els.row.addEventListener('touchstart', this._onDownHandler.bind(this));
        this._els.row.addEventListener('mousedown', this._onDownHandler.bind(this));

        this._els.row.addEventListener('mousemove', this._onMoveHandler.bind(this));
        this._els.row.addEventListener('touchmove', this._onMoveHandler.bind(this));

        this._resetTimeout();
    }

    scrollToSlide(n) {
        const slide = this._els.slides[n % this._els.slides.length];
        const offset = slide.offsetLeft - ((this._els.container.offsetWidth - slide.offsetWidth) >> 1);
        this._els.row.scrollTo({left: offset, behavior: 'smooth'});
        this._currentSlide = n;
    }

    _onMoveHandler(e) {
        if (!this._drag.isDragging) return;
        e.preventDefault();

        const x = (e.pageX || e.changedTouches[0].pageX) - this._els.row.offsetLeft;
        const delta = x - this._drag.x;
        this._els.row.scrollLeft = this._drag.scroll - delta;
    }

    _onDownHandler(e) {
        e.preventDefault();

        this._drag.isDragging = true;
        this._userIdle = false;

        this._drag.scroll = this._els.row.scrollLeft;
        this._drag.x = (e.pageX || e.changedTouches[0].pageX) - this._els.row.offsetLeft;
    }

    _onUpHandler(e) {
        if (e.type === 'touchend') {
            this._userIdle = true;
        }

        this._drag.isDragging = false;
        this._defineActiveSlide()
        this._resetTimeout();
    }

    _resetTimeout() {
        this._timer && clearTimeout(this._timer);
        this._timer = setTimeout(() => {
            if (this._userIdle) {
                this.scrollToSlide(this._currentSlide + 1);
            }

            this._resetTimeout();
        }, this._timeout)
    }

    _defineActiveSlide() {
        for (let i = 0; i < this._els.slides.length; i++) {
            const slideOffset = this._els.slides[i].offsetLeft + (this._els.slides[i].offsetWidth >> 1);
            const pos = this._els.row.scrollLeft - slideOffset;
            if (pos <= 0) {
                this.scrollToSlide(i);
                break;
            }
        }
    }
}

new Slider('.banner', 5000);