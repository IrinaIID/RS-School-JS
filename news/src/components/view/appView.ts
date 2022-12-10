import News from './news/news';
import Sources from './sources/sources';
import { ResponseArticles, ResponseSources } from '../types';

export class AppView {
    news;
    sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: ResponseArticles) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: ResponseSources) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
