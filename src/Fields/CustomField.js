import React from 'react';
import classnames from 'classnames';
import Field from './Field';

export default class CustomField extends Field {
  recursiveClone(children) {
    const { entityField } = this.props;
    return React.Children.map(children, child => {
      let childProps = {};
      if (React.isValidElement(child)) {
        if (child.props.name === entityField) {
          const value = this.state.value || child.props.defaultValue;
          childProps = {
            ref: (node) => {
              this.node = node;
              if (typeof child.ref === 'function') {
                child.ref(node);
              }
            },
            value: undefined,
            defaultValue: value,
            onChange: this.onChange,
            className: classnames(child.props.className, this.getFieldClasses())
          };
        }
      }
      if ((child) && child.props) {
        childProps.children = this.recursiveClone(child.props.children);
        return React.cloneElement(child, childProps);
      }
      return child;
    });
  }

  render() {
    return (
      <section className={this.getContainerClasses()}>
        {this.recursiveClone(this.props.children)}
      </section>
    );
  }
}
