import {NavLink} from 'react-router-dom'
import { useState } from 'react';
import "./NavbarPage.css"
import logo from '../assets/logo.png'
function NavbarPage() {
  const [click,setClick] = useState(false);
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
        <ul className={click ? 'nav-menu active': 'nav-menu'}>
          <li className='nav-item'>
            <NavLink to ={'/home'} className={(navData)=>(navData.isActive ? "active-link" : "nav-links")}>
              Home
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to ={'/doctors'} className={(navData)=>(navData.isActive ? "active-link" : "nav-links")} > 
              Medici
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to ={'/specializations'} className={(navData)=>(navData.isActive ? "active-link" : "nav-links")} >
              Specialitati
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to ='/shop' className={(navData)=>(navData.isActive ? "active-link" : "nav-links")} >
              Shop
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to ={'/adddoctor'} className={(navData)=>(navData.isActive ? "active-link" : "nav-links")}>
              AddDoc
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to ={'/login'} className={(navData)=>(navData.isActive ? "active-link" : "nav-links")}>
              Login
            </NavLink>
          </li>
          </ul>
          </div>
          </nav>
    )
}
export default NavbarPage
