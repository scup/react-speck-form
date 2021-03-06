(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'uuid', 'lodash', 'react-scroll', 'classnames'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('uuid'), require('lodash'), require('react-scroll'), require('classnames'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.uuid, global.lodash, global.reactScroll, global.classnames);
    global.Field = mod.exports;
  }
})(this, function (exports, _react, _uuid, _lodash, _reactScroll, _classnames2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _uuid2 = _interopRequireDefault(_uuid);

  var _lodash2 = _interopRequireDefault(_lodash);

  var _reactScroll2 = _interopRequireDefault(_reactScroll);

  var _classnames3 = _interopRequireDefault(_classnames2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
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

  var ScrollElement = _reactScroll2.default.Element;

  var Field = function (_React$Component) {
    _inherits(Field, _React$Component);

    function Field(props, context) {
      _classCallCheck(this, Field);

      var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).call(this, props));

      _this.setError = function () {
        _this.setState({ isValid: false });
      };

      _this.reset = function () {
        _this.setState({ isValid: true });
      };

      _this.onChange = function () {
        var onChange = _this.context.onChange;

        onChange(_this.getFieldName(), _this.node.value, _this.props.changeValidation);
      };

      var value = void 0;
      if (context && props) {
        value = context.data[_this.getFieldName()] || props.value || props.defaultValue || '';
      }

      _this.typeName;
      _this.value = value;
      _this.state = {
        isValid: true,
        value: value
      };
      return _this;
    }

    _createClass(Field, [{
      key: 'getFieldName',
      value: function getFieldName() {
        if (!this.props.entityField) {
          throw Error('entityField is required!');
        }
        return this.props.entityField;
      }
    }, {
      key: 'getFieldClasses',
      value: function getFieldClasses() {
        return (0, _classnames3.default)('speck-form__field__input', this.props.className, _defineProperty({}, this.props.className + '--error', !this.state.isValid));
      }
    }, {
      key: 'getLabelClasses',
      value: function getLabelClasses() {
        return (0, _classnames3.default)('speck-form__label', this.props.labelClassName);
      }
    }, {
      key: 'getFieldUUID',
      value: function getFieldUUID() {
        var fieldName = this.getFieldName();
        return 'speck-form__id--' + fieldName + '-' + _uuid2.default.v4();
      }
    }, {
      key: 'renderField',
      value: function renderField(name, fieldProps, children) {
        var _this2 = this;

        var disableLabel = this.context.disableLabel;

        var UUID = this.getFieldUUID();
        var label = fieldProps.label;
        var defaultValue = this.props.defaultValue;

        var fieldName = this.getFieldName();

        var otherProps = _lodash2.default.omit(fieldProps, ['label', 'children', 'className', 'entityField', 'labelClassName', 'datetime-local', 'changeValidation', 'containerClassName']);

        var attrs = Object.assign({
          id: UUID,
          ref: function ref(node) {
            return _this2.node = node;
          },
          name: fieldName,
          className: this.getFieldClasses(),
          defaultValue: this.state.value || defaultValue,
          onChange: this.onChange
        }, otherProps);

        this.typeName = attrs.type;

        var renderLabel = void 0;
        var isLabelEnabled = label && !disableLabel;
        if (isLabelEnabled) {
          renderLabel = _react2.default.createElement(
            'label',
            { htmlFor: attrs.id, className: this.getLabelClasses() },
            label
          );
        }

        if (fieldProps.type === 'hidden') {
          if (attrs.value && attrs.defaultValue) {
            delete attrs.defaultValue;
          }
          return _react2.default.createElement(name, attrs, children);
        }

        return _react2.default.createElement(
          ScrollElement,
          { name: this.getFieldName() },
          _react2.default.createElement(
            'section',
            { className: this.getContainerClasses() },
            renderLabel,
            _react2.default.createElement(name, attrs, children)
          )
        );
      }
    }, {
      key: 'getContainerClasses',
      value: function getContainerClasses() {
        return (0, _classnames3.default)('speck-form__container', this.props.containerClassName, 'speck-form__container--' + this.getFieldName(), {
          'has-error': !this.state.isValid
        });
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _context = this.context,
            registerEntityField = _context.registerEntityField,
            getRegisteredFields = _context.getRegisteredFields,
            registerTypeFields = _context.registerTypeFields;


        var value = void 0;
        if (this.node) {
          value = this.node.value || this.node.defaultValue;
        }

        registerEntityField(this.getFieldName(), value, {
          reset: this.reset,
          setError: this.setError
        });
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var onChange = this.context.onChange;

        if (this.typeName === 'hidden') {
          onChange(this.getFieldName(), nextProps.value, this.props.changeValidation);
        }
      }
    }]);

    return Field;
  }(_react2.default.Component);

  Field.propTypes = {
    className: _react2.default.PropTypes.string,
    entityField: _react2.default.PropTypes.string,
    labelClassName: _react2.default.PropTypes.string,
    changeValidation: _react2.default.PropTypes.bool,
    containerClassName: _react2.default.PropTypes.string
  };

  Field.defaultProps = {
    changeValidation: false
  };

  Field.contextTypes = {
    data: _react2.default.PropTypes.object,
    onChange: _react2.default.PropTypes.func,
    onSubmit: _react2.default.PropTypes.func,
    disableLabel: _react2.default.PropTypes.bool,
    registerEntityField: _react2.default.PropTypes.func
  };

  exports.default = Field;
});
//# sourceMappingURL=Field.js.map