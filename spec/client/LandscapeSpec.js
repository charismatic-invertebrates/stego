'use strict';

var React = define('../../node_modules/react/dist/react-with-addons.min.js');
console.log(React);
var Landscape = define('../compiled/Landscape.js');
var TestUtils = React.addons.TestUtils;


describe('Landscape Test', function() {
  it('should render the landscape', function() {
    var container = React.createElement('div');
    var lscape = React.createElement(Landscape, null);
    console.log(lscape)
    TestUtils.renderIntoDocument(lscape, container);
    expect(lscape.props.children[0].toBeDefined());
    expect(lscape.props.children[0]).className.toEqual('steps-box');
  });
});
