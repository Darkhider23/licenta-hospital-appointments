const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const Image = require('../Models/Image');
const { encrypt } = require('../utils/crypto');

router.get('/', async (req, res) => {
  try {
    const images = await Image.findAll();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving images' });
  }
});
router.post('/', async (req, res) => {
  try {
    const { filename, url, extension } = req.body;
    const image = await Image.create({
      filename,
      url,
      extension,
    });

    res.json({ message: 'Image saved successfully', image });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ error: 'Error uploading image' });
  }
});
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const imageName = req.body.imageName;
    console.log(imageName);
    const fileExtension = req.file.originalname.split('.').pop();
    console.log(fileExtension);
    const customFileName = imageName + '.' + fileExtension;

    const filePath = 'uploads/' + customFileName;
    console.log(filePath);
    fs.rename(req.file.path, filePath, async (error) => {
      if (error) {
        console.error(error);
        res.status(500).json({ message: 'Error saving image' });
      } else {
        const image = await Image.create({
          filename: imageName,
          url: filePath,
          extension: fileExtension,
        });
        res.json({ message: 'Image saved successfully', image });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading image' });
  }
});

// Get an image by name
router.get('/:name', async (req, res) => {
  try {
    // const imageName =  await encrypt(req.params.name);
    // console.log(imageName);
    const image = await Image.findOne({ where: { filename: req.params.name } });
    console.log(image);
    if (image) {
      res.status(200).json(image);
    } else {
      res.status(404).json({ error: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving image', message: error.message });
  }
});

module.exports = router;
