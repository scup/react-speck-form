import React from 'react';
import { mount } from 'enzyme';
import { shallow } from 'enzyme';

import SpeckForm from '../src/SpeckForm';
import ExampleEntity from './business/ExampleEntity';

describe('Scaffold', () => {
  let speckForm;
  beforeEach(() => {
    speckForm = mount(
      <SpeckForm
        scaffold={true}
        entityValidator={ExampleEntity} />
    );
  });

  it('teste', () => {
    console.log(speckForm.html());
  });
});
