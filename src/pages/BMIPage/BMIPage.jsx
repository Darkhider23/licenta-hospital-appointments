import React, { useState } from 'react';
import './BMIPage.css';

function BMICalculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/bmi/calculate-bmi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ height, weight }),
      });

      const data = await response.json();
      const calculatedBMI = data.bmi.toFixed(2);

      setBMI(calculatedBMI);
    } catch (error) {
      console.error('Error calculating BMI:', error);
    }
  };

  const getBMIStatusColor = () => {
    if (bmi >= 40) {
      return 'red';
    } else if (bmi >= 30) {
      return 'orange';
    } else if (bmi >= 25) {
      return 'yellow';
    } else if (bmi >= 20) {
      return 'green';
    } else {
      return 'gray';
    }
  };

  return (
    <div className="bmi-page">
      <div className="bmi-title">
        <h1>BMI Calculator</h1>
      </div>
      <div className="bmi-content">
        <div className="left-card">
          <div className="title">
            <h5>Pacients with a metabolic syndrome most comonly have 3 of these 5 afections:</h5>
          </div>
          <div className="syndrome-list">
            <div className="syndrome-box">
              <div className="circle">1</div>
              <h3>Type 2 diabetes</h3>
            </div>
            <div className="syndrome-box">
              <div className="circle">2</div>
              <h3>Hypertension</h3>
            </div>
            <div className="syndrome-box">
              <div className="circle">3</div>
              <h3>Hepatic steatosis</h3>
            </div>
            <div className="syndrome-box">
              <div className="circle">4</div>
              <h3>Central obesity</h3>
            </div>
            <div className="syndrome-box">
              <div className="circle">5</div>
              <h3>Dyslipidemia</h3>
            </div>
          </div>
        </div>
        <div>
          <form className='form-container' onSubmit={handleFormSubmit}>
            <div className="input-box">
              <label className='heigth-container'>
                <i className='bx bxs-bar-chart-alt-2'></i>
                <input
                  className='no-spin'
                  type="number"
                  step="0.01"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
                <span>M</span>
              </label>
              <label className="weigth-container">
                <i className='bx bx-calculator'></i>
                <input
                  className='no-spin'
                  type="number"
                  step="0.01"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <span>KG</span>
              </label>
            </div>
            <div className="button-box">
              <button type="submit">Calculate BMI</button>
            </div>
          </form>
          {bmi && (
            <div>
              <div className="status-bar">
                <div
                  className={`status-bar-color first ${bmi < 20 ? 'active' : ''}`}
                  style={{ background: 'gray' }}
                >{bmi < 20 ? bmi : null}</div>
                <div
                  className={`status-bar-color  ${bmi >= 20 && bmi < 25 ? 'active' : ''}`}
                  style={{ background: 'green' }}
                >{bmi >= 20 && bmi < 25 ? bmi : null}</div>
                <div
                  className={`status-bar-color ${bmi >= 25 && bmi < 30 ? 'active' : ''}`}
                  style={{ background: 'yellow' }}
                >{bmi >= 25 && bmi < 30 ? bmi : null}</div>
                <div
                  className={`status-bar-color ${bmi >= 30 && bmi < 40 ? 'active' : ''}`}
                  style={{ background: 'orange' }}
                >{bmi >= 30 && bmi < 40 ? bmi : null}</div>
                <div
                  className={`status-bar-color last ${bmi >= 40 ? 'active' : ''}`}
                  style={{ background: 'red' }}
                >{bmi >= 40 ? bmi : null}</div>
              </div>
            </div>
          )}
        </div>
        <div className="right-card">
          <p>Obesity and overweight pose a significant health concern in the modern world, contributing to a rise in overall illness, reduced life expectancy, and diminished quality of life.

            The presence of excess weight and obesity carries various risks, impacting multiple systems within the body. Having a body mass index (BMI) above 30 significantly increases the likelihood of complications and related diseases, with diabetes and cardiovascular conditions being the most severe among them.</p>
        </div>
      </div>

    </div>
  );
}

export default BMICalculator;
