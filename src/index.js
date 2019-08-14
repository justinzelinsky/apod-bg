#!/usr/bin/env node
'use strict';

const meow = require('meow');
const {
  firstApodDate,
  lastApodDate,
  setDesktopWallpaper
} = require('./apodWallpaper');

const cli = meow(
  `
    Usage
      $ apod-bg

    Options
      --apiKey, -k       APOD Api Key (also can specify as an environment variable named APOD_API_KEY)
      --hd               Enable HD (default true)
      --location, -l     Directory to save image (default /tmp/)
      --endDate, -e      End Date in MM/DD/YYYY format (default - today) Note: Must not be after today
      --startDate, -s    Start Date in MM/DD/YYYY format (default - 05/16/1995) Note: Must not be before 05/16/1991
      --version          Display current version

    Examples
      $ apod-bg
      $ apod-bg --startDate 01/01/2000 --endDate 10/10/2010
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
        default: firstApodDate.format('MM/DD/YYYY'),
        alias: 's'
      },
      endDate: {
        type: 'string',
        default: lastApodDate.format('MM/DD/YYYY'),
        alias: 'e'
      },
      location: {
        type: 'string',
        alias: 'l',
        default: '/tmp/'
      }
    }
  }
);

setDesktopWallpaper(cli.flags);
