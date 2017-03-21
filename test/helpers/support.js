/* eslint no-underscore-dangle: 0*/

import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import chaiEnzyme from 'chai-enzyme';
import chaiString from 'chai-string';
import faker from 'faker';
import jsdom from 'jsdom';
import sinon from 'sinon';

// ============================================================================
// Unit Tests Setup
// ============================================================================
Object.assign(global, {
  faker,
  sinon
});

chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
chai.use(chaiString);

Object.assign(global, chai);

// ============================================================================
// Mocking DOM
// ============================================================================
const doc = jsdom.jsdom(`
    <!doctype html>
    <html>
        <body></body>
    </html>
`);

const win = doc.defaultView;

global.document = doc;
global.window = win;
global.Element = win.Element;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});

// ============================================================================
// Mocking Webpack i18n plugin
// ============================================================================
global.__ = (str) => str;
