import Ajv from 'ajv';
import JSONSchemaBridge from 'uniforms-bridge-json-schema';
import localize from 'ajv-i18n';
import registerAjvKeywords from './utils/registerAjvKeywords';
export { default as CustomAutoField } from './CustomAutoField';
export { default as DateField } from './DateField';
export { default as PhoneField } from './PhoneField';
export { default as SelectField } from './SelectField';

export const ajv = new Ajv({ allErrors: true, useDefaults: true, coerceTypes: true });
ajv.addKeyword('uniforms');
ajv.addKeyword('options');
//addFormats(ajv);

// email or empty string
ajv.addFormat(
  'email',
  /(^[a-z\d.!#$%&'*+/=?^_`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$)|(^$)/
);

registerAjvKeywords(ajv);

export function createValidator(schema, additionalValidator) {
  const validator = ajv.compile(schema);

  return (model) => {
    let errors = [];

    if (additionalValidator) {
      errors = errors.concat(additionalValidator(model));
    }

    validator(model);

    if (validator.errors && validator.errors.length) {
      errors = errors.concat(validator.errors);
    }
    if (errors.length) {
      localize.ru(errors);
      return { details: errors };
    }
  };
}

export function createSchemaBridge(schema, additionalValidator) {
  return new JSONSchemaBridge(schema, createValidator(schema, additionalValidator));
}
