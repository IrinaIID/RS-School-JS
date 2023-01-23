import './index.css';
import './modules/change-views';
import './modules/create-car';
import './modules/controls';
import { renderCarsFirstLoad } from './modules/render-cars';
import { BtnControls } from './modules/create-car';

const btnControls = new BtnControls;

renderCarsFirstLoad();
btnControls.showCoutCars();