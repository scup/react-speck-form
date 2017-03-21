(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './SpeckForm.js'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./SpeckForm.js'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.SpeckForm);
    global.index = mod.exports;
  }
})(this, function (exports, _SpeckForm) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _SpeckForm2 = _interopRequireDefault(_SpeckForm);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _SpeckForm2.default;
});
//# sourceMappingURL=index.js.map