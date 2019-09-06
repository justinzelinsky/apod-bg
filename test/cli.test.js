const execa = require('execa');
const path = require('path');
const pjson = require('../package.json');

const SUCCESS_TEXT_REGEX = /^Background image saved to (.*) and set to (.*)!$/;

const bin = path.join(__dirname, '../src/index.js');

test('apod-bg', async () => {
  const { stdout } = await execa(bin);
  expect(SUCCESS_TEXT_REGEX.test(stdout)).toBeTruthy();
}, 15000);

test('apod-bg --version', async () => {
  const { stdout } = await execa(bin, ['--version']);
  expect(stdout).toEqual(pjson.version);
});
