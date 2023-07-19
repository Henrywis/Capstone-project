// import express from 'express';
// const multer = require("multer");
// const path = require("path");

// const router = express.Router();

// // Create a Multer storage configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads"); // Directory to save the uploaded files
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const extension = path.extname(file.originalname);
//     cb(null, uniqueSuffix + extension); // Rename the uploaded file
//   },
// });

// // Create a Multer upload instance with the storage configuration
// const upload = multer({ storage: storage });

// // POST route for file upload
// router.post("/", upload.single("photo"), (req, res) => {
//   // Here, I want to save the file path or URL to a database or session
//   // and return the file information as a response if needed
//   res.json({
//     filename: req.file.filename,
//     path: req.file.path
//   });
// });

// module.exports = router;

import express from 'express';
import multer from 'multer';
import { extname } from 'path';

const router = express.Router();

// Create a Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Directory to save the uploaded files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = extname(file.originalname);
    cb(null, uniqueSuffix + extension); // Rename the uploaded file
  },
});

// Create a Multer upload instance with the storage configuration
const upload = multer({ storage: storage });

// POST route for file upload
router.post('/', upload.single('photo'), (req, res) => {
  // Here, I want to save the file path or URL to a database or session
  // and return the file information as a response if needed
  res.json({
    filename: req.file.filename,
    path: req.file.path,
  });
});

export default router;

