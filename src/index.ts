import './index.css'
const carSvg = require('svg-inline-loader?classPrefix!./assets/car.svg');
console.log(carSvg)


console.log('Hello World!');

function crateCarSvg() {
  const svgElem = document.createElementNS('http://www.w3.org/1999/xhtml', 'svg');
  const useElem = document.createElementNS('http://www.w3.org/1999/xhtml', 'use');
  useElem.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `${carSvg}`);
  svgElem.appendChild(useElem);
  console.log('gsg')
}

crateCarSvg()