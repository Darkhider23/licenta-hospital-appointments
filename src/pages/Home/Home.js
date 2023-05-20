import React from "react"
import './Home.css'
function Home() {
  return (
    <div>
      <div className="motto">
        <h1 className="motto-first">We take care</h1>
        <h1>because we care</h1>
        <h2>Excelent health service for all patients who come to our hospital</h2>
      </div>
      <div className="home-services">
        <div className="make-appointment">
          <div className="title">
            <h5>Make an appointment</h5>
          </div>
          <div className="content">
            You can choose a doctor an make an appointment direcly on our website.After that, you will get an response from the doctor as soon as posible.
          </div>
        </div>
        <div className="help-by-specialist">
          <div className="title">
            <h5>Help by speicalist</h5>
          </div>
          <div className="content">
            Our medical force is the best, ensuring that you get upmost experience and caring for your health
          </div>
        </div>
        <div className="diagnostic-report">
          <div className="title">
            <h5>Get diagnostic report</h5>
          </div>
          <div className="content">
            Get an detailed report on your health by our doctors, which you can access later on your medical history
          </div>
        </div>

      </div>

    </div>
  )
}
export default Home;