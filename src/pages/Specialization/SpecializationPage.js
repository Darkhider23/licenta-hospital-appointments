import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SpecializationPage.css"

function SpecializationPage() {
  const { id } = useParams();
  const [specialization, setSpecialization] = useState();
  const [diseases, setDiseases] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/specializations/${id}`)
      .then((response) => response.json())
      .then((data) => { setSpecialization(data); });
    fetch(`http://localhost:5000/doctor/specializations/${id}`)
      .then((response) => response.json())
      .then((data) => { console.log(data); setDoctors(data) });
    fetch(`http://localhost:5000/diseases/specializations/${id}`)
      .then((response) => response.json())
      .then((data) => { console.log(data); setDiseases(data) });
  }, [id]);

  const handleDiseaseClick = () =>{
    window.location.href=`/diseases/${id}`;
  }
  const handleDoctorClick = () =>{
    window.location.href=`/doctors/${id}`
  }
  return (
    <div className="specialization-page-container">
      <div className="title">
        <h1>{specialization && specialization.name}</h1>
      </div>
      <div className="cards-container">
        <div className="s-card about">
          <div className="card-title">
            <h2>About</h2>
          </div>
          <div className="card-content">
            <p>{specialization && specialization.description}</p>
          </div>
        </div>
        <div className="s-card diseases">
          <div className="card-title">
            <h2>Diseases</h2>
          </div>
          <div className="card-content">
            <p>We are offering all the information necessary to spread awareness</p>
          </div>
          <div className="button-container">
          <button onClick={handleDiseaseClick}>See more</button>
        </div>
      </div>
      <div className="s-card doctors">
        <div className="card-title">
          <h2>Doctors</h2>
        </div>
        <div className="card-content">
          <p>Our medical force is the best and we are picking only the top</p>
        </div>
        <div className="button-container">
          <button onClick={handleDoctorClick}>See more</button>
        </div>

      </div>
    </div>
    </div >
  );
}

export default SpecializationPage;
