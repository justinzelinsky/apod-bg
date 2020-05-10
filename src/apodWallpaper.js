const fs = require('fs');
const https = require('https');
const path = require('path');
const wallpaper = require('wallpaper');
const { getRandomDate } = require('./dates');

async function setDesktopWallpaper(flags) {
  const { apiKey, endDate, hd, location, startDate } = flags;

  if (!apiKey) {
    console.error('Missing API Key');
    return;
  }

  const randomDate = getRandomDate(startDate, endDate);

  if (randomDate) {
    const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&hd=${hd}&date=${randomDate}`;

    https.get(apodUrl, function (res) {
      res.setEncoding('utf8');
      let body = '';

      res.on('data', (data) => (body += data));

      res.on('error', (err) =>
        console.error(`Error retrieving image: ${err.message}`)
      );

      res.on('end', function () {
        body = JSON.parse(body);
        handleApodResponse(location, body);
      });
    });
  }
}

function handleApodResponse(location, apodResponse) {
  if (apodResponse.error) {
    console.error(`Error retrieving image: ${apodResponse.error.message}`);
    return;
  }

  const { hdurl, title } = apodResponse;

  const fileName = hdurl.slice(hdurl.lastIndexOf('/') + 1);
  const fileLocation = path.join(location, fileName);
  const fileDestination = fs.createWriteStream(fileLocation);

  fileDestination.on('error', (error) =>
    console.error(`Error saving image: ${error}`)
  );

  fileDestination.on('finish', function () {
    console.log(
      `Background image saved to ${fileLocation} and set to ${title}!`
    );
    wallpaper.set(fileLocation);
  });

  https.get(hdurl, (res) => res.pipe(fileDestination));
}

module.exports = {
  setDesktopWallpaper,
};
