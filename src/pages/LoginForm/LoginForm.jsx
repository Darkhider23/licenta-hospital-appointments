import React from "react";
import { useState } from "react";
import './LoginForm.css'
import Modal from 'react-modal';
import { useNavigate } from "react-router-dom";
Modal.setAppElement('#root');
function LoginForm(props) {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const [username,setUsername]=useState();
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
  const handleLogin = (event) => {
    event.preventDefault();
    console.log(email, password);
    fetch('http://localhost:5000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Login successful") {
          const {token} = data.token;
          localStorage.setItem('sessionToken',token);
          localStorage.setItem('firstname',data.firstname);
          localStorage.setItem('lastname',data.lastname);
        }
        setModalMessage(data.message);
        setSuccessForm(true);
      })
      .catch((error) => {
        setModalMessage(error);
        setSuccessForm(true);
      });
  }
  const handleSignUp = (event) => {
    event.preventDefault();
    console.log(firstname, lastname, email, password);
    fetch('http://localhost:5000/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname,
        lastname,
        email,
        password
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.message);
        setModalMessage(data.message);
        setSuccessForm(true);
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
      });
  }
  const handleFormChange = () => {
    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  }
  return (
    <div className="main">
      <input type="checkbox" id="chk" aria-hidden="true" onClick={handleFormChange} />

      <div className="signup">
        <form onSubmit={handleSignUp}>
          <label className="signup-label" htmlFor="chk" aria-hidden="true">Sign up</label>
          <input type="text" name="txt" placeholder="FirstName" required="" value={firstname} onChange={(event) => setFirstName(event.target.value)} />
          <input type="text" name="txt" placeholder="LastName" required="" value={lastname} onChange={(event) => setLastName(event.target.value)} />
          <input type="email" name="email" placeholder="Email" required="" value={email} onChange={(event) => setEmail(event.target.value)} />
          <input type="password" name="pswd" placeholder="Password" required="" value={password} onChange={(event) => setPassword(event.target.value)
          } />
          <button type="submit">Sign up</button>
        </form>
        <Modal isOpen={successForm} style={customStyles}>
          <div className="modal-content">
            <h2>Success!</h2>
            <p>{modalMessage}</p>
            <button onClick={() => setSuccessForm(false)}>Close</button>
          </div>
        </Modal>
      </div>

      <div className="login">
        <form onSubmit={handleLogin}>
          <label htmlFor="chk" aria-hidden="true">Login</label>
          <input type="email" name="email" placeholder="Email" required="" value={email} onChange={(event) => setEmail(event.target.value)} />
          <input type="password" name="pswd" placeholder="Password" required="" value={password} onChange={(event) => setPassword(event.target.value)} />
          <button className="login-button" type="submit">Login</button>
        </form>
        <Modal isOpen={successForm} style={customStyles}>
          <div className="modal-content">
            <h2>Success!</h2>
            <p>{modalMessage}</p>
            <button onClick={() => { setSuccessForm(false); if (modalMessage === "Login successful" || modalMessage === "Register successful") { window.location.reload(); } }}>Close</button>
          </div>
        </Modal>
      </div>
    </div>
  )
}
export default LoginForm;