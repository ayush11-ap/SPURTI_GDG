const { Storage } = require("@google-cloud/storage");
const path = require("path");

// Initialize Google Cloud Storage
const storage = new Storage({
  keyFilename: path.join(__dirname, "../config/spurti.json"),
  projectId: "spurti",
});

const bucketName = "image_video_document_storage";
const bucket = storage.bucket(bucketName);

module.exports = { storage, bucket };
