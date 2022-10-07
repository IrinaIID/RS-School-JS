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


testimRange.addEventListener('click', function() {
    console.log(testimRange.value)
    let currentTransform = testimRange.value * -293;
    testimLine.style.transform = `translateX(${currentTransform}px)`;
});


// Pop-up Testimonials