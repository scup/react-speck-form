(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'classnames', './Field'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('classnames'), require('./Field'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.classnames, global.Field);
    global.CustomField = mod.exports;
  }
})(this, function (exports, _react, _classnames, _Field2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _react2 = _interopRequireDefault(_react);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _Field3 = _interopRequireDefault(_Field2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var CustomField = function (_Field) {
    _inherits(CustomField, _Field);

    function CustomField() {
      _classCallCheck(this, CustomField);

      return _possibleConstructorReturn(this, (CustomField.__proto__ || Object.getPrototypeOf(CustomField)).apply(this, arguments));
    }

    _createClass(CustomField, [{
      key: 'recursiveClone',
      value: function recursiveClone(children) {
        var _this2 = this;

        var entityField = this.props.entityField;

        return _react2.default.Children.map(children, function (child) {
          var childProps = {};
          if (_react2.default.isValidElement(child)) {
            if (child.props.name === entityField) {
              var value = _this2.state.value || child.props.defaultValue;
              childProps = {
                ref: function ref(node) {
                  _this2.node = node;
                  if (typeof child.ref === 'function') {
                    child.ref(node);
                  }
                },
                value: undefined,
                defaultValue: value,
                onChange: _this2.onChange,
                className: (0, _classnames2.default)(child.props.className, _this2.getFieldClasses())
              };
            }
          }
          if (child && child.props) {
            childProps.children = _this2.recursiveClone(child.props.children);
            return _react2.default.cloneElement(child, childProps);
          }
          return child;
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'section',
          { className: this.getContainerClasses() },
          this.recursiveClone(this.props.children)
        );
      }
    }]);

    return CustomField;
  }(_Field3.default);

  exports.default = CustomField;
});
//# sourceMappingURL=CustomField.js.map