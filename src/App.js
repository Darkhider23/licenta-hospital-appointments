import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home/Home"
import NavbarPage from './components/NavbarPage'
import Footer from './components/Footer'
import Contact from './pages/Contact/Contact'
import Doctors from './pages/Doctors/Doctors'
import Shop from './pages/Shop/Shop'
import Prices from './pages/Prices/Prices'
import Specializations from './pages/Specializations/Specializations'
import Locations from './pages/Locations/Locations'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'
import {faPhone} from '@fortawesome/free-solid-svg-icons'
import AddDoctor from './pages/Utils/AddDoctor';
import LoginForm from './pages/LoginForm/LoginForm';
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
        {<Route path='/doctors' element= {<Doctors/>}/>}
        {<Route path='/prices' element= {<Prices/>}/>}
        {<Route path='/specializations' element= {<Specializations/>}/>}
        {<Route path='/adddoctor' element= {<AddDoctor/>}/>}
        {<Route path='/login' element= {<LoginForm/>}/>}

      </Routes>
    </div>
    <Footer/>
   </>
  );
}

export default App