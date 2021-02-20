function pad(number) {
  if (number < 10) {
    return '0' + number;
  }
  return number;
}

/*eslint no-unused-vars: ["error", { "args": "none" }]*/
export default function formatISO(date, options) {
  return date.getUTCFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
}
