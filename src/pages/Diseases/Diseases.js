import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Diseases.css";

function Diseases() {
    const { id } = useParams();
    const [diseases, setDiseases] = useState([]);
    const [selectedDisease, setSelectedDisease] = useState(null);
    const [symptoms, setSymptoms] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);


    useEffect(() => {
        fetch(`http://192.168.0.165:5000/diseases/specializations/${id}`)
            .then((response) => response.json())
            .then((data) => {
                
                setDiseases(data);
            });
    }, []);

    useEffect(() => {
        if (selectedDisease) {
            fetch(`http://192.168.0.165:5000/symptoms/diseases/${selectedDisease.id}`)
                .then((response) => response.json())
                .then((data) => {
                    
                    setSymptoms(data);
                });
        }
    }, [selectedDisease]);

    const handleDiseaseClick = (disease) => {
        if (selectedDisease && selectedDisease.id === disease.id) {
            setSelectedDisease(null);
            setSelectedItem(null)
        } else {
            setSelectedItem(disease);
            setSelectedDisease(disease);
        }
    };

    return (
        <div className="disease-container">
            <div className="title">
                <h1>Diseases</h1>
            </div>
            <div className="disease-content">
                <ul className="disease-list">
                    {diseases.map((disease) => (
                        <li key={disease.id} onClick={() => handleDiseaseClick(disease)} className={selectedItem === disease ? "list-elem active" : "list-elem"}>
                            {disease.name}
                        </li>
                    ))}
                </ul>
                {selectedDisease && (
                    <div className="disease-details">
                        <div className="description-container">
                            <div className="box-title">
                                <h3>Description</h3>
                            </div>
                            <p>{selectedDisease.description}</p>
                        </div>
                        <div className="symptoms-container">
                            <div className="box-title">
                                <h3>Symptoms</h3>
                            </div>
                            <ul>
                                {symptoms.map((symptom, index) => (
                                    <li key={index}>{symptom.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Diseases;
