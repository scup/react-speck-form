(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', './Field'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('./Field'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.Field);
    global.SelectField = mod.exports;
  }
})(this, function (exports, _react, _Field2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _react2 = _interopRequireDefault(_react);

  var _Field3 = _interopRequireDefault(_Field2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var SelectField = function (_Field) {
    _inherits(SelectField, _Field);

    function SelectField() {
      _classCallCheck(this, SelectField);

      return _possibleConstructorReturn(this, (SelectField.__proto__ || Object.getPrototypeOf(SelectField)).apply(this, arguments));
    }

    _createClass(SelectField, [{
      key: 'render',
      value: function render() {
        return this.renderField('select', this.props, this.renderOptions());
      }
    }, {
      key: 'renderOptions',
      value: function renderOptions() {
        var _props = this.props,
            options = _props.options,
            children = _props.children;


        if (!options) {
          return children;
        }

        var isObject = function isObject(item) {
          return (typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object';
        };

        return options.map(function (item, index) {
          var value = item;
          var label = item;

          if (isObject(item) && item.value) {
            value = item.value;
          }

          if (isObject(item) && item.label) {
            label = item.label;
          }

          return _react2.default.createElement(
            'option',
            { value: value, key: index },
            label
          );
        });
      }
    }]);

    return SelectField;
  }(_Field3.default);

  exports.default = SelectField;
});
//# sourceMappingURL=SelectField.js.map