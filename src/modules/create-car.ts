import { Server } from "./car-server";

const server = new Server;

export class BtnControls {

  inputCreateName: HTMLInputElement;
  inputCreateColor: HTMLInputElement;

  constructor() {
    this.inputCreateName = <HTMLInputElement>document.querySelector('.input-name-auto-create');
    this.inputCreateColor = <HTMLInputElement>document.querySelector('.input-color-create');
  }

  async createCar() {

    const arrCars = await server.getAllCars();
    const id = await arrCars[arrCars.length - 1].id;

    return {
      name: this.inputCreateName.value,
      color: this.inputCreateColor.value,
      id: id + 1
    }
  }

}

