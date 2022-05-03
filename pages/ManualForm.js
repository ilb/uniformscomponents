import React from 'react';
import { AutoField, AutoForm, SubmitField } from 'uniforms-semantic';
import { createSchemaBridge } from '../src';
import { CustomAutoField } from '../src';

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
      readOnlyManual: { type: 'number', minLength: 1 },
      begDate: { type: 'string', format: 'date' },
      endDate: { type: 'string', format: 'date' },
      inn: {
        type: 'string',
        minLength: 10,
        maxLength: 12,
        inn: true
      },
      contacts: {
        title: 'Контакты',
        type: 'array',
        uniforms: { format: 'contacts' },
        items: {
          uniforms: { type: 'phone', format: '+7 ### ###-##-##', useFormattedValue: true },
          maskedNumberLength: 11,
          type: 'string'
        }
      }
    }
  };

  const model = {
    firstName: 'John',
    lastName: 'Unknown',
    begDate: '2021-04-15',
    contacts: [null, null]
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
      <AutoField name="inn" />
      <CustomAutoField name="readOnlyManual" readOnly />
      <CustomAutoField name="begDate" />
      <CustomAutoField name="endDate" />
      <CustomAutoField name="contacts" />

      <SubmitField value="Сохранить" />
    </AutoForm>
  );
}
