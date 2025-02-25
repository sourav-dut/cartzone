// MULTER
import multer from 'multer';
import path from 'path';

// Store files in a temporary folder
const storage = multer.diskStorage({});

// File Filter (optional: restrict file types)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only images are allowed (JPEG, JPG, PNG)"));
  }
};


const upload = multer({ storage, fileFilter });

export default upload;
