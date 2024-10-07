const express = require('express');
const multer = require('multer');
const fs = require('fs');
const csv = require('csv-parse');
const router = express.Router();
const path = require('path');

// Set up multer for file uploads
const upload = multer({
  dest: 'uploads/',
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== '.csv' && ext !== '.txt') {
      return cb(new Error('Only CSV and TXT files are allowed'), false);
    }
    cb(null, true);
  },
});

// POST route for customization
router.post('/customize', upload.single('file'), (req, res) => {
  const { color } = req.body;

  // Handle file upload
  if (req.file) {
    const filePath = req.file.path;

    // Check if file is CSV and parse it
    if (req.file.mimetype === 'text/csv') {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          console.log(`Parsed row: ${row}`);
        })
        .on('end', () => {
          console.log('CSV file successfully processed');
        });
    }

    // Check if file is TXT and read it
    if (req.file.mimetype === 'text/plain') {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        console.log('TXT file content:', data);
      });
    }
  }

  // Save color and file data (you can save these to your database)
  console.log(`Chatbot Color: ${color}`);
  res.json({ message: 'Customization saved successfully!' });
});

module.exports = router;
