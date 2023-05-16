import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react';
import "./NavbarPage.css"
import logo from '../assets/logo.png'
function NavbarPage(props) {
  const [firstname, setFirstname] = useState(localStorage.getItem('firstname'));
  const [lastname, setLastname] = useState(localStorage.getItem('lastname'));
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  useEffect(() => {
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
  }, [userId]);
  const click = useState();
  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserId('');
  };

  // document.addEventListener('DOMContentLoaded', () => {
  //   const dropdown = document.querySelector('.dropdown');
  
  //   if (dropdown) {
  //     dropdown.addEventListener('mouseleave', () => {
  //       dropdown.querySelector('.dropdown-menu').style.display = 'none';
  //     });
  //   }
  // });


  return (
    <nav className='navbar-home'>
      <div className='navbar-container'>
        <NavLink to="/home" className="navbar-logo" id={"flex"} >
          <img src={logo} alt=""></img>
          <h2 className="first-word">
            Spitalul
          </h2>
          <h2 className="second-word">
            Judetean
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
            <NavLink to={'/admin'} className={(navData) => (navData.isActive ? "active-link" : "nav-links")}>
              Admin
            </NavLink>
          </li>

          {
            userId ? <>
              <li className='nav-item'>
                <NavLink to={'/user-page'} className={(navData) => (navData.isActive ? "active-link username" : "nav-links username")}>
                  {firstname}<br />{lastname}
                </NavLink>
              </li>
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
