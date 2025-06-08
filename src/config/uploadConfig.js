import multer from "multer";
import path from "path";
import os from "os";
import fs from "fs";

// Set path: ~/Desktop/eSigns/templates
const templatesDir = path.join(os.homedir(), "Desktop", "eSigns", "templates");

// Ensure the folder exists
if (!fs.existsSync(templatesDir)) {
  fs.mkdirSync(templatesDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, templatesDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + Date.now() + ext);
  },
});

const upload = multer({ storage });

export default upload;
