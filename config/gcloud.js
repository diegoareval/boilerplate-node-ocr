const vision = require('@google-cloud/vision');
// Creates a client
const gClient = new vision.ImageAnnotatorClient({
  keyFilename: './APIKey.json'
});

module.exports = gClient;