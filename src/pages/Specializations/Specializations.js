import React, { useState } from "react"
import './Specializations.css'

function Specializations() {

  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);


  async function handleInputChange(event) {
    const query = event.target.value;
    setSearchQuery(query);
    const response = await fetch(`http://192.168.0.165:5000/specializations/search?query=${query}`);
    const data = await response.json();
    setResults(data.results);
  }
  function handleSpecializationClick(id) {
    window.location.href=`/specialization/${id}`;
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
          <input id="search-bar" className="text" value={searchQuery} onChange={handleInputChange} placeholder="Search Specializations"  onKeyPress={handleKeyPress} />
          <i className='bx bx-search' ></i>
        </div>
        {results.length > 0 && searchQuery && (
          <ul>
            {results.map(result => (
              <li key={result.id} onClick={()=>handleSpecializationClick(result.id)}>
                {result.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="card-container">
        <div className="card bx1">
              Card1
        </div>
        <div className="card bx2">
              Card2
        </div>
        <div className="card bx3">
              Card3
        </div>
      </div>
    </div>
  )
}
export default Specializations;