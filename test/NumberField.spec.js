import React from 'react';
import { mount } from 'enzyme';
import { NumberField } from '../src/SpeckForm';

import { Given, When, Then } from './formSpecHelpers';

describe('NumberField', () => {
  it('should be input type number', () => {
    Given(<NumberField entityField="a" />, (wrapper) => {
      When(wrapper.html());
      Then(['<input', 'type="number"']);
    });
  });
});
