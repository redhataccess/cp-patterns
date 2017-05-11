// var expect = require("chai").expect;
describe( "<%= props.name %> <%= props.type %>", function() {
    before( function() {
        browser.url( "/tests/<%= props.name_underscore %>" );
        return browser;
    } );
    it( "should look like baseline", function() {
        return browser.compareScreen( "<%= props.name_underscore %>", {
            name: "<%= props.type %>",
            elem: ".rh-<%= props.name_dash %>--component",
            screenWidth: [ 600 ]
        } );
    } );
} );
