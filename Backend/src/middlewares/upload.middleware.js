const multer = require("multer");

// Multer storage configuration (storing in memory before uploading)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit: 5MB per file
});

module.exports = upload;
