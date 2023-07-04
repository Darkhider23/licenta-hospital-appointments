import React from "react"
import { useState } from "react";
import './Admin.css'
function AddDoctor() {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [specializationId, setSpecializationId] = useState('');
  const [rating, setRating] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
const role = "doctor";


  const [isOpen, setIsOpen] = useState(false);
  const toggleForm = () => {
    setIsOpen(!isOpen);
  }

  // const [searchTerm, setSearchTerm] = useState('');
  // const [searchResults, setSearchResults] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const imgname = `${firstname}${lastname}`;
    formData.append('image',selectedFile);
    formData.append('imageName',imgname);
    await fetch('http://localhost:5000/image/upload', {
      method: 'POST',
      body: formData
    })
    .then(response=>{
      console.log(response.json());
    })
    .catch(error=>{
      console.log(error.json());
    })
    fetch('http://localhost:5000/doctor/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password,
        specializationId,
        rating,
        role,
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
  return (
    <div className="admin-container">
      <div className="open-button">
      <button onClick={toggleForm}>Open Add Form</button>
      </div>
      {
        isOpen && (
          <div className="form">
            <div className="close-button">
              <button className="toggle-btn" onClick={toggleForm}>x</button>
              </div>
              <div className="title">Add a doctor</div>
              <div className="subtitle">Let's create your account!</div>
              <div className="input-container ic1">
                <input id="firstname" className="input" type="text" placeholder=" " value={firstname} onChange={(event) => setFirstName(event.target.value)} />
                <div className="cut"></div>
                <label htmlFor="firstname" className="placeholder">Name</label>
              </div>
              <div className="input-container ic2">
                <input id="lastname" className="input" type="text" placeholder=" " value={lastname} onChange={(event) => setLastName(event.target.value)} />
                <div className="cut"></div>
                <label htmlFor="lastname" className="placeholder">Surname</label>
              </div>
              <div className="input-container ic2">
                <input id="email" className="input" type="email" placeholder=" " value={email} onChange={(event) => setEmail(event.target.value)} />
                <div className="cut"></div>
                <label htmlFor="email" className="placeholder">Email</label>
              </div>
              <div className="input-container ic2">
                <input id="password" className="input" type="password" placeholder=" " value={password} onChange={(event) => setPassword(event.target.value)} />
                <div className="cut"></div>
                <label htmlFor="password" className="placeholder">Password</label>
              </div>
              <div className="input-container ic2">
                <input id="specialization" className="input" type="number" placeholder=" " value={specializationId} onChange={(event) => setSpecializationId(event.target.value)} />
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
            type="file"
            id="image-upload"
            onChange={handleFileChange}
          />
          <div className="cut"></div>
          <label htmlFor="image" className="placeholder">Select an image:</label>
        </div>
              <button type="text" className="submit" onClick={handleSubmit}>Submit</button>
            </div>
            )
      }
          </div>
        );
}
      export default AddDoctor;