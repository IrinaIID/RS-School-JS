import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    controller;
    view;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sources = document.querySelector('.sources') as HTMLElement | null;
        if ( sources !== null ) {
          sources.addEventListener('click', (e) => this.controller.getNews(e, (data) => {
            if ( data !== undefined ) this.view.drawNews(data);
          }));
          this.controller.getSources((data) => {
            if ( data !== undefined )this.view.drawSources(data);
          });
        }
    }
}

export default App;
