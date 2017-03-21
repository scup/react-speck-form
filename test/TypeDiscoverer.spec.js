import PropTypes from 'prop-types';
import TypeDiscoverer from '../src/Types/TypeDiscoverer';

describe('TypeDiscoverer', () => {
  it('#string', () => {
    expect(TypeDiscoverer(PropTypes.string)).deep.equal({ name: 'string', required: false });
    expect(TypeDiscoverer(PropTypes.string.isRequired).required).to.truth;
  });

  it('#number', () => {
    expect(TypeDiscoverer(PropTypes.number)).deep.equal({ name: 'number', required: false });
    expect(TypeDiscoverer(PropTypes.number.isRequired).required).to.truth;
  });

  it('#bool', () => {
    expect(TypeDiscoverer(PropTypes.bool)).deep.equal({ name: 'bool', required: false });
    expect(TypeDiscoverer(PropTypes.bool.isRequired).required).to.truth;
  });

  it('#array', () => {
    expect(TypeDiscoverer(PropTypes.array)).deep.equal({ name: 'array', required: false  });
    expect(TypeDiscoverer(PropTypes.array.isRequired).required).to.truth;
  });

  it('#object', () => {
    expect(TypeDiscoverer(PropTypes.object)).deep.equal({ name: 'object', required: false  });
    expect(TypeDiscoverer(PropTypes.object.isRequired).required).to.truth;
  });

  it('#oneOf', () => {
    const oneOfValues = ['News', 'Photos'];
    expect( TypeDiscoverer(PropTypes.oneOf(oneOfValues)) ).deep.equal({
      name: 'oneOf', options: oneOfValues, required: false  });
    expect( TypeDiscoverer(PropTypes.oneOf(oneOfValues).isRequired).required).to.truth;
  });

  it('#func', () => {
    expect(TypeDiscoverer(PropTypes.func).name).to.equal('func');
    expect(TypeDiscoverer(PropTypes.func.isRequired).name).to.equal('func');
    expect(TypeDiscoverer(PropTypes.func.isRequired).required).to.truth;
  });
});
