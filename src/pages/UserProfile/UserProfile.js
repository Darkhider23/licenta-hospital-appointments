import React, { useState, useEffect } from "react";
import "./UserProfile.css";

function UserProfile() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/appointments/user/${userId}`)
      .then((response) => response.json())
      .then((appointments) => {
        setAppointments(appointments);
        console.log(appointments);

        const fetchDoctorForAppointment = async (appointment) => {
          try {
            const response = await fetch(
              `http://localhost:5000/doctor/${appointment.doctorId}`
            );
            const doctor = await response.json();
            return doctor;
          } catch (error) {
            console.error(error);
          }
        };

        const fetchDoctorsForAppointments = async () => {
          const doctors = await Promise.all(
            appointments.map((appointment) =>
              fetchDoctorForAppointment(appointment)
            )
          );
          setDoctors(doctors);
        };

        fetchDoctorsForAppointments();
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  return (
    <div className="appoint-container">
      <h2>Appointments</h2>
      {appointments.map((appointment, index) => (
        <div key={appointment.id}>
          <p>{appointment.reasonForVisit}</p>
          <h1>{appointment.appointmentTime}</h1>
          <h1>{appointment.startHour}</h1>
          <h1>{appointment.endHour}</h1>
          <h1>{appointment.appointmentTime}</h1>
          {/* Display other appointment details */}
          {doctors[index] && (
            <div>
              <h3>Doctor Information</h3>
              <p>{doctors[index].firstname}</p>
              <p>{doctors[index].lastname}</p>
              {/* Display other doctor details */}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default UserProfile;
