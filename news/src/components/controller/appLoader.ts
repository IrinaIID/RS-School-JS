import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '9b78ecd2d9634e92baeb230e6f7f04aa', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
