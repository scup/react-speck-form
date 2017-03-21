import React from 'react';
import _ from 'lodash';
import Field from './Field';

export default class SubmitField extends Field {
  render() {
    const { label, children } = this.props;
    const props = _.omit(this.props, [
      'label'
    ]);
    return this.renderField('button', {
      ...props,
      onClick: this.handleClick
    }, (label || children));
  }

  handleClick = (event) => {
    event.preventDefault();
    this.context.onSubmit();
  }

  getFieldName() {
    return 'btnSubmit';
  }
}
