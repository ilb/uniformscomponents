import Ajv from 'ajv';
import JSONSchemaBridge from 'uniforms-bridge-json-schema';
import localize from 'ajv-i18n';
import { checkInn } from './utils/rules';
//import addFormats from 'ajv-formats';
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
  /(^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$)|(^$)/
);

ajv.addKeyword('isNotEmpty', {
  type: 'string',
  errors: true,
  validate: function validate(schema, data, parent, key) {
    validate.errors = [
      {
        keyword: 'isNotEmpty',
        message: 'должно иметь обязательное поле ' + key,
        params: { keyword: 'isNotEmpty' }
      }
    ];

    return typeof data === 'string' && data.trim() !== '';
  }
});

ajv.addKeyword('maskedNumberLength', {
  type: 'string',
  errors: true,
  validate: function validate(length, data) {
    validate.errors = [
      {
        keyword: 'maskedNumberLength',
        message: 'должно быть длинной ' + length + ' символов',
        params: { keyword: 'maskedNumberLength' }
      }
    ];

    const numsLength = data.replace(/\D/g, '').length;

    return typeof data === 'string' && numsLength === length;
  }
});

ajv.addKeyword('inn', {
  type: 'string',
  errors: true,
  validate: function validate(length, data) {
    validate.errors = [
      {
        keyword: 'inn',
        message: 'ИНН введен некорректно',
        params: { keyword: 'inn' }
      }
    ];

    return checkInn(data);
  }
});

export function createValidator(schema, additionalValidator) {
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

export function createSchemaBridge(schema, additionalValidator) {
  return new JSONSchemaBridge(schema, createValidator(schema, additionalValidator));
}
