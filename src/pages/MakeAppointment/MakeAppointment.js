import React, { useEffect, useState } from "react";
import "./MakeAppointment.css";
import Modal from 'react-modal';
Modal.setAppElement('#root');

function MakeAppointment() {
    const doctorId = sessionStorage.getItem("id");
    const userId = localStorage.getItem("userId");
    const [appointments, setAppointments] = useState([]);
    const [appointmentTimes, setAppointmentTimes] = useState([]);
    const [doctor, setDoctor] = useState();
    const [selectedTime, setSelectedTime] = useState("");
    const [reasonForVisit, setReasonForVisit] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [successForm, setSuccessForm] = useState(false);

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
        fetch(`http://192.168.0.165:5000/appointments/doctor-appointments/${doctorId}`)
            .then((response) => response.json())
            .then((data) => setAppointments(data));

        fetch(`http://192.168.0.165:5000/doctor/${doctorId}`)
            .then((response) => response.json())
            .then((data) => {
                setDoctor(data);
            });
    }, [doctorId]);




    useEffect(() => {
        setAppointmentTimes(generateAppointmentTimes());
    }, [appointments]);

    const generateAppointmentTimes = () => {
        const selectedDate = document.getElementById("dateInput").value;
        const times = appointments
            .filter((appointment) => appointment.appointmentTime == selectedDate)
            .map((appointment) => ({
                start: appointment.startHour,
                end: appointment.endHour,
            }));
        console.log(times);
        return times;
    };

    const generateHours = () => {
        const hours = [];
        for (let i = 8; i <= 17; i++) {
            hours.push(`${i.toString().padStart(2, "0")}:00`);
        }
        return hours;
    };

    const options = generateHours().map((hour) => {
        const disabled = appointmentTimes.some((appointment) => {
            const start = appointment.start;
            const end = appointment.end;
            const time = `${hour}:00`;
            return time >= start && time < end;
        });
        return { value: hour, label: hour, disabled };
    });

    const isOptionDisabled = (option) => {
        return option.disabled;
    };

    const getOptionStyle = (option) => {
        return {
            color: isOptionDisabled(option) ? "gray" : "black",
            fontStyle: isOptionDisabled(option) ? "italic" : "normal",
        };
    };

    const handleDateChange = () => {
        setAppointmentTimes(generateAppointmentTimes());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedDate = document.getElementById("dateInput").value;
        const data = {
            doctorId: doctorId,
            userId: userId,
            appointmentTime: selectedDate,
            startHour: `${selectedTime}:00`,
            endHour: `${parseInt(selectedTime.slice(0, 2)) + 1}:00:00`,
            status: "pending",
            reasonForVisit: reasonForVisit,
        };
        console.log(data);
        fetch("http://192.168.0.165:5000/appointments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'Success') {
                    setModalMessage('We have received your appointment, We will notify you as soon as possible after a doctor reviewed it');
                    setSuccessForm(true)
                }
                console.log(data);
            })

            .catch((error) => {
                console.log(error);
                setModalMessage(error);
                setSuccessForm(true);
            });
        setSelectedTime('');
    };
	
	const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('dateInput');

    if (dateInput) {
        console.log(today);
        dateInput.setAttribute('min', today);
    }

    return (
        <div className="appointment-container">
            <div className="form-container">
                <div className="doctor-details">
                    <h2>Appointment with</h2>
                    {doctor && <h2>Dr. {doctor.firstname} <span>{doctor.lastname}</span></h2>}
                </div>
                <label htmlFor="date">Choose a date:</label>
                <input type="date" id="dateInput" onChange={handleDateChange} />
                <label htmlFor="time">
                    Choose a hour:
                    <select onChange={(e) => setSelectedTime(e.target.value)}>
                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                                disabled={option.disabled}
                                style={getOptionStyle(option)}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                </label>
                <label htmlFor="reason">Reason to visit:</label>
                <input type="text" id="reason" onChange={(event) => { setReasonForVisit(event.target.value) }} />
                <input type="submit" placeholder="Submit" onClick={handleSubmit} />
            </div>
            <Modal isOpen={successForm} style={customStyles}>
                <div className="modal-content">
                    <h2>Success!</h2>
                    <p>{modalMessage}</p>
                    <button onClick={() => {
                        setSuccessForm(false);
                    }}>Close</button>
                </div>
            </Modal>
        </div>
    );
}

export default MakeAppointment;
