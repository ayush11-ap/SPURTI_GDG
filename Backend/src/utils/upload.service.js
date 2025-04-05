const { bucket } = require("./googleCloud");
const path = require("path");
const { format } = require("util");

const uploadFileToGCS = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file provided");
      return;
    }

    const blob = bucket.file(Date.now() + path.extname(file.originalname));
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: { contentType: file.mimetype },
    });

    blobStream.on("error", (err) => reject(err));
    blobStream.on("finish", async () => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );
      resolve(publicUrl);
    });

    blobStream.end(file.buffer);
  });
};

module.exports = { uploadFileToGCS };
