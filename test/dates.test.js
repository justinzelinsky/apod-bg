const { formatDate, getRandomDate } = require('../src/dates');

function getTomorrow() {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  return today.toISOString();
}

test('formatDate', function() {
  expect(formatDate(new Date('01/01/2020'))).toEqual('2020-01-01');
  expect(formatDate(new Date('1/1/1990'))).toEqual('1990-01-01');
});

test('getRandomDate', function() {
  const tomorrow = getTomorrow();

  expect(getRandomDate('01-01-2000', tomorrow)).toEqual(null);
  expect(getRandomDate('01-01-1990', '01-01-2000')).toEqual(null);
  expect(getRandomDate('01-01-2000', '01-01-2005')).toBeTruthy();
});