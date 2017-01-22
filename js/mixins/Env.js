// Generated by CoffeeScript 1.11.1
var Type, emptyFunction, isNodeJS, mixin,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

emptyFunction = require("emptyFunction");

isNodeJS = require("isNodeJS");

Type = require("Type");

mixin = Type.Mixin();

mixin.defineValues({
  isQuiet: false,
  isVerbose: {
    value: false,
    didSet: function(isVerbose) {
      return this._verbose = isVerbose ? this : emptyFunction;
    }
  },
  isDebug: {
    value: false,
    didSet: function(isDebug) {
      return this._debug = isDebug ? this : emptyFunction;
    }
  },
  _verbose: emptyFunction,
  _debug: emptyFunction
});

mixin.defineMethods({
  verbose: function() {
    return this._verbose.apply(this, arguments);
  },
  debug: function() {
    return this._debug.apply(this, arguments);
  }
});

isNodeJS && mixin.initInstance(function(options) {
  this.isDebug = (indexOf.call(process.argv, "--debug") >= 0) || (process.env.DEBUG === "true");
  return this.isVerbose = (indexOf.call(process.argv, "--verbose") >= 0) || (process.env.VERBOSE === "true");
});

module.exports = mixin.apply;
