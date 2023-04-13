import React from "react"
import { useState } from "react";
import './AddDoctor.css'
function AddDoctor() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState('');
  const [selectedFile,setSelectedFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
  fetch('http://localhost:5000/doctors', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      surname,
      specialization,
      selectedFile,
      rating,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Form data submitted:', data);
    })
    .catch((error) => {
      console.error('Error submitting form:', error);
    });
  };
  const handleFileChange = (event) =>{
    setSelectedFile(event.target.files[0]);
  }
  return (
    <div className="add-doctor-container">
          <div className="form">
      <div className="title">Add a doctor</div>
      <div className="subtitle">Let's create your account!</div>
      <div className="input-container ic1">
        <input id="name" className="input" type="text" placeholder=" " value={name} onChange={(event) => setName(event.target.value)} />
        <div className="cut"></div>
        <label htmlFor="surname" className="placeholder">Name</label>
      </div>
      <div className="input-container ic2">
        <input id="surname" className="input" type="text" placeholder=" " value={surname} onChange={(event) => setSurname(event.target.value)} />
        <div className="cut"></div>
        <label htmlFor="surname" className="placeholder">Surname</label>
      </div>
      <div className="input-container ic2">
        <input id="specialization" className="input" type="text" placeholder=" " value={specialization} onChange={(event) => setSpecialization(event.target.value)} />
        <div className="cut"></div>
        <label htmlFor="specialization" className="placeholder">Specialization</label>
      </div>
      <div className="input-container ic2">
        <input id="rating" className="input" type="number" placeholder=" " value={rating} onChange={(event) => setRating(event.target.value)} />
        <div className="cut"></div>
        <label htmlFor="rating" className="placeholder">Rating</label>
      </div>
      <div className="input-container ic2">
        <input className="image-input"
        type = "file"
        id = "image-upload"
        accept=".png"
        onChange={handleFileChange}
         />
        <div className="cut"></div>
        <label htmlFor="image" className="placeholder">Select an image:</label>
      </div>
      <button type="text" className="submit" onClick={handleSubmit}>Submit</button>
    </div>
    </div>
  );
}
export default AddDoctor;