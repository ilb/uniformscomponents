import React from 'react';
import { AutoForm } from 'uniforms-semantic';
import { createSchemaBridge } from './src';
import { CustomAutoField } from './src';

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
      profession: {
        type: 'string',
        options: [
          {
            text: 'Developer',
            value: 'developer'
          },
          {
            text: 'Tester',
            value: 'tester'
          },
          {
            text: 'Product owner',
            value: 'product-owner'
          },
          {
            text: 'Project manager',
            value: 'project-manager'
          },
          {
            text: 'Businessman',
            value: 'businessman'
          }
        ]
      },
      regDate: { type: 'string', format: 'date' },
      workExperience: {
        description: 'Work experience in years',
        type: 'integer',
        minimum: 0,
        maximum: 100
      },
      check: { type: 'boolean' },
      zip: { type: 'string', pattern: '[0-9]{5}' },
      color: { type: 'string', enum: ['red', 'amber', 'green'] }
    },
    required: ['firstName', 'lastName']
  };

  const model = {
    profession: 'businessman',
    zip: 123456
  };

  return (
    <AutoForm
      schema={createSchemaBridge(schema)}
      model={model}
      onSubmit={onSubmit}
      autoField={CustomAutoField}
      showInlineError={true}
    />
  );
}
