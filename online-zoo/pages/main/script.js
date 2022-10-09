// Pop-up burger-menu

const btnBurger = document.querySelector('.burger-menu');
const burgerMenu = document.querySelector('.popup-menu-all');
const closeBurger = document.querySelector('.pop-close');
const menuWrap = document.querySelector('.pop-menu-wrap');

console.log(window.pageYOffset)
btnBurger.addEventListener('click', function() {
    menuWrap.style.marginTop = `${window.pageYOffset}px`
    burgerMenu.classList.add('on-popup-menu-all')
})

closeBurger.addEventListener('click', function() {
    burgerMenu.classList.remove('on-popup-menu-all')
})

window.addEventListener('click', function(event) {
    if (event.target == burgerMenu) {
        burgerMenu.classList.remove('on-popup-menu-all');
    }
});


// Slider Testimonials

const testimLine = document.querySelector('.testimonials-line');
const testimRange = document.querySelector('.progress-input');
const testimProgress = document.querySelector('.progress-bar')

testimProgress.addEventListener('click', function() {
    let currentTransform = testimRange.value * -293;
    testimLine.style.transform = `translateX(${currentTransform}px)`;
});


// Pop-up Testimonials

const popTestim = document.querySelector('.popup-testim-all');
const popTestimWrap = document.querySelector('.pop-testim-wrap')
const btnTestimClose = document.querySelector('.pop-testim-close');

const testimCard1 = document.querySelector('.testim-card-1');
const testimCard2 = document.querySelector('.testim-card-2');
const testimCard3 = document.querySelector('.testim-card-3');

const popTestimCard1 = document.querySelector('.pop-testim-card-1');
const popTestimCard2 = document.querySelector('.pop-testim-card-2');
const popTestimCard3 = document.querySelector('.pop-testim-card-3');

let marginForCard = testimCard1.getBoundingClientRect().top + window.pageYOffset;
popTestimWrap.style.marginTop = `${marginForCard}px`

testimCard1.addEventListener('click', function() {
    if(window.innerWidth <= 980) {
        popTestimCard1.classList.add('on-testim-card');
        popTestim.classList.add('on-popup-testim-all');
    }
});

testimCard2.addEventListener('click', function() {
    if(window.innerWidth <= 980) {
        popTestimCard2.classList.add('on-testim-card');
        popTestim.classList.add('on-popup-testim-all');
    }
});

testimCard3.addEventListener('click', function() {
    if(window.innerWidth <= 980) {
        popTestimCard3.classList.add('on-testim-card');
        popTestim.classList.add('on-popup-testim-all');
    }
});

btnTestimClose.addEventListener('click', function() {
        popTestim.classList.remove('on-popup-testim-all');
        popTestimCard1.classList.remove('on-testim-card');
        popTestimCard2.classList.remove('on-testim-card');
        popTestimCard3.classList.remove('on-testim-card');
});

window.addEventListener('click', function(event) {
    if (event.target == popTestim || event.target == popTestimWrap) {
        popTestim.classList.remove('on-popup-testim-all');
        popTestimCard1.classList.remove('on-testim-card');
        popTestimCard2.classList.remove('on-testim-card');
        popTestimCard3.classList.remove('on-testim-card');

    }
});


// Slider Pets

const line1 = document.querySelector('.line-1');
const firstLine1 = document.querySelector('.pets-line-slider-first-1');
const secondLine1 = document.querySelector('.pets-line-slider-first-2');

const line2 = document.querySelector('.line-2');
const firstLine2 = document.querySelector('.pets-line-slider-second-1');
const secondLine2 = document.querySelector('.pets-line-slider-second-2');


const btnNext = document.querySelector('.arrow-next');
const btnPrev = document.querySelector('.arrow-prev');

const cardsLine11 = Array.from(firstLine1.children);
const cardsLine12 = Array.from(secondLine1.children);

const cardsLine21 = Array.from(firstLine2.children);
const cardsLine22 = Array.from(secondLine2.children);

secondLine1.classList.add('no-display')
secondLine2.classList.add('no-display')


function random() {
    return Math.trunc(Math.random() * 100);
}

function changeOrder(card) {
    card.style.order = `${random()}`
}


function shuffleCards() {
    cardsLine11.forEach(elem => {
        changeOrder(elem)
    });
    cardsLine12.forEach(elem => {
        changeOrder(elem)
    });
    cardsLine21.forEach(elem => {
        changeOrder(elem)
    });
    cardsLine22.forEach(elem => {
        changeOrder(elem)
    });
}

function changeSlides() {
    shuffleCards();
    firstLine1.classList.toggle('no-display')
    firstLine2.classList.toggle('no-display')

    secondLine1.classList.toggle('no-display')
    secondLine2.classList.toggle('no-display')
}

btnNext.addEventListener('click', changeSlides);
btnPrev.addEventListener('click', changeSlides);