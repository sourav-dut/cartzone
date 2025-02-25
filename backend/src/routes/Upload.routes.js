import express from 'express';
import upload from '../../middleware/uploadMiddleware.js';
import cloudinary from '../../config/CloudaniryConnection.js';

const router = express.Router();

router.post('/', upload.array('images', 5), async (req, res) => {
  console.log("File:", req.files);
  
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded' });
  }

  try {
    // Upload each image to Cloudinary
    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path);
        return result.secure_url; // Get the Cloudinary URL
      })
    );

    res.json({ urls: uploadedImages });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Upload failed', error });
  }
});

export default router;
