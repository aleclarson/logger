var assertType, hook, hooks, methods, phases, properties, repeatString, values;

repeatString = require("repeat-string");

assertType = require("assertType");

hook = require("hook");

module.exports = function(type) {
  type.defineValues(values);
  type.defineProperties(properties);
  type.defineMethods(methods);
  return type.initInstance(phases.initInstance);
};

values = {
  _indent: "",
  _indentStack: function() {
    return [];
  }
};

properties = {
  indent: {
    value: 0,
    didSet: function(newValue, oldValue) {
      assertType(newValue, Number);
      return this._indent = repeatString(this.indentString, newValue);
    }
  },
  indentString: {
    value: " ",
    didSet: function(newValue) {
      assertType(newValue, String);
      return this._indent = repeatString(newValue, this.indent);
    }
  }
};

methods = {
  plusIndent: function(indent) {
    return this.pushIndent(indent + this.indent);
  },
  pushIndent: function(indent) {
    this._indentStack.push(this.indent);
    this.indent = indent;
  },
  popIndent: function(n) {
    var indent;
    if (n == null) {
      n = 1;
    }
    while (n-- > 0) {
      indent = this._indentStack.pop();
      if (indent != null) {
        this.indent = indent;
      } else {
        this.indent = 0;
        break;
      }
    }
  },
  withIndent: function(indent, fn) {
    this.pushIndent(indent);
    fn();
    this.popIndent();
  }
};

phases = {
  initInstance: function() {
    return hook.before(this, "_printChunk", hooks._printChunk);
  }
};

hooks = {
  _printChunk: function(chunk) {
    if (this.line.length > 0) {
      return;
    }
    if (chunk.indent === true) {
      chunk.message = this._indent;
      chunk.length = this._indent.length;
    } else if (!((chunk.length === 0) || (chunk.message === this.ln))) {
      chunk.message = this._indent + chunk.message;
      chunk.length += this._indent.length;
    }
  }
};

//# sourceMappingURL=../../../map/src/mixins/Indent.map
