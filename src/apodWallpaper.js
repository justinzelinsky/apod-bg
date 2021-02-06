const fs = require('fs');
const https = require('https');
const path = require('path');
const wallpaper = require('wallpaper');
const { getRandomDate } = require('./dates');
const { get } = require('./get');

async function setDesktopWallpaper(flags) {
  if (!flags.apiKey) {
    console.error('Missing API Key');
    return;
  }

  const { apiKey, endDate, hd, location, startDate } = flags;

  const randomDate = getRandomDate(startDate, endDate);

  if (randomDate) {
    const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&hd=${hd}&date=${randomDate}`;

    try {
      const { hdurl, title, error } = await get(apodUrl);

      if (error) {
        console.error(`Error retrieving image: ${error.message}`);
        return;
      }

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
    } catch(error) {
      console.error(`Error retrieving image: ${error.error.message}`)
    }
  }
}

module.exports = {
  setDesktopWallpaper
};
