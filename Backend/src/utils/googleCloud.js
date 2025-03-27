const { Storage } = require("@google-cloud/storage");
const path = require("path");

// Initialize Google Cloud Storage
const storage = new Storage({
  keyFilename: path.join(__dirname, "../config/spurti.json"), // Path to your service account JSON
  projectId: "spurti", // Replace with your project ID
});

const bucketName = "image_video_document_storage"; // Replace with your bucket name
const bucket = storage.bucket(bucketName);

module.exports = { storage, bucket };
