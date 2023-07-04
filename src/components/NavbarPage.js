import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react';
import "./NavbarPage.css"
import logo from '../assets/logo.png'
function NavbarPage(props) {
  const [firstname, setFirstname] = useState(localStorage.getItem('firstname'));
  const [lastname, setLastname] = useState(localStorage.getItem('lastname'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [scroll, setScroll] = useState(false);
  const [role, setRole] = useState(localStorage.getItem('role'));
  useEffect(() => {
    if (role === 'patient') {
      fetch(`http://localhost:5000/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setFirstname(data.firstname);
          setLastname(data.lastname);
        })
    }
    else if (role === 'doctor') {
      fetch(`http://localhost:5000/doctor/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setFirstname(data.firstname);
          setLastname(data.lastname);
        })
    }
  }, [userId]);
  const click = useState();
  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserId('');
    localStorage.removeItem('role');
    window.location.href = '/home';
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <nav className={scroll ? 'navbar-home scrolled' : 'navbar-home'}>
      <div className='navbar-container'>
        <NavLink to="/home" className="navbar-logo" id={"flex"} >
          <img src={logo} alt=""></img>
          <h2 className="first-word">
            BookMyDoc
          </h2>
        </NavLink>
        {/* <div className="menu-icon" onClick={handleClick}>
          <i className={click ? 'fas fa-times': 'fas fa-bars'}></i>
        </div> */}
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <NavLink to={'/home'} className={(navData) => (navData.isActive ? "active-link" : "nav-links")}>
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to={'/doctors'} className={(navData) => (navData.isActive ? "active-link" : "nav-links")} >
              Doctors
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to={'/specializations'} className={(navData) => (navData.isActive ? "active-link" : "nav-links")} >
              Specializations
            </NavLink>
          </li>
          {
            role === 'admin' ? <><li className='nav-item'>
              <NavLink to={'/admin'} className={(navData) => (navData.isActive ? "active-link" : "nav-links")}>
                Admin
              </NavLink>
            </li></> : null
          }

          {
            userId ? <>
              <li className='nav-item dropdown'>
                <NavLink className="nav-links" >
                  Tools
                </NavLink>
                <ul className="dropdown-menu">
                  <li><NavLink to={'/calculator'}>Analisys Calculator</NavLink></li>
                  <li><NavLink to={'/bmi'}>BMI Calculator</NavLink></li>
                </ul>
              </li>
              <li className='nav-item'>
                <NavLink to={role === 'doctor' ? '/doctorprofile' : '/userprofile'} className={(navData) => (navData.isActive ? "active-link username" : "nav-links username")}>
                  {firstname}<br />{lastname}
                </NavLink>
              </li>
              { role ==='patient'?<>
                <li className='nav-item'>
                <NavLink to={`/medicalrecord/${userId}`} className={(navData) => (navData.isActive ? "active-link" : "nav-links")} >
                  MedicalRecord
                </NavLink>
              </li>
              </>
              :null
              }

              <div className="logout-container">
                <button className='logout-btn' onClick={handleLogout}>Logout</button>
              </div>
            </>
              :
              <li className='nav-item'>
                <NavLink to={'/login'} className={(navData) => (navData.isActive ? "active-link" : "nav-links")}>
                  Login
                </NavLink>
              </li>
          }

        </ul>
      </div>
    </nav>
  );
}
export default NavbarPage
