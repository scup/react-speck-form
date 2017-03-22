import React from 'react';
import moment from 'moment';
import Scroll from 'react-scroll';
import classnames from 'classnames';
import TypeDiscoverer from './Types/TypeDiscoverer';

const scroller = Scroll.scroller;

// button
export SubmitField from './Fields/SubmitField';

import Select from './Fields/SelectField';
export const SelectField = Select;

export TextareaField from './Fields/TextareaField';
export CustomField from './Fields/CustomField';

// common Input types
import InputFieldFactory from './Fields/InputFieldFactory';

export const TextField = InputFieldFactory('text');
export const RadioField = InputFieldFactory('radio');
export const CheckboxField = InputFieldFactory('checkbox');
export const RangeField = InputFieldFactory('range');
export const ColorField = InputFieldFactory('color');
export const EmailField = InputFieldFactory('email');
export const NumberField = InputFieldFactory('number');
export const PasswordField = InputFieldFactory('password');
export const DateField = InputFieldFactory('date');

export const DatetimeLocalField = InputFieldFactory('datetime-local');

// factory
export const inputFieldFactory = InputFieldFactory;

export  class SpeckFormScaffold extends React.Component {
  constructor(props) {
    super(props);
    if (!props.entity) {
      console.warn('you should specify a entity!');
    }
    this._Entity = props.entity;
  }

  getComponentByType(typeName, props) {
    switch (typeName) {
      case 'string':
        return <TextField {...props} />;
        break;
      case 'number':
        return <NumberField {...props} />;
        break;
      case 'oneOf':
        return <Select {...props} />;
        break;
      default:
        return <div>{typeName}</div>
    }
  }

  generateScaffoldForm() {
    const SCHEMA = this._Entity.SCHEMA;
    let fields = [];
    for(let prop in SCHEMA) {
      const validator = SCHEMA[prop];
      const info = TypeDiscoverer(validator);
      const label = (info.required) ? `${prop}: *` : `${prop}:`;
      fields.push(this.getComponentByType(info.name, {
        label: label,
        options: info.options,
        entityField: prop
      }));
    }
    return fields;
  }

  render() {
    return (
      <div>{this.generateScaffoldForm()}</div>
    );
  }
}

class SpeckForm extends React.Component {
  constructor(props) {
    super(props);
    if (!props.entityValidator) {
      console.warn('you should specify a entityValidator!');
    }

    this._errorListeners = {};
    this._data = props.data || {};
    this._Entity = props.entityValidator;
  }

  getChildContext() {
    return {
      data: this._data,
      disableLabel: this.props.disableLabel,
      registerEntityField: (entityField, defaultValue, callbacks) => {
        this.setValue(entityField, defaultValue);
        this._errorListeners[entityField] = callbacks;

        if (this.isValid()) {
          this.enableSubmit();
        } else {
          this.disableSubmit();
        }
      },
      onChange: (entityField, value, changeValidation) => {
        this.updateValue(entityField, value);

        const instance = new this._Entity(this._data);
        this.resetField(entityField, instance.schema);

        if (this.props.changeValidation) {
          this.validate();
          return;
        }

        if (changeValidation) {
          this.validateEntityField(entityField);
          return;
        }
      },
      onSubmit: () => {
        if (this.validate(this._data)) {
          this.props.onSubmit(this._data);
        }
      }
    };
  }

  setValue(entityField, value) {
    if (!this._data[entityField]) {
      this._data[entityField] = value;
    }
  }

  updateValue(entityField, value) {
    this._data[entityField] = value;
  }

  isValid() {
    return new this._Entity(this._data).valid;
  }

  validate() {
    const { onErrors } = this.props;

    const instance = new this._Entity(this._data);
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

  validateEntityField(entityField) {
    const { onErrors } = this.props;

    const instance = new this._Entity(this._data);
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

  enableSubmit() {
    if (this._errorListeners.btnSubmit) {
      this._errorListeners.btnSubmit.reset();
    }
  }

  disableSubmit() {
    if (this._errorListeners.btnSubmit) {
      if (this.props.smoothScrollingErrors) {
        const instance = new this._Entity(this._data);
        for(let entityField in this._data) {
          if ((entityField in instance.errors)) {
            scroller.scrollTo(entityField, this.props.smoothScrollingErrorsOptions);
            break;
          }
        }
      }
      this._errorListeners.btnSubmit.setError();
    }
  }

  setFieldError(entityField, errors) {
    if ((entityField in errors)) {
      this._errorListeners[entityField].setError();
    }
  }

  setFieldsErrors(errors) {
    return Object.keys(errors).forEach((entityField) => {
      if ((entityField in this._errorListeners)) {
        this._errorListeners[entityField].setError();
      }
    });
  }

  resetField(entityField, schema) {
    if ((entityField in this._errorListeners)) {
      this._errorListeners[entityField].reset();
    }
  }

  resetFields(schema) {
    return Object.keys(schema).forEach((entityField) => {
      if ((entityField in this._errorListeners)) {
        this._errorListeners[entityField].reset();
      }
    });
  }

  showWarnings(errors) {
    if (!this.props.showWarnings) {
      return null;
    }

    return Object.keys(errors).forEach((entityField) => {
      if (!(entityField in this._data)) {
        console.warn(`You should create ${entityField} field! (required)`);
      }
    });
  }

  render() {
    return (
      <div className="speck-form">
        <form className={classnames(this.props.className)}>
          {this.props.children}
        </form>
      </div>
    );
  }
}

SpeckForm.childContextTypes = {
  data: React.PropTypes.object,
  onChange: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
  disableLabel: React.PropTypes.bool,
  registerEntityField: React.PropTypes.func
};

SpeckForm.propTypes = {
  preventSubmit: React.PropTypes.bool,
  showWarnings: React.PropTypes.bool,
  disableLabel: React.PropTypes.bool,
  data: React.PropTypes.object,
  className: React.PropTypes.string,
  entityValidator: React.PropTypes.func.isRequired,
  changeValidation: React.PropTypes.bool.isRequired,
  children: React.PropTypes.any,
  onSubmit: React.PropTypes.func,
  onErrors: React.PropTypes.func,
  smoothScrollingErrors: React.PropTypes.bool,
  smoothScrollingErrorsOptions: React.PropTypes.object
};

SpeckForm.defaultProps = {
  preventSubmit: true,
  showWarnings: true,
  disableLabel: false,
  changeValidation: false,
  smoothScrollingErrors: false,
  smoothScrollingErrorsOptions: {
    duration: 300,
    delay: 100,
    smooth: true,
    offset: -50
  },
  onSubmit: () => {},
  onErrors: () => {},
  data: {}
};

export default SpeckForm;
