console.log('Hello world')

// Pop-up burger-menu

const btnBurger = document.querySelector('.burger-menu');
const burgerMenu = document.querySelector('.popup-menu-all');
const closeBurger = document.querySelector('.pop-close')

btnBurger.addEventListener('click', function() {
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
    console.log(testimRange.value)
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

// function openPopTestim(card) {
//     if ( window.innerWidth <= 980 ) {
//         card.classList.add('on-testim-card');
//         popTestim.classList.add('on-popup-testim-all');
//     }
// }

// testimCard1.addEventListener('click', openPopTestim(popTestimCard1));
// testimCard2.addEventListener('click', openPopTestim(popTestimCard2));
// testimCard3.addEventListener('click', openPopTestim(popTestimCard3));


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


