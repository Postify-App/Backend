import upload from '../config/multer';

export const uploadLogo = upload.single('logo');
