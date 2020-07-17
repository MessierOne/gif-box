class GifBox extends HTMLElement {
  constructor() {
    super();
    this._wordAttr = null;
    this._sizeAttr = null;
  }

  static get observedAttributes() {return ['keyword', 'size']; }

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

  connectedCallback() {
    this.composeElement();
  }

  async fetcher(url) {
    const request = await fetch(url, {});
    const { data, response } = await request.json();

    return { data, response };
  }

  async getSynonym(keyword) {
    const apiKey = 'VEcHyYPkI2FdigGAnAYN';
    const url = `http://thesaurus.altervista.org/thesaurus/v1?word=${keyword}&language=en_US&output=json&key=${apiKey}`;

    try {
      const { response } = await this.fetcher(url);

      const synonymList = response?.map(noun => noun.list.synonyms.split(' ')[0].split('|')).flat();
      const random = Math.floor(Math.random() * Math.floor(synonymList?.length - 1));

      return synonymList[random];
    } catch (e) {
      console.log('Could not retrieve a similar word: ', e);
      return keyword;
    }
  }

  async getGif(synonym) {
    if (this._wordAttr) {
      const apkKey = 'MwYVseqHsZL05C5EK1A0yV6kRcIuXS2b';
      const searchGif = `http://api.giphy.com/v1/gifs/search?api_key=${apkKey}&q=${synonym}&limit=1`;
      try {
        const { data } = await this.fetcher(searchGif);
        const size = this._sizeAttr ? `_${this._sizeAttr}` : '';

        const { url, mp4, width, height } = data[0].images[`downsized${size}`];
        return { url, mp4, width, height };
      } catch (e) {
        console.log(e);
      }
    }
  }

  async composeElement() {
    if (this._wordAttr) {
      try {
        const keyword = this._wordAttr?.replace(' ', '+');
        const synonym = await this.getSynonym(keyword);
        const { url, mp4, width, height } = await this.getGif(synonym);

        const component = url
          ? `<img src='${url}' alt='${keyword}' loading="lazy"/>`
          : `<video controls><source src='${mp4}' type="video/mp4">Your browser does not support the video tag.</video>`;

        this.innerHTML = `<div class='gifbox' style='width:${width}; height: ${height}'></br>${component}</div>`;
      } catch (e) {
        console.log(e)
      }
    }
  }
}

try {
  exports.module = customElements.define('gif-box', GifBox);
} catch (e) {
  customElements.define('gif-box', GifBox);
}

