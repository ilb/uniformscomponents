export const checkInn = (value) => {
  if (
    typeof value !== 'string' ||
    (value.length !== 10 && value.length !== 12) ||
    value.split('').some((symbol) => isNaN(Number(symbol)))
  )
    return false;

  if (value.length === 10) {
    return (
      Number(value[9]) ===
      (value
        .split('')
        .slice(0, -1)
        .reduce(
          (sum, symbol, index) => [2, 4, 10, 3, 5, 9, 4, 6, 8][index] * Number(symbol) + sum,
          0
        ) %
        11) %
        10
    );
  } else if (value.length === 12) {
    let checkSumOne =
      (value
        .split('')
        .slice(0, -2)
        .reduce(
          (sum, symbol, index) => [7, 2, 4, 10, 3, 5, 9, 4, 6, 8][index] * Number(symbol) + sum,
          0
        ) %
        11) %
      10;

    let checkSumTwo =
      (value
        .split('')
        .slice(0, -1)
        .reduce(
          (sum, symbol, index) => [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8][index] * Number(symbol) + sum,
          0
        ) %
        11) %
      10;

    return checkSumOne === Number(value[10]) && checkSumTwo === Number(value[11]);
  }
};

export const checkSnils = (checkedValue) => {
  checkedValue = checkedValue.replace(/\D/g, '')
  let checkSum = parseInt(checkedValue.slice(9), 10);

  //строка как массив(для старых браузеров)
  checkedValue = '' + checkedValue;
  checkedValue = checkedValue.split('');

  let sum =
    checkedValue[0] * 9 +
    checkedValue[1] * 8 +
    checkedValue[2] * 7 +
    checkedValue[3] * 6 +
    checkedValue[4] * 5 +
    checkedValue[5] * 4 +
    checkedValue[6] * 3 +
    checkedValue[7] * 2 +
    checkedValue[8] * 1;

  if (sum < 100 && sum === checkSum) {
    return true;
  } else if ((sum === 100 || sum === 101) && checkSum === 0) {
    return true;
  } else if (sum > 101 && (sum % 101 === checkSum || (sum % 101 === 100 && checkSum === 0))) {
    return true;
  } else {
    return false;
  }
};
