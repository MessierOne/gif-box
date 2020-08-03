import "@babel/polyfill";
// eslint-disable-next-line no-unused-vars
import React from "react";
import {mount} from 'enzyme';
import proxyquire from 'proxyquire';
import {expect} from 'chai';

describe(__filename, () => {
    let GifBox;
    let method;

    beforeEach(async () => {
        proxyquire("../src/js/index", window.HTMLElement);
        GifBox = window.customElements.get("gif-box");
        document.body.appendChild(document.createElement('div'));
        method = await new GifBox("happy", "medium").composeElement();
    });

    it('should render <img>', () => {
        const parser = new DOMParser();
        const htmlDoc = parser.parseFromString(method, 'text/html');

        expect(htmlDoc.body.innerHTML).to.contain('img');
        expect(htmlDoc.getElementsByTagName('img')[0].src).to.equal('www.img.url');
    });

    it('should mount <gif-box>',  () => {
        const wrapper = mount(<div>{method}</div>);

        expect(wrapper.html()).to.contain('img');
        expect(wrapper.html()).to.not.contain('button');
    });

    it('should render shuffle button', async () => {
         method = await new GifBox("happy", "medium", "").composeElement();
        const wrapper = mount(<div>{method}</div>);

        expect(wrapper.html()).to.contain('img');
        expect(wrapper.html()).to.contain('button');
    });
});
