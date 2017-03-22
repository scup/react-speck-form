(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'lodash', './Field'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('lodash'), require('./Field'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.lodash, global.Field);
    global.SubmitField = mod.exports;
  }
})(this, function (exports, _react, _lodash, _Field2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _react2 = _interopRequireDefault(_react);

  var _lodash2 = _interopRequireDefault(_lodash);

  var _Field3 = _interopRequireDefault(_Field2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
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

  var SubmitField = function (_Field) {
    _inherits(SubmitField, _Field);

    function SubmitField() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, SubmitField);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SubmitField.__proto__ || Object.getPrototypeOf(SubmitField)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (event) {
        event.preventDefault();
        _this.context.onSubmit();
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(SubmitField, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            label = _props.label,
            children = _props.children;

        var props = _lodash2.default.omit(this.props, ['label']);
        return this.renderField('div', _extends({}, props, {
          onClick: this.handleClick
        }), label || children);
      }
    }, {
      key: 'getFieldName',
      value: function getFieldName() {
        return 'btnSubmit';
      }
    }]);

    return SubmitField;
  }(_Field3.default);

  exports.default = SubmitField;
});
//# sourceMappingURL=SubmitField.js.map