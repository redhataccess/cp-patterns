/**
 *
 * Sets a [cookie](https://code.google.com/p/selenium/wiki/JsonWireProtocol#Cookie_JSON_Object)
 * for current page.
 *
 * <example>
    :getCookie.js
    client
        .setCookie({name: 'test', value: '123'})
        .getCookie().then(function(cookies) {
            console.log(cookies); // outputs: [{ name: 'test', value: '123' }]
        })
 * </example>
 *
 * @param {Object} cookie cookie object
 *
 * @uses protocol/cookie
 * @type cookie
 *
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _utilsErrorHandler = require('../utils/ErrorHandler');

var setCookie = function setCookie(cookieObj) {
    /*!
     * parameter check
     */
    if (typeof cookieObj !== 'object') {
        throw new _utilsErrorHandler.CommandError('Please specify a cookie object to set (see http://code.google.com/p/selenium/wiki/JsonWireProtocol#Cookie_JSON_Object for documentation.');
    }

    return this.cookie('POST', cookieObj);
};

exports['default'] = setCookie;
module.exports = exports['default'];
