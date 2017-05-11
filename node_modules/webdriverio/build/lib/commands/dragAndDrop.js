/**
 *
 * Drag an item to a destination element.
 *
 * @param {String} sourceElem      source selector
 * @param {String} destinationElem destination selector
 *
 * @uses action/moveToObject, protocol/buttonDown, protocol/buttonUp, property/getLocation, protocol/touchDown, protocol/touchMove, protocol/touchUp
 * @type action
 *
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var dragAndDrop = function dragAndDrop(sourceElem, destinationElem) {
    var _this = this;

    if (this.isMobile) {
        return this.getLocation(sourceElem).then(function (location) {
            return _this.touchDown(location.x, location.y);
        }).getLocation(destinationElem).then(function (location) {
            return _this.touchMove(location.x, location.y).touchUp(location.x, location.y);
        });
    }

    return this.moveToObject(sourceElem).buttonDown().moveToObject(destinationElem).buttonUp();
};

exports["default"] = dragAndDrop;
module.exports = exports["default"];
