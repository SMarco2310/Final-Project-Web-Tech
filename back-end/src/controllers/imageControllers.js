import cloudinary from "../config/cloudinary.js";
import multer from "multer";

const upload = multer();

const handler = async (req, res) => {
  try {
    const { file } = req.body;

    const result = await cloudinary.uploader.upload(file, {
      resource_type: "image",
    });

    res.status(200).json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default handler;
