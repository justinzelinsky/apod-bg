import fs from 'fs';
import fetch from 'node-fetch';
import wallpaper from 'wallpaper';

const apiKey = process.env.APOD_API_KEY;
const start = new Date(1995, 5, 16).getTime(); // First APOD
const end = new Date().getTime();
const randomDate = new Date(start + Math.random() * (end - start))
  .toISOString()
  .slice(0, 10);
const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&hd=true&date=${randomDate}`;

const setDesktopWallpaper = async () => {
  const apodResponse = await fetch(apodUrl);
  const { hdurl, error, title } = await apodResponse.json();
  if (error) {
    console.log(error.message);
  } else {
    const fileName = hdurl.slice(hdurl.lastIndexOf('/') + 1);
    const fileLocation = `/tmp/${fileName}`;
    const fileDestination = fs.createWriteStream(fileLocation);

    const fileResponse = await fetch(hdurl);
    fileResponse.body.pipe(fileDestination);
    fileDestination.on('finish', () => {
      console.log(`Background set to ${title}!`);
      wallpaper.set(fileLocation);
    });
  }
};

setDesktopWallpaper();
