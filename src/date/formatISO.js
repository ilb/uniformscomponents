function pad(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}

/*eslint no-unused-vars: ["error", { "args": "none" }]*/
export default function formatISO(date, options) {
  var getMonth = pad(date.getMonth() + 1);
  var getDate = pad(date.getDate());
  var getYear = date.getUTCFullYear();

  if (getMonth === '01' && getDate === '01') {getYear++;}

  return getYear + '-' + getMonth + '-' + getDate;
}
