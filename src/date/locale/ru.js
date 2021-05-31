const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
];
const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

const ru = {
  localize: {
    month: (n) => months[n],
    day: (n) => days[n]
  },
  formatLong: {},
  match: {},
  options: {
    weekStartsOn: 1
  }
};

export default ru;
