const { formatDate, getRandomDate } = require('../src/dates');

const uvu = require('uvu');
const assert = require('uvu/assert');

const { test } = uvu;

function getTomorrow() {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  return today.toISOString();
}

test('formatDate', function() {
  assert.equal(formatDate(new Date('01/01/2020')), '2020-01-01');
  assert.equal(formatDate(new Date('1/1/1990')), '1990-01-01');
});

test('getRandomDate', function() {
  const tomorrow = getTomorrow();

  assert.equal(getRandomDate('01-01-2000', tomorrow), null);
  assert.equal(getRandomDate('01-01-1990', '01-01-2000'), null);
});

test.run();