const express = require('express');
const router = express.Router();
const Appointment = require('../Models/Appointments')
const Doctor = require('../Models/Doctor')
const User = require('../Models/User')

router.use(express.json());

router.get('/:id', async (req,res)=>{
    try{
    const {id} = req.params;
    console.log(id);
    console.log(id);
    const app = await Appointment.findByPk(id);
    // console.log(app);
    const user = await User.findByPk(app.userId);
    // console.log(user);
    const doctor = await Doctor.findByPk(app.doctorId);
    // console.log(doctor);
    if(app && user && doctor){
    const data = {
        user_email: `${user.email}`,
        user_name : `${user.firstname} ${user.lastname}`,
        message : `You appointment from ${app.appointmentTime} ${app.startHour.substring(0,5)}-${app.endHour.substring(0,5)} with Doctor ${doctor.firstname} ${doctor.lastname} has been `
    }
    res.status(200).json({data:data})
    }
}
catch(error){
    console.log(error);
    res.status(500).json({message:'Server error'});
}
})
module.exports = router;