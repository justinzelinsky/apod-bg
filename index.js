const https = require('https');
const fs = require('fs');
const osascript = require('node-osascript');
const apiKey = process.env.APOD_API_KEY;

const start = new Date(1995, 5, 16).getTime(); // First APOD
const end = new Date().getTime();
const randomDate = new Date(start + Math.random() * (end - start)).toISOString().slice(0, 10);
const apodUrl = 'https://api.nasa.gov/planetary/apod?api_key=' + apiKey + '&hd=true&date=' + randomDate;

https.request(apodUrl, function(response) {
    let body = '';
    response.setEncoding('utf8');
    response.on('data', data => {
        body += data;
    });
    response.on('end', () => {
        const {hdurl} = JSON.parse(body);
        const fileName = hdurl.slice(hdurl.lastIndexOf('/') + 1);
        https.request(hdurl, function(response) {
            let imageData = '';
            response.setEncoding('binary');
            response.on('data', chunk => {
                imageData += chunk;
            });
            response.on('end', () => {
                fs.writeFile('/tmp/' + fileName, imageData, 'binary', error => {
                    if (error) {
                        throw error;
                    }
                    osascript.execute('tell application "Finder" to set desktop picture to POSIX file "/tmp/' + fileName + '"');
                });
            });
        }).end();
    });
}).end();
