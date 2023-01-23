import { Server } from "./car-server";
import { createCarSvg } from "./create-car-svg";
import { DataCar } from "./interfaces";

const server = new Server;

export function createElement(
  parent: HTMLElement | Element,
  tag: string,
  className?: string,
  content?: string | number | HTMLElement
) {
  const element = document.createElement(tag);
  if (className) { element.className = className }
  if (content) { element.textContent = content.toString() }
  parent.append(element);
  return element
}

export function drawCar(car: DataCar) {

  const gameBoard = <HTMLElement>document.querySelector('.main-block-game-board')

  const raceTrak = createElement(gameBoard, 'div', `block-race-trak block-race-trak-${car.id}`);
  raceTrak.setAttribute('id', car.id.toString());

  const carControls = createElement(raceTrak, 'div', 'game-car-controls');
  const btnSelect = createElement(carControls, 'button', 'btn-game btn-game-select', 'SELECT');
  btnSelect.setAttribute('id', car.id.toString());
  const btnRemove = createElement(carControls, 'button', 'btn-game btn-game-remove', 'REMOVE');
  btnRemove.setAttribute('id', car.id.toString());
  createElement(carControls, 'p', `p-game-car-name p-game-car-name-${car.id}`, car.name);

  const trakLine = createElement(raceTrak, 'div', 'track-line');
  const carOnTrak = createElement(trakLine, 'div', 'block-car-on-trak');
  const btnA = createElement(carOnTrak, 'button', 'btn-car btn-car-active btn-car-a', 'A');
  btnA.setAttribute('id', car.id.toString());
  const btnB = createElement(carOnTrak, 'button', 'btn-car btn-car-b', 'B');
  btnB.setAttribute('id', car.id.toString());

  const divSvg = createElement(carOnTrak, 'div', `car-svg div-svg-${car.id}`);
  const carSvg = createCarSvg(car.color);
  divSvg.innerHTML = carSvg;

  const imgFlag = createElement(trakLine, 'img', 'img-flag');
  imgFlag.setAttribute('src', './assets/flag.png');

}

export async function renderCarsFirstLoad() {

  const allCarsServer = await server.getAllCars();
  allCarsServer.forEach((car: DataCar) => {
    drawCar(car);
  });

}

export async function updateDrawCar(id: number) {
  server.getCar(id).then((data) => {
    const pNameCar = <HTMLElement>document.querySelector(`p-game-car-name-${id}`);
    pNameCar.innerHTML = data.name;
    const divSvg = <HTMLDivElement>document.querySelector(`.car-svg div-svg-${id}`);
    divSvg.innerHTML = createCarSvg(data.color);
  })
}