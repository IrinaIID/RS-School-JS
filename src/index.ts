import './index.css';
import './modules/change-views';
import './modules/create-car';
import './modules/controls';
// import { Server } from './modules/car-server';
// import { DataCar } from './modules/interfaces'
// import { createCarSvg } from './modules/create-car-svg';
import { renderCarsFirstLoad } from './modules/render-cars';
import { BtnControls } from './modules/create-car';

// const server = new Server;
// const btnControls = new BtnControls;

// const carSvg = require('svg-inline-loader?classPrefix!./assets/car.svg');
const btnControls = new BtnControls;

renderCarsFirstLoad();
btnControls.showCoutCars();


// const btnCreateCar = <HTMLButtonElement>document.querySelector('.btn-controls-create');



console.log('Hello World!');


