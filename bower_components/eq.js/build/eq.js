/*
 * The global eqjs object that contains all eq.js functionality.
 *
 * eqjs.nodes - List of all nodes to act upon when eqjs.states is called
 * eqjs.nodesLength - Number of nodes in eqjs.nodes
 *
 * eqjs.refreshNodes - Call this function to refresh the list of nodes that eq.js should act on
 * eqjs.sortObj - Sorts a key: value object based on value
 * eqjs.query - Runs through all nodes and finds their widths and points
 * eqjs.nodeWrites - Runs through all nodes and writes their eq status
 */
(function (eqjs, domready) {
  'use strict';

  function EQjs() {
    this.nodes = [];
    this.eqsLength = 0;
    this.widths = [];
    this.points = [];
    this.callback = undefined;
  }

  /** @{polyfills} **/
  /*
   * Object.getPrototypeOf Polyfill
   * From http://stackoverflow.com/a/15851520/703084
   */
  if (typeof Object.getPrototypeOf !== 'function') {
    Object.getPrototypeOf = ''.__proto__ === String.prototype ? function (object) {
      return object.__proto__;
    }
    : function (object) {
      // May break if the constructor has been tampered with
      return object.constructor.prototype;
    };
  }

  /*
   * Request Animation Frame Polyfill
   *
   * Written by  Erik Möller and Paul Irish
   * From http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
   */
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback, element) {
      element = element;
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }

  /** {polyfills}@ **/

  /*
   * Add event (cross browser)
   * From http://stackoverflow.com/a/10150042
   */
  function addEvent(elem, event, fn) {
    if (elem.addEventListener) {
      elem.addEventListener(event, fn, false);
    } else {
      elem.attachEvent('on' + event, function () {
        // set the this pointer same as addEventListener when fn is called
        return (fn.call(elem, window.event));
      });
    }
  }

  /*
   * Parse Before
   *
   * Reads `:before` content and splits it at the comma
   * From http://jsbin.com/ramiguzefiji/1/edit?html,css,js,output
   */
  function parseBefore(elem) {
    return window.getComputedStyle(elem, ':before').getPropertyValue('content').slice(1, -1);
  }

  /*
   * Merges two node lists together.
   *
   * From http://stackoverflow.com/questions/914783/javascript-nodelist/17262552#17262552
   */
  var mergeNodes = function(a, b) {
    return [].slice.call(a).concat([].slice.call(b));
  };

  /*
   * Query
   *
   * Reads nodes and finds the widths/points
   *  nodes - optional, an array or NodeList of nodes to query
   *  callback - Either boolean (`true`/`false`) to force a normal callback, or a function to use as a callback once query and nodeWrites have finished.
   */
  EQjs.prototype.query = function (nodes, callback) {
    var proto = Object.getPrototypeOf(eqjs);
    var length;

    if (callback && typeof(callback) === 'function') {
      proto.callback = callback;
    }

    if (nodes && typeof(nodes) !== 'number') {
      length = nodes.length;
    }
    else {
      nodes = proto.nodes;
      length = proto.nodesLength;
    }
    var widths = [], points = [], i;

    for (i = 0; i < length; i++) {
      widths.push(nodes[i].offsetWidth);
      try {
        points.push(proto.sortObj(nodes[i].getAttribute('data-eq-pts')));
      }
      catch (e) {
        try {
          points.push(proto.sortObj(parseBefore(nodes[i])));
        }
        catch (e2) {
          points.push([{
            key: '',
            value: 0
          }]);
        }
      }
    }

    proto.widths = widths;
    proto.points = points;

    if (nodes && typeof(nodes) !== 'number') {
      proto.nodeWrites(nodes, widths, points);
    }
    else if (callback && typeof(callback) !== 'function') {
      proto.nodeWrites();
    }
    else {
      window.requestAnimationFrame(proto.nodeWrites);
    }
  };

  /*
   * NodeWrites
   *
   * Writes the data attribute to the object
   *  nodes - optional, an array or NodeList of nodes to query
   *  widths - optional, widths of nodes to use. Only used if `nodes` is passed in
   *  points - optional, points of nodes to use. Only used if `nodes` is passed in
   */
  EQjs.prototype.nodeWrites = function (nodes) {
    var i,
    length,
    callback,
    proto = Object.getPrototypeOf(eqjs),
    widths = proto.widths,
    points = proto.points;

    if (nodes && typeof(nodes) !== 'number') {
      length = nodes.length;
    }
    else {
      nodes = proto.nodes;
      length = proto.nodesLength;
    }

    for (i = 0; i < length; i++) {
      // Set object width to found width
      var objWidth = widths[i];
      var obj = nodes[i];
      var eqPts = points[i];

      // Get keys for states
      var eqPtsLength = eqPts.length;

      // Be greedy for smallest state
      if (objWidth < eqPts[0].value) {
        obj.removeAttribute('data-eq-state');
      }
      // Be greedy for largest state
      else if (objWidth >= eqPts[eqPtsLength - 1].value) {
        obj.setAttribute('data-eq-state', eqPts[eqPtsLength - 1].key);
      }
      // Traverse the states if not found
      else {
        for (var j = 0; j < eqPtsLength; j++) {
          var current = eqPts[j];
          var next = eqPts[j + 1];

          if (j === 0 && objWidth < current.value) {
            obj.removeAttribute('data-eq-state');
            break;
          }

          if (next.value === undefined) {
            obj.setAttribute('data-eq-state', next.key);
            break;
          }

          if (objWidth >= current.value && objWidth < next.value) {
            obj.setAttribute('data-eq-state', current.key);
            break;
          }
        }
      }
    }

    // Run Callback
    if (proto.callback) {
      callback = proto.callback;
      proto.callback = undefined;
      callback(nodes);
    }
  };

  /*
   * Refresh Nodes
   * Refreshes the list of nodes for eqjs to work with
   */
  EQjs.prototype.refreshNodes = function () {
    var proto = Object.getPrototypeOf(eqjs),
        cssNodes = [];

    proto.nodes = document.querySelectorAll('[data-eq-pts]');

    cssNodes = parseBefore(document.querySelector('html')).split(', ');
    cssNodes.forEach(function (v) {
      if (v !== '') {
        proto.nodes = mergeNodes(proto.nodes, document.querySelectorAll(v));
      }
    });


    proto.nodesLength = proto.nodes.length;
  };

  /*
   * Sort Object
   * Sorts a simple object (key: value) by value and returns a sorted object
   */
  EQjs.prototype.sortObj = function (obj) {
    var arr = [];

    var objSplit = obj.split(',');

    for (var i = 0; i < objSplit.length; i++) {
      var sSplit = objSplit[i].split(':');
      arr.push({
        'key': sSplit[0].replace(/^\s+|\s+$/g, ''),
        'value': parseFloat(sSplit[1])
      });
    }

    return arr.sort(function (a, b) { return a.value - b.value; });
  };

  /*
   * We only ever want there to be
   * one instance of EQjs in an app
   */
  eqjs = eqjs || new EQjs();

  /*
   * Document Loaded
   *
   * Fires on document load; for HTML based EQs
   */
  if (domready) {
    domready(function () {
      eqjs.refreshNodes();
      eqjs.query(undefined, true);
    });
  }
  else {
    addEvent(window, 'DOMContentLoaded', function () {
      eqjs.refreshNodes();
      eqjs.query(undefined, true);
    });
  }

  /*
   * Window Loaded
   */
  addEvent(window, 'load', function () {
    eqjs.refreshNodes();
    eqjs.query(undefined, true);
  });

  /*
   * Window Resize
   *
   * Loop over each `eq-pts` element and pass to eqState
   */
  addEvent(window, 'resize', function () {
    eqjs.refreshNodes();
    window.requestAnimationFrame(eqjs.query);
  });

  // Expose 'eqjs'
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = eqjs;
  } else if (typeof define === 'function' && define.amd) {
    define(function () {
      return eqjs;
    });
  } else {
    window.eqjs = eqjs;
  }
})(window.eqjs, window.domready);
