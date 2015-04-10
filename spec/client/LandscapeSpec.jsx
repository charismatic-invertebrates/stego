'use strict';

var React = require('react/addons');
var Landscape = require('../../client/src/js/components/Landscape.jsx');
var TestUtils = React.addons.TestUtils;

describe('Landscape Test', function() {
  it('should render the landscape', function() {
    var container = React.createElement('div');
    var lscape = <Landscape></Landscape>;
    TestUtils.renderIntoDocument(lscape, container);
    expect(lscape.props.children[0].toBeDefined());
    expect(lscape.props.children[0]).className.toEqual('steps-box');
  });
});
