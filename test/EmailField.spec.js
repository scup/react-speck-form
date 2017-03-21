import React from 'react';
import { mount } from 'enzyme';
import { EmailField } from '../src/SpeckForm';

import { Given, When, Then } from './formSpecHelpers';

describe('EmailField', () => {
  it('should be input type email', () => {
    Given(<EmailField entityField="a" />, (wrapper) => {
      When(wrapper.html());
      Then(['<input', 'type="email"']);
    });
  });
});
