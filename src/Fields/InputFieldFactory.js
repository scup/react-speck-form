import React from 'react';
import Field from './Field';

export default (type) => class InputFieldFactory extends Field {
  render() {
    return this.renderField('input', {
      type,
      ...this.props
    });
  }
}
