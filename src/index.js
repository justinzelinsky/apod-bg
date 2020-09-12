#!/usr/bin/env node
'use strict';

const { setDesktopWallpaper } = require('./apodWallpaper');
const { defaultEndDate, defaultStartDate } = require('./dates');
const minimist = require('minimist');
const packageJson = require('../package.json');

const flags = minimist(process.argv.slice(2));

if (flags.version) {
  console.log(packageJson.version);
} else if (flags.help) {
  console.log(`
    Usage
      $ apod-bg

    Options
      --apiKey           APOD API Key (also can specify as an environment variable named APOD_API_KEY)
      --endDate          End Date in YYYY-MM-DD format (default - today) Note: Must not be after today
      --hd               Enable HD (default true)
      --location         Directory to save image (default /tmp/)
      --startDate        Start Date in YYYY-MM-DD format (default - 1995-05-16) Note: Must not be before 1995-05-16
      --version          Current application version

    Examples
      $ apod-bg
      $ apod-bg --startDate 2000-01-01 --endDate 2010-10-10
      $ apod-bg --location ~/Pictures
  `);
} else {
  const {
    apiKey = process.env.APOD_API_KEY,
    endDate = defaultEndDate,
    hd = true,
    location = '/tmp/',
    startDate = defaultStartDate,
  } = flags;

  setDesktopWallpaper({apiKey, endDate, hd, location, startDate});
}

