import React, { useState, useEffect } from "react";
import "./DoctorProfile.css";
import maps from '../../assets/maps.png'
import Modal from 'react-modal';
import moment from 'moment';
import { NavLink } from 'react-router-dom'
import emailjs from 'emailjs-com';
import { render } from "@testing-library/react";
Modal.setAppElement('#root');

function DoctorProfile() {
  const today = new Date().toISOString().split('T')[0];
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [appointments, setAppointments] = useState([]);
  const [combineAppointments, setCombinedAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [successForm, setSuccessForm] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',

    },
  };
  useEffect(() => {
    fetch(`http://192.168.0.165:5000/appointments/doctor-appointments/${userId}`)
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
          `http://192.168.0.165:5000/user/${appointment.userId}`
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
  const handleCancelAppointment = (id, event) => {
    event.preventDefault();
    if (id) {
      fetch(`http://192.168.0.165:5000/appointments/cancel/${id}`, {
        method: 'PUT'
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          fetch(`http://192.168.0.165:5000/email/${id}`)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              // console.log(data.data.user_name);
              // console.log(data.data.message);
              emailjs.send('service_vz5jlhh', 'template_hk5tz17', {
                user_email: data.data.user_email,
                user_name: data.data.user_name,
                message: data.data.message,
                status: 'canceled'
              }, 'm1ARI0IzkxRV8CDSi')
                .then((result) => {
                  console.log(result.text);
                }, (error) => {
                  console.log(error.text);
                });
            })
            .catch((error) => { console.log(error) })
        })
        .catch((error) => { console.error(error) })
    }
  }
  const handleConfirmAppointment = (id, event) => {
    event.preventDefault();
    if (id) {
      fetch(`http://192.168.0.165:5000/appointments/confirm/${id}`, {
        method: 'PUT'
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          fetch(`http://192.168.0.165:5000/email/${id}`)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              // console.log(data.data.user_name);
              // console.log(data.data.message);
              emailjs.send('service_vz5jlhh', 'template_hk5tz17', {
                user_email: data.data.user_email,
                user_name: data.data.user_name,
                message: data.data.message,
                status: 'confirmed'
              }, 'm1ARI0IzkxRV8CDSi')
                .then((result) => {
                  console.log(result.text);
                }, (error) => {
                  console.log(error.text);
                });
            })
            .catch((error) => { console.log(error) })
        })
        .catch((error) => { console.error(error) })
    }
  }
  const handleUpdateAppointment = (id, event) => {
    if (id) {
      fetch(`http://192.168.0.165:5000/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedAppointment)
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data here
          console.log(data);
          if (data.message === 'Appointment Updated')
            setModalMessage(data.message);
          else {
            setModalMessage(data.errors[0].message.substring(0, 31));
          }
          setSuccessForm(true);
        })
        .catch((error) => {
          setModalMessage(error.errors[0].message);
        });
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

  const renderCalendar = () => {
    // Generate an array of dates from today to the next 5 days
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const date = moment().add(i, 'days').format('YYYY-MM-DD');
      dates.push(date);
    }

    // Generate time slots for each hour
    const timeSlots = [];
    for (let hour = 8; hour <= 17; hour++) {
      const cells = dates.map(date => {
        // Find the appointment for the current hour and date
        const appointment = combineAppointments.find(appt => {
          const [apthour, _] = appt.startHour.split(':');
          return appt.appointmentTime == date && parseInt(apthour) == hour;
        });

        return (
          <div className={selectedAppointment === appointment ? "cell active" : "cell"} key={date} onClick={() => { handleAppointmentClick(appointment); console.log(appointment) }}>
            {appointment ? appointment.reasonForVisit : ''}
          </div>
        );
      });

      timeSlots.push(
        <div className="row" key={hour}>
          <div className="time">{hour}:00</div>
          {cells}
        </div>
      );
    }

    return (
      <div className="calendar">
        <div className="header">
          <div className="empty"></div>
          {dates.map(date => (
            <div className="date" key={date}>
              {moment(date).format('YYYY-MM-DD')}
            </div>
          ))}
        </div>
        <div className="hours-box">{timeSlots}</div>
      </div>
    );
  };
  // const renderlistener = ()=>{
  //   const startHourInput = document.getElementById('startHour');
  //   const endHourInput = document.getElementById('endHour');

  //   startHourInput.addEventListener('change', () => {
  //     const startHourValue = startHourInput.value;
  //     const endHourValue = endHourInput.value;

  //     if (startHourValue > endHourValue || endHourValue === '') {
  //       const startHour = new Date(`1970-01-01T${startHourValue}:00`);
  //       const newEndHour = new Date(startHour.getTime() + 60 * 60 * 1000);
  //       const newEndHourString = newEndHour.toTimeString().slice(0, 5);
  //       endHourInput.value = newEndHourString;
  //       setSelectedAppointment({
  //         ...selectedAppointment,
  //         startHour:startHourValue,
  //         endHour: newEndHour
  //       })
  //     }
  //   });
  // }

  return (
    <div className="appoint-container">
      {/* <div className="side-panel">
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
        </div> */}
      {renderCalendar()}
      {selectedAppointment && (<>
        <div className="main-content">
          <form>
            <div className="header-section">
              <div className="title-box">
                <div className="reason-box">
                  {selectedAppointment.reasonForVisit}
                </div>
                <div className="doctor-name">
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                  <NavLink to={`/medicalrecord/${selectedAppointment.doctor.id}`}>
                    {selectedAppointment.doctor.firstname} {selectedAppointment.doctor.lastname}
                  </NavLink>
                </div>
              </div>
              <div className="doctor-button-box">
                <button onClick={(event) => handleConfirmAppointment(selectedAppointment.id, event)}><svg className="confirm-btn" xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4l8-8l-1.41-1.42Z" /></svg></button>
                <button onClick={(event) => handleCancelAppointment(selectedAppointment.id, event)}><svg className="cancel-btn" xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24"><path fill="currentColor" d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6L8.4 17Zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z" /></svg></button>
                <button onClick={(event) => handleUpdateAppointment(selectedAppointment.id, event)}><svg className="save-btn" xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24"><path fill="currentColor" d="M21 7v12q0 .825-.588 1.413T19 21H5q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h12l4 4Zm-2 .85L16.15 5H5v14h14V7.85ZM12 18q1.25 0 2.125-.875T15 15q0-1.25-.875-2.125T12 12q-1.25 0-2.125.875T9 15q0 1.25.875 2.125T12 18Zm-6-8h9V6H6v4ZM5 7.85V19V5v2.85Z" /></svg></button>
              </div>
            </div>
            <div className="time-box">
              <div className="date-box">
                {/* {renderlistener()} */}
                <input
                  type="date"
                  id="appointmentTime"
                  value={selectedAppointment.appointmentTime}
                  min={today}
                  onChange={(e) =>
                    setSelectedAppointment({
                      ...selectedAppointment,
                      appointmentTime: e.target.value
                    })
                  }
                />
              </div>
              <div className="hour-box">
                <input
                  type="time"
                  id="startHour"
                  value={selectedAppointment.startHour.substring(0, 5)}
                  onChange={(e) =>
                    setSelectedAppointment({
                      ...selectedAppointment,
                      startHour: e.target.value
                    })
                  }
                />
                <input
                  type="time"
                  id="endHour"
                  value={selectedAppointment.endHour.substring(0, 5)}
                  onChange={(e) =>
                    setSelectedAppointment({
                      ...selectedAppointment,
                      endHour: e.target.value
                    })
                  }
                />
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
          </form>
          <Modal isOpen={successForm} style={customStyles}>
            <div className="modal-content">
              <h2>Success!</h2>
              <p>{modalMessage}</p>
              <button onClick={() => setSuccessForm(false)}>Close</button>
            </div>
          </Modal>
        </div>
      </>
      )
      }

    </div>
  );
}

export default DoctorProfile;