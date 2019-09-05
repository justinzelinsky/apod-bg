const fs = require('fs');
const https = require('https');
const path = require('path');
const wallpaper = require('wallpaper');

const firstApodDate = new Date('1995-05-16');
const lastApodDate = new Date();

const formatDate = date => {
  const year = date.getUTCFullYear();

  let month = (1 + date.getUTCMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  let day = date.getUTCDate().toString();
  day = day.length > 1 ? day : '0' + day;

  return `${year}-${month}-${day}`;
};

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

  const start = new Date(startDate);
  if (start < firstApodDate) {
    console.error(
      `Invalid start date ${startDate} supplied. Please use a date in the format YYYY-MM-DD that is not before 1995-05-16`
    );
    return;
  }

  const end = new Date(endDate);
  if (end > lastApodDate) {
    console.error(
      `Invalid end date ${endDate} supplied. Please use a date in the format YYYY-MM-DD that is not after today.`
    );
    return;
  }

  const startTime = start.getTime();
  const endTime = end.getTime();

  const randomDate = formatDate(
    new Date(startTime + Math.random() * (endTime - startTime))
  );

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

      https.get(hdurl, res => res.pipe(fileDestination));
    }
  };
};

module.exports = {
  firstApodDate: formatDate(firstApodDate),
  lastApodDate: formatDate(lastApodDate),
  setDesktopWallpaper
};
