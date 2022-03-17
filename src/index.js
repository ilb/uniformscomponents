import JSONSchemaBridge from 'uniforms-bridge-json-schema';
import localize from 'ajv-i18n';
//import addFormats from 'ajv-formats';
export { default as CustomAutoField } from './CustomAutoField';
export { default as DateField } from './DateField';
export { default as PhoneField } from './PhoneField';
export { default as SelectField } from './SelectField';

export function createValidator(schema, ajv, additionalValidator) {
  const validator = ajv.compile(schema);

  return (model) => {
    let errors = [];

    validator(model);

    if (validator.errors && validator.errors.length) {
      errors = validator.errors;
    }

    if (additionalValidator) {
      errors = errors.concat(additionalValidator(model));
    }

    if (errors.length) {
      localize.ru(errors);
      return { details: errors };
    }
  };
}

export function createSchemaBridge(schema, ajv, additionalValidator) {
  return new JSONSchemaBridge(schema, createValidator(schema, ajv, additionalValidator));
}
