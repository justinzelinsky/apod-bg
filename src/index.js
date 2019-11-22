#!/usr/bin/env node
'use strict';

const meow = require('meow');
const {
  defaultEndDate,
  defaultStartDate,
  setDesktopWallpaper
} = require('./apodWallpaper');

const cli = meow(
  `
    Usage
      $ apod-bg

    Options
      --apiKey, -k       APOD Api Key (also can specify as an environment variable named APOD_API_KEY)
      --hd               Enable HD (default true)
      --location,        Directory to save image (default /tmp/)
      --endDate,         End Date in YYYY-MM-DD format (default - today) Note: Must not be after today
      --startDate,       Start Date in YYYY-MM-DD format (default - 1995-05-16) Note: Must not be before 1995-05-16
      --version          Display current version

    Examples
      $ apod-bg
      $ apod-bg --startDate 2000-01-01 --endDate 2010-10-10
      $ apod-bg --location ~/Pictures
`,
  {
    flags: {
      apiKey: {
        type: 'string',
        alias: 'k',
        default: process.env.APOD_API_KEY
      },
      hd: {
        type: 'boolean',
        default: true
      },
      startDate: {
        type: 'string',
        default: defaultStartDate
      },
      endDate: {
        type: 'string',
        default: defaultEndDate
      },
      location: {
        type: 'string',
        default: '/tmp/'
      }
    }
  }
);

setDesktopWallpaper(cli.flags);
