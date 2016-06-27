'use strict';

const fs = require('fs');
const osascript = require('node-osascript');
const request = require('request');

const apiKey = "NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo"; // Probably should get my own key

const start = new Date(1995, 5, 16); // First APOD
const end = new Date();
const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

const apodUrl = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey + "&hd=true&date=" + randomDate.toISOString().slice(0, 10);

request(apodUrl, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    const hdUrl = JSON.parse(body).hdurl;
    const fileName = hdUrl.slice(hdUrl.lastIndexOf('/') + 1);
    request(hdUrl).pipe(fs.createWriteStream('/tmp/' + fileName)).on('finish', function() {
      osascript.execute('tell application "Finder" to set desktop picture to POSIX file "/tmp/' + fileName + '"');
    });
  }
});
