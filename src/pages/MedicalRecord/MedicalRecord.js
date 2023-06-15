import React, { useEffect } from 'react'
import './MedicalRecord.css'
import { useParams } from "react-router-dom";
import { useState } from 'react'
import Modal from 'react-modal';
Modal.setAppElement('#root');
function MedicalRecord() {
  const pacientid = useParams().id;
  const userrole = localStorage.getItem("role");
  const [record, setRecord] = useState();
  const [user, setUser] = useState();
  const [successForm, setSuccessForm] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',

    },
  };
  useEffect(() => {
    fetch(`http://192.168.0.165:5000/user/${pacientid}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    fetch(`http://192.168.0.165:5000/medical-records/user/${pacientid}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRecord(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [pacientid])
  const handleRecordChange = (e) => {
    fetch(`http://192.168.0.165:5000/medical-records/${record.medicalRecordId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setModalMessage(data.message);
        setSuccessForm(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div className='record-container'>
      {user && record && (<>
        <div className="record-box">
          <form onSubmit={handleRecordChange}>
          <div className="name">
            Name:<span>{user.firstname} {user.lastname}</span>
          </div>
          <div className="first-box">
            <div className="gender">
              Gender
              {userrole === 'patient' ? (
                <input
                  type="text"
                  value={record.gender}
                  onChange={(e) => {
                    setRecord({
                      ...record,
                      gender: e.target.value
                    })
                  }} />
              ) : (
                <span>{record.gender}</span>
              )}
            </div>
            <div className="age">
              Age
              {userrole === 'patient' ? (
                 <div className='input-box'>
                <input
                  type="text"
                  value={record.age}
                  onChange={(e) => {
                    setRecord({
                      ...record,
                      age: e.target.value
                    })
                  }} />
                  </div>
              ) : (
                <span>{record.age}</span>
              )}
            </div>
          </div>
          <div className='second-box'>
            <div className="height">
              Height
              {userrole === 'patient' ? (
                <div className='input-box'>
                  <input
                    type="text"
                    value={record.height}
                    onChange={(e) => {
                      setRecord({
                        ...record,
                        height: e.target.value
                      })
                    }} />
                  <span>m</span>
                </div>
              ) : (
                <span>{record.height}m</span>
              )}
            </div>
            <div className="weight">
              Weight
              {userrole === 'patient' ? (
                <div className='input-box'>
                  <input
                    type="text"
                    value={record.weight}
                    onChange={(e) => {
                      setRecord({
                        ...record,
                        weight: e.target.value
                      })
                    }} />
                  <span>kg</span>
                  </div>
              ) : (
                <span>{record.weight}kg</span>
              )}
            </div>
          </div>
          {
            userrole==='patient'?
            <>
            <div className="button-box">
          <button type="submit">Save</button>
            </div>
            </>
            :null
          }
          
          </form>
        </div>
        <div className={userrole==='pacient'? 'right-box':'right-box-user'}>
          <form className onSubmit={(e) => handleRecordChange(e)}>
            <div className="diagnosis">
              Diagnosis
              {userrole === 'doctor' ? (
                <textarea
                  spellCheck="false"
                  value={record.diagnosis}
                  onChange={(e) =>
                    setRecord({
                      ...record,
                      diagnosis: e.target.value
                    })}
                ></textarea>
              ) : (
                <span>{record.diagnosis}</span>
              )}
            </div>
            <div className="treatment">
              Treatment
              {userrole === 'doctor' ? (
                <textarea
                  spellCheck="false"
                  value={record.treatment}
                  onChange={(e) =>
                    setRecord({
                      ...record,
                      treatment: e.target.value
                    })}
                ></textarea>
              ) : (
                <span>{record.treatment}</span>
              )}
            </div>
            {userrole === 'doctor' ? (
              <div className="button-box">
                <button type="submit">Save</button>
              </div>
            ) : (
              null
            )}
          </form>

        </div>
      </>)}
      <Modal isOpen={successForm} style={customStyles}>
        <div className="modal-content">
          <h2>Success!</h2>
          <p>{modalMessage}</p>
          <button onClick={() => setSuccessForm(false)}>Close</button>
        </div>
      </Modal>
    </div>
  )
}

export default MedicalRecord;