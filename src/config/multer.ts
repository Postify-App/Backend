import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { Request } from 'express';

import APIError from '../utils/APIError';
import statusCodes from '../utils/statusCodes';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath: string = `${__dirname}/../uploads/`;

    if (file.fieldname === 'logo') uploadPath += 'business/logo';
    else uploadPath += 'others';

    if (!fs.existsSync(uploadPath))
      fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith('image/')) cb(null, true);
  else
    cb(
      new APIError(
        'File upload failed. Unsupported file type',
        statusCodes.BadRequest
      )
    );
};

export default multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});
