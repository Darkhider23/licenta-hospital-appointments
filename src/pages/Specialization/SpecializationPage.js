import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function SpecializationPage() {
  const { id } = useParams();

  useEffect(()=>{
    fetch(`http://localhost:5000/specializations/${id}`)
    .then((response)=> response.json())
    .then((data)=>console.log(data));
  },[id]);

  return (
    <div className="specializationpage-container">
      <div className="card about">
        
      </div>
      <div className="card diseases">

      </div>
      <div className="card doctors">

      </div>
      </div>
  );
}

export default SpecializationPage;
