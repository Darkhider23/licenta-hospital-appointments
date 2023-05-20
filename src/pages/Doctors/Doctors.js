import React, { useEffect, useState } from "react"
import Card from "../../components/Card";

import axios from 'axios';
import './Doctors.css'
function Doctors() {
  const [data, setData] = useState();

  useEffect(() => {
    axios.get('http://192.168.0.165:5000/doctor')
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .catch(error => console.log(error));
  }, []);
  useEffect(() => {
    if (data && !data.every(item => item.imageUrl)) {
      const fetchImageUrls = async () => {
        const imagePromises = data.map(item => {
          const imageName = `${item.firstname}${item.lastname}`;
          return fetch(`http://192.168.0.165:5000/image/${imageName}`)
            .then(response => response.json())
            .then(data => data.url)
            .catch(error => {
              console.log(`Error fetching image URL for ${imageName}:`, error);
              return null;
            });
        });

        Promise.all(imagePromises)
          .then(imageUrls => {
            // Update the data array with the fetched image URLs
            const updatedData = data.map((item, index) => ({
              ...item,
              imageUrl: imageUrls[index],
            }));
            setData(updatedData);
          })
          .catch(error => {
            console.log('Error fetching image URLs:', error);
          });
      };

      fetchImageUrls();
    }
  }, [data]);
  return (
    <div className="doctor-page">
      <div className="card-container">
        {data ? (
          <ul className="card-list">
            {data.map(item => (
              <li className="card-element" key={item.id}>
                <Card
                  id={item.id}
                  firstname={item.firstname}
                  lastname={item.lastname}
                  content={item.specializationId}
                  rating={item.rating}
                  image={`http://192.168.0.165:5000/${item.imageUrl}`}
                /></li>
            ))}
          </ul>
        ) : (
          <p>uploading...</p>
        )}
      </div>
    </div>
  )
}
export default Doctors;