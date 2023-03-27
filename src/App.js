import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from "./pages/Home.jsx"
import NavbarPage from './components/NavbarPage.jsx'
import Footer from './components/Footer.jsx'
import Contact from './pages/Contact.jsx'
import Doctors from './pages/Doctors.jsx'
import Shop from './pages/Shop.jsx'
import Prices from './pages/Prices.jsx'
import Specializations from './pages/Specializations.jsx'
import Locations from './pages/Locations.jsx'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'
import {faPhone} from '@fortawesome/free-solid-svg-icons'
library.add(faFacebookF,faInstagram, faPhone);
function App() {
  return (
    <>
    <NavbarPage/>
    <div className="page-container">
      <Routes>
        {<Route path='/' element= {<Home/>}/>}
        {<Route path='/home' element= {<Home/>}/>}
        {<Route path='/contact' element= {<Contact/>}/>}
        {<Route path='/medicii' element= {<Doctors/>}/>}
        {<Route path='/preturi' element= {<Prices/>}/>}
        {<Route path='/shop' element= {<Shop/>}/>}
        {<Route path='/specialitati' element= {<Specializations/>}/>}
        {<Route path='/locatii' element= {<Locations/>}/>}
      </Routes>
    </div>
    <Footer/>
   </>
  );
}

export default App