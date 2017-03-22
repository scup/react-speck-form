import React from 'react';
import uuid from 'uuid';
import _ from 'lodash';
import classnames from 'classnames';

class Field extends React.Component {
  constructor(props, context) {
    super(props);

    let value;
    if (context && props) {
      value = context.data[this.getFieldName()] || '';
    }

    this.typeName;

    this.value = value;
    this.state = {
      isValid: true,
      value
    };
  }

  getFieldName() {
    if (!this.props.entityField) {
      throw Error('entityField is required!');
    }
    return this.props.entityField;
  }

  getFieldClasses() {
    return classnames(this.props.className, 'speck-form__field__input');
  }

  getLabelClasses() {
    return classnames('speck-form__label',
      this.props.labelClassName
    );
  }

  getFieldUUID() {
    const fieldName = this.getFieldName();
    return `speck-form__id--${fieldName}-${uuid.v4()}`;
  }

  renderField(name, fieldProps, children) {
    const { disableLabel } = this.context;
    const UUID = this.getFieldUUID();
    const label = fieldProps.label;
    const { defaultValue } = this.props;
    const fieldName = this.getFieldName();

    const otherProps = _.omit(fieldProps, [
      'label',
      'children',
      'className',
      'entityField',
      'labelClassName',
      'datetime-local',
      'changeValidation',
      'containerClassName'
    ]);

    const attrs = Object.assign({
      id: UUID,
      ref: (node) => (this.node = node),
      name: fieldName,
      className: this.getFieldClasses(),
      defaultValue: this.state.value || defaultValue,
      onChange: this.onChange
    }, otherProps);

    this.typeName = attrs.type;

    let renderLabel;
    const isLabelEnabled = (label && !disableLabel);
    if (isLabelEnabled) {
      renderLabel = (
        <label htmlFor={attrs.id} className={this.getLabelClasses()}>
          {label}
        </label>
      );
    }

    return (
      <section className={this.getContainerClasses()}>
        {renderLabel}
        {React.createElement(name, attrs, children)}
      </section>
    );
  }

  getContainerClasses() {
    return classnames('speck-form__container',
      this.props.containerClassName,
      `speck-form__container--${this.getFieldName()}`, {
        'speck-form__container--error': !this.state.isValid
      });
  }

  setError = () => {
    this.setState({isValid: false});
  }

  reset = () => {
    this.setState({isValid: true});
  }

  onChange = () => {
    const { onChange } = this.context;
    onChange(this.getFieldName(), this.node.value, this.props.changeValidation);
  }

  componentDidMount() {
    const {
      registerEntityField,
      getRegisteredFields,
      registerTypeFields
    } = this.context;

    let value;
    if (this.node) {
      value = this.node.value || this.node.defaultValue;
    }

    registerEntityField(this.getFieldName(), value, {
      reset: this.reset,
      setError: this.setError
    });
  }
}

Field.propTypes = {
  className: React.PropTypes.string,
  entityField: React.PropTypes.string,
  labelClassName: React.PropTypes.string,
  changeValidation: React.PropTypes.bool,
  containerClassName: React.PropTypes.string
};

Field.defaultProps = {
  changeValidation: false
};

Field.contextTypes = {
  data: React.PropTypes.object,
  onChange: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
  disableLabel: React.PropTypes.bool,
  registerEntityField: React.PropTypes.func
};

export default Field;
