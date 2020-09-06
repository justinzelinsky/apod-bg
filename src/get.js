const https = require('https');

function get(url) {
  return new Promise(function(resolve, reject) {
    https.get(url, function(response) {
      response.setEncoding('utf8');
      let body = '';

      response.on('data', data => (body += data));

      response.on('error', error => reject(error));

      response.on('end', function() {
        body = JSON.parse(body);
        if (response.statusCode >= 200 && response.statusCode < 300) {
          resolve(body);
        } else {
          reject(body);
        }
      });
    });
  });
}

module.exports = {
  get
}