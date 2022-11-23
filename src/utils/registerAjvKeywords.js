import { checkInn, checkSnils } from './rules';

export default (ajv) => {
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

      return typeof data === 'string' && (numsLength === 0 || numsLength === length);
    }
  });

  ajv.addKeyword('maskedNumberLengthStrict', {
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

      return numsLength === length;
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

      return !data || checkInn(data);
    }
  });

  ajv.addKeyword('snils', {
    type: 'string',
    errors: true,
    validate: function validate(length, data) {
      validate.errors = [
        {
          keyword: 'inn',
          message: 'СНИЛС введен некорректно',
          params: { keyword: 'snils' }
        }
      ];

      return !data || checkSnils(data);
    }
  });

  ajv.addKeyword('cyrillic', {
    type: 'string',
    errors: true,
    validate: function validate(schema, data) {
      validate.errors = [
        {
          keyword: 'cyrillic',
          message: 'Для ввода доступна только кириллица.',
          params: { keyword: 'cyrillic' }
        }
      ];
      return !data || /^[0-9а-яё.,:!?()";_/\\'\-\s]+$/i.test(data); // кириллица, цифры и знаки препинания
    }
  });

  ajv.addKeyword('latin', {
    type: 'string',
    errors: true,
    validate: function validate(schema, data) {
      validate.errors = [
        {
          keyword: 'latin',
          message: 'Для ввода доступна только латиница.',
          params: { keyword: 'latin' }
        }
      ];

      return !data || /^[0-9a-z.,:!?()";_/\\'\-\s]+$/i.test(data); // латиница, цифры и знаки препинания
    }
  });

  return ajv;
};
