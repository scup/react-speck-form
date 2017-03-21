import React from 'react';
import { mount } from 'enzyme';
import { ColorField } from '../src/SpeckForm';

import { Given, When, Then } from './formSpecHelpers';

describe('ColorField', () => {
  it('should be input type color', () => {
    Given(<ColorField entityField="a" />, (wrapper) => {
      When(wrapper.html());
      Then(['<input', 'type="color"']);
    });
  });
});
