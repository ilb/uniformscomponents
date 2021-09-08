import Ajv from 'ajv';
import JSONSchemaBridge from 'uniforms-bridge-json-schema';
import localize from 'ajv-i18n';
//import addFormats from 'ajv-formats';
export { default as CustomAutoField } from './CustomAutoField';
export { default as DateField } from './DateField';
export { default as PhoneField } from './PhoneField';
export { default as SelectField } from './SelectField';

export const ajv = new Ajv({ allErrors: true, useDefaults: true, coerceTypes: true });
ajv.addKeyword('uniforms');
ajv.addKeyword('options');
//addFormats(ajv);

export function createValidator(schema) {
  const validator = ajv.compile(schema);

  return (model) => {
    validator(model);

    if (validator.errors && validator.errors.length) {
      localize.ru(validator.errors);
      return { details: validator.errors };
    }
  };
}

export function createSchemaBridge(schema) {
  return new JSONSchemaBridge(schema, createValidator(schema));
}
