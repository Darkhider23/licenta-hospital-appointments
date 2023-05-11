import React, { useEffect, useState } from "react"
import Card from "../../components/Card";

import axios from 'axios';
import './Doctors.css'
function Doctors() {
  const [data, setData] = useState();
  useEffect(() => {
    axios.get('http://localhost:5000/doctor')
      .then(response => { console.log(response.data); setData(response.data) })
      .catch(error => console.log(error))
  }, []);

  return (
    <div className="doctor-page">
      <div className="card-container">
        {data ? (
          <ul className="card-list">
            {data.map(item => (
              <li className="card-element" key={item.id}>
                <Card
                id={item.id}
                firstname={item.firstname}
                lastname={item.lastname}
                content={item.specialization}
                rating={item.rating}
                image={`doctor-images/${item.firstname}${item.lastname}.jpg`}
              /></li>
            ))}
          </ul>
        ) : (
          <p>uploading...</p>
        )}
      </div>
      {/* <Card
        title="Dr. Sofia Patel"
        subtitle="Dr. Patel is a general practitioner with 10 years of experience. She graduated from the University of California, San Francisco, and completed her residency at Cedars-Sinai Medical Center in Los Angeles. Dr. Patel is known for her patient-centered approach to healthcare and her ability to connect with patients on a personal level."
        image={doctor1}
      />


      <Card
        title="Dr. Marcus Wu "
        subtitle=" Dr. Wu is an orthopedic surgeon who specializes in sports medicine. He completed his medical degree at Harvard University and his residency at the Hospital for Special Surgery in New York City. Dr. Wu is known for his expertise in treating athletes and his commitment to helping patients achieve their health and fitness goals."
        image={doctor2}
      />


      <Card
        title="Dr. Sarah Kim"
        subtitle=" Dr. Kim is a pediatrician with a passion for working with children and families. She received her medical degree from the University of Michigan and completed her residency at Boston Children's Hospital. Dr. Kim is known for her gentle and compassionate bedside manner and her ability to connect with children of all ages."
        image={doctor3}
      />


      <Card
        title="Dr. Jonathan Lee"
        subtitle=" Dr. Lee is a cardiologist with over 20 years of experience. He earned his medical degree from Johns Hopkins University and completed his residency at Brigham and Women's Hospital in Boston. Dr. Lee is known for his expertise in diagnosing and treating complex cardiovascular conditions and his commitment to patient-centered care."
        image={doctor4}
      />

        */}
      {/* <Card
        title="Dr. Rachel Garcia"
        subtitle=" Dr. Garcia is a psychiatrist who specializes in treating patients with mood and anxiety disorders. She received her medical degree from Stanford University and completed her residency at McLean Hospital in Belmont, Massachusetts. Dr. Garcia is known for her compassionate and empathetic approach to patient care and her commitment to helping patients improve their mental health and well-being."
        image={RachelGarcia}
      /> */}
    </div>
  )
}
export default Doctors;