const express = require('express');
const multer = require('multer');
const path = require('path');
const { uploadKML, getMission } = require('../controllers/missionController');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/upload-kml', upload.single('kmlFile'), uploadKML);
router.get('/:id', getMission);

module.exports = router;
