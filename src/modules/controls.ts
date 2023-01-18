import { Server } from "./car-server";
import { BtnControls } from "./create-car";

const server = new Server;
const btnControls = new BtnControls;

const btnCreateCar = <HTMLButtonElement>document.querySelector('.btn-controls-create');
btnCreateCar.addEventListener('click', () => {
  btnControls.createCar().then((data) => {
    server.addCar(data);
  });
  const inputCreateName = <HTMLInputElement>document.querySelector('.input-name-auto-create');
  inputCreateName.value = '';
  const inputCreateColor = <HTMLInputElement>document.querySelector('.input-color-create');
  inputCreateColor.value = "#f6b73c";
});
