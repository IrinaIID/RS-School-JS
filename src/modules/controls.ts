import { Server } from "./car-server";
import { BtnControls } from "./create-car";
import { createCarSvg } from "./create-car-svg";
import { DataCar } from "./interfaces";
import { renderCarsFirstLoad } from "./render-cars";

const server = new Server;
const btnControls = new BtnControls;

const btnCreateCar = <HTMLButtonElement>document.querySelector('.btn-controls-create');
btnCreateCar.addEventListener('click', () => {
  const inputCreateName = <HTMLInputElement>document.querySelector('.input-name-auto-create');
  const inputCreateColor = <HTMLInputElement>document.querySelector('.input-color-create');
  if (inputCreateName.value === '') { return }
  btnControls.createCar().then((data) => {
    server.addCar(data);
    const gameBoard = <HTMLElement>document.querySelector('.main-block-game-board');
    gameBoard.innerHTML = '';
    renderCarsFirstLoad();
  }).then (() => {
  inputCreateName.value = '';
  inputCreateColor.value = "#f6b73c";
  btnControls.showCoutCars();
  })
});


document.addEventListener('click', (event: Event) => {
  const elem = <Element>event.target;
  if (elem.classList.contains('btn-game-remove')) {
    const id = +elem.getAttribute('id');
    server.removeCar(id);
    const trackLine = <HTMLElement>document.querySelector(`.block-race-trak-${id}`);
    trackLine.style.display = 'none';
  }
  btnControls.showCoutCars();
});


const inputName = <HTMLInputElement>document.querySelector('.input-name-auto-update');
const inputColor = <HTMLInputElement>document.querySelector('.input-color-update');

const btnUpdate = <HTMLButtonElement>document.querySelector('.btn-controls-update');
let id: number;

window.addEventListener('click', (event: Event) => {
  const elem = <Element>event.target;
  if (elem.classList.contains('btn-game-select')) {
    id = +elem.getAttribute('id');
    server.getCar(id).then((data) => {
      inputName.value = data.name;
      inputColor.value = data.color;
    });
  }
  btnControls.showCoutCars();
});

btnUpdate.addEventListener('click', () => {
  if (inputName.value !== '') {
    const car: DataCar = {
      name: inputName.value,
      color: inputColor.value,
      id: id
    }
    server.updateCar(id, car);
    const nameCar = <HTMLElement>document.querySelector(`.p-game-car-name-${car.id}`);
    nameCar.textContent = car.name;
    const carSvg = createCarSvg(car.color);
    const divSvg = <HTMLElement>document.querySelector(`.div-svg-${car.id}`);
    divSvg.innerHTML = carSvg;
    inputName.value = '';
  inputColor.value = '#f6b73c';
  }
  btnControls.showCoutCars();
});

const btnGenerateCars = <HTMLButtonElement>document.querySelector('.btn-controls-generate-cars');
btnGenerateCars.addEventListener('click', () => {
  for (let i = 0; i < 100; i++) {
    async function fff() {
      const carsCreated = await btnControls.createCar();
      server.addCar(carsCreated);
    }

    fff()
  }
    const gameBoard = <HTMLElement>document.querySelector('.main-block-game-board');
    gameBoard.innerHTML = '';
    renderCarsFirstLoad();
    btnControls.showCoutCars();
})