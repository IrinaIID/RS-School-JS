import './sources.css';
import { Source } from '../../types';

class Sources {
    draw(data: Source[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            // sourceClone.querySelector('.source__item-name').textContent = item.name;
            const sourceName = sourceClone.querySelector('.source__item-name') as HTMLSpanElement;
            sourceName.textContent = item.name;

            // sourceClone.querySelector('.source__item').setAttribute('data-source-id', item.id);
            const sourceId = sourceClone.querySelector('.source__item') as HTMLElement;
            sourceId.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        // document.querySelector('.sources').append(fragment);
        const sourceSources = document.querySelector('.sources') as HTMLElement;
        sourceSources.append(fragment);
    }
}

export default Sources;
