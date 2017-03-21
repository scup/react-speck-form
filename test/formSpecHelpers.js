import React from 'react';
import { mount } from 'enzyme';

import ExampleEntity from './business/ExampleEntity';

import SpeckForm from '../src/SpeckForm';

function _form(field) {
  return (
    <SpeckForm
      onErrors={(errors) => console.log(errors)}
      onSuccess={(data) => console.log(data)}
      entityValidator={ExampleEntity}>
      {field}
    </SpeckForm>
  );
}

export const Given = (field, callback) => {
  callback(mount(_form(field)));
}

let _expect;
export const When = (expectValue) => {
  _expect = expect(expectValue);
}

export const Then = (value) => {
  let values = value;
  if (!Array.isArray(value)) {
    values = [value];
  }
  return values.map((x) => {
    const newValue = x
      .replace(/\n/gi, '')
      .replace(/>([^<^\w]*)</gi, '><');
    return _expect.to.contains(newValue);
  });
}
