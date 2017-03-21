import React from 'react';
import Field from './Field';

export default class TextareaField extends Field {
  render() {
    return this.renderField('textarea', this.props);
  }
}
