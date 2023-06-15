import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import maps from '../../assets/maps.png'
import { NavLink } from 'react-router-dom'

function UserProfile() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [combineAppointments, setCombinedAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetch(`http://192.168.0.165:5000/appointments/user/${userId}`)
      .then((response) => response.json())
      .then((appointments) => {
        setAppointments(appointments);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  useEffect(() => {
    const fetchDoctorForAppointment = async (appointment) => {
      try {
        const response = await fetch(
          `http://192.168.0.165:5000/doctor/${appointment.doctorId}`
        );
        const doctor = await response.json();
        return doctor;
      } catch (error) {
        console.error(error);
      }
    };
    const fetchDoctorsForAppointments = async () => {
      const doctors = await Promise.all(
        appointments.map(async (appointment) => {
          const doctor = await fetchDoctorForAppointment(appointment);
          return { ...appointment, doctor };
        })
      );
      setCombinedAppointments(doctors);
    };

    fetchDoctorsForAppointments();
  }, [appointments]);
  const handleAppointmentClick = (appointment) => {
    if (selectedAppointment === appointment) {
      setSelectedAppointment(null);
    }
    else
      setSelectedAppointment(appointment);
  };
  const handleCancelAppointment = (id) => {
    if (id) {
      fetch(`http://192.168.0.165:5000/appointments/cancel/${id}`, {
        method: 'PUT'
      })
        .then((response) => {response.json();window.location.reload();})

        .catch((error) => { console.error(error) })
    }
  }
  function calculateDuration(startHour, endHour) {
    const start = new Date(`01/01/2023 ${startHour}`);
    const end = new Date(`01/01/2023 ${endHour}`);
    const durationInMinutes = (end - start) / (1000 * 60);
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    if (hours && minutes) {
      if (hours > 1)
        return `${hours} hours ${minutes} minutes`;
      else
        return `${hours} hour ${minutes} minutes`;
    } else if (hours) {
      if (hours > 1)
        return `${hours} hours`;
      else {
        return `${hours} hour`;
      }
    } else if (minutes) {
      return `${minutes} minutes`;
    } else {
      return "No duration";
    }
  }


  return (
    <div className="appoint-container">
      <div className="side-panel">
        <div className="title">
        Appointments
        </div>
        <ul className="side-panel-ul">
        {combineAppointments.map((appointment, index) => (
          <li
            className={selectedAppointment === appointment ? "appointment-box active" : "appointment-box"}
            onClick={() => handleAppointmentClick(appointment)}
            key={appointment.id}
          >
            <span>{appointment.doctor.firstname} {appointment.doctor.lastname}</span>
            <p>{appointment.reasonForVisit}</p>
          </li>
        ))}
        </ul>
      </div>
      {selectedAppointment && (<>
        <div className="main-content">
          <div className="header-section">
            <div className="title-box">
              <div className="reason-box">
                {selectedAppointment.reasonForVisit}
              </div>
              <div className="doctor-name">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M14.84 16.26C17.86 16.83 20 18.29 20 20v2H4v-2c0-1.71 2.14-3.17 5.16-3.74L12 21l2.84-4.74M8 8h8v2a4 4 0 0 1-4 4a4 4 0 0 1-4-4V8m0-1l.41-4.1a1 1 0 0 1 1-.9h5.19c.51 0 .94.39.99.9L16 7H8m4-4h-1v1h-1v1h1v1h1V5h1V4h-1V3Z" /></svg>
                Dr. {selectedAppointment.doctor.firstname} {selectedAppointment.doctor.lastname}
              </div>
            </div>
            <div className="button-box">
              <span>Cancel<br /> Appointment</span>
              <button onClick={() => handleCancelAppointment(selectedAppointment.id)}><svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24"><path fill="currentColor" d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6L8.4 17Zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z" /></svg></button>
            </div>
          </div>

          <div className="time-box">
            <div className="date-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5 22q-.825 0-1.413-.588T3 20V6q0-.825.588-1.413T5 4h1V3q0-.425.288-.713T7 2q.425 0 .713.288T8 3v1h8V3q0-.425.288-.713T17 2q.425 0 .713.288T18 3v1h1q.825 0 1.413.588T21 6v14q0 .825-.588 1.413T19 22H5Zm0-2h14V10H5v10Zm7-6q-.425 0-.713-.288T11 13q0-.425.288-.713T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14Zm-4 0q-.425 0-.713-.288T7 13q0-.425.288-.713T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14Zm8 0q-.425 0-.713-.288T15 13q0-.425.288-.713T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14Zm-4 4q-.425 0-.713-.288T11 17q0-.425.288-.713T12 16q.425 0 .713.288T13 17q0 .425-.288.713T12 18Zm-4 0q-.425 0-.713-.288T7 17q0-.425.288-.713T8 16q.425 0 .713.288T9 17q0 .425-.288.713T8 18Zm8 0q-.425 0-.713-.288T15 17q0-.425.288-.713T16 16q.425 0 .713.288T17 17q0 .425-.288.713T16 18Z" /></svg>
              {selectedAppointment.appointmentTime}
            </div>
            <div className="hour-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10Zm0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16Zm1-8h4v2h-6V7h2v5Z" /></svg>
              {selectedAppointment.startHour.substring(0, 5)}-{selectedAppointment.endHour.substring(0, 5)}
            </div>
          </div>
          <div className="details">
            <div className="duration-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6 4H4V2h16v2h-2v2c0 1.615-.816 2.915-1.844 3.977c-.703.726-1.558 1.395-2.425 2.023c.867.628 1.722 1.297 2.425 2.023C17.184 15.085 18 16.385 18 18v2h2v2H4v-2h2v-2c0-1.615.816-2.915 1.844-3.977c.703-.726 1.558-1.395 2.425-2.023c-.867-.628-1.722-1.297-2.425-2.023C6.816 8.915 6 7.615 6 6V4Zm2 0v2c0 .885.434 1.71 1.281 2.586c.727.751 1.674 1.454 2.719 2.192c1.045-.738 1.992-1.441 2.719-2.192C15.566 7.71 16 6.885 16 6V4H8Zm4 9.222c-1.045.738-1.992 1.441-2.719 2.192C8.434 16.29 8 17.115 8 18v2h8v-2c0-.885-.434-1.71-1.281-2.586c-.727-.751-1.674-1.454-2.719-2.192Z" /></svg>
              {calculateDuration(selectedAppointment.startHour, selectedAppointment.endHour)}
            </div>
            <div className="status-box">
              {selectedAppointment.status === 'pending' && <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 13.5q.625 0 1.063-.438T8.5 12q0-.625-.438-1.063T7 10.5q-.625 0-1.063.438T5.5 12q0 .625.438 1.063T7 13.5Zm5 0q.625 0 1.063-.438T13.5 12q0-.625-.438-1.063T12 10.5q-.625 0-1.063.438T10.5 12q0 .625.438 1.063T12 13.5Zm5 0q.625 0 1.063-.438T18.5 12q0-.625-.438-1.063T17 10.5q-.625 0-1.063.438T15.5 12q0 .625.438 1.063T17 13.5ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z" /></svg><span>Pending</span></div>}
              {selectedAppointment.status === 'confirmed' &&
                <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="currentColor" d="M256 16C123.5 16 16 123.5 16 256c0 132.6 107.5 240 240 240c132.6 0 240-107.4 240-240S388.6 16 256 16zm0 60c99.4 0 180 80.6 180 180s-80.6 180-180 180S76 355.4 76 256S156.6 76 256 76zm91.3 64.2c-6.5 0-12.5 2.4-16.8 8.2c-52 70.1-69 96.5-106 169.8c-8.4-11.1-65.6-72.4-93.9-94.1c-14.2-10.9-41.3 27.2-31.6 37.1C142.6 306.1 220.1 406 232.7 405c21.4-1.7 75.1-136.8 148.8-233.7c8-10.4-15-31.3-34.2-31.1z" /></svg><span>Confirmed</span></div>}
              {selectedAppointment.status === 'canceled' &&
                <div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6L8.4 17Zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z" /></svg><span>Canceled</span></div>}
            </div>
          </div>
          <div className="map-box">
            <img src={maps} alt="" />
          </div>
        </div>
      </>
      )
      }
    </div>
  );
}

export default UserProfile;