import React from 'react';
import Field from './Field';

export default class SelectField extends Field {
  render() {
    return this.renderField('select', this.props, this.renderOptions());
  }

  renderOptions() {
    const { options, children } = this.props;

    if (!options) {
      return children;
    }

    const isObject = (item) => (typeof item === 'object');

    return options.map((item, index) => {
      let value = item;
      let label = item;

      if ((isObject(item)) && item.value) {
        value = item.value;
      }

      if ((isObject(item)) && item.label) {
        label = item.label;
      }

      return (
        <option value={value} key={index}>{label}</option>
      );
    });
  }
}
