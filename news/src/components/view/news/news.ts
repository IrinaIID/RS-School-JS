import './news.css';
import { Article } from '../../types';

class News {
    draw(data: Article[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        console.log(data);

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

            // if (idx % 2) newsClone.querySelector('.news__item').classList.add('alt');
            if (idx % 2) {
                const newsItem = newsClone.querySelector('.news__item') as HTMLDivElement | null;
                newsItem?.classList.add('alt');
            }

            // newsClone.querySelector('.news__meta-photo').style.backgroundImage = `url(${
            //     item.urlToImage || 'img/news_placeholder.jpg'
            // })`;
            const newsPhoto = newsClone.querySelector('.news__meta-photo') as HTMLDivElement | null;
            if (newsPhoto !== null) {
                newsPhoto!.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            // newsClone.querySelector('.news__meta-author').textContent = item.author || item.source.name;
            const newsAuthor = newsClone.querySelector('.news__meta-author') as HTMLElement | null;
            if (newsAuthor !== null) {
                newsAuthor!.textContent = item.author || item.source.name;
            }
            // newsClone.querySelector('.news__meta-date').textContent = item.publishedAt
            //     .slice(0, 10)
            //     .split('-')
            //     .reverse()
            //     .join('-');
            const newsDate = newsClone.querySelector('.news__meta-date') as HTMLElement | null;
            if (newsDate !== null) {
                newsDate!.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            // newsClone.querySelector('.news__description-title').textContent = item.title;
            const newsTitle = newsClone.querySelector('.news__description-title') as HTMLElement | null;
            if (newsTitle !== null) {
                newsTitle.textContent = item.title;
            }
            // newsClone.querySelector('.news__description-source').textContent = item.source.name;
            const newsSource = newsClone.querySelector('.news__description-source') as HTMLElement | null;
            if (newsSource !== null) {
                newsSource.textContent = item.source.name;
            }
            // newsClone.querySelector('.news__description-content').textContent = item.description;
            const newsContent = newsClone.querySelector('.news__description-content') as HTMLElement | null;
            if (newsContent !== null) {
                newsContent.textContent = item.description;
            }
            // newsClone.querySelector('.news__read-more a').setAttribute('href', item.url);
            const newsMore = newsClone.querySelector('.news__read-more a') as HTMLElement | null;
            if (newsMore !== null) {
                newsMore.setAttribute('href', item.url);
            }

            fragment.append(newsClone);
        });

        // document.querySelector('.news').innerHTML = '';
        // document.querySelector('.news').appendChild(fragment);
        const newsNews = document.querySelector('.news') as HTMLElement | null;
        if (newsNews !== null) {
            newsNews.innerHTML = '';
            newsNews.appendChild(fragment);
        }
    }
}

export default News;
