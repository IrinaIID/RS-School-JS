import { Server } from './car-server';
import { CAR_BRANDS_MODELS } from '../data/models';

const server = new Server;

function getRandomNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomColor() {
  const r = Math.floor(Math.random() * (256));
  const g = Math.floor(Math.random() * (256));
  const b = Math.floor(Math.random() * (256));
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
}


export class BtnControls {

  inputCreateName: HTMLInputElement;
  inputCreateColor: HTMLInputElement;
  idForCar: number

  constructor() {
    this.inputCreateName = <HTMLInputElement>document.querySelector('.input-name-auto-create');
    this.inputCreateColor = <HTMLInputElement>document.querySelector('.input-color-create');
    this.idForCar = 0;
  }

  async createCar() {

    if (this.idForCar === 0) {
      const arrCars = await server.getAllCars();
      if (arrCars.length > 0) {
        this.idForCar = await arrCars[arrCars.length - 1].id;
      } else {
        this.idForCar = 0;
      }
    }

    this.idForCar = this.idForCar + 1;

    return {
      name: this.inputCreateName.value,
      color: this.inputCreateColor.value,
      id: this.idForCar
    }
  }

  async showCoutCars() {
    const arrCars = await server.getAllCars();
    const pCount = <HTMLElement>document.querySelector('.span-info-count-cars');
    pCount.textContent = arrCars.length.toString();
  }

  async generateCars() {
    if (this.idForCar === 0) {
      const arrCars = await server.getAllCars();
      if (arrCars.length > 0) {
        this.idForCar = await arrCars[arrCars.length - 1].id;
      } else {
        this.idForCar = 0;
      }
    }

    this.idForCar = this.idForCar + 1;
    let numBrand = getRandomNum(0, CAR_BRANDS_MODELS.length - 1);
    let numModel = getRandomNum(0, CAR_BRANDS_MODELS[numBrand].models.length - 1);

    return {
      name: `${CAR_BRANDS_MODELS[numBrand].brand} ${CAR_BRANDS_MODELS[numBrand].models[numModel]}`,
      color: getRandomColor(),
      id: this.idForCar
    }
  }

}