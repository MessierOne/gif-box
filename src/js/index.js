import "../css/index.css";

class GifBox extends HTMLElement {
    constructor(word, size) {
        super();
        this._wordAttr = word || null;
        this._sizeAttr = size || null;
    }

    static get observedAttributes() {
        return ['keyword', 'size'];
    }

    get keyword() {
        return this._wordAttr;
    }

    set keyword(gif) {
        this.setAttribute('keyword', gif);
    }

    get size() {
        return this._sizeAttr;
    }

    set size(string) {
        this.setAttribute('size', string);
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        const attributeName = attrName === 'size' ? '_sizeAttr' : '_wordAttr';

        if (newValue !== oldValue) {
            this[attributeName] = newValue;
        }
        attrName === 'keyword' && this.composeElement();
    }

    async fetcher(url) {
        const request = await fetch(url);
        return await request.json();
    }

    async getSynonym(keyword) {
        const url = `https://api.datamuse.com/words?ml=${keyword}`;

        try {
            const response = await this.fetcher(url);

            const synonymList = response?.slice(0, 50).map(({word}) => word);
            const random = Math.floor(Math.random() * Math.floor(synonymList?.length - 1));

            return synonymList[random];
        } catch (e) {
            console.log(`Could not retrieve a related word to ${keyword}: ${e}`);
            return keyword;
        }
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
            const keyword = this._wordAttr?.replace(" ", '+');
            try {
                const synonym = await this.getSynonym(keyword);
                const {url, mp4, width, height} = await this.getGif(synonym);

                const component = url
                    ? `<img src='${url}' alt='${keyword}' loading="lazy"/>`
                    : `<video controls><source src='${mp4}' type="video/mp4">Your browser does not support the video tag.</video>`;
                return this.innerHTML = (`<div class='gifbox' style='width:${width}px; height: ${height}px'></br>${component}</div>`);
            } catch (e) {
                console.log(e);
                return this.innerHTML = "<img src='https://gph.is/2Faj7oP' alt='no gif' loading='lazy'/>";
            }
        }
    }
}

export default customElements.define('gif-box', GifBox);

