'use strict';

const fs = require('fs');
const osascript = require('node-osascript');
const request = require('request');

const apiKey = "NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo"; // Probably should get my own key

const start = new Date(1995, 5, 16).getTime(); // First APOD
const end = new Date().getTime();
const randomDate = new Date(start + Math.random() * (end - start)).toISOString().slice(0, 10);
const apodUrl = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey + "&hd=true&date=" + randomDate;

request(apodUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
        const {hdurl} = JSON.parse(body);
        const fileName = hdurl.slice(hdurl.lastIndexOf('/') + 1);
        request(hdurl)
            .pipe(fs.createWriteStream('/tmp/' + fileName))
            .on('finish', () => osascript.execute('tell application "Finder" to set desktop picture to POSIX file "/tmp/' + fileName + '"'));
    }
});
