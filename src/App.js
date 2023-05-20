import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home/Home"
import NavbarPage from './components/NavbarPage'
import Footer from './components/Footer'
import Contact from './pages/Contact/Contact'
import Doctors from './pages/Doctors/Doctors'
import Specializations from './pages/Specializations/Specializations'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons'
import {faPhone} from '@fortawesome/free-solid-svg-icons'
import Admin from './pages/Utils/Admin';
import LoginForm from './pages/LoginForm/LoginForm';
import MakeAppointment from './pages/MakeAppointment/MakeAppointment';
import SpecializationPage from './pages/Specialization/SpecializationPage';
import Diseases from './pages/Diseases/Diseases';
import DoctorsSP from './pages/DoctorSP/DoctorSP';
import Calculator from './pages/Calculator/Calculator';
import BMIPage from './pages/BMIPage/BMIPage';
import UserProfile from './pages/UserProfile/UserProfile';
import DoctorProfile from './pages/DoctorProfile/DoctorProfile';
import MedicalRecord from './pages/MedicalRecord/MedicalRecord';
library.add(faFacebookF,faInstagram, faPhone);
function App() {
  
  return (
    <>
    <NavbarPage />
    <div className="page-container">
      <Routes>
      {<Route path='/' element= {<Home/>}/>}
        {<Route path='/home' element= {<Home/>}/>}
        {<Route path='/contact' element= {<Contact/>}/>}
        {<Route path='/doctors/' element= {<Doctors/>}/>}
        {<Route path='/doctors/:id' element= {<DoctorsSP/>}/>}
        {<Route path='/specializations' element= {<Specializations/>}/>}
        {<Route path='/admin' element= {<Admin/>}/>}
        {<Route path='/login' element= {<LoginForm/>}/>}
        {<Route path='/makeappointment' element= {<MakeAppointment/>}/>}
        {<Route path='/specialization/:id' element= {<SpecializationPage/>}/>}
        {<Route path='/diseases/:id' element= {<Diseases/>}/>}
        {<Route path='/calculator' element= {<Calculator/>}/>}
        {<Route path='/bmi' element= {<BMIPage/>}/>}
        {<Route path='/userprofile' element= {<UserProfile/>}/>}
        {<Route path='/doctorprofile' element= {<DoctorProfile/>}/>}
        {<Route path='/medicalrecord/:id' element= {<MedicalRecord/>}/>}
        


      </Routes>
    </div>
    <Footer/>
   </>
  );
}

export default App