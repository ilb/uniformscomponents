import React from 'react';
import { AutoField, AutoForm, SubmitField } from 'uniforms-semantic';
import { createSchemaBridge } from './src';
import { CustomAutoField } from './src';
import { RangeField } from './src';

export default function AppForm() {
  function onSubmit(data) {
    alert(JSON.stringify(data));
  }
  const schema = {
    title: 'Guest',
    type: 'object',
    properties: {
      firstName: { type: 'string', minLength: 1 },
      lastName: { type: 'string', minLength: 1 },
      begDate: { type: 'string', format: 'date' },
      endDate: { type: 'string', format: 'date' },
      period: { type: 'number', minimum: 13, maximum: 96 }
    }
  };

  const model = {
    firstName: 'John',
    lastName: 'Unknown',
    begDate: '2021-04-15',
    period: 96
  };

  return (
    <AutoForm
      schema={createSchemaBridge(schema)}
      model={model}
      onSubmit={onSubmit}
      autoField={CustomAutoField}
      showInlineError={true}>
      <AutoField name="firstName" />
      <AutoField name="lastName" />

      <CustomAutoField name="begDate" />
      <CustomAutoField name="endDate" />
      <RangeField name="period" />

      <SubmitField value="Сохранить" />
    </AutoForm>
  );
}
