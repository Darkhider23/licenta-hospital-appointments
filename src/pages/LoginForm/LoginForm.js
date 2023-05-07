import React from "react";
import { useState } from "react";
import './LoginForm.css'
function LoginForm(){
     const [name,setName] = useState('');
     const [email,setEmail] = useState('');
     const [password,setPassword] = useState('');
     const [role,setRole] = useState('');
     const [activePacient,setActivePacient] = useState(false);
     const [activeDoctor,setActiveDoctor] = useState(false);
     const [patient,setPatient] = useState('pacient');
     const [doctor,setDoctor] = useState('doctor');

    const handleLogin = (event) =>{
        event.preventDefault();
        console.log(email,password);
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
      console.log('Form data submitted:', data);
    })
    .catch((error) => {
      console.error('Error submitting form:', error);
    });
    }
    const handleSignUp = (event) =>{
        event.preventDefault();
        console.log(name,email,password,role);
        fetch('http://localhost:5000/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            password
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Form data submitted:', data);
          })
          .catch((error) => {
            console.error('Error submitting form:', error);
          });
    }
    const handleFormChange = () =>{
        setEmail('');
        setPassword('');
        setName('');
    }
    const handleClick1 = () =>{
        setActiveDoctor(!activeDoctor);
        if(activePacient){
          setActivePacient(!activePacient);
          setRole("doctor");
        }
    }
    const handleClick2 = () =>{
        setActivePacient(!activePacient);
        if(activeDoctor) 
        {
          setActiveDoctor(!activeDoctor);
          setRole("pacient");
        }
    }
  return(
    <div className="main">  	
		<input type="checkbox" id="chk" aria-hidden="true" onClick={handleFormChange}/>

			<div className="signup">
				<form onSubmit={handleSignUp}>
					<label className="signup-label" htmlFor="chk" aria-hidden="true">Sign up</label>
					<input type="text" name="txt" placeholder="Name" required="" value={name}onChange={(event) => setName(event.target.value)} />
					<input type="email" name="email" placeholder="Email" required="" value ={email}onChange={(event) => setEmail(event.target.value)}/>
					<input type="password" name="pswd" placeholder="Password" required="" value={password} onChange={(event) =>setPassword(event.target.value)
                    }/>
                    <div className="checkbox-container">
                        <label className={activePacient? "checkbox-label-active":"checkbox-label"} onClick={handleClick2}>
                        {/* <input type="checkbox" value="patient" checked ={role==="patient"} onChange={(event) =>setRole(event.target.value)}/> */}
                        Patient
                        </label>
                        <label className={activeDoctor? "checkbox-label-active":"checkbox-label"}onClick={handleClick1}>
                        {/* <input type="checkbox" value="doctor" checked ={role==="doctor"} onChange={(event) =>setRole(event.target.value)}/> */}
                        Doctor
                        </label>
                    </div>
					<button type="submit">Sign up</button>
				</form>
			</div>

			<div className="login">
				<form onSubmit={handleLogin}>
					<label htmlFor="chk" aria-hidden="true">Login</label>
					<input type="email" name="email" placeholder="Email" required="" value ={email}onChange={(event) => setEmail(event.target.value)}/>
					<input type="password" name="pswd" placeholder="Password" required=""value={password} onChange={(event) => setPassword(event.target.value)}/>
					<button className="login-button" type="submit">Login</button>
				</form>
			</div>
	</div>
  )
}
export default LoginForm;