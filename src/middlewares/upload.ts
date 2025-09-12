import upload from '../config/multer';

export const uploadLogo = upload.single('logo');
export const uploadFile = upload.single('file');
