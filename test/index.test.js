import "@babel/polyfill";
// eslint-disable-next-line no-unused-vars
import React from "react";
import sinon from 'sinon';
import {mount} from 'enzyme';
import proxyquire from 'proxyquire';
import {expect} from 'chai';

describe(__filename, () => {
    let GifBox;
    // eslint-disable-next-line no-unused-vars
    const promiseObject = {promise: sinon.stub().resolves()};

    beforeEach(() => {
        proxyquire("../src/js/index", window.HTMLElement);
        GifBox = window.customElements.get("gif-box");
        document.body.appendChild(document.createElement('div'));
    });

    it('should render <img>', async () => {
        const parser = new DOMParser();
        const method = await new GifBox("happy", "medium").composeElement();
        const htmlDoc = parser.parseFromString(method, 'text/html');

        expect(htmlDoc.body.innerHTML).to.contain('img');
        expect(htmlDoc.getElementsByTagName('img')[0].src).to.equal('www.img.url');
    });

    it('should mount <gif-box>', async () => {
        const method = await new GifBox("happy", "medium").composeElement();
        const wrapper = mount(<div>{method}</div>, {attachTo: document.body.firstChild});

        expect(wrapper.html()).to.contain('img');
    });
});
