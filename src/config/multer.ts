import multer from 'multer';
import path from 'path';
import { Options } from 'multer';

export const options: Options = {
  dest: path.join(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: multer.diskStorage({
    destination: (request, file, cb) => {
      cb(null, path.join(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (request, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;

      cb(null, filename);
    },
  }),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2mb
  },
  fileFilter: (request, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/pjpeg',
      'image/png',
      'image/gif',
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type.'));
    }
  },
};
