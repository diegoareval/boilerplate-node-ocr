const express = require('express');
const app = express();
// Creates a client
const client = require("./config/gcloud");
const buildRequestDetection = require('./helpers');
app.use(express.json());

app.post('/image', function (req, res) {
    client
  .labelDetection('./nature.jpeg')
  .then(results => {
    const labels = results[0].labelAnnotations;
    labels.forEach(label => console.log(label));
    return res.json({
        status: true, data: labels
    })
  })
  .catch(err => {
    console.error('ERROR:', err);
    return res.json({ status: false, error: err.message });
  });
})

app.post('/text-detection', async function (req, res) {
   try {
    const request = buildRequestDetection("https://lh4.googleusercontent.com/-wm-ReffIBqo/VCrUUAZtH9I/AAAAAAAAGVo/yK8SlvdPKdQ/s458/documento-unico-de-identidad-el-salvador.jpg");
      const [result] = await client.batchAnnotateImages(request);
      const detections = result.responses[0].fullTextAnnotation;
      return res.json({
        status: true, data: detections.text
    })
   } catch (err) {
    return res.json({ status: false, error: err.message });
   }
})


app.listen(5000, '127.0.0.1', () => console.log('Server running'));