(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'moment', 'react-scroll', 'classnames', './Types/TypeDiscoverer', './Fields/SubmitField', './Fields/SelectField', './Fields/TextareaField', './Fields/CustomField', './Fields/InputFieldFactory'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('moment'), require('react-scroll'), require('classnames'), require('./Types/TypeDiscoverer'), require('./Fields/SubmitField'), require('./Fields/SelectField'), require('./Fields/TextareaField'), require('./Fields/CustomField'), require('./Fields/InputFieldFactory'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.moment, global.reactScroll, global.classnames, global.TypeDiscoverer, global.SubmitField, global.SelectField, global.TextareaField, global.CustomField, global.InputFieldFactory);
    global.SpeckForm = mod.exports;
  }
})(this, function (exports, _react, _moment, _reactScroll, _classnames, _TypeDiscoverer, _SubmitField2, _SelectField, _TextareaField2, _CustomField2, _InputFieldFactory) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SpeckFormScaffold = exports.inputFieldFactory = exports.DatetimeLocalField = exports.DateField = exports.PasswordField = exports.HiddenField = exports.NumberField = exports.EmailField = exports.ColorField = exports.RangeField = exports.CheckboxField = exports.RadioField = exports.TextField = exports.CustomField = exports.TextareaField = exports.SelectField = exports.SubmitField = undefined;

  var _react2 = _interopRequireDefault(_react);

  var _moment2 = _interopRequireDefault(_moment);

  var _reactScroll2 = _interopRequireDefault(_reactScroll);

  var _classnames2 = _interopRequireDefault(_classnames);

  var _TypeDiscoverer2 = _interopRequireDefault(_TypeDiscoverer);

  var _SubmitField3 = _interopRequireDefault(_SubmitField2);

  var _SelectField2 = _interopRequireDefault(_SelectField);

  var _TextareaField3 = _interopRequireDefault(_TextareaField2);

  var _CustomField3 = _interopRequireDefault(_CustomField2);

  var _InputFieldFactory2 = _interopRequireDefault(_InputFieldFactory);

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

  var scroller = _reactScroll2.default.scroller;

  // button
  exports.SubmitField = _SubmitField3.default;
  var SelectField = exports.SelectField = _SelectField2.default;

  exports.TextareaField = _TextareaField3.default;
  exports.CustomField = _CustomField3.default;
  var TextField = exports.TextField = (0, _InputFieldFactory2.default)('text');
  var RadioField = exports.RadioField = (0, _InputFieldFactory2.default)('radio');
  var CheckboxField = exports.CheckboxField = (0, _InputFieldFactory2.default)('checkbox');
  var RangeField = exports.RangeField = (0, _InputFieldFactory2.default)('range');
  var ColorField = exports.ColorField = (0, _InputFieldFactory2.default)('color');
  var EmailField = exports.EmailField = (0, _InputFieldFactory2.default)('email');
  var NumberField = exports.NumberField = (0, _InputFieldFactory2.default)('number');
  var HiddenField = exports.HiddenField = (0, _InputFieldFactory2.default)('hidden');
  var PasswordField = exports.PasswordField = (0, _InputFieldFactory2.default)('password');
  var DateField = exports.DateField = (0, _InputFieldFactory2.default)('date');

  var DatetimeLocalField = exports.DatetimeLocalField = (0, _InputFieldFactory2.default)('datetime-local');

  // factory
  var inputFieldFactory = exports.inputFieldFactory = _InputFieldFactory2.default;

  var SpeckFormScaffold = exports.SpeckFormScaffold = function (_React$Component) {
    _inherits(SpeckFormScaffold, _React$Component);

    function SpeckFormScaffold(props) {
      _classCallCheck(this, SpeckFormScaffold);

      var _this = _possibleConstructorReturn(this, (SpeckFormScaffold.__proto__ || Object.getPrototypeOf(SpeckFormScaffold)).call(this, props));

      if (!props.entity) {
        console.warn('you should specify a entity!');
      }
      _this._Entity = props.entity;
      return _this;
    }

    _createClass(SpeckFormScaffold, [{
      key: 'getComponentByType',
      value: function getComponentByType(typeName, props) {
        switch (typeName) {
          case 'string':
            return _react2.default.createElement(TextField, props);
            break;
          case 'number':
            return _react2.default.createElement(NumberField, props);
            break;
          case 'oneOf':
            return _react2.default.createElement(_SelectField2.default, props);
            break;
          default:
            return _react2.default.createElement(
              'div',
              null,
              typeName
            );
        }
      }
    }, {
      key: 'generateScaffoldForm',
      value: function generateScaffoldForm() {
        var SCHEMA = this._Entity.SCHEMA;
        var fields = [];
        for (var prop in SCHEMA) {
          var validator = SCHEMA[prop];
          var info = (0, _TypeDiscoverer2.default)(validator);
          var label = info.required ? prop + ': *' : prop + ':';
          fields.push(this.getComponentByType(info.name, {
            label: label,
            options: info.options,
            entityField: prop
          }));
        }
        return fields;
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          this.generateScaffoldForm()
        );
      }
    }]);

    return SpeckFormScaffold;
  }(_react2.default.Component);

  var SpeckForm = function (_React$Component2) {
    _inherits(SpeckForm, _React$Component2);

    function SpeckForm(props) {
      _classCallCheck(this, SpeckForm);

      var _this2 = _possibleConstructorReturn(this, (SpeckForm.__proto__ || Object.getPrototypeOf(SpeckForm)).call(this, props));

      if (!props.entityValidator) {
        console.warn('you should specify a entityValidator!');
      }

      _this2._errorListeners = {};
      _this2._data = props.data || {};
      _this2._Entity = props.entityValidator;
      return _this2;
    }

    _createClass(SpeckForm, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var _this3 = this;

        return {
          data: this._data,
          disableLabel: this.props.disableLabel,
          registerEntityField: function registerEntityField(entityField, defaultValue, callbacks) {
            _this3.setValue(entityField, defaultValue);
            _this3._errorListeners[entityField] = callbacks;

            if (_this3.isValid()) {
              _this3.enableSubmit();
            } else {
              _this3.disableSubmit();
            }
          },
          onChange: function onChange(entityField, value, changeValidation) {
            _this3.updateValue(entityField, value);

            var instance = new _this3._Entity(_this3._data);
            _this3.resetField(entityField, instance.schema);

            if (_this3.props.changeValidation) {
              _this3.validate();
              return;
            }

            if (changeValidation) {
              _this3.validateEntityField(entityField);
              return;
            }
          },
          onSubmit: function onSubmit() {
            if (_this3.validate(_this3._data)) {
              _this3.props.onSubmit(_this3._data);
              return;
            }

            if (_this3.props.smoothScrollingErrors) {
              var instance = new _this3._Entity(_this3._data);
              for (var entityField in _this3._data) {
                if (entityField in instance.errors) {
                  var options = Object.assign({
                    duration: 300,
                    delay: 100,
                    smooth: true,
                    offset: -50
                  }, _this3.props.smoothScrollingErrorsOptions);
                  scroller.scrollTo(entityField, options);
                  break;
                }
              }
            }
          }
        };
      }
    }, {
      key: 'setValue',
      value: function setValue(entityField, value) {
        if (!this._data[entityField]) {
          this._data[entityField] = value;
        }
      }
    }, {
      key: 'updateValue',
      value: function updateValue(entityField, value) {
        this._data[entityField] = value;
      }
    }, {
      key: 'isValid',
      value: function isValid() {
        return new this._Entity(this._data).valid;
      }
    }, {
      key: 'validate',
      value: function validate() {
        var onErrors = this.props.onErrors;


        var instance = new this._Entity(this._data);
        this.resetFields(instance.schema);

        if (!instance.valid) {
          onErrors(instance.errors);
          this.showWarnings(instance.errors);
          this.setFieldsErrors(instance.errors);
          this.disableSubmit();
          return false;
        }

        this.enableSubmit();
        return true;
      }
    }, {
      key: 'validateEntityField',
      value: function validateEntityField(entityField) {
        var onErrors = this.props.onErrors;


        var instance = new this._Entity(this._data);
        this.resetField(entityField, instance.schema);

        if (!instance.valid) {
          onErrors(instance.errors);
          this.showWarnings(instance.errors);
          this.setFieldError(entityField, instance.errors);
          this.disableSubmit();
          return false;
        }

        this.enableSubmit();
        return true;
      }
    }, {
      key: 'enableSubmit',
      value: function enableSubmit() {
        if (this._errorListeners.btnSubmit) {
          this._errorListeners.btnSubmit.reset();
        }
      }
    }, {
      key: 'disableSubmit',
      value: function disableSubmit() {
        if (this._errorListeners.btnSubmit) {
          this._errorListeners.btnSubmit.setError();
        }
      }
    }, {
      key: 'setFieldError',
      value: function setFieldError(entityField, errors) {
        if (entityField in errors) {
          this._errorListeners[entityField].setError();
        }
      }
    }, {
      key: 'setFieldsErrors',
      value: function setFieldsErrors(errors) {
        var _this4 = this;

        return Object.keys(errors).forEach(function (entityField) {
          if (entityField in _this4._errorListeners) {
            _this4._errorListeners[entityField].setError();
          }
        });
      }
    }, {
      key: 'resetField',
      value: function resetField(entityField, schema) {
        if (entityField in this._errorListeners) {
          this._errorListeners[entityField].reset();
        }
      }
    }, {
      key: 'resetFields',
      value: function resetFields(schema) {
        var _this5 = this;

        return Object.keys(schema).forEach(function (entityField) {
          if (entityField in _this5._errorListeners) {
            _this5._errorListeners[entityField].reset();
          }
        });
      }
    }, {
      key: 'showWarnings',
      value: function showWarnings(errors) {
        var _this6 = this;

        if (!this.props.showWarnings) {
          return null;
        }

        return Object.keys(errors).forEach(function (entityField) {
          if (!(entityField in _this6._data)) {
            console.warn('You should create ' + entityField + ' field! (required)');
          }
        });
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: 'speck-form' },
          _react2.default.createElement(
            'form',
            { className: (0, _classnames2.default)(this.props.className) },
            this.props.children
          )
        );
      }
    }]);

    return SpeckForm;
  }(_react2.default.Component);

  SpeckForm.childContextTypes = {
    data: _react2.default.PropTypes.object,
    onChange: _react2.default.PropTypes.func,
    onSubmit: _react2.default.PropTypes.func,
    disableLabel: _react2.default.PropTypes.bool,
    registerEntityField: _react2.default.PropTypes.func
  };

  SpeckForm.propTypes = {
    preventSubmit: _react2.default.PropTypes.bool,
    showWarnings: _react2.default.PropTypes.bool,
    disableLabel: _react2.default.PropTypes.bool,
    data: _react2.default.PropTypes.object,
    className: _react2.default.PropTypes.string,
    entityValidator: _react2.default.PropTypes.func.isRequired,
    changeValidation: _react2.default.PropTypes.bool.isRequired,
    children: _react2.default.PropTypes.any,
    onSubmit: _react2.default.PropTypes.func,
    onErrors: _react2.default.PropTypes.func,
    smoothScrollingErrors: _react2.default.PropTypes.bool,
    smoothScrollingErrorsOptions: _react2.default.PropTypes.object
  };

  SpeckForm.defaultProps = {
    preventSubmit: true,
    showWarnings: true,
    disableLabel: false,
    changeValidation: false,
    smoothScrollingErrors: false,
    smoothScrollingErrorsOptions: {},
    onSubmit: function onSubmit() {},
    onErrors: function onErrors() {},
    data: {}
  };

  exports.default = SpeckForm;
});
//# sourceMappingURL=SpeckForm.js.map