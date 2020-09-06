#!/usr/bin/env node
'use strict';

const meow = require('meow');
const { setDesktopWallpaper } = require('./apodWallpaper');
const { defaultEndDate, defaultStartDate } = require('./dates');

const cli = meow(
  `
    Usage
      $ apod-bg

    Options
      --apiKey, -k       APOD Api Key (also can specify as an environment variable named APOD_API_KEY)
      --endDate,         End Date in YYYY-MM-DD format (default - today) Note: Must not be after today
      --hd               Enable HD (default true)
      --location,        Directory to save image (default /tmp/)
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
        alias: 'k',
        default: process.env.APOD_API_KEY,
        type: 'string',
      },
      hd: {
        default: true,
        type: 'boolean',
      },
      startDate: {
        default: defaultStartDate,
        type: 'string',
      },
      endDate: {
        default: defaultEndDate,
        type: 'string',
      },
      location: {
        default: '/tmp/',
        type: 'string',
      },
    },
  }
);

setDesktopWallpaper(cli.flags);
