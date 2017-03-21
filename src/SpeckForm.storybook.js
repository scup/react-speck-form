import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/theme/github';

import ExampleEntity from '../test/business/ExampleEntity';

import SpeckForm, {
  TextField,
  ColorField,
  DateField,
  EmailField,
  NumberField,
  RangeField,
  RadioField,
  PasswordField,
  CheckboxField,
  SubmitField,
  TextareaField,
  SelectField,
  CustomField,
  SpeckFormScaffold
} from './SpeckForm';

const data = {
  title: 'My Title',
  link: null,
  description: null,
  date: new Date(),
  owner: 2,
  author: 1
};

storiesOf('SpeckForm', module)
  .add('default', () => (
    <SpeckForm
      data={data}
      entityValidator={ExampleEntity}
      onSubmit={action('onSubmit')}
      onErrors={action('onErrors')}>
      <TextField label="Text Field: " entityField="my_text_prop" />
      <SelectField label="Select Field: " entityField="my_textarea_prop">
        <option value="">--</option>
        <option value="1">option 1</option>
        <option value="2">option 2</option>
        <option value="3">option 3</option>
      </SelectField>
      <ColorField label="Color Field: " entityField="my_color_prop" />
      <DateField label="Date Field: " entityField="my_date_prop" />
      <EmailField label="Email Field: " entityField="my_email_prop" />
      <NumberField label="Number Field: " entityField="my_number_prop" />
      <RangeField label="Range Field: " entityField="my_number_prop" />
      <PasswordField label="Password Field: " entityField="my_number_prop" />
      <RadioField label="Password Field:" entityField="my_radio_prop" />
      <RadioField label="Password Field:" entityField="my_radio_prop" />
      <RadioField label="Password Field:" entityField="my_radio_prop" />
      <CheckboxField label="Checkbox (required): " entityField="my_month_prop" />
      <TextareaField label="Textarea:" entityField="my_textarea_prop" />

      <CustomField entityField="mycustom">
        <label>Custom field</label>
        <input type="text" name="mycustom" />
      </CustomField>
      <SubmitField label="save" />
      <AceEditor
        mode="java"
        value="var teste = 123;"
        theme="github"
        name="UNIQUE_ID_OF_DIV"
        editorProps={{$blockScrolling: true}}
      />
    </SpeckForm>
  )).add('scaffold', () => {
    const formOptions = {
      gender: {
        label: "Gender",
        widget: RadioField
      }
    };
    return (
      <SpeckForm
        entityValidator={ExampleEntity}
        onSubmit={action('onSubmit')}
        onErrors={action('onErrors')}>
        <SpeckFormScaffold
          entity={ExampleEntity}
          formOptions={formOptions}/>
        <SubmitField label="save" />
      </SpeckForm>
    );
  });
