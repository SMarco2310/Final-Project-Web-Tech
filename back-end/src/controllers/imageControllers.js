// This is the logic behind the image hosting 
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        ok: false,
        message: "No image file provided"
      });
    }

    res.status(200).json({
      ok: true,
      imageUrl: req.file.path,
      public_id: req.file.filename,
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
