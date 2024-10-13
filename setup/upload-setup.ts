import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/') 
  }
});

const upload = multer({ storage });

export default upload;
