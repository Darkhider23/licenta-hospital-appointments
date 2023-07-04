import React, { useState } from "react"
import './Specializations.css'

function Specializations() {

  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);


  async function handleInputChange(event) {
    const query = event.target.value;
    setSearchQuery(query);
    const response = await fetch(`http://localhost:5000/specializations/search?query=${query}`);
    const data = await response.json();
    setResults(data.results);
  }
  function handleSpecializationClick(id) {
    window.location.href = `/specialization/${id}`;
  }
  function handleKeyPress(event) {
    if (event.key === 'Enter' && results.length > 0) {
      handleSpecializationClick(results[0].id);
    }
  }

  return (
    <div className="specializations-container">
      <div className="search-container">
        <div className="search-bar">
          {/* <label htmlFor="search-bar" >Search Specialization</label> */}
          <input id="search-bar" className="text" value={searchQuery} onChange={handleInputChange} placeholder="Search Specializations" onKeyPress={handleKeyPress} />
          <i className='bx bx-search' ></i>
        </div>
        {results.length > 0 && searchQuery && (
          <ul>
            {results.map(result => (
              <li key={result.id} onClick={() => handleSpecializationClick(result.id)}>
                {result.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="card-container">
        <div className="card bx1">
          <div className="card-title">
            Medical surgery
          </div>
          <div className="content">
          Medical surgery, also known as operative medicine or surgical procedure, is a branch of medical practice that involves the use of surgical techniques to treat various conditions, injuries, or diseases. Surgeons are specialized physicians who perform surgical procedures with the goal of diagnosing, treating, or improving the health of patients.
          </div>
        </div>
        <div className="card bx2">
          <div className="card-title">
              Traumatology
          </div>
          <div className="content">
          Traumatology is a medical specialty that focuses on the diagnosis, treatment, and management of injuries, particularly those resulting from accidents or physical trauma. Traumatologists, also known as orthopedic trauma surgeons, are specialized physicians who have expertise in dealing with fractures, dislocations, soft tissue injuries, and other musculoskeletal trauma.
          </div>
        </div>
        <div className="card bx3">
          <div className="card-title">
              Pediatry
          </div>
          <div className="content">
          Pediatry, also known as pediatric medicine or pediatrics, is a medical specialty that focuses on the health and well-being of infants, children, and adolescents. Pediatricians are specialized physicians who provide medical care and preventive services to young patients, ranging from newborns to teenagers.
          </div>
        </div>
      </div>
    </div>
  )
}
export default Specializations;