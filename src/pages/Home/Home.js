import React from "react"
import './Home.css'
import axios from 'axios'
function Home(){
  return(
    <div>
      <div className="motto">
        <h1 className="motto-first">We take care</h1><br/>
        <h1>because we care</h1>
        <h2>Excelent health service for all patients who come to our hospital</h2>
      </div>
      <div className="home-services">
      <div className="make-appointment">
          <div className="title">
            Make an appointment
          </div>
          <div className="content">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur doloremque in, quibusdam repellendus hic minus unde eveniet libero ad maxime.
          </div>
      </div>
      <div className="help-by-specialist">
        <div className="title">
          Help by speicalist
        </div>
        <div className="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam doloremque minima aliquam inventore ut voluptatem ipsum amet maiores. Recusandae, sit.
        </div>
      </div>
      <div className="diagnostic-report">
        <div className="title">
          Get diagnostic report
        </div>
        <div className="content">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum aliquid aperiam laborum doloremque reprehenderit, enim quidem dolor. Sint, ex tenetur?
        </div>
      </div>

      </div>

    </div>
  )
}
export default Home;