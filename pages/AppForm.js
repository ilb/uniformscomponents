import React from 'react';
import { AutoForm } from 'uniforms-semantic';
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
      firstName: { type: 'string', minLength: 1, maxLength: 10 },
      lastName: { type: 'string', isNotEmpty: true },
      profession: {
        type: 'string',
        options: [
          {
            label: 'Most selectable',
            text: 'Developer',
            value: 'developer'
          },
          {
            label: 'Tester',
            value: 'tester'
          },
          {
            label: 'Product owner',
            value: 'product-owner'
          },
          {
            label: 'Project manager',
            value: 'project-manager'
          },
          {
            label: 'Businessman',
            value: 'businessman'
          }
        ],
        uniforms: {
          search: true
        }
      },
      users: {
        type: 'array',
        title: 'User',
        options: [
          {
            label: 'Tester',
            value: 'tester'
          },
          {
            label: 'Project manager',
            value: 'project-manager'
          },
          {
            label: 'Developer',
            value: 'developer'
          }
        ],
        items: { type: 'string' },
        uniforms: { search: 'true' }
      },
      amount: { type: 'number', uniforms: { decimalScale: 2, thousandSeparator: true } },
      readOnly: { type: 'number', readOnly: true },
      year: {
        type: 'number',
        uniforms: { decimalScale: 0, thousandSeparator: null, format: '####' }
      },
      regDate: { type: 'string', format: 'date' },
      workExperience: {
        description: 'Work experience in years',
        type: 'integer',
        minimum: 0,
        maximum: 100
      },
      phone: {
        type: 'string',
        uniforms: { type: 'phone', format: '+7 ### ###-##-##' },
        minLength: 10,
        maxLength: 10
      },
      phone2: {
        type: 'string',
        uniforms: { type: 'phone', format: '+7 ### ###-##-##', useFormattedValue: true },
        maskedNumberLength: 11
      },
      email: {
        title: 'E-mail',
        type: 'string',
        format: 'email'
      },
      check: { type: 'boolean' },
      zip: { type: 'string', pattern: '[0-9]{5}' },
      color: { type: 'string', enum: ['red', 'amber', 'green'] },
      fruits: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      vegetables: {
        type: 'array',
        items: { $ref: '#/$defs/veggie' }
      }
    },
    required: ['firstName', 'lastName', 'phone'],
    $defs: {
      veggie: {
        type: 'object',
        required: ['veggieName', 'veggieLike'],
        properties: {
          veggieName: {
            type: 'string',
            description: 'The name of the vegetable.'
          },
          veggieLike: {
            type: 'boolean',
            description: 'Do I like this vegetable?'
          }
        }
      }
    }
  };

  const model = {
    profession: 'businessman',
    zip: 123456,
    phone2: '71234567890',
    regDate: '2021-04-15',
    year: 2014
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
