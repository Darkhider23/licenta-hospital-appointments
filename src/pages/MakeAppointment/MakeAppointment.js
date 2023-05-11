import React from "react"
import './MakeAppointment.css'
function MakeAppointment() {
    const id = sessionStorage.getItem('id');

    return (
        <div className="appointment-container">
            <h1>Hello {id}</h1>
        </div>

    )
}
export default MakeAppointment;