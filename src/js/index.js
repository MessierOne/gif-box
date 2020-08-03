import "../css/index.css";

class GifBox extends HTMLElement {
    constructor(word, size, shuffle) {
        super();
        this._wordAttr = word || null;
        this._sizeAttr = size || null;
        this._shuffleAttr = shuffle === "" ? true : false;
        this.queue = [];
    }

    static get observedAttributes() {
        return ['keyword', 'size', 'shuffle'];
    }

    get keyword() {
        return this._wordAttr;
    }

    get size() {
        return this._sizeAttr;
    }

    get shuffle() {
        return this._shuffleAttr;
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        const attributeName = (attrName === 'size') ? '_sizeAttr' : (attrName === 'keyword') ? '_wordAttr' : '_shuffleAttr';

        if (newValue !== oldValue) {
            this[attributeName] = newValue || Boolean(!newValue.length);
        }

        this.composeElement();
    }

    async fetcher(url) {
        const request = await fetch(url);
        return await request.json();
    }

    async getSynonym(keyword) {
        const url = `https://api.datamuse.com/words?ml=${keyword}`;

        try {
            const response = await this.fetcher(url);

            const synonymList = [{word: keyword}, ...response]?.slice(0, 10).map(({word}) => word);
            this.queue = synonymList;

            return this.queue[0];
        } catch (e) {
            console.log(`Could not retrieve a related word to ${keyword}: ${e}`);
            return keyword;
        }
    }

    getQueue() {
        this.queue.shift();
        return this.queue[0] || this.getSynonym(this._wordAttr);
    }

    async getGif(synonym) {
        if (this._wordAttr) {
            const apiKey = 'MwYVseqHsZL05C5EK1A0yV6kRcIuXS2b';
            const format = (data) => {
                const size = this._sizeAttr ? `_${this._sizeAttr}` : '';

                const {url, mp4, width, height} = data[0].images[`downsized${size}`];
                return {url, mp4, width, height};
            };

            try {
                const searchGif = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${synonym}&limit=1`;
                const {data} = await this.fetcher(searchGif);
                return format(data);
            } catch (e) {
                const searchGif = `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${this._wordAttr}&limit=1`;
                const {data} = await this.fetcher(searchGif);
                return format(data);
            }
        }
        return;
    }

    async composeElement() {
        if (this._wordAttr) {
            const word = this._wordAttr?.replace(" ", '+');
            try {
                const synonym = this.queue.length ? this.getQueue() : await this.getSynonym(word);
                const {url, mp4, width, height} = await this.getGif(synonym);

                const shuffleIcon = this._shuffleAttr ? `<button id="gif-box-shuffle-btn" class="ui-btn">Shuffle</button>` : '<div></div>';
                const component = url
                    ? `<img id="gif-box-img" src='${url}' alt='${word}' loading="lazy"/>`
                    : `<video id="gif-box-vid" controls><source src='${mp4}' type="video/mp4">Your browser does not support the video tag.</video>`;

                this.innerHTML = (`<div id="gif-box-div" class='gifbox' style='width:${width}px; height: ${height}px'>${shuffleIcon}${component}</div>`);
                const button = document.getElementById("gif-box-shuffle-btn");
                if (button && button.addEventListener && this._shuffleAttr) {
                    button.addEventListener('click', () => {
                        this.composeElement();
                    }, false);
                }
                return this.innerHTML;
            } catch (e) {
                console.log(e);
                return this.innerHTML = "<img src='https://media.giphy.com/media/KVVQ9vB3dSbZLYMf9n/giphy.gif' alt='no gif' loading='lazy'/>";
            }
        }
    }
}

export default customElements.define('gif-box', GifBox);

