const multer = require('multer');
const path = require('path');
const fs = require('fs');

const NEWS_IMAGE_DIR = `src/newsImageDIR`
const HOUSE_IMAGE_DIR = `src/houseImageDIR`

const createUploadsFolder = () => {
  const newsImage =  NEWS_IMAGE_DIR;
  const houseImage = HOUSE_IMAGE_DIR;
  if (!fs.existsSync(newsImage) && !fs.existsSync(houseImage)) {
    fs.mkdirSync(newsImage);
    fs.mkdirSync(houseImage)
    console.log(`Created ${newsImage} and ${houseImage} folder`);
  }
};

createUploadsFolder();

const newsImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, NEWS_IMAGE_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const houseImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, HOUSE_IMAGE_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const newsImageUpload = multer({ storage: newsImageStorage });
const houseImageUpload = multer({ storage: houseImageStorage });

module.exports = {newsImageUpload, houseImageUpload}