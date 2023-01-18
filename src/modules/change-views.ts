const btnToGarage = <HTMLButtonElement>document.querySelector('.header-btn-garage');
const btnToWinners = <HTMLButtonElement>document.querySelector('.header-btn-winners');
const mainGarage = <HTMLElement>document.querySelector('.main-garage');
const mainWinners = <HTMLElement>document.querySelector('.main-winners');

btnToGarage.addEventListener('click', function() {
  btnToGarage.classList.add('header-btn-active');
  btnToWinners.classList.remove('header-btn-active');
  mainGarage.style.display = 'block';
  mainWinners.style.display = 'none';
});

btnToWinners.addEventListener('click', function() {
  btnToWinners.classList.add('header-btn-active');
  btnToGarage.classList.remove('header-btn-active');
  mainWinners.style.display = 'block';
  mainGarage.style.display = 'none';
});