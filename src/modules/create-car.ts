import { Server } from "./car-server";

const server = new Server;

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

  // async generateCars() {
  //   const arrCars = await server.getAllCars();

  // }

}

