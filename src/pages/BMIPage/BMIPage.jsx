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
      <h1>BMI Calculator</h1>
      <form onSubmit={handleFormSubmit}>
        <label className='heigth-container'>
          <i className='bx bxs-bar-chart-alt-2'></i>
          <input
            className='no-spin'
            type="number"
            step="0.01"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          M
        </label>
        <br />
        <label className="weigth-container">
          <i className='bx bx-calculator'></i>
          <input
            className='no-spin'
            type="number"
            step="0.01"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
          kg
        </label>
        <br />
        <button type="submit">Calculate BMI</button>
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
  );
}

export default BMICalculator;
