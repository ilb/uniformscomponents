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
    traverseObject(model)
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


function cleanString(str) {
  if(str){
    let cleanedStr = str
  // Заменяем табуляции на пробелы
  cleanedStr = cleanedStr.replace('\t',' ')
  // Удаляем последовательности пробелов, если их больше двух
  cleanedStr = cleanedStr.replace(/ {3,}/g, ' ');
  // Удаляем пробелы с начала и конца строки
  cleanedStr = cleanedStr.trim();

  return cleanedStr;
}
return str
}

function traverseObject(obj) {
  for (let key in obj) {
      if (obj.hasOwnProperty(key)) { // Проверка, что ключ принадлежит самому объекту, а не его прототипу
          let value = obj[key];

          if (typeof value === 'string') {
              obj[key] = cleanString(value); // Очистка строки и присвоение значения обратно в объект
          }

          if (typeof obj[key] === 'object' && obj[key] !== null) {
              traverseObject(obj[key]); // Рекурсивный вызов для вложенных объектов
          }
      }
  }
}