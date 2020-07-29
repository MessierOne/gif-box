import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import {beforeEach, afterEach} from "mocha";
import {JSDOM} from "jsdom";
import {configure} from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

chai.use(sinonChai);
chai.use(chaiAsPromised);

configure({adapter: new Adapter()});

beforeEach(function globalBeforeEach() {
    global.window = new JSDOM().window;
    global.document = window.document;
    global.HTMLElement = window.HTMLElement;
    global.customElements = window.customElements;
    global.DOMParser = window.DOMParser;
    global.fetch = window.fetch = sinon.stub().callsFake(() => {
        return {
            json: () => ({
                data: [{
                    images: {
                        downsized_medium: {url: 'www.img.url', mp4: 'mp4', width: 'width', height: 'height'}
                    }
                }],
                response: [{list: {synonyms: 'emotional'}}]
            })
        };
    });
});


afterEach(function globalAfterEach() {
    sinon.restore();
});
