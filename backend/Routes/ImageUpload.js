const express = require('express');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('image'), (req, res) => {
  const imageName = req.body.imageName;
  console.log(imageName);
  const fileExtension = req.file.originalname.split('.').pop();
  console.log(fileExtension);
  const customFileName = imageName + '.' + fileExtension;
  console.log(customFileName);
   
  const filePath = 'uploads/' + customFileName;
  console.log(filePath);
  fs.rename(req.file.path, filePath, (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({message:'Error saving image'});
    } else {
      res.json({message:'Image saved successfully'});
    }
  });
});
router.get('/:name',(req,res)=>{
    const imagePath = `/backend/uploads/${req.params.name}.jpg`
    res.send(imagePath);
})
module.exports=router;