const dayjs = require('dayjs');
const fs = require('fs');
const https = require('https');
const path = require('path');
const wallpaper = require('wallpaper');

const firstApodDate = dayjs('05/16/1995');
const lastApodDate = dayjs();

const setDesktopWallpaper = async ({
  apiKey,
  endDate,
  hd,
  location,
  startDate
}) => {
  if (!apiKey) {
    console.error('Missing API Key');
    return;
  }

  const start = dayjs(startDate);
  if (start.isBefore(firstApodDate)) {
    console.error(
      `Invalid start date ${startDate} supplied. Please use a date in the format MM/DD/YYYY that is not before 05/16/1995.`
    );
    return;
  }

  const end = dayjs(endDate);
  if (end.isAfter(lastApodDate)) {
    console.error(
      `Invalid end date ${endDate} supplied. Please use a date in the format MM/DD/YYYY that is not after today.`
    );
    return;
  }

  const startTime = start.valueOf();
  const endTime = end.valueOf();

  const randomDate = dayjs(
    startTime + Math.random() * (endTime - startTime)
  ).format('YYYY-MM-DD');

  const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&hd=${hd}&date=${randomDate}`;

  https.get(apodUrl, res => {
    res.setEncoding('utf8');
    let body = '';

    res.on('data', data => {
      body += data;
    });

    res.on('error', err => {
      console.error(`Error retrieving image: ${err.message}`);
    });

    res.on('end', () => {
      body = JSON.parse(body);
      handleApodResponse(body);
    });
  });

  const handleApodResponse = apodResponse => {
    if (apodResponse.error) {
      console.error(`Error retrieving image: ${error.message}`);
    } else {
      const { hdurl, title } = apodResponse;
      https.get(hdurl, res => {
        const fileName = hdurl.slice(hdurl.lastIndexOf('/') + 1);
        const fileLocation = path.join(location, fileName);
        const fileDestination = fs.createWriteStream(fileLocation);

        fileDestination.on('error', error => {
          console.error(`Error saving image: ${error}`);
        });

        fileDestination.on('finish', () => {
          console.log(
            `Background image saved to ${fileLocation} and set to ${title}!`
          );
          wallpaper.set(fileLocation);
        });

        res.pipe(fileDestination);
      });
    }
  };
};

module.exports = {
  firstApodDate,
  lastApodDate,
  setDesktopWallpaper
};
