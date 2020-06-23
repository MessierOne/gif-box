class GifBox extends HTMLElement {
  constructor() {
    super();
    this._gifAttr = null;
  }

  static get observedAttributes() {return ['gifname']; }

  get gifname() {
    return this._gifAttr;
  }

  set gifname(gif) {
    this.setAttribute('gifname', gif);
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (newValue !== oldValue) {
      this._gifAttr = newValue;
      this.composeElement();
    }
  }

  connectedCallback() {
    this.composeElement();
  }

  async composeElement() {

    if (this._gifAttr) {
      try {
        const gif = encodeURIComponent(this._gifAttr?.replace(' ', '+'));
        const { url } = await fetch(`http://localhost:2021/shuffleGif?gifName=${gif}`, {}).then(response => {
          if (response.ok) {
            return response.json();
          }
        });

        this.innerHTML = `<div class='gifbox'></br><img src='${url}' alt='${gif}' lazy="true"/></div>`;
      } catch (e) {
        console.log(e)
      }
    }
  }
}

customElements.define('gif-box', GifBox);
