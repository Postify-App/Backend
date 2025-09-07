import cloudinary from '../config/cloudinary';

class CloudinaryService {
  uploadToCloud = async (file: string) => {
    return await cloudinary.uploader.upload(file, {
      folder: 'postify',
    });
  };
}

export default new CloudinaryService();
