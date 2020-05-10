const execa = require('execa');
const path = require('path');

const { formatDate } = require('../src/dates');
const pkg = require('../package.json');

const SUCCESS_TEXT_REGEX = /^Background image saved to (.*) and set to (.*)!$/;
const INVALID_START_TEXT_REGEX = /^Invalid start date (.*) supplied. Please use a date in the format YYYY-MM-DD that is not before 1995-05-16$/;
const INVALID_END_TEXT_REGEX = /^Invalid end date (.*) supplied. Please use a date in the format YYYY-MM-DD that is not after today.$/;
const MISSING_API_KEY = 'Missing API Key';
const INVALID_API_KEY =
  'Error retrieving image: An invalid api_key was supplied. Get one at https://api.nasa.gov:443';

const bin = path.join(__dirname, '../src/index.js');

test('Basic functionality: apod-bg', async () => {
  const { stdout } = await execa(bin);
  expect(SUCCESS_TEXT_REGEX.test(stdout)).toBeTruthy();
}, 15000);

test('Print Version: apod-bg --version', async () => {
  const { stdout } = await execa(bin, ['--version']);
  expect(stdout).toEqual(pkg.version);
});

test('Missing API key: apod-bg', async () => {
  const { stderr, stdout } = await execa(bin, [], {
    env: { APOD_API_KEY: '' },
  });
  expect(stdout).toBeFalsy();
  expect(stderr).toEqual(MISSING_API_KEY);
});

test('Invalid API key: apod-bg', async () => {
  const { stderr, stdout } = await execa(bin, [], {
    env: { APOD_API_KEY: 'foo' },
  });
  expect(stdout).toBeFalsy();
  expect(stderr).toEqual(INVALID_API_KEY);
});

test('Invalid Start Date: apod-bg --startDate 1995-05-15', async () => {
  const { stderr, stdout } = await execa(bin, ['--startDate', '1995-05-15']);
  expect(stdout).toBeFalsy();
  expect(INVALID_START_TEXT_REGEX.test(stderr)).toBeTruthy();
});

test('Invalid End Date: apod-bg --endDate <after today>', async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowFormat = formatDate(tomorrow);

  const { stderr, stdout } = await execa(bin, ['--endDate', tomorrowFormat]);
  expect(stdout).toBeFalsy();
  expect(INVALID_END_TEXT_REGEX.test(stderr)).toBeTruthy();
});

test('Date formatting', () => {
  const date1 = new Date('05-16-1991');
  expect(formatDate(date1)).toEqual('1991-05-16');
});
