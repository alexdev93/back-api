const multer = require('multer');
const path = require('path');
const fs = require('fs');

const NEWS_IMAGE_DIR = `src/newsImageDIR`

const createUploadsFolder = () => {
  const dir =  NEWS_IMAGE_DIR;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    console.log(`Created ${dir} folder`);
  }
};

createUploadsFolder();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, NEWS_IMAGE_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

module.exports = multer({ storage: storage });