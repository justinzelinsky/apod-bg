const path = require('path');
const spawn = require('spawn-command');

const pjson = require('../package.json');

const APOD_BG_PATH = require.resolve('../src/index');

const SUCCESS_TEXT_REGEX = /^Background image saved to (.*) and set to (.*)!$/;

test('apod-bg --version', async () => {
  const stdout = await runApodBgCli('--version');
  expect(stdout).toEqual(pjson.version);
});

test('apod-bg', async () => {
  const stdout = await runApodBgCli();
  expect(SUCCESS_TEXT_REGEX.test(stdout)).toBeTruthy();
}, 15000);

test('apod-bg --location ~/Pictures', async () => {
  const stdout = await runApodBgCli('--location ~/Pictures');
  expect(SUCCESS_TEXT_REGEX.test(stdout)).toBeTruthy();
  expect(
    SUCCESS_TEXT_REGEX.exec(stdout)[0].indexOf('/Pictures')
  ).toBeGreaterThan(-1);
}, 15000);

/* Help for testing CLI came from https://github.com/kentcdodds/split-guide */

const runApodBgCli = (args = '', cwd = process.cwd()) => {
  const isRelative = cwd[0] !== '/';
  if (isRelative) {
    cwd = path.resolve(__dirname, cwd);
  }

  return new Promise((resolve, reject) => {
    let stdout = '';
    let stderr = '';
    const command = `${APOD_BG_PATH} ${args}`;
    const child = spawn(command, { cwd });

    child.on('error', error => {
      reject(error);
    });

    child.stdout.on('data', data => {
      stdout += data.toString();
    });

    child.stderr.on('data', data => {
      stderr += data.toString();
    });

    child.on('close', () => {
      if (stderr) {
        reject(stderr.trim());
      } else {
        resolve(stdout.trim());
      }
    });
  });
};
