import React from 'react';
import { mount } from 'enzyme';
import { TextField } from '../src/SpeckForm';

import { Given, When, Then } from './formSpecHelpers';

describe('TextField', () => {
  it('should be input type text', () => {
    Given(<TextField entityField="a" />, (wrapper) => {
      When(wrapper.html());
      Then(['<input', 'type="text"']);
    });
  });

  it('with entityField', () => {
    Given(<TextField entityField="propA" />, (wrapper) => {
      When(wrapper.html());
      Then([
        '<input', 'id="speck-form__id--propA-', 'name="propA"'
      ]);
    });
  });

  it('with label', () => {
    Given(<TextField label="My label" entityField="propA" />, (wrapper) => {
      When(wrapper.html());
      Then([
        '<label', 'for="speck-form__id--propA-', 'class="speck-form__label"', 'My label',
        '<input', 'id="speck-form__id--propA-', 'name="propA"'
      ]);
    });
  });

  it('with placeholder', () => {
    Given(<TextField placeholder="My placeholder" entityField="propA" />, (wrapper) => {
      When(wrapper.html());
      Then([
        '<input', 'placeholder="My placeholder"'
      ]);
    });
  });

  it('with any valid input attributes', () => {
    Given(<TextField maxLength="3" readOnly entityField="propA" />, (wrapper) => {
      When(wrapper.html());
      Then([
        '<input', 'maxlength="3"', 'readonly=""'
      ]);
    });
  });

  it('with className', () => {
    Given(<TextField className="my-class" entityField="propA" />, (wrapper) => {
      When(wrapper.html());
      Then([
        '<input', 'class="my-class speck-form__field__input"'
      ]);
    });
  });

  it('with defaultValue', () => {
    Given(<TextField defaultValue="my value" entityField="propA" />, (wrapper) => {
      When(wrapper.html());
      Then([
        '<input', 'value="my value"'
      ]);
    });
  });

  it('throw a exception when entityField is null/undefined', () => {
    expect(() => Given(<TextField />)).to.throw;
  });
});
