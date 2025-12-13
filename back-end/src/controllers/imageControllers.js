import cloudinary from "../config/cloudinary.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        ok: false, 
        message: "No image file provided" 
      });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: "image",
      folder: "Lost&Found",
    });

    res.status(200).json({
      ok: true,
      url: result.secure_url,
      public_id: result.public_id,
      message: "Image uploaded successfully"
    });

  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ 
      ok: false, 
      error: error.message 
    });
  }
};