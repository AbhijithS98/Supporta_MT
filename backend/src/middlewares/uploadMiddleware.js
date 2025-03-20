import multer from 'multer';
import fs from 'fs';
import path from 'path';


// Define the uploads directory
const UPLOADS_DIR = path.join('uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR); // Use the defined directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// File type validation
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only images (JPG, JPEG, PNG) are allowed'));
    }
};

// Initialize multer
const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max file size
    fileFilter
});

export default upload;
