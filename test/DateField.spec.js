import React from 'react';
import { mount } from 'enzyme';
import { DateField } from '../src/SpeckForm';

import { Given, When, Then } from './formSpecHelpers';

describe('DateField', () => {
  it('should be input type date', () => {
    Given(<DateField entityField="a" />, (wrapper) => {
      When(wrapper.html());
      Then(['<input', 'type="date"']);
    });
  });
});
