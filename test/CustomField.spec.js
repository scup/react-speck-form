import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import SpeckForm, { CustomField, TextField, SubmitField } from '../src/SpeckForm';

import ExampleEntity from './business/ExampleEntity';

const createSpeckForm = (props, children) => {
  return mount(
    <SpeckForm {...props}>
      {children}
      <SubmitField label="save" />
    </SpeckForm>
  );
};

describe('CustomField', () => {
  it('should validate and call onError', () => {
    let onErrorsSpy = sinon.spy();
    let wrapper = createSpeckForm({
      onErrors: onErrorsSpy,
      entityValidator: ExampleEntity
    }, (
      <CustomField entityField="mycustom">
        <input type="text" name="mycustom" placeholder="custom teste" />
      </CustomField>
    ));

    wrapper.find('[name="btnSubmit"]').simulate('click');
    expect(onErrorsSpy).to.have.property('callCount', 1);
    expect(onErrorsSpy.args[0][0]).to.have.property('name');
  });

  it('should validate and call onSubmit', () => {
    let onErrorsSpy = sinon.spy();
    let onSubmitSpy = sinon.spy();
    let wrapper = createSpeckForm({
      onErrors: onErrorsSpy,
      onSubmit: onSubmitSpy,
      entityValidator: ExampleEntity
    }, (
      <div>
        <TextField entityField="name" />
        <CustomField entityField="mycustom">
          <input type="text" name="mycustom" placeholder="custom teste" />
        </CustomField>
      </div>
    ));

    wrapper.find('[name="btnSubmit"]').simulate('click');
    expect(onErrorsSpy).to.have.property('callCount', 0);
    expect(onSubmitSpy).to.have.property('callCount', 1);
  });
});
