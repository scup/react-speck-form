(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.TypeDiscoverer = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var TYPES = {
    array: [],
    string: '',
    number: 0,
    bool: true,
    func: function func() {},
    object: {},
    oneOf: "____"
  };

  exports.default = function (specification) {

    var executeValidator = specification.validator || specification;

    for (var typeName in TYPES) {
      var errors = void 0;
      errors = executeValidator({ "name": TYPES[typeName] }, "name");
      var isReqRegex = new RegExp('Required undefined (.*) was not specified');
      var isRequered = isReqRegex.test(executeValidator({ "name": null }, "name"));

      if (!errors) {
        return {
          "name": typeName,
          "required": isRequered
        };
      }
      switch (true) {
        case /expected one of/.test(errors):
          var oneOfArray = /expected one of (\[.*\])/.exec(errors);
          if (oneOfArray && oneOfArray[1]) {
            return {
              name: 'oneOf',
              "required": isRequered,
              options: JSON.parse(oneOfArray[1]) || []
            };
          }
          break;
      }
    }
  };
});
//# sourceMappingURL=TypeDiscoverer.js.map