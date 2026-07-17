import Gallery from "../models/Gallery.js";

export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find();

    res.json({
      success: true,
      gallery,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const addGallery = async (req, res) => {
  try {
    const image = await Gallery.create(req.body);

    res.status(201).json({
      success: true,
      image,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
