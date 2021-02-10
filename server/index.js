const express = require('express'),
      multer = require('multer');

const os = require('os');

const csvUploadRoute = require(`${__dirname}/routes/csv-upload`);

const UPLOAD_PATH = process.env.UPLOAD_PATH || `${os.tmpdir()}/csv-parse-upload`;
const PORT = process.env.PORT || 3000;

const upload = multer({ dest: `${UPLOAD_PATH}/`});

const app = express();

app.post('/upload', upload.single('file'), csvUploadRoute);

app.listen(PORT, function listenCallback() {
    console.log(`Server listening on port ${PORT}!`);
});

