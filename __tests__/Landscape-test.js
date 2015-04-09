var React = require('react/addons');
var Landscape = require('./compiled/Landscape.js');
var TestUtils = React.addons.TestUtils;

jest.dontMock('./compiled/Landscape.js');

describe('Landscape', function() {
  it ('renders the Landscape class', function() {
    var el = (<Landscape className='morning' />);
    var result;

    var shallowRenderer = TestUtils.createRenderer();
    shallowRenderer.render(el);
    result = shallowRenderer.getRenderOutput();

    var child0 = result.props.children[0];
    expect(child0.props.className.toEqual('steps-box'));
  });
});
