import React from "react"
import { useState } from "react";
import './ImageUpload.css'
function ImageUpload(){
    const [base64String, setBase64String] = useState('');

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    // Create a new FileReader instance
    const reader = new FileReader();

    // Set the onload event handler
    reader.onload = () => {
      // Get the base64 encoded string
      const base64String = reader.result.split(',')[1];
      
      // Set the base64 string as state
      setBase64String(base64String);
      console.log(base64String);
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
    };
  return(
    <div className="imageupload-container">
    <input type="file" onChange={handleFileInputChange} />
    {base64String && <img src={`data:image/jpeg;base64,${base64String}`} alt='' />}
  </div>
  );
}
export default ImageUpload;